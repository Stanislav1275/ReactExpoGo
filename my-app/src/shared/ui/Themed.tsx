/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import {KeyboardType, Text as DefaultText, TextInput, TextInputProps, View as DefaultView} from 'react-native';

import Colors from '../constants/Colors';
import {useColorScheme} from 'react-native';
import {Control, Controller, ControllerProps, FieldPath, FieldValue, FieldValues, Path} from "react-hook-form";
import {CSSProperties} from "react";
import {UseControllerProps} from "react-hook-form/dist/types/controller";

type ThemeProps = {
    lightColor?: string;
    darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'] & { error?: boolean };
export type ViewProps = ThemeProps & DefaultView['props'] & { className?: string };

export function useThemeColor(
    props: { light?: string; dark?: string } | undefined,
    colorName: keyof typeof Colors.light & keyof typeof Colors.dark,
) {
    const theme = useColorScheme() ?? 'light';
    const colorFromProps = props?.[theme];

    if (colorFromProps) {
        return colorFromProps;
    } else {
        return Colors[theme][colorName];
    }
}

export function Text(props: TextProps) {
    const {style, lightColor, darkColor, error, ...otherProps} = props;
    const color = useThemeColor({light: lightColor, dark: darkColor}, 'text');

    return <DefaultText style={[{color: !error ? color : 'red'}, style]} {...otherProps} />;
}

export function TextInputField(props: TextInputProps) {
    const {...otherProps} = props;
    const color = useThemeColor(undefined, 'border');

    return <TextInput {...otherProps} style={{borderColor: color, borderWidth: 1, color: color}}/>

}

type TextInputFieldWithLabelProps<Fields extends FieldValues> = {
    label?: string,
    name: FieldPath<Fields>,
    control: Control<Fields>
    rules?: ControllerProps<Fields, Path<Fields>>['rules'],
    placeholder?: string,
    textContentType?: string
    defaultValue?: string,
    keyboardType?: KeyboardType
}

export function TextInputFieldWithLabel<Fields extends FieldValues>(props: TextInputFieldWithLabelProps<Fields>) {
    const {
        name,
        control,
        label,
        rules,
        placeholder,
        defaultValue,
        textContentType,
        keyboardType,
    } = props;
    const color = useThemeColor(undefined, 'border');

    return <Controller<FieldValues>
        rules={rules}
        name={name}
        control={control}
        render={({field: {value, onBlur, onChange}, fieldState, formState: {errors}}) => {
            const showError = errors?.[name]?.type !== 'validate';
            return (
                <View style={styles.flexRaw}>
                    <Text>
                        {label}
                    </Text>
                    <View style={styles.flexCol}>
                        <TextInput
                            textContentType={textContentType ?? ''}
                            keyboardType={keyboardType}
                            placeholder={placeholder}
                            defaultValue={defaultValue}
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            style={{
                                borderColor: showError && errors?.[name] ? 'red' : color,
                                borderWidth: 1,
                                color: color,
                            }}/>
                        {showError && errors?.[name]?.message && <Text error>
                            {errors?.[name]?.message || `Ошибка поля ${name}`}
                        </Text>}
                    </View>

                </View>
            )
        }}/>

}

export function View(props: ViewProps) {
    const {style, lightColor, darkColor, ...otherProps} = props;
    const backgroundColor = useThemeColor({light: lightColor, dark: darkColor}, 'background');

    return <DefaultView style={[{backgroundColor}, style]} {...otherProps} />;
}

const styles = {
    flexRaw: {
        display: "flex",
        flexDirection: 'row',
        gap: 10
    },
    flexCol: {
        flex: 1,
        display: "flex",
        flexDirection: 'column',
        gap: 10

    }
} satisfies Record<string, CSSProperties>
