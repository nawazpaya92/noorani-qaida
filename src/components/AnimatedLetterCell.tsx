import React from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import * as Haptics from 'expo-haptics';
import { playArabicLetter } from "../utils/audio";

export default function AnimatedLetterCell({
    id,
    text,
    audio,
    isActive,
    onPlayStart,
    onPlayEnd,
    isolated = false,
}: {
    id: string;
    text: string;
    audio: any;
    isActive: boolean;
    onPlayStart: (id: string) => void;
    onPlayEnd: () => void;
    isolated?: boolean;
}) {
    const scale = React.useRef(new Animated.Value(1)).current;
    const glow = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        Animated.timing(glow, {
            toValue: isActive ? 1 : 0,
            duration: 180,
            useNativeDriver: false,
        }).start();
    }, [isActive]);

    const onPress = async () => {
        if (isActive) return;

        onPlayStart(id);
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

        playArabicLetter(audio, {
            onFinish: onPlayEnd,
        });
    };

    const borderColor = glow.interpolate({
        inputRange: [0, 1],
        outputRange: ['#E5E7EB', '#2563EB'],
    });

    return (
        <Pressable onPress={onPress}>
            <Animated.View
                style={[
                    styles.cell,
                    {
                        borderColor,
                        shadowOpacity: isActive ? 0.35 : 0.12,
                    },
                ]}
            >
                <Text
                    style={[
                        styles.cellText]}
                >
                    {text}
                </Text>
            </Animated.View>
        </Pressable>
    );
}
const styles = StyleSheet.create({
    cell: {
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },

    cellText: {
        fontSize: 28,
        fontWeight: '700',
        color: '#111827',
    },

});
