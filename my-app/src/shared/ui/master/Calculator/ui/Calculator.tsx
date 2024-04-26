import {View, Text, TextInputField, TextInputFieldWithLabel} from "../../../slave/Themed";
import {tw} from "react-native-tailwindcss";
import {INPUT_VALIDATION_RULES} from "react-hook-form/dist/constants";
import {
    Dimensions,
    FlatList,
    Platform,
    ScrollView,
    TextInputComponent,
    TouchableHighlight,
    TouchableOpacity
} from "react-native";
import {Controller, useForm} from "react-hook-form";
import {CSSProperties, Reducer, useReducer, useState} from "react";
import Colors from "../../../../constants/Colors";
import {EOperation} from "../model/types";
import {calculatorReducer, initialState, State} from "../model/calcReducer";



const ops = [
    EOperation.numeric1,
    EOperation.numeric2,
    EOperation.numeric3,
    EOperation.plus,
    EOperation.numeric4,
    EOperation.numeric5,
    EOperation.numeric6,
    EOperation.minus,
    EOperation.numeric7,
    EOperation.numeric8,
    EOperation.numeric9,
    EOperation.razdelete,
    EOperation.point,
    EOperation.numeric0,
    EOperation.remove,
    EOperation.multiply,
    EOperation.sqrt,
    EOperation.onex,
    EOperation.invert,
    EOperation.equal,
] satisfies EOperation[]

export const Calculator = () => {
    // const form = useForm<CalculatorFormType>({defaultValues: {result: {resultN: 0, resultS: '0', error: null}}});
    // const {clearErrors, setError, formState, control, reset, watch, handleSubmit, setValue} = form;
    const numColumns = 4; // Количество столбцов
    const gap = 4; // Промежуток между элементами
    const [state, dispath] = useReducer<Reducer<State, EOperation>>(calculatorReducer, initialState)

    const screenWidth = Dimensions.get('window').width;

    const tileWidth = (screenWidth - (numColumns + 1) * gap) / numColumns;
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const onOp = (op:EOperation) => {
        dispath(op)
    }
    const renderItem = ({item, index}: { item: EOperation, index: number }) => (
        <TouchableOpacity
            delayPressOut={0}
            onPressIn={() => {
                onOp(item)
                setActiveIndex(index)
            }}
            onPressOut={() => {
                setActiveIndex(null)
            }}>
            <View style={[styles.plat, index === activeIndex && {...tw.bgBlue200, borderRadius: 100}, {
                width: tileWidth,
                height: tileWidth
            }]}>
                <Text style={[tw.textXl]}>{item}</Text>
            </View>
        </TouchableOpacity>
    );
    return (

        <View style={[tw.flexCol, tw.flex, tw.itemsCenter, tw.justifyCenter]}>
                <View style={[styles.inputResultContainer, tw.wFull, tw.overflowVisible]}>
                    <Text  style={[tw.selfEnd, tw.textXl]}>
                        {`${state.displayValue}`}
                    </Text>
                    <Text  style={[tw.selfEnd, tw.text3xl, {color:'gray'}]}>
                        {`=${state.result}`}
                    </Text>
                </View>

            <View style={[tw.flex, tw.flexRow, tw.itemsCenter, tw.justifyCenter, tw.mAuto]}>
                <FlatList<EOperation>
                    contentContainerStyle={[{gap: gap}, tw.mAuto, tw.itemsCenter, tw.mT5, tw.justifyCenter]}
                    columnWrapperStyle={{gap: gap}}
                    numColumns={numColumns}
                    key={numColumns}
                    data={ops}
                    renderItem={renderItem}/>
            </View>
        </View>
    )
}
const styles = {
    platContainer: {
        display: 'grid',
        gridTemplateColumns: 1,
        gridTemplateRows: 4,
    },
    inputResultContainer: {
        height: 200,
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },
    plat: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        // borderWidth: 1,
        borderColor: 'white'
    },
    activeItem: {
        backgroundColor: 'blue', // Цвет фона при нажатии
    },
} satisfies Record<string, CSSProperties>
