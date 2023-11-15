// services/userService.ts
import { Request } from '@/types/request'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const BASE_URL = 'http://localhost:3000/requests'; // Replace with your backend URL

export async function createRequest(preschool_name: string,
    representitive_name: string,
    CR: string,
    phone: string,
    email: string, plan_id: number): Promise<Request> {
    try {
        const response = await axios.post<Request>(`${BASE_URL}`, {
            preschool_name: preschool_name,
            representitive_name: representitive_name,
            CR: CR,
            phone: phone,
            email: email,
            plan_id: plan_id
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}
export async function getRequests(): Promise<Request[]> {
    try {
        const token = localStorage.getItem('token'); // Get the JWT token from localStorage

        // Set up the request config with headers
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
        };

        const response = await axios.get<Request[]>(BASE_URL, config);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export async function getRequestById(requestId: string): Promise<Request> {
    try {
        const response = await axios.get<Request>(`${BASE_URL}/${requestId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function updateRequestStatus(requestId: string, newStatus: string): Promise<Request> {
    try {
        const token = localStorage.getItem('token'); // Get the JWT token from localStorage

        // Set up the request config with headers
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
        };

        const response = await axios.patch<Request>(
            `${BASE_URL}/${requestId}`,
            { status: newStatus },
            config
        );
        return response.data;
    } catch (error) {
        console.error("Error updating status:", error);
        // Type assertion for error variable
        const axiosError = error as AxiosError;

        // Print Axios error details
        if (axiosError.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error("Response data:", axiosError.response.data);
            console.error("Response status:", axiosError.response.status);
            console.error("Response headers:", axiosError.response.headers);
        } else if (axiosError.request) {
            // The request was made but no response was received
            console.error("No response received:", axiosError.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error("Error setting up the request:", axiosError.message);
        }

        throw axiosError;
    }
}

export async function deleteRequest(requestId: string): Promise<void> {
    try {
        const token = localStorage.getItem('token'); // Get the JWT token from localStorage

        // Set up the request config with headers
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
        };

        await axios.delete(`${BASE_URL}/${requestId}`, config);
    } catch (error) {
        throw error;
    }
}