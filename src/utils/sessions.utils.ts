
import axios, { type AxiosResponse } from "axios";
import { SESSIONS_URL } from "./base.utils";
import type { Session } from "@/models/session.interface";

export const startSession = async () => {
    try {
        const windowId = localStorage.getItem("windowId");
        const branchId = localStorage.getItem("branchId");
        const operatorId = localStorage.getItem("opId");
        const response: AxiosResponse<Session> = await axios.post<Session>(SESSIONS_URL, {
            operatorId: operatorId,
            windowId: windowId,
            branchId: branchId
        });
        if (response.data.id)
            localStorage.setItem("sessionId", response.data.id + '')
        // console.log("starting")
        return response.data;

    } catch (error) {
        console.log(error)
    }
}
export const stopSessionRequest = async (option: string) => {
    try {
        const id = localStorage.getItem("sessionId")
        const response: AxiosResponse = await axios.put(`${SESSIONS_URL}/${id}?status=${option}`);
        // console.log("starting")

        return response.data;

    } catch (error) {
        console.log(error)
    }
}
export const checkExistingActiveSessions = async (operatorId: number) => {
    try {
        const response: AxiosResponse = await axios.get(`${SESSIONS_URL}/operator/${operatorId}?active=true`);
        // console.log("starting")
        return response.data;

    } catch (error) {
        console.log(error)
    }
}