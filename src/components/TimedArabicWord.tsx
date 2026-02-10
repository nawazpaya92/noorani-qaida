import React from 'react';
import { Animated, Platform, StyleSheet, Text } from 'react-native';
import { useTimedHighlight } from '../hooks/useTimedHighlight';

type Props = {
    id: string;
    text: string;
    timings: number[];
    playId: string | null;
    isPlaying: boolean;
    isMajmuaa: boolean;
    isActive?: boolean;
};

export default function TimedArabicWord({
    id,
    text,
    timings,
    playId,
    isPlaying,
    isMajmuaa,
    isActive = false,
}: Props) {
    const textScale = React.useRef(new Animated.Value(1)).current;

    React.useEffect(() => {
        Animated.spring(textScale, {
            toValue: isActive ? 1.4 : 1,   // ⭐ gentle readable growth
            speed: 15,
            bounciness: 6,
            useNativeDriver: true,
        }).start();
    }, [isActive]);

    /**
     * 🔥 Android → NO per-letter highlight
     * Just show normal Arabic word
     */
    if (Platform.OS === 'android' || isMajmuaa) {
        return <Animated.Text style={[
            styles.word, !isMajmuaa && { fontSize: 20 },
            { transform: [{ scale: textScale }] }, // ⭐ APPLY SCALE
        ]}>{text}</Animated.Text>;
    }

    /**
     * 🔥 iOS → beautiful timed highlight
     */
    const activeIndex = useTimedHighlight(
        playId === id ? playId : null,
        timings,
        isPlaying
    );

    // Split into substrings (keeps Arabic shaping perfect)
    const before = activeIndex > 0 ? text.slice(0, activeIndex) : '';
    const active =
        activeIndex >= 0 && activeIndex < text.length
            ? text.slice(activeIndex, activeIndex + 1)
            : '';
    const after =
        activeIndex >= 0 ? text.slice(activeIndex + 1) : text;

    return (
        <Animated.Text style={[
            styles.word, !isMajmuaa && { fontSize: 24, },
            { transform: [{ scale: textScale }] }, // ⭐ APPLY SCALE
        ]} numberOfLines={1} ellipsizeMode="clip">
            {before}
            {active ? <Text style={styles.activeLetter}>{active}</Text> : null}
            {after}
        </Animated.Text>
    );
}

const styles = StyleSheet.create({
    word: {
        fontSize: 24,
        textAlign: 'center',
        writingDirection: 'rtl',
        fontFamily: 'Naskh-SemiBold',
        includeFontPadding: false, // Android vertical fix
        lineHeight: 36,
    },


    activeLetter: {
        color: '#0fe703ff',
    },
});
