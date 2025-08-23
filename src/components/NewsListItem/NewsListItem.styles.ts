import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        marginVertical: 6,
        marginHorizontal: 16,
        padding: 16,
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 2,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
    },
    title: {
        fontSize: 17,
        fontWeight: "600",
        marginBottom: 4,
    },
    comment: {
        fontSize: 15,
        marginBottom: 8,
    },
    metaContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    metaText: {
        fontSize: 13,
    },
    chevronContainer: {
        marginLeft: 12,
        justifyContent: "center",
        alignItems: "center",
    },
});
