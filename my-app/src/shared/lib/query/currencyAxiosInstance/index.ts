import axios from "axios";

export const currentAxiosInstance = axios.create({
    baseURL: `https://api.currencyapi.com/v3/latest?apikey=${process.env.EXPO_PUBLIC_CURRENCY_API_KEY}`,
})
