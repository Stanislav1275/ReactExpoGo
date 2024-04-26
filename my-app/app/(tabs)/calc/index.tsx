import { StyleSheet } from 'react-native';

import {Person, PersonReposityory} from "entities/person/model";
import {Suspense, useEffect, useState} from "react";

import {useFocusEffect} from "expo-router";
import CalcScreen from "screens/CalcScreen";
export default function Calc() {
    const [persons, setPersons] = useState<Person[]>([]);
    useFocusEffect(() => {
        const fetch = async () =>await PersonReposityory.getPersons_SAFE().then(setPersons)
        fetch()
    })
    return (
        <Suspense fallback={'laoding'}>
            <CalcScreen />
        </Suspense>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
