import axios, { type AxiosResponse } from "axios";

import { BRANCHES_URL } from "./base.utils";
import type { Branch } from "@/models/branch.interface";

export const fetchBranches = async (): Promise<Branch[]> => {
    try {
        const response: AxiosResponse<Branch[]> = await axios.get<Branch[]>(BRANCHES_URL);
        console.log("sdasd")
        return response.data;
    } catch (error) {
        console.error("Error fetching branches:", error);
        throw error; // Re-throw the error to handle it elsewhere if needed
    }
}