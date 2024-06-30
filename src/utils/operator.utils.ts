import axios, { type AxiosResponse } from "axios";

import { OPERATORS_URL } from "./base.utils";
import type { OperatorAuth } from "@/models/operator/operatorAuth.interface";
import type { Operator } from "@/models/operator/operator.interface";

export const loginRequest = async (operator: OperatorAuth) => {
    try {
        const response = await axios.post(`${OPERATORS_URL}/login`, operator);
        return response.data;
    } catch (error) {
        console.error("Error login", error);
        throw error; // Re-throw the error to handle it elsewhere if needed
    }
}
export const fetchOperators = async (): Promise<Operator[]> => {
    try {
        const response: AxiosResponse<Operator[]> = await axios.get<Operator[]>(`${OPERATORS_URL}?active=true`);
        return response.data;
    } catch (error) {
        console.error("Error login", error);
        throw error; // Re-throw the error to handle it elsewhere if needed
    }
}
export const fetchOperatorById = async (id: number): Promise<Operator> => {
    try {
        const response: AxiosResponse<Operator> = await axios.get<Operator>(`${OPERATORS_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error login", error);
        throw error; // Re-throw the error to handle it elsewhere if needed
    }
}
