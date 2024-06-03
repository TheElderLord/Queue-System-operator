import axios, { type AxiosResponse } from "axios";

import { WINDOWS_URL } from "./base.utils";
import type { Window } from "../models/window.interface";

export const fetchWindowsById = async (id: number): Promise<Window[]> => {
    try {
        const response: AxiosResponse<Window[]> = await axios.get<Window[]>(`${WINDOWS_URL}/branch/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching Windows:", error);
        throw error; // Re-throw the error to handle it elsewhere if needed
    }
}