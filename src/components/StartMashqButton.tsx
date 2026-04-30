import React, { useEffect, useRef } from "react";
import {
    TouchableWithoutFeedback,
    Animated,
    StyleSheet,
    View,
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
                    colors={["#2563EB", "#38BDF8"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.button}
                >
                    <View style={styles.content}>
                        <Animated.View
                            style={[styles.iconBadge, { transform: [{ translateX }] }]}
                        >
                            <Ionicons name="play" size={16} color="#2563EB" />
                        </Animated.View>

                        <AppText lang="ur" style={styles.text} variant="heading">
                            {title}
                        </AppText>
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
        borderRadius: 8,
        marginBottom: 20,
        shadowColor: "#1D4ED8",
        shadowOpacity: 0.22,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 8 },
        elevation: 6,
    },

    button: {
        paddingVertical: 14,
        paddingHorizontal: 18,
        borderRadius: 8,
        alignItems: "center",
    },

    content: {
        flexDirection: "row-reverse", // RTL
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
    },

    iconBadge: {
        width: 30,
        height: 30,
        borderRadius: 8,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        justifyContent: "center",
    },

    text: {
        color: "#FFFFFF",
        fontSize: 18,
    },
});
