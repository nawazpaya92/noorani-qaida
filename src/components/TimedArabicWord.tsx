import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { useTimedHighlight } from '../hooks/useTimedHighlight';

type Props = {
    id: string;
    text: string;
    timings: number[];
    playId: string | null;
    isPlaying: boolean;
};

export default function TimedArabicWord({
    id,
    text,
    timings,
    playId,
    isPlaying,
}: Props) {
    const activeIndex = useTimedHighlight(
        playId === id ? playId : null,
        timings,
        isPlaying
    );

    // ⭐ Split using substrings instead of per-letter Text nodes
    const before = activeIndex > 0 ? text.slice(0, activeIndex) : '';
    const active =
        activeIndex >= 0 && activeIndex < text.length
            ? text.slice(activeIndex, activeIndex + 1)
            : '';
    const after =
        activeIndex >= 0 ? text.slice(activeIndex + 1) : text;

    return (
        <Text style={styles.word} numberOfLines={1}            // ⭐ CRITICAL
            ellipsizeMode="clip"     >
            {before}
            {active ? <Text style={styles.activeLetter}>{active}</Text> : null}
            {after}
        </Text>
    );
}

const styles = StyleSheet.create({
    word: {
        fontSize: 22,
        textAlign: 'center',
        writingDirection: 'rtl',
        fontFamily: 'Naskh-SemiBold',

        includeFontPadding: false,   // Android spacing fix
        textAlignVertical: 'center',

        flexWrap: 'nowrap',
    },

    activeLetter: {
        color: '#7c1217ff',
    },
});

