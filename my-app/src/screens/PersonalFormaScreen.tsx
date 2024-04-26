import React, {useId} from 'react';
import {StyleSheet, Button} from 'react-native';
import {useForm, Controller, SubmitErrorHandler, SubmitHandler} from 'react-hook-form';
import {View, Text, TextInputFieldWithLabel} from '../shared/ui/slave/Themed';
import {SEX} from "../shared/models/person";
import {PersonReposityory} from "../entities/person/model";
import {RadioButton} from 'react-native-paper';
import {tw} from "react-native-tailwindcss";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {generateRandomId} from "../shared/lib";
import {useRouter} from "expo-router";


type FormValues = {
    name: string;
    age: number;
    sex: SEX
};
export const PersonalFormaScreen = () => {
    const router = useRouter()
    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        await PersonReposityory.pushPerson({...data, uid: generateRandomId()}).then(v => {
            router.push(`person/${v?.[v.length - 1].uid}`);
        });

    };
    const form = useForm<FormValues>({defaultValues: {sex: SEX.MALE}});

    const onError: SubmitErrorHandler<FormValues> = (errors, e) => {
        return console.log(errors)
    };
    const {control, handleSubmit, formState: {errors}, reset} = form;
    return (
        <View style={[tw.flex, tw.flexCol, tw.flex1, tw.wFull, tw.p6, styles.container]}>
            <TextInputFieldWithLabel
                control={control}
                name='name'
                label='Введите имя'
                rules={{required: "Обязательное поле"}}
            />
            <TextInputFieldWithLabel
                control={control}
                name='age'

                label='Введите возраст'
                keyboardType='numeric'
                rules={{
                    required: "Обязательное поле",
                    max: {value: 200, message: "Слишком старый"},
                    min: {value: 1, message: "Вряд ли, мой юный друг"}
                }}/>
            <Controller render={({field: {value, onChange}, fieldState, formState,}) => (
                <View style={[tw.flex, tw.flexCol]}>
                    <Text>
                        Выберете пол
                    </Text>
                    <RadioButton.Group onValueChange={onChange} value={value}>
                        <View style={[tw.flexRow, tw.itemsCenter]}>
                            <View style={[tw.flexRow, tw.itemsCenter, tw.mR10]}>
                                <RadioButton uncheckedColor='gray' color='blue' value={SEX.MALE}></RadioButton>
                                <Text>муж</Text>
                            </View>
                            <View style={[tw.flexRow, tw.itemsCenter]}>
                                <RadioButton uncheckedColor='gray' color='blue' value={SEX.FEMALE}></RadioButton>
                                <Text>жен</Text>

                            </View>
                        </View>
                    </RadioButton.Group>
                </View>
            )} name='sex' control={control}/>
            <Button title="Отправить" onPress={handleSubmit(onSubmit)}/>
            <Button title="Сбросить" onPress={(e) => {
                e.persist()
                //@ts-ignore
                reset(e)
            }}/>
        </View>
    );
}

const styles = StyleSheet.create({
    label: {
        color: 'white',
        margin: 20,
        marginLeft: 0,
    },
    button: {
        marginTop: 40,
        color: 'white',
        height: 40,
        backgroundColor: '#ec5990',
        borderRadius: 4,
    },
    container: {
        gap: 8,
    },
    input: {
        backgroundColor: 'white',
        borderColor: 'none',
        height: 40,
        padding: 10,
        borderRadius: 4,
    },
});
