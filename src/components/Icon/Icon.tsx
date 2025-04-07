import {theme} from "@/theme/colors";
import {FONT_SIZE} from "@/theme/fonts";
import {
    MaterialCommunityIcons as MaterialCommunityIconsType,
    createIconSet,
} from "@expo/vector-icons";
import type {ComponentProps} from "react";

const glyphMap = MaterialCommunityIconsType.glyphMap;

const MaterialCommunityIcons = createIconSet(
    glyphMap,
    "fontFamily",
    require("../../../assets/fonts/MaterialCommunityIcons.ttf")
);

export type IconProps = ComponentProps<typeof MaterialCommunityIcons>;

export const Icon = ({name, style, size, onPress, ...props}: IconProps) => {
    const color = theme().text;

    return (
        <MaterialCommunityIcons
            name={name}
            style={[style]}
            size={size ?? FONT_SIZE[3]}
            color={color}
            onPress={onPress}
            testID={name}
            {...props}
        />
    );
};
