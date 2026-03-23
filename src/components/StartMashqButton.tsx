import React, { useEffect, useRef } from "react";
import {
    TouchableWithoutFeedback,
    Animated,
    StyleSheet,
    View,
    Text,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import AppText from "./AppText";

const StartMashqButton = ({ onPress, title }: any) => {
    const translateX = useRef(new Animated.Value(0)).current;
    const scale = useRef(new Animated.Value(1)).current;

    // 🔁 Arrow subtle motion
    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(translateX, {
                    toValue: 6,
                    duration: 700,
                    useNativeDriver: true,
                }),
                Animated.timing(translateX, {
                    toValue: 0,
                    duration: 700,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    // 👇 Press animation
    const handlePressIn = () => {
        Animated.spring(scale, {
            toValue: 0.96,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scale, {
            toValue: 1,
            friction: 3,
            useNativeDriver: true,
        }).start();
    };

    return (
        <TouchableWithoutFeedback
            onPress={onPress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
        >
            <Animated.View style={[styles.wrapper, { transform: [{ scale }] }]}>
                <LinearGradient
                    colors={["#2E7D32", "#43A047"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.button}
                >
                    <View style={styles.content}>

                        {/* Text */}
                        <AppText style={styles.text} variant="heading" weight="bold">
                            {title}
                        </AppText>

                        {/* Animated Icon */}
                        <Animated.View
                            style={{ transform: [{ translateX }] }}
                        >
                            <Ionicons name="arrow-forward" size={18} color="#fff" />
                        </Animated.View>

                    </View>
                </LinearGradient>
            </Animated.View>
        </TouchableWithoutFeedback>
    );
};

export default StartMashqButton;

const styles = StyleSheet.create({
    wrapper: {
        marginHorizontal: 16,
        marginTop: 28,
        borderRadius: 30,

        shadowColor: "#2E7D32",
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 6,
    },

    button: {
        paddingVertical: 16,
        borderRadius: 30,
        alignItems: "center",
    },

    content: {
        flexDirection: "row-reverse", // RTL
        alignItems: "center",
        gap: 10,
    },

    text: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
    },
});