<script setup lang="ts">
import { loginRequest } from "../utils/operator.utils";
import type { OperatorAuth } from "../models/operator/operatorAuth.interface";
import { ref } from "vue";
import { useRouter } from "vue-router";


const operatorObject = ref({} as OperatorAuth)
const router = useRouter();

const login = async () => {
    const operator = await loginRequest(operatorObject.value);
    localStorage.setItem("opId", operator.id);
    localStorage.setItem("authToken", "2ddawse");
    router.push("/branch")
}
</script>
<template>
    <div class=" container w-full h-full flex justify-center items-center ">
        <div class="">
            <div class="title text-center text-3xl p-4">
                <h1>Авторизация</h1>
            </div>
            <div class="form text-center">
                <form @submit.prevent="login()">
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Имя пользователя</label>
                        <input v-model="operatorObject.username" type="text" class="form-control"
                            id="exampleInputEmail1" aria-describedby="emailHelp">
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Пароль</label>
                        <input v-model="operatorObject.password" type="password" class="form-control"
                            id="exampleInputPassword1">
                    </div>

                    <button type="submit" class="btn btn-primary">Подтвердить</button>
                </form>
            </div>
        </div>

    </div>
</template>