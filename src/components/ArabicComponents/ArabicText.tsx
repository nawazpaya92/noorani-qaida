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
    playbackPositionMillis,
    playbackDurationMillis,
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
    const isCurrentWordActive = activeId === id && isPlaying;
    const hasPlaybackSync =
        isCurrentWordActive &&
        (playbackDurationMillis ?? 0) > 0;
    const activeClusterIndex = hasPlaybackSync
        ? Math.min(
            shapedClusters.length - 1,
            Math.floor(
                Math.min(
                    Math.max((playbackPositionMillis ?? 0) / playbackDurationMillis, 0),
                    0.999999
                ) * shapedClusters.length
            )
        )
        : activeId === id
          ? getActiveArabicClusterIndex(text, activeIndex)
          : -1;

    if (!isCurrentWordActive) {
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
                    style={[
                        styles.cluster,
                        activeClusterIndex === index ? styles.highlight : undefined,
                    ]}
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
    cluster: {
        fontFamily: "Quranic",
    },

    highlight: {
        color: "#0fe703ff",
        fontFamily: "Quranic",
    },
});
