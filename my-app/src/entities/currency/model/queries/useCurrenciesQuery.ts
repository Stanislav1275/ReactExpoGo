import {useQuery} from "react-query";
import {currencyClientInstance} from "shared/lib/query/currencyClient";
import {CurrencyResponse} from "../../../../shared/models/currency/types/CurrencyResponse";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const useCurrenciesQuery = () => {
    return useQuery({
        queryKey: 'currencies',
        staleTime:Infinity,
        cacheTime:Infinity,
        queryFn:async () => {
            try{
                const localJson  =await AsyncStorage.getItem("currencies");
                if(!localJson)throw new Error("has no localData currencies")
                const local = JSON.parse(localJson);
                return local?.data as CurrencyResponse;

            }catch(e){
                const currencies = await currencyClientInstance.currencies();
                await AsyncStorage.setItem("currencies", JSON.stringify(currencies));
                return currencies?.data as CurrencyResponse;
            }
        }
    })
}
