import {Animated, StyleSheet, TouchableWithoutFeedback} from "react-native";
import React from "react";

const layoutStyles = ['margin', 'marginLeft', 'marginRight', 'marginTop', 'marginBottom',]

function ejectLayoutStyles(styles) {
    if (styles) {
        const {...otherStyles} = styles;

    }
}

const ButtonPressAnimation = ({
                                  scale: scaleProp = 0.96,
                                  onPress,
                                  style,
                                  children,
                                  centered = true,
                                  disabled,
                                  ...otherProps
                              }) => {
    const animation = new Animated.Value(0);
    const scale = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [1, scaleProp]
    });

    const onPressIn = () => {
        Animated.spring(animation, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };
    const onPressOut = () => {
        Animated.spring(animation, {
            toValue: 0,
            useNativeDriver: true,
        }).start();
    };

    return (
        <TouchableWithoutFeedback {...otherProps} disabled={!!disabled} onPress={onPress} onPressIn={onPressIn}
                                  onPressOut={onPressOut}>
            <Animated.View style={[centered && styles.flex, style, {transform: [{scale}]}]}>
                {children}
            </Animated.View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    flex: {alignItems: 'center', justifyContent: 'center'},
});

export default ButtonPressAnimation;
