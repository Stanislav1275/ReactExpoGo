import {TodoItemPropsType} from "../model/types";
import {View, Text} from "shared/ui/slave/Themed";
import {tw} from "react-native-tailwindcss";

export const TodoItem = (props: TodoItemPropsType) => {
    const {id, created_at, header, tags, text, updated_at} = props;
    return <View style={[tw.p1]}>
        <Text>{text}</Text>
    </View>
}
