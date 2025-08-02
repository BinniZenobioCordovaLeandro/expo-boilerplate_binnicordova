import {StyleSheet} from "react-native";
import {SPACING} from "@/theme/spacing";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "column",
        gap: SPACING[1],
        padding: SPACING[2],
    },
});
