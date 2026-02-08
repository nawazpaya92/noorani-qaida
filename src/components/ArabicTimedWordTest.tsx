import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import AppText from './AppText';
import { useTimedHighlight } from '../hooks/useTimedHighlight';

type Props = {
    text: string;
    timings: number[];
    play: boolean;
};

export default function TimedArabicWord({ text, timings, play }: Props) {
    const activeIndex = useTimedHighlight(play, timings);

    const letters = text.split('');

    return (
        <View style={styles.row}>
            {letters.map((l, i) => {
                const isActive = i === activeIndex;

                return (
                    <Animated.View
                        key={i}
                        style={[
                            styles.letterWrap,
                            isActive && styles.activeWrap,
                        ]}
                    >
                        <AppText size={28} weight="bold">
                            {l}
                        </AppText>
                    </Animated.View>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row-reverse',
        justifyContent: 'center',
        gap: 6,
    },

    letterWrap: {
        paddingHorizontal: 6,
        paddingVertical: 4,
        borderRadius: 8,
    },

    /** 🌟 Soft glow highlight */
    activeWrap: {
        backgroundColor: '#DBEAFE',
        transform: [{ scale: 1.08 }],
    },
});
