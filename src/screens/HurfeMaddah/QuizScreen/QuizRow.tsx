import React from "react";
import { View, StyleSheet } from "react-native";

import OptionBox from "./OptionBox";
import { MADD_OPTIONS, MaddType } from "../../../data/madd/maddQuizData";
import AppText from "../../../components/AppText";



type Props = {
    item: any;
    onSelect: (id: string, type: MaddType) => void;
    index: number;
};

const LABELS = {
    alif: "ا",
    waw: "و",
    yaa: "ي",
};


const QuizRow = ({ item, onSelect, index }: Props) => {
    const totalCorrect = item.correct.length;
    const selectedCount = item.user.selected.length;

    const selected = item.user.selected;
    const correct = item.correct;

    // ❗ Check if any wrong is selected
    const hasWrong = selected.some((v: MaddType) => !correct.includes(v));

    // ✅ Count correct selections
    const correctSelected = selected.filter((v: MaddType) =>
        correct.includes(v)
    ).length;



    let status: "correct" | "partial" | "wrong" | "none" = "none";

    if (item.user.isSubmitted) {
        if (hasWrong) {
            status = "wrong"; // ❌ priority 1
        } else if (correctSelected === totalCorrect && selected.length === totalCorrect) {
            status = "correct"; // ✅ all correct
        } else if (correctSelected > 0) {
            status = "partial"; // ⚠️ only correct but incomplete
        } else {
            status = "none";
        }
    }
    return (
        <View style={[styles.row, {
            borderColor: item.user.isSubmitted ? "#E0E7E5" : "#EEF2F1",
            backgroundColor:
                status === "correct"
                    ? "#F1F8F4"
                    : status === "partial"
                        ? "#FFF8E1"
                        : status === "wrong"
                            ? "#FFEBEE"
                            : index % 2 === 0
                                ? "#FFFFFF"
                                : "#FAFCFB",
        }]}>
            {/* Word */}
            <View style={styles.wordContainer}>
                <AppText lang="ar" size={28} variant="heading">
                    {item.text}
                </AppText>
            </View>

            {/* Options */}
            <View style={styles.options}>
                {MADD_OPTIONS.map((type: MaddType) => {
                    const selected = item.user.selected.includes(type);
                    const isCorrect = item.correct.includes(type);

                    return (
                        <OptionBox
                            key={type}
                            label={LABELS[type]}
                            selected={selected}
                            isCorrect={isCorrect}
                            showResult={item.user.isSubmitted}
                            onPress={() => onSelect(item.id, type)}
                        />


                    );
                })}
            </View>
            <View style={styles.statusIcon}>
                {status === "correct" && <AppText style={styles.correct}>✔</AppText>}
                {status === "partial" && <AppText style={styles.partial}>●</AppText>}
                {status === "wrong" && <AppText style={styles.wrong}>✖</AppText>}
            </View>
        </View>
    );
};

export default QuizRow;

const styles = StyleSheet.create({
    row: {
        flexDirection: "row-reverse", // 🔥 Arabic layout
        alignItems: "center",
        justifyContent: "space-between",

        marginHorizontal: 16,
        marginBottom: 14,

        paddingVertical: 14,
        paddingHorizontal: 16,

        backgroundColor: "#fff",
        borderRadius: 18,

        elevation: 3,
        borderWidth: 1,
        borderColor: "#EEF2F1",
    },

    wordContainer: {
        flex: 1,
        alignItems: "flex-end",
        marginLeft: 12,
    },
    statusIcon: {
        width: 30,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 8,
    },

    correct: {
        color: "#2E7D32",
        fontSize: 18,
    },

    partial: {
        color: "#F9A825",
        fontSize: 18,
    },

    wrong: {
        color: "#C62828",
        fontSize: 18,
    },

    options: {
        flexDirection: "row",
        gap: 10, // 🔥 spacing between boxes (RN 0.71+)
    },
});