import {StyleSheet} from "react-native";
import {initialWindowMetrics} from "react-native-safe-area-context";
import {BORDER, RADIUS} from "@/theme/border";
import {SPACING} from "@/theme/spacing";

const insets = initialWindowMetrics?.insets ?? {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
};

export const styles = StyleSheet.create({
    safeArea: {
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
    },
    baseLayer: {
        paddingTop: insets.top - SPACING[10],
        flex: 1,
    },
    centerLayer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: SPACING[3],
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
    listItem: {
        paddingHorizontal: SPACING[3],
    },
    metaContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: SPACING[2],
    },
});
