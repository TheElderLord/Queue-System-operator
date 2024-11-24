<script setup lang="ts">
import { loginRequest } from "../utils/operator.utils";
import type { OperatorAuth } from "../models/operator/operatorAuth.interface";
import { checkExistingActiveSessions } from "../utils/sessions.utils"
import { ref } from "vue";
import { useRouter } from "vue-router";


const operatorObject = ref({} as OperatorAuth)
const router = useRouter();

const login = async () => {
    const operator = await loginRequest(operatorObject.value);
    localStorage.setItem("opId", operator.id + "");
    localStorage.setItem("authToken", "2ddawse");
    const exist = await checkExistingActiveSessions(operator.id);
    console.log(exist);
    if (exist.length === 0) {
        localStorage.setItem("sessionStatus", "OFFLINE")
        return router.push("/branch")

    }
    else {
        localStorage.setItem("windowId", exist[0].windowId + '');
        localStorage.setItem("branchId", exist[0].branchId + '');
        localStorage.setItem("sessionStatus", "ONNLINE")
        return router.push("/main")
    }


}
</script>
<template>
    <div class="login-container w-full h-full flex justify-center items-center ">
        <div class="wrapper w-1/2">
            <div class="title text-center text-3xl p-4">
                <h1 class="font-bold">Авторизация</h1>
            </div>
            <div class="form text-center">
                <form @submit.prevent="login()">
                    <div class="form-floating mb-3">
                        <input v-model="operatorObject.username" type="text" class="form-control" id="floatingInput"
                            placeholder="name@example.com">
                        <label for="floatingInput">Имя пользователя</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input v-model="operatorObject.password" type="password" class="form-control" id="floatingInput"
                            placeholder="name@example.com">
                        <label for="floatingInput">Пароль</label>
                    </div>

                    <button type="submit" class="btn btn-primary text-white">Подтвердить</button>
                </form>
            </div>
        </div>

    </div>
</template>