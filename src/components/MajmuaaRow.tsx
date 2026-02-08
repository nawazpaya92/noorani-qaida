import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import MajmuaaTile from './majmuaa/MajmuaaTile';
import { playArabicLetter } from '../utils/audio';

export default function MajmuaaRow({ item }: any) {
    const forms = ['isolated', 'initial', 'medial', 'final'] as const;

    const [playingIndex, setPlayingIndex] = React.useState<number | null>(null);
    const [isRowPlaying, setIsRowPlaying] = React.useState(false);

    /**
     * ▶️ Auto-play full Majmuaa sequence
     */
    const playSequence = async () => {
        if (isRowPlaying) return; // prevent double tap

        setIsRowPlaying(true);

        for (let i = 0; i < forms.length; i++) {
            const form = forms[i];
            const cell = item[form];

            if (!cell?.audio) continue;

            setPlayingIndex(i);

            await playArabicLetter(cell.audio);

            // small pause for learning clarity
            await new Promise(resolve => setTimeout(resolve, 250));
        }

        setPlayingIndex(null);
        setIsRowPlaying(false);
    };

    return (
        <Pressable onPress={playSequence}>
            <View style={[styles.rowCard, isRowPlaying && styles.activeRow]}>
                {forms.map((form, i) => {
                    const cell = item[form];
                    if (!cell) return null;

                    return (
                        <React.Fragment key={form}>
                            <MajmuaaTile
                                letter={cell.text}
                                isActive={playingIndex === i}
                            />

                            {/* Guided arrows ONLY while playing */}
                            {isRowPlaying && i < forms.length - 1 && (
                                <Text style={styles.arrow}>←</Text>
                            )}
                        </React.Fragment>
                    );
                })}
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    rowCard: {
        flexDirection: 'row-reverse',
        marginVertical: 6,
        borderRadius: 16,
        backgroundColor: '#F8FBFF',
        paddingVertical: 6,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
    },

    activeRow: {
        backgroundColor: '#EEF5FF',
    },

    arrow: {
        fontSize: 14,
        marginHorizontal: 4,
        color: '#94A3B8',
    },
});
