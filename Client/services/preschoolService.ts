import { Preschool } from '@/types/preschool'; // Import the Preschool type
import { GradeCapacity } from '@/types/gradeCapacity'
import { currentUser } from './userService';
import axios, { AxiosRequestConfig } from 'axios';

const BASE_URL = 'http://localhost:3000/preschools'; // Backend URL for preschools

export async function getPreschools(): Promise<Preschool[]> {
    try {
        const token = localStorage.getItem('token'); // Get the JWT token from localStorage

        // Set up the request config with headers
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
        };

        const response = await axios.get<Preschool[]>(BASE_URL, config);
        return response.data;
    } catch (error) {
        throw error;
    }
}