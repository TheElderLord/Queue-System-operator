<script setup lang="ts">

import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useTicketStore } from "@/stores/counter";
import type { Ticket } from "@/models/ticket.interface";
import { fetchTicketById, redirectTicket } from "@/utils/tickets.utils";
import type { Operator } from "@/models/operator/operator.interface";
import { fetchOperators } from "@/utils/operator.utils";
import type { Redirect } from "@/models/ticket/redirect.interface";

const router = useRouter();
const ticket = ref({} as Ticket)
const operators = ref([] as Operator[]);
const selectedOperatorId = ref(0 as number)

const getTicketInfo = async () => {
    const ticketId = localStorage.getItem("ticketId");
    ticket.value = await fetchTicketById(Number(ticketId));
    console.log(ticket.value)
}
const getOperators = async () => {
    operators.value = await fetchOperators();

}
const redirect = async () => {
    if (selectedOperatorId.value === 0) {
        alert("Выберите оператора")
    }
    const operator: Redirect = {
        operatorId: selectedOperatorId.value
    }
    const requestObject = await redirectTicket(ticket.value.id, operator);
    alert("Вы успешно перенаправили билет")
    goMainPage();
}
const goMainPage = () => {
    router.push("/main")
}
onMounted(() => {
    getTicketInfo();
    getOperators();
})
</script>
<template>
    <div class="login-container w-full h-full flex justify-center items-center ">
        <div class="wrapper w-full h-full">
            <div class="backButton float-start p-4 text-2xl absolute">
                <button @click="goMainPage()" class="btn btn-primary">Назад</button>
            </div>
            <div class="title text-center text-4xl p-4 font-bold">
                Перенаправление
            </div>
            <div class="ticketInfo">
                <div class="ticketNumber text-5xl text-center m-4">Номер билета:{{ ticket.ticketNumber }}</div>
                <div class="ticketNumber text-5xl text-center m-4">Услуга:{{ ticket.serviceName }}</div>
                <div class="ticketNumber text-5xl text-center m-4">Номер окна:{{ ticket.windowNum }}</div>
                <div class="ticketNumber text-5xl text-center m-4">Оператор:{{ ticket.operatorName }}</div>
            </div>
            <div class="form text-center w-1/2 mx-auto">
                <select class="form-select" aria-label="Default select example" v-model="selectedOperatorId">
                    <option selected>Выберите оператора</option>
                    <option v-for="operator in operators" :key="operator.id" :value="operator.id">
                        {{ operator.name }} {{ operator.lastname }}
                    </option>

                </select>

                <button @click="redirect()" class="btn btn-primary mx-auto mt-5">Перенаправить</button>
            </div>
        </div>

    </div>
</template>