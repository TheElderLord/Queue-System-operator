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
export const fetchOperators = async () => {
    try {
        const response = await axios.get(`${OPERATORS_URL}?active=true`);
        return response.data;
    } catch (error) {
        console.error("Error login", error);
        throw error; // Re-throw the error to handle it elsewhere if needed
    }
}