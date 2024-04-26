import { StyleSheet } from 'react-native';

import { Text, View } from '../../../src/shared/ui/slave/Themed';
import {useLocalSearchParams, useRouter} from "expo-router";
import {Person, PersonReposityory} from "../../../src/entities/person/model";
import {useEffect, useState} from "react";
import {PersonEditScreen} from '../../../src/screens/PersonEdit'
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function PersonEdit() {
    const {slug} = useLocalSearchParams()

    const [person, setPerson] = useState<Person | null | undefined>(null);
    useEffect(() => {
        const fetch = async () =>await PersonReposityory.getPersonById(slug as string).then(setPerson).then(console.log)
        fetch()
    }, [slug])
    return (
        <View style={styles.container}>
            <PersonEditScreen person={person} />
        </View>
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
