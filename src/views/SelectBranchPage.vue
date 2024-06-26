<script setup lang="ts">
import { fetchBranches } from '../utils/branches';
import { fetchWindowsById } from '../utils/window.utils';
import type { Branch } from '../models/branch.interface';
import type { Window } from '../models/window.interface';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const branches = ref([] as Branch[]);
const windows = ref([] as Window[]);

const seletedBranchId = ref(0);
const selectedWindowId = ref(0);

const errorMessage = ref(false);

const getBranches = async () => {
    branches.value = await fetchBranches();
    // console.log(branches.value)
}
const getWindows = async () => {
    windows.value = await fetchWindowsById(seletedBranchId.value);
}

const sumbission = async () => {
    if (seletedBranchId.value === 0 || selectedWindowId.value === 0) {
        errorMessage.value = true;
        return
    }
    errorMessage.value = false;
    localStorage.setItem("windowId", selectedWindowId.value + '');
    localStorage.setItem("branchId", seletedBranchId.value + '');
    router.push("/main")
}
onMounted(() => {
    getBranches();
})

</script>
<template>
    <main class="w-full h-full flex justify-center items-center">
        <div class="container  w-1/2">

            <div class="title text-3xl text-center m-4">
                Выберите окно и отделение
            </div>
            <div class="branches">
                <div class="title text-xl">
                    Выберите отделение
                </div>
                <div class="select">
                    <select required @change="getWindows()" v-model="seletedBranchId" class="form-select"
                        aria-label="Default select example">
                        <option value="0" selected>Отделение</option>
                        <option v-for="branch in branches" :value="branch.id" :key="branch.id" class="branch">
                            {{ branch.name }}
                        </option>
                    </select>
                </div>

            </div>
            <div class="windows">
                <div class="title text-xl">
                    Выберите окна
                </div>
                <div class="select">
                    <select required v-model="selectedWindowId" class="form-select" aria-label="Default select example">
                        <option value="0" selected>Окно</option>
                        <option :value="window.id" v-for="window in windows" :key="window.id" class="branch">
                            {{ window.name }}
                        </option>
                    </select>
                </div>

            </div>

            <div class="next text-center p-4">
                <button @click="sumbission" class="btn btn-primary">Подтвердить</button>
                <div v-if="errorMessage" class="error text-xl text-red-500">
                    Выберите отделение и окно
                </div>
            </div>

        </div>
    </main>
</template>