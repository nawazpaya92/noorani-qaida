import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import Screen from "../components/Screen";
import AppHeader from "../components/AppHeader";
import AppText from "../components/AppText";
import TimedArabicWordTest from "./ArabicTimedWordTest";
import { playArabicLetter } from "../utils/audio";

export default function TimedHighlightTest() {
    const [playId, setPlayId] = React.useState(0);

    const text = "آٹھواں مجموعہ (ک م ہ)";
    const letters = Array.from(text);
    const timings = letters.map((_, i) => i * 120);

    const audio = require("../assets/audio/letters/alif.m4a");

    const handlePlay = async () => {
        setPlayId((p) => p + 1);
        await playArabicLetter(audio);
    };

    return (
        <Screen>
            <AppHeader title="Timed Highlight Test" />

            <View style={styles.container}>
                <TimedArabicWordTest
                    text={text}
                    timings={timings}
                    playId={playId}
                />

                <Pressable style={styles.button} onPress={handlePlay}>
                    <AppText weight="bold" size={16} color="#fff">
                        Play Audio
                    </AppText>
                </Pressable>
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 24,
    },

    button: {
        backgroundColor: "#2563EB",
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 12,
    },
});
