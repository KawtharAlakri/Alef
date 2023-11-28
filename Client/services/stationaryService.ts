import { Stationary } from '@/types/stationary'; // Import the Stationary type
import { currentPreschool, currentToken } from './authService';
import axios, { AxiosRequestConfig } from 'axios';

const BASE_URL = 'http://localhost:3000/Stationary'; // backend URL

export async function getStationary(): Promise<Stationary[]> {
    try {
        var token; var preschool;
        await currentToken().then((returnedTOken) => { token = returnedTOken; })
        await currentPreschool().then((preschoolId) => { preschool = preschoolId; })
        // Set up the request config with headers
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
        };


        const response = await axios.get<Stationary[]>((`${BASE_URL}/preschool/${preschool}`), config);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function createStationary(stationaryData: Stationary): Promise<void> {
    try {
        var token; var preschool;
        await currentToken().then((returnedTOken) => { token = returnedTOken; })
        await currentPreschool().then((preschoolId) => { preschool = preschoolId; })
        // Set up the request config with headers
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
        };


        await axios.post(BASE_URL, stationaryData, config);
    } catch (error) {
        throw error;
    }
}
export async function updateStationary(stationaryId: string, stationaryData: Stationary): Promise<void> {
    try {
        var token; var preschool;
        await currentToken().then((returnedTOken) => { token = returnedTOken; })
        await currentPreschool().then((preschoolId) => { preschool = preschoolId; })
        // Set up the request config with headers
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
        };


        await axios.put(`${BASE_URL}/${stationaryId}`, stationaryData, config);
    } catch (error) {
        throw error;
    }
}

export async function getStationaryById(stationaryId: string): Promise<Stationary> {
    try {
        var token; var preschool;
        await currentToken().then((returnedTOken) => { token = returnedTOken; })
        await currentPreschool().then((preschoolId) => { preschool = preschoolId; })
        // Set up the request config with headers
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
        };


        const response = await axios.get<Stationary>(`${BASE_URL}/${stationaryId}`, config);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export async function deleteStationary(stationaryId: string): Promise<void> {
    try {
        var token; var preschool;
        await currentToken().then((returnedTOken) => { token = returnedTOken; })
        await currentPreschool().then((preschoolId) => { preschool = preschoolId; })
        // Set up the request config with headers
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
        };


        await axios.delete(`${BASE_URL}/${stationaryId}`, config);
    } catch (error) {
        throw error;
    }
}