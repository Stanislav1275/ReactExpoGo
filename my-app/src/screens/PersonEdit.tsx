import {Text, View} from 'shared/ui/Themed'
import {Person, PersonReposityory} from "../entities/person/model";
import {tw} from "react-native-tailwindcss";
import {SEX} from "../shared/models/person";
import {Button, StyleSheet} from "react-native";
import {useEffect, useState} from "react";
import {getRandomColor} from "../shared/lib";
import {useRouter} from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const PersonEditScreen = ({person}:{person:Person | null | undefined}) => {
    const {sex, uid, name, age, attachment} = person??{};
    const [color, setColor] = useState<string | undefined | null>(attachment)
    const router = useRouter()
    useEffect(() => {
        setColor(attachment)
    }, [attachment])

    return (
        <View style={tw.wFull}>
            <View  style={[tw.flexRow, tw.minHScreen, styles.container, tw._mB70]}>
                <View style={[tw.bgBlack, styles.img, tw.mR10, {backgroundColor: color??'red'}]}>

                </View>
                <View style={[tw.flex1, tw.flexCol, tw.flex, tw.justifyBetween, tw.border4, styles.itemContent]}>
                    <View style={[tw.flex, tw.flexRow]}>
                        <Text>Имя:</Text>
                        <Text>{name}</Text>
                    </View>
                    <View style={[tw.flex, tw.flexRow]}>
                        <Text>Возраст:</Text>
                        <Text>{age}</Text>
                    </View>
                    <View style={[tw.flex, tw.flexRow]}>
                        <Text>Пол:</Text>
                        <Text>{sex === SEX.FEMALE ? 'женский' : 'мужской'}</Text>
                    </View>
                </View>


            </View>
            <Button onPress={() => setColor(() =>getRandomColor())} title={'Сменить фон'}/>
            <Button onPress={async () => {
                if(uid) {
                    await PersonReposityory.setPerson(uid, {attachment: color})
                    router.push('/(tabs)/person/')
                }
            }} title={'Отправить'}/>

        </View>

    )
}
const styles = StyleSheet.create({
    container :{
        overflow:'scroll',
        marginBottom:10,
    },
    img:{
        backgroundColor:'red',
        width:100,
        height:100
    },
    itemContent:{
        borderWidth:1,
        borderColor:'white'
    },
    scroll:{
    }
})

