import {RADIUS} from "@/theme/border";
import {FONT_FAMILY, FONT_SIZE} from "@/theme/fonts";
import {SPACING} from "@/theme/spacing";
import {StyleSheet} from "react-native";

const BUTTON_HEIGHT = 48;

export const styles = StyleSheet.create({
    container: {
        width: "100%",
        paddingHorizontal: SPACING[9],
        paddingVertical: SPACING[2],
        alignSelf: "flex-start",
        borderRadius: RADIUS[5],
        height: BUTTON_HEIGHT,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        fontSize: FONT_SIZE[2],
        fontFamily: FONT_FAMILY.LATO_BOLD,
    },
    disabled: {
        opacity: 0.5,
    },
});
