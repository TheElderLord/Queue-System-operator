import axios, { type AxiosResponse } from "axios";

import { TICKETS_URL, TICKET_CALL_NEXT_URL, TICKET_FINISH_URL, BASE_URL } from "./base.utils";
import type { Ticket } from "@/models/ticket.interface";

export const fetchTickets = async (): Promise<Ticket[]> => {
    try {
        const response: AxiosResponse<Ticket[]> = await axios.post<Ticket[]>(TICKETS_URL, {
            sessionId: 1,
            branchId: 1,
            status: "NEW"
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching tickets:", error);
        throw error; // Re-throw the error to handle it elsewhere if needed
    }
}
export const fetchCurrentTicket = async (): Promise<Ticket[]> => {
    try {
        const response: AxiosResponse<Ticket[]> = await axios.post<Ticket[]>(TICKETS_URL, {
            sessionId: 1,
            branchId: 1,
            status: "INSERVICE"
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching tickets:", error);
        throw error; // Re-throw the error to handle it elsewhere if needed
    }
}
export const callNextTicket = async (): Promise<Ticket> => {
    try {
        const response: AxiosResponse<Ticket> = await axios.post<Ticket>(`${TICKET_CALL_NEXT_URL}`, {
            sessionId: 1,
            branchId: 1,
            status: null
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching tickets:", error);
        throw error; // Re-throw the error to handle it elsewhere if needed
    }
}
export const ticketFinishPost = async (id: number): Promise<Ticket> => {
    try {
        const response: AxiosResponse<Ticket> = await axios.put<Ticket>(`${TICKET_FINISH_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching tickets:", error);
        throw error; // Re-throw the error to handle it elsewhere if needed
    }
}

export const startSession = async () => {
    try {
        const windowId = localStorage.getItem("windowId");
        const branchId = localStorage.getItem("branchId");
        const operatorId = localStorage.getItem("opId");
        const response: AxiosResponse = await axios.post(`${BASE_URL}/sessions`, {
            operatorId: operatorId,
            windowId: windowId,
            branchId: branchId
        });
        localStorage.setItem("sessionId", response.data.id)
        // console.log("starting")
        return response.data;

    } catch (error) {
        console.log(error)
    }
}
export const stopSessionRequest = async () => {
    try {
        const id = localStorage.getItem("sessionId")
        const response: AxiosResponse = await axios.put(`${BASE_URL}/sessions/${id}`);
        // console.log("starting")

        return response.data;

    } catch (error) {
        console.log(error)
    }
}
