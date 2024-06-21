<script setup lang="ts">

import { onMounted, ref, watch } from "vue";
import type { Ticket } from "../models/ticket.interface"
import { fetchTickets, fetchCurrentTicket, callNextTicket, ticketFinishPost, startSession, stopSessionRequest } from "../utils/tickets.utils"
import { useRouter } from "vue-router";

const active = ref(false);

const tickets = ref([] as Ticket[]);
const currentTicket = ref({} as Ticket);

// 15 minutes in milliseconds
const countdown = ref(15 * 60 * 1000); // 15 minutes in milliseconds
const elapsedTime = ref(0); // Time elapsed after reaching 15 minutes
const interval = ref(null as any);// Time elapsed after reaching 15 minutes



const finished = ref(false);

const router = useRouter();


const getSessionTickets = async () => {
    tickets.value = await fetchTickets();
  
}
const getCurrentTicket = async () => {
    const result = await fetchCurrentTicket()
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
    finished.value = false;
}
const finish = async (id: number) => {
    await ticketFinishPost(id);
    // currentTicket.value = null;
    finished.value = true;
}
const startASession = async () => {
    active.value = true;
    localStorage.setItem("sessionStatus", "ONNLINE")
    const data = await startSession();
}

const formatDate = (date: Date) => {
    return new Date(date).toLocaleString("ru-RU")
}

const formatTime = (time: number) => {
    const minutes = Math.floor(time / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};
const stopSession = async () => {
    await stopSessionRequest();
    active.value = false
    localStorage.setItem("sessionStatus", "OFFLINE")
    router.push("/")
}

const stopReasons=()=>{
    
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
    startTimer();
};


watch(active, () => {
    if (active.value) {
        getCurrentTicket();
        getSessionTickets();
        startTimer()
        setInterval(() => {
            getSessionTickets();
        }, 3000)
    }
});

onMounted(() => {
    localStorage.getItem("sessionStatus") === "ONNLINE" ? active.value = true : active.value = false

    setInterval(() => {
        getSessionTickets();
    }, 3000)
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
                <button @click="startASession()" class="btn btn-primary float-end">Начать сессию</button>
                <button @click="stopSession()" class="btn btn-primary float-right">Закончить сессию</button>
            </div>
            <div class="info">
                <div>
                    <div v-if="currentTicket.id" class="info-container">
                        <div class="number">
                            {{ currentTicket.ticketNumber }}
                        </div>
                        <div class="rest">
                            <div class="serviceName">
                                {{ currentTicket.serviceName }}
                            </div>
                            <div class="register">
                                {{ formatDate(currentTicket.registrationTime) }}
                            </div>
                            <div class="timer font-bold">
                                <span v-if="countdown > 0">{{ formatTime(countdown) }}</span>
                                <span class="text-red-500" v-else>15:00 + {{ formatTime(elapsedTime) }}</span>
                            </div>
                            <div class="status">
                                {{ finished === true ? "Обслужен" : "Обслуживается" }}
                            </div>
                        </div>
                    </div>
                    <div v-else class="p-4 text-2xl">
                        <h1>Нет билетов</h1>
                    </div>
                    <div class="buttons">
                        <button @click="finish(currentTicket.id)" type="button"
                            class="btn btn-primary">Завершить</button>
                        <button @click="getNextTicket()" type="button" class="btn btn-primary">Следующий</button>
                    </div>
                </div>

            </div>
        </div>
        <div class="ticket-tab">
            <div class="title">
                Список билетов
            </div>
            <div class="tickets">
                <div v-for="ticket in tickets" :key="ticket.id" class="ticket">
                    <div class="ticketNum">{{ ticket.ticketNumber }}</div>
                    <div class="serviceName">{{ ticket.serviceName }}</div>
                    <div class="times">{{ formatDate(ticket.registrationTime) }}</div>
                </div>

            </div>
        </div>

    </main>

</template>
<style lang="scss" scoped>
main {
    display: flex;
    width: 100%;
    height: 100vh;

    .main-tab {
        background-color: rgb(222, 224, 222);
        width: 70%;
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
                font-size: 80px;

            }

            .serviceName {
                font-size: 40px;
            }
        }
    }

    .ticket-tab {
        width: 30%;
        height: 100%;
        background-color: rgb(239, 238, 238);

        .title {
            text-align: center;
        }

        .tickets {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;


            .ticket {
                width: 100%;
                box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
                padding: 0.5rem;
                margin-bottom: 0.5rem;
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