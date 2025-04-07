import {SPACING} from "@/theme/spacing";
import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        padding: SPACING[4],
    },
    title: {
        flex: 1,
        textAlign: "left",
        overflow: "hidden",
        paddingHorizontal: SPACING[2],
    },
});
