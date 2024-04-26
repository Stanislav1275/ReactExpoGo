import axios from "axios";

export const currentAxiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api',
})
