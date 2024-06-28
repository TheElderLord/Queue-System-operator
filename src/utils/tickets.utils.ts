import axios, { type AxiosResponse } from "axios";

import { TICKETS_URL, TICKET_CALL_NEXT_URL, TICKET_FINISH_URL } from "./base.utils";
import type { Ticket } from "@/models/ticket.interface";

export const fetchTickets = async (): Promise<Ticket[]> => {
    try {
        const response: AxiosResponse<Ticket[]> = await axios.post<Ticket[]>(TICKETS_URL, {
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
export const fetchCurrentTicket = async (): Promise<Ticket[]> => {
    try {
        const requestBody = {
            operatorId: localStorage.getItem("opId"),
            branchId: localStorage.getItem("branchId"),
            status: "INSERVICE"
        }
        console.log(requestBody);
        const response: AxiosResponse<Ticket[]> = await axios.post<Ticket[]>(TICKETS_URL, requestBody);
        return response.data;
    } catch (error) {
        console.error("Error fetching tickets:", error);
        throw error; // Re-throw the error to handle it elsewhere if needed
    }
}
export const callNextTicket = async (): Promise<Ticket> => {
    try {
        const response: AxiosResponse<Ticket> = await axios.post<Ticket>(`${TICKET_CALL_NEXT_URL}`, {
            operatorId: localStorage.getItem("opId"),
            branchId: localStorage.getItem("branchId"),
            status: null
        });
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

export const fetchTicketById = async(id:number)=>{
    try {
        const response: AxiosResponse<Ticket> = await axios.get<Ticket>(`${TICKETS_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching tickets:", error);
        throw error; // Re-throw the error to handle it elsewhere if needed
    }
}



