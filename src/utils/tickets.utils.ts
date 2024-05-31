import axios, { type AxiosResponse } from "axios";

import { TICKETS_URL, TICKET_CALL_NEXT_URL, TICKET_FINISH_URL } from "./base.utils";
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
            status: "NEW"
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

