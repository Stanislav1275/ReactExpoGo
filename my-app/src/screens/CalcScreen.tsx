import React, {useEffect} from 'react';
import { StyleSheet } from 'react-native';

import {Calculator} from "../shared/ui/master/CalcV2/CalcV2";
import {useQuery} from "react-query";
import axios from "axios";


export default function CalcScreen() {
    const {data, isError, isLoading} = useQuery({queryKey:['currency'], queryFn:() => axios.get('https://api.currencyapi.com/v3/latest?apikey=cur_live_Tv4dBEB64nhclRy3GecfAWU2f8pQSnFs2IGZzRCm').then(data => data.data)})
    useEffect(() => {
        console.log(data)
    }, [data])
    return (
        <Calculator/>
    );
}

const styles = StyleSheet.create({
    getStartedContainer: {
        alignItems: 'center',
        marginHorizontal: 50,
    },
    homeScreenFilename: {
        marginVertical: 7,
    },
    codeHighlightContainer: {
        borderRadius: 3,
        paddingHorizontal: 4,
    },
    getStartedText: {
        fontSize: 17,
        lineHeight: 24,
        textAlign: 'center',
    },
    helpContainer: {
        marginTop: 15,
        marginHorizontal: 20,
        alignItems: 'center',
    },
    helpLink: {
        paddingVertical: 15,
    },
    helpLinkText: {
        textAlign: 'center',
    },
});
