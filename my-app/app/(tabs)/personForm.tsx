import { StyleSheet } from 'react-native';

import {PersonalFormaScreen} from 'screens/PersonalFormaScreen';
import { Text, View } from 'shared/ui/Themed';

export default function PersonForm() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Person forma</Text>
            <PersonalFormaScreen />
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
