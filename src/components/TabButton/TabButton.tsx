import type {TabTriggerSlotProps} from "expo-router/ui";
import {forwardRef, type Ref} from "react";
import {Pressable, type View} from "react-native";
import {Icon, type IconProps} from "@/components/Icon/Icon";
import {theme} from "@/theme/colors";
import {FONT_SIZE} from "@/theme/fonts";
import {Text} from "../Text/Text";
import {styles} from "./TabButton.styles";

export type TabButtonProps = TabTriggerSlotProps & {
    icon: IconProps["name"];
};

export const TabButton = forwardRef(
    ({icon, children, isFocused, ...props}: TabButtonProps, ref: Ref<View>) => {
        const localRef = ref;
        const {lightness, text, background: backgroundColor, accent} = theme();
        return (
            <Pressable
                ref={localRef}
                {...props}
                style={[
                    styles.container,
                    {
                        backgroundColor: isFocused ? accent : backgroundColor,
                    },
                ]}
            >
                <Icon
                    name={icon}
                    color={isFocused ? lightness : text}
                    size={FONT_SIZE[4]}
                />
                <Text
                    type="label"
                    style={{color: isFocused ? lightness : text}}
                >
                    {children}
                </Text>
            </Pressable>
        );
    }
);
