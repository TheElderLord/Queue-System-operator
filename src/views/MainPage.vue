<script setup lang="ts">

import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import type { Ticket } from "../models/ticket/ticket.interface"
import { fetchTickets, fetchOperatorCurrentTicket, callNextTicket, ticketFinishPost, fetchServTicketById, } from "../utils/tickets.utils"
import { startSession, stopSessionRequest } from "../utils/sessions.utils"
import { useTicketStore } from "@/stores/counter";
import type { Operator } from "@/models/operator/operator.interface";
import { fetchOperatorById } from "../utils/operator.utils";


const router = useRouter();
const store = useTicketStore();

const active = ref(false);
const tickets = ref([] as Ticket[]);
const currentTicket = ref({} as Ticket);
const autoCall = ref(true);

const operator = ref({} as Operator);
// 15 minutes in milliseconds
const countdown = ref(15 * 60 * 1000); // 15 minutes in milliseconds
const elapsedTime = ref(0); // Time elapsed after reaching 15 minutes
const interval = ref(null as any);// Time elapsed after reaching 15 minutes



const finished = ref(false);
const endingSessionDialog = ref(false);
const endingOption = ref("COMPLETED")




const getSessionTickets = async () => {
    tickets.value = await fetchTickets();

}
const getCurrentTicket = async () => {
    const result = await fetchOperatorCurrentTicket()
    console.log(result);
    if (result.length === 0) {
        finished.value = true;
    }
    else
        currentTicket.value = result[0];


}
const getNextTicket = async () => {
    if (!finished.value) {
        return alert("Обслуживание не окончено")
    }
    await callNextTicket();
    await getSessionTickets();
    await getCurrentTicket();
    resetTimer();
    startTimer();
    finished.value = false;
}
const finish = async (id: number, status: string) => {
    await ticketFinishPost(id, status);
    // currentTicket.value = null;

    finished.value = true;
    resetTimer();
    if (autoCall.value) {
        if (finished.value){
        setTimeout(() => {
            
                getNextTicket()
        }, 3000)
    }
    }
}


const formatDate = (date: Date) => {
    return new Date(date).toLocaleString("ru-RU")
}

const formatTime = (time: number) => {
    const minutes = Math.floor(time / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

const startASession = async () => {
    active.value = true;
    localStorage.setItem("sessionStatus", "ONNLINE")
    const data = await startSession();
}
const stopSession = async () => {
    // endingSessionDialog.value = true
    await stopSessionRequest(endingOption.value);
    active.value = false
    localStorage.setItem("sessionStatus", endingOption.value)
    router.push("/")
}

const redirect = (id: number) => {
    localStorage.setItem("ticketId", id + "");
    router.push("/redirect")
}

const getOperatorInfo = async () => {
    const operatorId: number = Number(localStorage.getItem("opId"));
    operator.value = await fetchOperatorById(operatorId);

}


const startTimer = () => {
    interval.value = setInterval(() => {
        if (countdown.value > 0) {
            countdown.value -= 1000;
        } else {
            elapsedTime.value += 1000;
        }
    }, 1000);
};

const resetTimer = () => {
    clearInterval(interval.value);
    countdown.value = 15 * 60 * 1000; // reset to 15 minutes
    elapsedTime.value = 0; // reset elapsed time
    // startTimer();
};

const formatService = (service:Ticket) => {

    console.log(service)
    const splitService = service.serviceName.split(";");
    let formatted;
    splitService.map(e => {
        if (e.includes(service.language))
            formatted = e.replace(`${service.language}=`, "");
    })
    return formatted;

}
const servTicket = async(id:number)=>{
    if(currentTicket.value.operatorName)
    await finish(currentTicket.value.id,"COMPLETED");
    await fetchServTicketById(id);
    await getCurrentTicket()
}



watch(active, () => {
    if (active.value) {
        getCurrentTicket();
        getSessionTickets();
        startTimer()
        // setInterval(() => {
        //     getSessionTickets();
        // }, 3000)
    }
});

onMounted(() => {
    localStorage.getItem("sessionStatus") === "ONNLINE" ? active.value = true : active.value = false

    getOperatorInfo();
    setInterval(() => {
        getSessionTickets();
    }, 5000)
})


</script>
<template>
    <main>
        <div class="main-tab">
            <div class="header">
                <div v-if="active" class="indicator float-start bg-green-600 rounded-full w-10 h-10">
                </div>

                <div v-else class="indicator float-start bg-red-600 rounded-full w-10 h-10">
                </div>

                <button :disabled="active" @click="startASession()" class="btn btn-primary float-end">Начать
                    сессию</button>
                <button :disabled="!active" @click="endingSessionDialog = !endingSessionDialog"
                    class="btn btn-primary float-right">Закончить
                    сессию</button>

                <div class="absolute right-100 top-20">
                    <v-switch v-model="autoCall" color="primary" label="Автопереключение" hide-details></v-switch>
                </div>


            </div>

            <div class="info">

                <div>

                    <div class="operatorFullN text-3xl font-bold">{{ operator.name + " " + operator.lastname }}</div>
                    <div v-if="currentTicket.id" class="info-container">

                        <div class="number">
                            {{ currentTicket.ticketNumber }}
                        </div>
                        <div class="rest">
                            <div class="serviceName">
                                {{ formatService(currentTicket) }}
                            </div>
                            <div class="register">
                                {{ formatDate(currentTicket.registrationTime) }}
                            </div>
                            <div class="timer font-bold">
                                <span v-if="countdown > 0">{{ formatTime(countdown) }}</span>
                                <span class="text-red-500" v-else>15:00 + {{ formatTime(elapsedTime) }}</span>
                            </div>
                            <div class="status text-xl">
                                {{ finished === true ? "Обслужен" : "Обслуживается" }}
                            </div>

                        </div>
                    </div>
                    <div v-else class="p-4 text-4xl m-4">
                        <h1>Нет билетов</h1>
                    </div>
                    <div class="buttons m-4">
                        <button :disabled="!currentTicket" @click="finish(currentTicket.id, 'MISSED')" type="button"
                            class="btn btn-primary text-white">Не явился</button>
                        <button :disabled="!currentTicket" @click="redirect(currentTicket.id)" type="button"
                            class="btn btn-primary text-white">Перенаправить</button>
                        <button :disabled="!currentTicket || currentTicket.status !== 'INSERVICE'"
                            @click="finish(currentTicket.id, 'COMPLETED')" type="button"
                            class="btn btn-primary text-white">Завершить</button>
                        <button :disabled="!finished" @click="getNextTicket()" type="button"
                            class="btn btn-primary text-white">Следующий</button>
                    </div>
                </div>

            </div>
        </div>
        <div class="ticket-tab">
            <div class="title text-3xl m-4 font-bold">
                Список билетов
            </div>
            <div class="tickets">
                <div v-for="ticket in tickets" :key="ticket.id" class="ticket">
                    <div class="ticketNum">{{ ticket.ticketNumber }}</div>
                    <div class="serviceName">{{ formatService(ticket) }}</div>
                    <div class="times">{{ formatDate(ticket.registrationTime) }}</div>
                    <div class="times"><button @click="servTicket(ticket.id)" class="btn btn-primary">Обслужить</button></div>

                </div>

            </div>
        </div>
        <div class="modal">
            <v-dialog v-model="endingSessionDialog" max-width="800">
                <template v-slot:activator="{ props: activatorProps }">
                    <v-btn v-bind="activatorProps" color="surface-variant" text="Создать" variant="flat"></v-btn>
                </template>

                <template v-slot:default>
                    <v-card title="Закончить сессию">
                        <v-card-text>
                            <div class="card text-center">
                                <ul class="list-group list-group-flush">
                                    <v-col class="py-2" cols="20">
                                        <p>Выберите вариант</p>

                                        <v-btn-toggle v-model="endingOption" color="deep-purple-accent-3" rounded="0"
                                            group>
                                            <v-btn value="COMPLETED">
                                                Окончание рабочего дня
                                            </v-btn>

                                            <v-btn value="BREAK">
                                                Перерыв
                                            </v-btn>

                                            <v-btn value="FORCED">
                                                Неполадки
                                            </v-btn>

                                            <!-- <v-btn value="justify">
                                                Justify
                                            </v-btn> -->
                                        </v-btn-toggle>
                                    </v-col>
                                </ul>
                            </div>

                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn @click="stopSession()" text="Закончить сессию"></v-btn>
                            <v-btn text="Закрыть" @click="endingSessionDialog = !endingSessionDialog"></v-btn>
                        </v-card-actions>
                    </v-card>
                </template>
            </v-dialog>
        </div>

    </main>

</template>
<style lang="scss" scoped>
main {
    display: flex;
    width: 100%;
    height: 100%;

    .main-tab {
        background-color: rgb(222, 224, 222);
        width: 60%;
        height: 100%;
        padding: 1rem;


        .info {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;

            .number {
                font-size: 100px;

            }

            .serviceName {
                font-size: 40px;
            }
        }
    }

    .ticket-tab {
        width: 40%;
        height: 100%;
        background-color: rgb(239, 238, 238);

        .title {
            text-align: center;
        }

        .tickets {
            width: 100%;
            height: 90%;
            display: flex;
            flex-direction: column;

            overflow: auto;


            .ticket {
                width: 100%;
                box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
                border: 1px solid black;
                padding: 0.5rem;
                margin-bottom: 1rem;
                border-radius: .5rem;
                display: flex;
                font-size: 20px;

                div {
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

            }

        }
    }

}
</style>