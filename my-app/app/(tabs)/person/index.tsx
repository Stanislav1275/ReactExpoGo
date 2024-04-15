import { StyleSheet } from 'react-native';

import {  View } from 'shared/ui/Themed';
import {Person, PersonReposityory} from "entities/person/model";
import {Suspense, useEffect, useState} from "react";
import {PersonsListScreen} from "screens/PersonsList";
import LoadingView from "@expo/metro-runtime/src/LoadingView";
import DevLoadingView from "expo/build/environment/DevLoadingView";
import {useFocusEffect} from "expo-router";
export default function PersonsList() {
    const [persons, setPersons] = useState<Person[]>([]);
    useFocusEffect(() => {
        const fetch = async () =>await PersonReposityory.getPersons_SAFE().then(setPersons)
        fetch()
    })
    return (
        <Suspense fallback={'laoding'}>
            <PersonsListScreen persons={persons} />
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
