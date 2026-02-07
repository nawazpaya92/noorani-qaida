import React from "react";
import { Animated, Pressable, StyleSheet } from "react-native";

export default function MurakkabatAnimatedCard({
    isActive,
    onPress,
    children,
}: any) {
    const scaleAnim = React.useRef(new Animated.Value(1)).current;

    React.useEffect(() => {
        Animated.spring(scaleAnim, {
            toValue: isActive ? 1.09 : 1,
            speed: 10,
            bounciness: 4,
            useNativeDriver: true,
        }).start();
    }, [isActive]);

    return (
        <Animated.View
            style={[
                styles.card,
                {
                    transform: [{ scale: scaleAnim }],
                },
                isActive && styles.activeCard,
            ]}
        >
            <Pressable
                onPress={onPress}
                style={styles.pressable}
                hitSlop={8}   // ⭐ extra invisible tap area
            >
                {children}
            </Pressable>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        marginHorizontal: 4,
        marginVertical: 6,
        backgroundColor: "#F8FBFF",
        borderRadius: 16,
        paddingVertical: 14,
        paddingHorizontal: 10,

        shadowColor: "#1D4ED8",
        shadowOpacity: 0.08,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 6 },
        elevation: 4,

        alignItems: "center",
        justifyContent: "center",
    },

    activeCard: {
        shadowOpacity: 0.22,
        shadowRadius: 18,
        elevation: 10,
        backgroundColor: "#EEF5FF",
    },

    pressable: {
        flex: 1,                 // ⭐ fills entire card
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 6,      // ⭐ easier tap for kids
    },
});
