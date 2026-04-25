import React from "react";
import { Animated, Platform, StyleSheet, Text } from "react-native";
import { useTimedHighlight } from "../../hooks/useTimedHighlight";

export default function ArabicText({
    size = 24,
    color = "#000",
    style,
    id,
    text,
    timings,
    activeId,
    isPlaying,
    isActive,
}: any) {
    const scale = React.useRef(new Animated.Value(1)).current;
    const textFitProps = {
        numberOfLines: 1 as const,
        ellipsizeMode: "clip" as const,
        adjustsFontSizeToFit: true,
        minimumFontScale: 0.58,
    };

    React.useEffect(() => {
        Animated.spring(scale, {
            toValue: isActive ? 1.4 : 1,
            speed: 15,
            bounciness: 6,
            useNativeDriver: true,
        }).start();
    }, [isActive]);

    // Android → no highlight
    if (Platform.OS === "android") {
        return (
            <Animated.Text
                {...textFitProps}
                style={[
                    styles.word,
                    { fontSize: size, color },
                    style,
                    { transform: [{ scale }] }
                ]}
            >
                {text}
            </Animated.Text>
        );
    }

    const activeIndex = useTimedHighlight(
        activeId === id ? id : null,
        timings,
        isPlaying
    );

    // 🔥 If not active → render normally
    if (activeIndex < 0 || activeId !== id) {
        return (
            <Animated.Text
                {...textFitProps}
                style={[
                    styles.word,
                    { fontSize: size, color },
                    style,
                    { transform: [{ scale }] }
                ]}
            >
                {text}
            </Animated.Text>
        );
    }

    const before = text.slice(0, activeIndex);
    const active = text.slice(activeIndex, activeIndex + 1);
    const after = text.slice(activeIndex + 1);

    return (
        <Animated.Text
            {...textFitProps}
            style={[
                styles.word,
                { fontSize: size, color },
                style,
                { transform: [{ scale }] }
            ]}
        >
            {before}
            <Text style={styles.highlight}>{active}</Text>
            {after}
        </Animated.Text>
    );

}

const styles = StyleSheet.create({
    word: {
        fontSize: 28, // same as Murakkabat
        textAlign: "center",
        writingDirection: "rtl",
        fontFamily: "Quranic",
        includeFontPadding: false,
        lineHeight: 36,
        width: "100%",
        flexShrink: 1,
    },

    highlight: {
        color: "#0fe703ff",
    },
});
