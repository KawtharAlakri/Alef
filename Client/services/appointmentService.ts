import { currentPreschool, currentToken, currentUserId } from './authService';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

const BASE_URL = 'http://localhost:3000/appointments'; // Replace with your backend URL

export async function getAvailabbleSlots(date:string): Promise<any> {
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

        const response = await axios.get(`${BASE_URL}/availableSlots?preschool=${preschool}&date=${date}`, config);
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        throw axiosError;
    }
}

export async function createAppointment(date:string, time:string, application_id:number) {
    var token; var preschool; var userId;
    await currentToken().then((returnedTOken) => { token = returnedTOken; })
    await currentPreschool().then((preschoolId) => { preschool = preschoolId; })
    await currentUserId().then((user_id) => { userId = user_id; })
  
    try {
      // Set up the request config with headers
      const config: AxiosRequestConfig = {
        headers: {
          Authorization: `Bearer ${token}` // Include the token in the Authorization header
        },
      };
      
      const response = await axios.post(`${BASE_URL}`, {
        date,
        time,
        application_id,
        preschool_id:preschool
      }, config);
      return response;
    } catch (error) {
       // Type assertion for error variable
       const axiosError = error as AxiosError;
       throw axiosError;
    }
  }
// export async function getAppointments(): Promise<any> {
//     try {
//         var token; var preschool;
//         await currentToken().then((returnedTOken) => { token = returnedTOken; })
//         await currentPreschool().then((preschoolId) => { preschool = preschoolId; })
//         // Set up the request config with headers
//         const config: AxiosRequestConfig = {
//             headers: {
//                 Authorization: `Bearer ${token}`, // Include the token in the Authorization header
//             },
//         };

//         const response = await axios.get(`${BASE_URL}?preschool_id=${preschool}`, config);
//         return response;
//     } catch (error) {
//         throw error;
//     }
// }