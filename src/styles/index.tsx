import {BORDER, RADIUS} from "@/theme/border";
import {SPACING} from "@/theme/spacing";
import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    baseLayer: {
        flex: 1,
    },
    body: {
        paddingHorizontal: SPACING[3],
    },
    headList: {
        paddingTop: SPACING[3],
    },
    informationText: {
        textAlign: "center",
        marginTop: SPACING[5],
    },
    masonryCard: {
        paddingHorizontal: SPACING[3],
        paddingVertical: SPACING[2],
        marginHorizontal: SPACING[3],
        marginVertical: SPACING[2],
        justifyContent: "flex-end",
        alignItems: "center",
        borderRadius: RADIUS[5],
        borderWidth: BORDER[1],
        overflow: "hidden",
    },
});
