import React from "react";
import { TouchableOpacity, StyleSheet, Animated } from "react-native";
import AppText from "../../../components/AppText";

const OptionBox = ({ label, selected, isCorrect, rowStatus, onPress, disabled }: any) => {
    const scale = React.useRef(new Animated.Value(1)).current;

    const handlePress = () => {
        if (disabled) return; // 🛑 Prevent animation/tap if locked
        Animated.sequence([
            Animated.spring(scale, { toValue: 0.85, useNativeDriver: true }),
            Animated.spring(scale, { toValue: 1, useNativeDriver: true }),
        ]).start();
        onPress();
    };

    let bgColor = "#FFFFFF";
    let borderColor = "#F3F4F6";

    if (selected) {
        if (rowStatus === "correct") {
            bgColor = "#E8F5E9";
            borderColor = "#4CAF50";
        } else if (rowStatus === "partial") {
            bgColor = "#FFF9C4";
            borderColor = "#FFB300";
        } else if (rowStatus === "wrong") {
            bgColor = isCorrect ? "#E8F5E9" : "#FFEBEE";
            borderColor = isCorrect ? "#4CAF50" : "#EF5350";
        } else {
            borderColor = "#9CA3AF";
        }
    }

    return (
        <Animated.View style={{ transform: [{ scale }], opacity: disabled && !selected ? 0.5 : 1 }}>
            <TouchableOpacity
                onPress={handlePress}
                disabled={disabled} // 🛑 Disable the button
                style={[styles.box, { backgroundColor: bgColor, borderColor }]}
            >
                <AppText lang="ar" size={20} style={{ marginBottom: -3 }}>{label}</AppText>
                <AppText size={9} color="#9CA3AF" weight="bold">
                    {label === "ا" ? "A" : label === "و" ? "W" : "Y"}
                </AppText>
            </TouchableOpacity>
        </Animated.View>
    );
};

export default OptionBox;

// styles in OptionBox.tsx
const styles = StyleSheet.create({
    box: {
        width: 46, // Reduced slightly to save horizontal space
        height: 54,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1.5,
        backgroundColor: "#FFF",
        borderBottomWidth: 3.5,
    },
});