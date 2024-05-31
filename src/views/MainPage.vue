<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { Ticket } from "../models/ticket.interface"
import { fetchTickets, fetchCurrentTicket, callNextTicket, ticketFinishPost } from "../utils/tickets.utils"

const tickets = ref([] as Ticket[]);
const currentTicket = ref({} as Ticket | null);

const session_id = 1;

const finished = ref(false);


const getSessionTickets = async () => {
    tickets.value = await fetchTickets();
}
const getCurrentTicket = async () => {
    const result = await fetchCurrentTicket()
    console.log(result);
    currentTicket.value = result[0];
}
const getNextTicket = async () => {

    await callNextTicket();
    await getSessionTickets();
    await getCurrentTicket();
    finished.value = false;
}
const finish = async (id: number) => {
    await ticketFinishPost(id);
    currentTicket.value = null;
    finished.value = true;
}

const formatDate = (date: Date) => {
    return new Date(date).toLocaleString("ru-RU")
}


onMounted(() => {
    getSessionTickets();
    getCurrentTicket();
    setInterval(() => {
        getSessionTickets();
    }, 3000)
})


</script>
<template>
    <main>
        <div class="main-tab">
            <div class="info">
                <div v-if="currentTicket" class="info-container">
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
                    </div>
                </div>
                <div v-else>
                    <h1>Нет билетов</h1>
                </div>
                <div class="buttons">
                    <button @click="finish(currentTicket.id)" type="button" class="btn btn-primary">Завершить</button>
                    <button @click="getNextTicket()" type="button" class="btn btn-primary">Следующий</button>
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
        display: flex;
        justify-content: center;
        align-items: center;

        .info {
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