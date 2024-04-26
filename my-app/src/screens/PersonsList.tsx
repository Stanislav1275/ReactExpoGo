import {Person} from "entities/person/model";
import {View, Text, useThemeColor} from "../shared/ui/slave/Themed";
import {tw} from "react-native-tailwindcss";
import {SEX} from "../shared/models/person";
import {Suspense} from "react";
import {Styles} from "@expo/config-plugins/build/android";
import {Animated, StyleSheet, TouchableOpacity} from "react-native";
import ScrollView = Animated.ScrollView;
import {useColorScheme} from "../shared/lib/colorSheme/useColorScheme.web";
import {Link, useRouter} from "expo-router";

export const PersonsListScreen = ({persons}: { persons: Person[] }) => {
    const router = useRouter()
    return (<ScrollView style={[tw.flexCol, tw.pX5]}>
            {persons?.map(({uid, age, name, sex, attachment}, index) => {
                return (
                    <TouchableOpacity onPress={() =>router.push(`/(tabs)/person/${uid}`)}>
                        <View key={uid ?? index} style={[tw.flexRow, tw.minHScreen, styles.container, tw._mB70]}>
                            <View style={[tw.bgBlack, styles.img, tw.mR10, {backgroundColor: attachment??'red'}]}>

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
                    </TouchableOpacity>


                )
            })}

    </ScrollView>)

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

