import {useCurrenciesQuery} from "../entities/currency/model/queries/useCurrenciesQuery";
import {Button, FlatList} from "react-native";
import {Currency, CurrencyResponse} from "../shared/models/currency/types/CurrencyResponse";
import {Text, View} from 'shared/ui/slave/Themed'
import {useForm} from "react-hook-form";
import MultiSelect from "react-native-multiple-select";
import {CSSProperties, useEffect, useLayoutEffect, useMemo, useRef} from "react";
import {LatestCovertResponse, useLatestCurrencyQuery} from "../entities/currency/model/queries/useLatestCurrencyQuery";
import {tw} from "react-native-tailwindcss";

type CurrencyFormType = {
    currencyBase: Currency['code'][],
    currencyTo: Currency['code'][]
    result: Record<string, {code:string, value:number}> | null
    currencies: Currency[]
}
export const CurrencyWidget = () => {
    const {data: currencies, isLoading, isError} = useCurrenciesQuery();
    const array = !currencies ? [] : Object.values(currencies)

    const methods = useForm<CurrencyFormType>(
        {
            defaultValues: {
                currencies: array,
                currencyBase: ['USD'],
                currencyTo: ['RUB']
            }
        }
    );
    const {setValue, watch, handleSubmit, reset} = methods;
    const multyController = useRef<{ base: MultiSelect | null, to: MultiSelect | null }>({base: null, to: null});
    useLayoutEffect(() => {
        reset()
    }, [currencies]);
    const {isLoading: isConvertLoading, isError: isConvertError, mutateAsync, isSuccess} = useLatestCurrencyQuery()
    const onConvertSubmit = handleSubmit(async ({currencyTo, currencyBase}) => {
        await mutateAsync({base_currency:currencyBase[0], currencies:currencyTo}).then((result) => {setValue('result', result.data)})
    })
    if (isLoading && isError) {
        console.log(isLoading)
        return null;
    }
    const handleInvertBase = () => {
        setValue('result', null)
        const base = watch('currencyBase')
        const currenciesTo = watch('currencyTo')
        setValue('currencyTo', base)
        setValue('currencyBase', [currenciesTo[0]])
    }
    return (
        <View style={[tw.flexCol, {gap: 10}]}>
            <Text>
                Базовая валюта
            </Text>
            <MultiSelect
                hideTags
                selectedText={watch('currencyBase')[0]}
                ref={control => {
                    if (!multyController.current.base) {
                        //@ts-ignore
                        multyController.current.base = control;
                    }
                }}
                displayKey='code'
                selectedItems={watch('currencyBase')}
                uniqueKey='code'
                items={array.filter(v=>v.code !== 'ALL')}
                onSelectedItemsChange={(a) => {
                    if (a) {
                        setValue('currencyBase', a.slice(-1))
                    }
                }}/>
            <Button title='Поменять местами' onPress={handleInvertBase}/>
            <Text>
                Валюты, в которые надо конвертировать
            </Text>
            <MultiSelect
                selectedText={watch('currencyTo').toString()}
                hideDropdown={false}
                ref={control => {
                    if (!multyController.current.to) {
                        //@ts-ignore
                        multyController.current.to = control;
                    }
                }}
                displayKey='code'
                selectedItems={watch('currencyTo')}
                uniqueKey='code'
                // hideTags
                items={array}
                onSelectedItemsChange={(a) => {
                    if (a) {
                        setValue('currencyTo', a)
                    }
                }}/>

            {watch('result') &&
               <FlatList <{code:string, value:number}> contentContainerStyle={[tw.borderBlue600, tw.pX7]}  data={Object.values(watch('result'))} renderItem={({item, index}) => (
                   <View style={[tw.flexRow, tw.pX7, styles.row]}>
                        <Text style={[tw.mR10, {borderRightWidth:1, borderRightColor:'gray'}]}>{item.code}</Text>
                        <Text>{`${item.value.toFixed(4)} ${currencies?.[watch('currencyBase')[0]].symbol}`}</Text>
                    </View>
                )}/>


            }
            <Button disabled={isConvertLoading && isSuccess} title={"конверитировать"} onPress={onConvertSubmit}/>
        </View>
    )
}
const styles = {
    row: {
        borderWidth: 1,
        borderColor: 'gray',
    }
} satisfies Record<string, CSSProperties>
