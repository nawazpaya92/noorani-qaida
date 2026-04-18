import React from "react";
import { View, StyleSheet } from "react-native";
import OptionBox from "./OptionBox";
import { MADD_OPTIONS, MaddType } from "../../../data/madd/maddQuizData";
import AppText from "../../../components/AppText";

const LABELS = { alif: "ا", waw: "و", yaa: "ي" } as any;
const COLORS = { correct: "#4CAF50", partial: "#FFB300", wrong: "#EF5350" };

const QuizRow = ({ item, onSelect }: any) => {
    const { selected } = item.user;
    const { correct } = item;

    const hasWrong = selected.some((v: any) => !correct.includes(v));
    const allFound = correct.every((v: any) => selected.includes(v)) && selected.length === correct.length;
    const someFound = selected.some((v: any) => correct.includes(v));

    let status: "correct" | "partial" | "wrong" | "none" = "none";
    if (selected.length > 0) {
        if (hasWrong) status = "wrong";
        else if (allFound) status = "correct";
        else if (someFound) status = "partial";
    }

    // 🛑 Disable logic: Lock if Correct or Wrong
    const isLocked = status === "correct" || status === "wrong";

    return (
        <View
            style={[
                styles.row,
                status === "correct" && { borderColor: COLORS.correct, backgroundColor: "#F0F9F1" },
                status === "partial" && { borderColor: COLORS.partial, backgroundColor: "#FFFDE7" },
                status === "wrong" && { borderColor: COLORS.wrong, backgroundColor: "#FFF5F5" },
                isLocked && { opacity: 0.9 } // Visual hint that it's finished
            ]}
            pointerEvents={isLocked ? "none" : "auto"} // 🛑 Native way to disable all touches in the row
        >
            <View style={styles.statusContainer}>
                {status === "correct" && <AppText style={{ color: COLORS.correct }}>✓</AppText>}
                {status === "partial" && <AppText style={{ color: COLORS.partial }}>●</AppText>}
                {status === "wrong" && <AppText style={{ color: COLORS.wrong }}>✕</AppText>}
                {status === "none" && <View style={styles.dot} />}
            </View>

            <View style={styles.optionsContainer}>
                {MADD_OPTIONS.map((type: any) => (
                    <OptionBox
                        key={type}
                        label={LABELS[type]}
                        selected={selected.includes(type)}
                        isCorrect={correct.includes(type)}
                        rowStatus={status}
                        onPress={() => onSelect(item.id, type)}
                        disabled={isLocked} // Pass down to OptionBox
                    />
                ))}
            </View>

            <View style={styles.wordPill}>
                <AppText lang="ar" size={26} style={styles.arabicText}>{item.text}</AppText>
            </View>
        </View>
    );
};
export default QuizRow;
const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#FFF",
        marginHorizontal: 16,
        marginBottom: 10,
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 20,
        borderWidth: 1.5,
        borderColor: "#F1F5F9",
        elevation: 2,
    },
    statusContainer: {
        width: 30, // Fixed width keeps the dots in a straight vertical line
        alignItems: "center",
        justifyContent: "center",
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: "#E2E8F0", // Subtle light gray for unselected rows
    },
    optionsContainer: {
        flexDirection: "row-reverse", // Order: A, W, Y
        gap: 8,

        paddingLeft: 10,     // Space between dot and buttons
        paddingRight: 20,    // Hard gap to prevent mixing with the word pill
    },
    wordPill: {
        backgroundColor: "#F8FAFC",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
        minWidth: 95, // Ensures the word area feels substantial
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },
    arabicText: {
        color: "#1E293B",
        fontWeight: "600",
    }
});