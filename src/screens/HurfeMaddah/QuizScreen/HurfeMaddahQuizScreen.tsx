import React from "react";
import { View, StyleSheet, ScrollView, Touchable, TouchableOpacity } from "react-native";
import { maddQuizData, MaddType } from "../../../data/madd/maddQuizData";
import AppText from "../../../components/AppText";
import QuizRow from "./QuizRow";
import { useAppTheme } from "../../../theme/ThemeContext";

type QuizStateItem = {
    id: string;
    text: string;
    correct: MaddType[];
    user: {
        selected: MaddType[];
        isSubmitted: boolean;
    };
};

const HurfeMaddahQuizScreen = () => {
    const { theme } = useAppTheme();
    const [data, setData] = React.useState<QuizStateItem[]>(
        maddQuizData.map((item) => ({
            ...item,
            user: { selected: [], isSubmitted: false },
        }))
    );

    const handleSelect = (id: string, type: MaddType) => {
        setData((prev) =>
            prev.map((item) => {
                if (item.id !== id) return item;

                // 🛑 Check if row should be disabled (Correct or Wrong)
                const hasWrong = item.user.selected.some((v) => !item.correct.includes(v));
                const allFound = item.correct.every((v) => item.user.selected.includes(v)) &&
                    item.user.selected.length === item.correct.length;

                if (hasWrong || allFound) return item; // Do nothing if already "Locked"

                let selected = [...item.user.selected];
                if (selected.includes(type)) {
                    selected = selected.filter((t) => t !== type);
                } else {
                    selected.push(type);
                }

                return {
                    ...item,
                    user: { ...item.user, selected, isSubmitted: true },
                };
            })
        );
    };

    const resetQuiz = () => {
        setData(maddQuizData.map((item) => ({
            ...item,
            user: { selected: [], isSubmitted: false },
        })));
    };

    const score = data.filter(
        (item) =>
            item.user.isSubmitted &&
            item.correct.sort().join() === item.user.selected.sort().join()
    ).length;

    return (
        <View style={styles.container}>
            {/* 1. Scrollable Area */}
            <ScrollView
                style={styles.scrollArea}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <AppText
                    variant="heading"
                    lang="ur"
                    size={32}
                    align="center"
                    style={{ marginVertical: 20, paddingHorizontal: 20 }}
                    color={theme.blue}
                >
                    حرف مد کو مثالوں میں تلاش کرو اور اس کے خانے میں نشان لگاؤ
                </AppText>
                {data.map((item, index) => (
                    <QuizRow key={item.id} item={item} index={index} onSelect={handleSelect} />
                ))}
            </ScrollView>

            {/* 2. Fixed Sticky Footer */}
            <View style={styles.scoreBox}>
                <View style={styles.progressTextGroup}>
                    <AppText variant="heading" size={22}>
                        🎯 {score} / {data.length}
                    </AppText>
                    <AppText size={10} color="#9CA3AF" weight="bold" style={{ letterSpacing: 1 }}>
                        YOUR PROGRESS
                    </AppText>
                </View>

                <TouchableOpacity
                    onPress={resetQuiz}
                    style={styles.resetBtn}
                    activeOpacity={0.7}
                >
                    <AppText size={14} color="#EF5350" weight="bold">Reset All</AppText>
                </TouchableOpacity>
            </View>
        </View>
    );
};
export default HurfeMaddahQuizScreen;
// styles in HurfeMaddahQuizScreen.tsx
const styles = StyleSheet.create({


    container: {
        flex: 1,               // 👈 CRITICAL: Makes the screen fill the device height
        backgroundColor: "#F8FAFC",
    },
    scrollArea: {
        flex: 1,               // 👈 CRITICAL: Tells the list to only take available space
    },
    scrollContent: {
        paddingTop: 10,
        paddingBottom: 20,     // Space so the last item isn't touching the footer
    },
    scoreBox: {
        // Layout
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",

        // Visuals
        paddingVertical: 20,
        paddingHorizontal: 25,
        backgroundColor: "#fff",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,

        // 👈 This shadow/elevation makes it look "Fixed" over the content
        elevation: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -5 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    // ... keep your resetBtn styles as they were ...


    progressTextGroup: {
        alignItems: 'flex-start',
    },
    resetBtn: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 14,
        backgroundColor: "#FFF5F5",
        borderWidth: 1,
        borderColor: "#FFEBEB",
    }
});