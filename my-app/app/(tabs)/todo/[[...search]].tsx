import { StyleSheet } from 'react-native';

import {Suspense} from "react";

import {TodoScreen} from "../../../src/screens/todo-screen";
import {useLocalSearchParams} from "expo-router";
export default function Todo() {
    const {search} = useLocalSearchParams();
    return (
        <Suspense fallback={'loading'}>
            <TodoScreen />
        </Suspense>
    );
}

