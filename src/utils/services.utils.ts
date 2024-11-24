import axios, { type AxiosResponse } from 'axios'

import { SERVICES_URL } from './base.utils'
import type { Service } from '@/models/service.interface'

export const fetchServiceById = async (id: number): Promise<Service> => {
    try {
        const response: AxiosResponse<Service> = await axios.get<Service>(`${SERVICES_URL}/${id}`)
        return response.data
    } catch (error) {
        console.error('Error fetching Services:', error)
        throw error // Re-throw the error to handle it elsewhere if needed
    }
}