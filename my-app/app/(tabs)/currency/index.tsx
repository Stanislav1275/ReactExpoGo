import { StyleSheet } from 'react-native';

import {Suspense} from "react";

import {CurrencyScreen} from "screens/CurrencyScreen";
export default function Calc() {
    return (
        <Suspense fallback={'laoding'}>
            <CurrencyScreen />
        </Suspense>
    );
}

