import {theme} from "@/theme/colors";
import React from "react";
import {
    type ButtonProps as RNButtonProps,
    Text,
    TouchableOpacity,
} from "react-native";
import {styles} from "./Button.styles";

export type ButtonProps = RNButtonProps;

export const Button = ({title, onPress, disabled, ...props}: ButtonProps) => {
    const {background: color, accent: backgroundColor} = theme();
    return (
        <TouchableOpacity
            {...props}
            style={[
                styles.container,
                {backgroundColor},
                disabled && styles.disabled,
            ]}
            onPress={disabled ? undefined : onPress}
            disabled={disabled}
        >
            <Text style={[styles.text, {color}]}>{title}</Text>
        </TouchableOpacity>
    );
};
