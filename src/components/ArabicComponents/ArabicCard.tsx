import React from "react";
import { Animated, Pressable, StyleSheet } from "react-native";

export default function ArabicCard({
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
                { transform: [{ scale: scaleAnim }] },
                isActive && styles.activeCard,
            ]}
        >
            <Pressable
                onPress={onPress}
                style={styles.pressable}
                hitSlop={8}
            >
                {children}
            </Pressable>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    card: {
        marginHorizontal: 3,
        marginVertical: 6,  // slightly more vertical breathing
        backgroundColor: "#FFFFFF", // pure white (stronger contrast)
        borderRadius: 16,
        paddingVertical: 8,
        // subtle border for clarity
        borderWidth: 1,
        borderColor: "#E5E7EB",
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },

        elevation: 3,
    },

    activeCard: {
        shadowOpacity: 0.22,
        shadowRadius: 18,
        elevation: 10,
        backgroundColor: "#EEF5FF",
    },

    pressable: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 6,
    },
});
