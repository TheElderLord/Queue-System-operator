<script setup lang="ts">

import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useTicketStore } from "@/stores/counter";
import type { Ticket } from "@/models/ticket.interface";
import { fetchTicketById } from "@/utils/tickets.utils";

const router = useRouter();
const ticket = ref({} as Ticket)

const getTicketInfo = async () => {
        const ticketId = localStorage.getItem("ticketId");
        ticket.value = await fetchTicketById(Number(ticketId));
        console.log(ticket.value)

}
onMounted(()=>{
    getTicketInfo();
})
</script>
<template>
    <div class="login-container w-full h-full flex justify-center items-center ">
        <div class="wrapper w-1/2">
            <div class="title text-center text-3xl p-4">
                <h1 class="font-bold">Авторизация</h1>
            </div>
            <div class="form text-center">
              
            </div>
        </div>

    </div>
</template>