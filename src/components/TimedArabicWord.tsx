import React from 'react';
import { Animated, StyleSheet, Text } from 'react-native';
import { useTimedHighlight } from '../hooks/useTimedHighlight';
import {
    getActiveArabicClusterIndex,
    shapeArabicClusters,
} from '../utils/arabicShaping';

type Props = {
    id: string;
    text: string;
    timings: number[];
    playId: string | null;
    isPlaying: boolean;
    isMajmuaa: boolean;
    isActive?: boolean;
    playbackPositionMillis?: number;
    playbackDurationMillis?: number;
};

function getPlaybackSyncedClusterIndex(
    clusterCount: number,
    positionMillis?: number,
    durationMillis?: number
) {
    if (!clusterCount || !durationMillis || durationMillis <= 0) return -1;

    const progress = Math.min(
        Math.max((positionMillis ?? 0) / durationMillis, 0),
        0.999999
    );

    return Math.min(clusterCount - 1, Math.floor(progress * clusterCount));
}

export default function TimedArabicWord({
    id,
    text,
    timings,
    playId,
    isPlaying,
    isMajmuaa,
    isActive = false,
    playbackPositionMillis,
    playbackDurationMillis,
}: Props) {
    const textScale = React.useRef(new Animated.Value(1)).current;
    const textFitProps = {
        numberOfLines: 1 as const,
        ellipsizeMode: 'clip' as const,
        adjustsFontSizeToFit: true,
        minimumFontScale: 0.58,
    };
    const majmuaaTextProps = {
        numberOfLines: 1 as const,
        ellipsizeMode: 'clip' as const,
    };
    const activeIndex = useTimedHighlight(
        playId === id ? playId : null,
        timings,
        isPlaying
    );
    const shapedClusters = shapeArabicClusters(text);
    const isCurrentWordActive = playId === id && isPlaying;
    const hasPlaybackSync =
        !isMajmuaa &&
        isCurrentWordActive &&
        (playbackDurationMillis ?? 0) > 0;
    const activeClusterIndex = hasPlaybackSync
        ? getPlaybackSyncedClusterIndex(
              shapedClusters.length,
              playbackPositionMillis,
              playbackDurationMillis
          )
        : playId === id
          ? getActiveArabicClusterIndex(text, activeIndex)
          : -1;

    React.useEffect(() => {
        Animated.spring(textScale, {
            toValue: isActive ? 1.4 : 1,
            speed: 15,
            bounciness: 6,
            useNativeDriver: true,
        }).start();
    }, [isActive]);

    if (isMajmuaa) {
        return (
            <Animated.Text
                {...majmuaaTextProps}
                style={[
                    styles.word,
                    playId === id ? styles.activeLetter : undefined,
                    { transform: [{ scale: textScale }] },
                ]}
            >
                {text}
            </Animated.Text>
        );
    }

    if (!isCurrentWordActive) {
        return (
            <Animated.Text
                {...textFitProps}
                style={[
                    styles.word,
                    { fontSize: 28, fontFamily: 'Quranic' },
                    { transform: [{ scale: textScale }] },
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
                { fontSize: 28, fontFamily: 'Quranic' },
                { transform: [{ scale: textScale }] },
            ]}
        >
            {shapedClusters.map((cluster, index) => (
                <Text
                    key={`${cluster.start}-${cluster.end}-${index}`}
                    style={[
                        styles.cluster,
                        activeClusterIndex === index ? styles.activeLetter : undefined,
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
        fontSize: 28,
        textAlign: 'center',
        writingDirection: 'rtl',
        fontFamily: 'Quranic',
        includeFontPadding: false,
        lineHeight: 36,
        width: '100%',
        flexShrink: 1,
    },
    cluster: {
        fontFamily: 'Quranic',
    },
    activeLetter: {
        color: '#0fe703ff',
        fontFamily: 'Quranic',
    },
});
