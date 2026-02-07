import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import Screen from '../components/Screen';
import AppHeader from '../components/AppHeader';
import AppText from '../components/AppText';
import TimedArabicWord from '../components/TimedArabicWord';
import { playArabicLetter } from '../utils/audio';

export default function TimedHighlightTest() {
    //    const [playing, setPlaying] = React.useState(false);
    const [playId, setPlayId] = React.useState(0);
    const [isPlaying, setIsPlaying] = React.useState(false);



    /** 🔊 Test data */
    const text = 'آٹھواں مجموعہ (ک م ہ)';
    //const timings = [0, 1000, 2000];
    const letters = Array.from(text);
    const timings = letters.map((_, i) => i * 50);

    const audio = require('../assets/audio/letters/alif.m4a'); // use any short audio

    const handlePlay = async () => {
        const newId = playId + 1;
        setPlayId(newId);
        setIsPlaying(true);

        await playArabicLetter(audio, {
            onFinish: () => setIsPlaying(false),
        });
    };


    return (
        <Screen>
            <AppHeader title="Timed Highlight Test" />

            <View style={styles.container}>
                {/* Highlighted word */}

                <TimedArabicWord
                    text={text}
                    timings={timings}
                    playId={playId}
                    isPlaying={isPlaying}
                />

                {/* Play button */}
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
        alignItems: 'center',
        justifyContent: 'center',
        gap: 24,
    },

    button: {
        backgroundColor: '#2563EB',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 12,
    },
});
