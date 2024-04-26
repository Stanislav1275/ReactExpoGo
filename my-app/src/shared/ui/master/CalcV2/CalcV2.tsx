import React, {Reducer, useEffect, useReducer, useState} from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import {View, Text} from 'shared/ui/slave/Themed'
import {Action, initialState, reducer, State} from "./model/reducer";
import {EOperation} from "../Calculator/model/types";
export const Calculator = () => {
    const [state, dispatch] = useReducer<Reducer<State, Action>>(reducer, initialState);

    const handleDigitClick = (digit:'0'|'1'|"2"|'3'|'4'|'5'|'6'|'7'|'8'|"9") => {
        dispatch({ type: 'digit', payload: digit });
    };

    const handleDecimalClick = () => {
        dispatch({ type: 'decimal' });
    };

    const handleOperatorClick = (nextOperator:EOperation) => {
        dispatch({ type: 'operator', payload: nextOperator });
    };

    const handleEqualClick = () => {
        dispatch({ type: 'calculate' });
    };

    const handleClearClick = () => {
        dispatch({type:'clear'});
    };

    const handleInvertClick = () => {
        dispatch({ type: 'invert' });
    };
    return (
        <View style={styles.container}>
            <Text style={styles.history}>{state.history}</Text>
            <Text style={styles.display}>{state.display}</Text>
            <View style={styles.buttons}>
                <TouchableOpacity style={styles.button} onPress={() => handleClearClick()}>
                    <Text>C</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => handleInvertClick()}>
                    <Text>±</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => handleOperatorClick('√')}>
                    <Text>√</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => handleOperatorClick('1/x')}>
                    <Text>1/x</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => handleDigitClick('7')}>
                    <Text>7</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => handleDigitClick('8')}>
                    <Text>8</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => handleDigitClick('9')}>
                    <Text>9</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => handleOperatorClick('÷')}>
                    <Text>÷</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => handleDigitClick('4')}>
                    <Text>4</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => handleDigitClick('5')}>
                    <Text>5</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => handleDigitClick('6')}>
                    <Text>6</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => handleOperatorClick('×')}>
                    <Text>×</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => handleDigitClick('1')}>
                    <Text>1</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => handleDigitClick('2')}>
                    <Text>2</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => handleDigitClick('3')}>
                    <Text>3</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => handleOperatorClick('-')}>
                    <Text>-</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => handleDigitClick('0')}>
                    <Text>0</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => handleDecimalClick()}>
                    <Text>.</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => handleEqualClick()}>
                    <Text>=</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => handleOperatorClick('+')}>
                    <Text>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    history: {
        fontSize: 24,
        marginRight: 20,
    },
    display: {
        fontSize: 40,
        marginBottom: 20,
        marginRight: 20,
    },
    buttons: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ddd',
        width: 80,
        height: 80,
        margin: 5,
    },
});

