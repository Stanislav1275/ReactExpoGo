import {useMutation, useQuery} from "react-query";
import {currencyClientInstance} from "shared/lib/query/currencyClient";
import {CurrencyResponse} from "../../../../shared/models/currency/types/CurrencyResponse";
import AsyncStorage from "@react-native-async-storage/async-storage";
export type LatestCovertResponse = {
    meta: {
        last_updated_at:string
    },
    data : Record<string, {code:string, value:number}>
}
export type LatestConverRequest = {
    base_currency: string,
    currencies:string[]
}
export const useLatestCurrencyQuery = () => {
    return useMutation<LatestCovertResponse, unknown, LatestConverRequest>({mutationFn:(data) => currencyClientInstance.latest(data)})
}
export const useLatestCurrencyQueryCached = () => {
    return useQuery<LatestCovertResponse>({queryKey:'currencyLatest', staleTime:Infinity, cacheTime:Infinity, queryFn: async (data) => {
        try{
            const localJson = await AsyncStorage.getItem(`currencyLatest_${new Date().getDay().toLocaleString()}`);
            if(!localJson) throw new Error("No data available");
            const local = JSON.parse(localJson) as LatestCovertResponse;
            //@ts-ignore
            if(new Date(local?.meta).getTime() - new Date().getTime() >= 24*60*60*1000 ) throw new Error("Latest converged data");
            return local as LatestCovertResponse;
        }catch(error){
            const latest = currencyClientInstance.latest();
            AsyncStorage.setItem(`currencyLatest_${new Date().getDay().toLocaleString()}`, JSON.stringify(latest));
            return latest as LatestCovertResponse
        }
        }})
}
