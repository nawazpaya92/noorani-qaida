import { StyleSheet } from "react-native";

export const tableRuleStyles = StyleSheet.create({
    container: {

        borderRadius: 16,
        backgroundColor: "#FFFFFF",
        overflow: "hidden",

        borderWidth: 1,
        borderColor: "#E9EFEC",

        shadowColor: "#000",
        shadowOpacity: 0.04,
        shadowRadius: 8,
        elevation: 3,
    },

    // 🔥 Header (unchanged text, better feel)
    headerRow: {
        flexDirection: "row-reverse",
        backgroundColor: "#F4F8F6",
        paddingVertical: 12,
        paddingHorizontal: 6,   // ✅ ADD THIS

    },
    cellWrapper: {
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 4,
    },
    separator: {
        borderLeftWidth: 0.7,
        borderColor: "#80908aff", // 👈 soft, professional color
        alignSelf: "stretch",
    },

    headerText: {
        fontSize: 14,              // 🔽 slightly smaller (important for long text)
        fontWeight: "700",
        textAlign: "center",
        color: "#2E7D32",
        paddingHorizontal: 4,     // 👈 prevents text touching edges
    },

    // 🧩 Row
    row: {
        flexDirection: "row-reverse",
        alignItems: "center",
        paddingVertical: 14,
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 6,   // ✅ ADD THIS

    },

    divider: {
        height: 2,
        backgroundColor: "#EEF2F1",
        marginHorizontal: 8,
    },

    // 🔹 Common cell
    cell: {
        fontSize: 14,  // 🔽 reduced slightly
        textAlign: "center",
        color: "#333",
    },

    // 🔥 Example column (highlighted softly)
    exampleWrapper: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F6F9F7",   // 👈 subtle highlight
        borderRadius: 8,
        paddingVertical: 4,

    },

    exampleText: {
        fontSize: 22,
        fontWeight: "700",
        color: "#1B1B1B",
    },

    // 🟣 Rule text
    ruleText: {
        fontSize: 13,
        textAlign: "right",
        color: "#555",
        lineHeight: 18,
        paddingHorizontal: 6,
    },

    // 🔥 Icon styling (NEW)
    icon: {
        fontSize: 14,   // 🔽 smaller ✔ ✖
        fontWeight: "600",
    },
});