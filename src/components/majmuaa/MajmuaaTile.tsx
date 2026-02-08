import React from "react";
import { Animated, StyleSheet, Text } from "react-native";
import LearningCard from "../LearningCard";

type Props = {
    letter: string;
    isActive: boolean;
};

export default function MajmuaaTile({ letter, isActive }: Props) {
    const scale = React.useRef(new Animated.Value(1)).current;

    React.useEffect(() => {
        Animated.spring(scale, {
            toValue: isActive ? 1.25 : 1,
            useNativeDriver: true,
            speed: 20,
            bounciness: 8,
        }).start();
    }, [isActive]);

    return (
        <LearningCard active={isActive}>
            <Animated.Text style={[styles.letter, { transform: [{ scale }] }]}>
                {letter}
            </Animated.Text>
        </LearningCard>
    );
}

const styles = StyleSheet.create({
    letter: {
        fontSize: 28,
        fontFamily: "Naskh-SemiBold",
        color: "#111827",
        writingDirection: "rtl",
    },
});
