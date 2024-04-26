// @ts-ignore
import currencyapi from '@everapi/currencyapi-js'

export const currencyClientInstance = new currencyapi(process.env.EXPO_PUBLIC_CURRENCY_API_KEY)
