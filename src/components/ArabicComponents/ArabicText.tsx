import React from "react";
import { Animated, StyleSheet, Text } from "react-native";
import { useTimedHighlight } from "../../hooks/useTimedHighlight";
import {
    getActiveArabicClusterIndex,
    shapeArabicClusters,
} from "../../utils/arabicShaping";

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

    const activeIndex = useTimedHighlight(
        activeId === id ? id : null,
        timings,
        isPlaying
    );

    React.useEffect(() => {
        Animated.spring(scale, {
            toValue: isActive ? 1.4 : 1,
            speed: 15,
            bounciness: 6,
            useNativeDriver: true,
        }).start();
    }, [isActive]);

    const shapedClusters = shapeArabicClusters(text);
    const activeClusterIndex =
        activeId === id ? getActiveArabicClusterIndex(text, activeIndex) : -1;

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
            {shapedClusters.map((cluster, index) => (
                <Text
                    key={`${cluster.start}-${cluster.end}-${index}`}
                    style={activeClusterIndex === index ? styles.highlight : undefined}
                >
                    {cluster.display}
                </Text>
            ))}
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
