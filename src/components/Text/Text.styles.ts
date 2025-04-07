import {FONT_SIZE, LINE_HEIGHT} from "@/theme/fonts";
import {OPACITY} from "@/theme/opcacity";
import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    default: {
        fontSize: FONT_SIZE[2],
        lineHeight: LINE_HEIGHT[2],
    },
    title: {
        fontSize: FONT_SIZE[4],
        fontWeight: "bold",
        lineHeight: LINE_HEIGHT[4],
    },
    subtitle: {
		fontSize: FONT_SIZE[3],
		fontWeight: "bold",
	},
	link: {
		fontSize: FONT_SIZE[2],
        textDecorationLine: "underline",
	},
    caption: {
        fontSize: FONT_SIZE[2],
        opacity: OPACITY[1],
    },
    error: {
        fontSize: FONT_SIZE[2],
        lineHeight: LINE_HEIGHT[2],
    },
    label: {
        fontSize: FONT_SIZE[2],
        lineHeight: LINE_HEIGHT[2],
    },
});
