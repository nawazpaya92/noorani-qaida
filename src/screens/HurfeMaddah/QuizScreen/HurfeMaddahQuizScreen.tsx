import React from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import QuizRow from "./QuizRow";
import { maddQuizData, MaddType } from "../../../data/madd/maddQuizData";
import AppText from "../../../components/AppText";

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
    const [data, setData] = React.useState<QuizStateItem[]>(
        maddQuizData.map((item) => ({
            ...item,
            user: {
                selected: [],
                isSubmitted: false,
            },
        }))
    );

    const handleSelect = (id: string, type: MaddType) => {
        setData((prev) =>
            prev.map((item) => {
                if (item.id !== id) return item;

                let selected = [...item.user.selected];

                if (selected.includes(type)) {
                    selected = selected.filter((t) => t !== type);
                } else {
                    selected.push(type);
                }

                return {
                    ...item,
                    user: {
                        ...item.user,
                        selected,
                        isSubmitted: true, // 🔥 instant feedback
                    },
                };
            })
        );
    };

    const score = data.filter(
        (item) =>
            item.user.isSubmitted &&
            item.correct.sort().join() === item.user.selected.sort().join()
    ).length;

    return (
        <View style={styles.container}>
            <ScrollView>
                {data.map((item, index) => (
                    <QuizRow key={item.id} item={item} index={index} onSelect={handleSelect} />
                ))}
            </ScrollView>

            {/* Score */}
            <View style={styles.scoreBox}>
                <AppText variant="heading" size={22}>
                    🎯 {score} / {data.length}
                </AppText>

                <AppText size={14} color="#6B7280">
                    Your Progress
                </AppText>
            </View>
        </View>
    );
};

export default HurfeMaddahQuizScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F7FAF8",
    },
    scoreBox: {
        padding: 16,
        alignItems: "center",
        borderTopWidth: 1,
        borderColor: "#E5E7EB",
        backgroundColor: "#fff",
    },
});