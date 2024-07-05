import axios, { type AxiosResponse } from "axios";

import { BASE_URL, TICKETS_URL, TICKET_CALL_NEXT_URL, TICKET_FINISH_URL,OPERATORS_URL } from "./base.utils";
import type { Ticket } from "@/models/ticket.interface";
import type { Redirect } from "@/models/ticket/redirect.interface";
import type { TicketCall } from "@/models/ticket/ticket_call.interface";

export const fetchTickets = async (): Promise<Ticket[]> => {
    try {
        const response: AxiosResponse<Ticket[]> = await axios.post<Ticket[]>(`${OPERATORS_URL}/tickets`, {
            operatorId: localStorage.getItem("opId"),
            branchId: localStorage.getItem("branchId"),
            status: "NEW"
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching tickets:", error);
        throw error; // Re-throw the error to handle it elsewhere if needed
    }
}
export const fetchServTicketById = async (id:number): Promise<Ticket[]> => {
    try {
        const operatorId = localStorage.getItem("opId");
        const response: AxiosResponse<Ticket[]> = await axios.get<Ticket[]>(`${OPERATORS_URL}/tickets/${id}?operatorId=${operatorId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching tickets:", error);
        throw error; // Re-throw the error to handle it elsewhere if needed
    }
}
export const fetchOperatorCurrentTicket = async (): Promise<Ticket[]> => {
    try {
        const operatorId =  Number(localStorage.getItem("opId"));
        const response: AxiosResponse<Ticket[]> = await axios.get<Ticket[]>(`${OPERATORS_URL}/current/${operatorId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching tickets:", error);
        throw error; // Re-throw the error to handle it elsewhere if needed
    }
}
export const callNextTicket = async () => {
    const nextTicket: TicketCall = {
        operatorId: Number(localStorage.getItem("opId")),
        windowId: Number(localStorage.getItem("windowId")),
        branchId: Number(localStorage.getItem("branchId")),
        status: null
    }
    try {
        const response = await axios.post(`${TICKET_CALL_NEXT_URL}`, nextTicket);
        return response.data;
    } catch (error) {
        console.error("Error fetching tickets:", error);
        throw error; // Re-throw the error to handle it elsewhere if needed
    }
}
export const ticketFinishPost = async (id: number, status: string): Promise<Ticket> => {
    try {
        const response: AxiosResponse<Ticket> = await axios.put<Ticket>(`${TICKET_FINISH_URL}/${id}?status=${status}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching tickets:", error);
        throw error; // Re-throw the error to handle it elsewhere if needed
    }
}

export const fetchTicketById = async (id: number) => {
    try {
        const response: AxiosResponse<Ticket> = await axios.get<Ticket>(`${BASE_URL}/tickets/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching tickets:", error);
        throw error; // Re-throw the error to handle it elsewhere if needed
    }
}
export const redirectTicket = async (id: number, requestObject: Redirect) => {
    try {
        const response: AxiosResponse<Ticket> = await axios.post<Ticket>(`${BASE_URL}/tickets/redirect/${id}`, requestObject);
        return response.data;
    } catch (error) {
        console.error("Error fetching tickets:", error);
        throw error; // Re-throw the error to handle it elsewhere if needed
    }
}


