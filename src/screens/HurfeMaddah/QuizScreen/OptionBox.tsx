import React from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import AppText from "../../../components/AppText";
import { Animated } from "react-native";


type Props = {
    label: string;
    selected: boolean;
    isCorrect?: boolean;
    showResult: boolean;
    onPress: () => void;
};

const OptionBox = ({ label, selected, isCorrect, showResult, onPress }: Props) => {
    let backgroundColor = "#fff";
    let borderColor = "#E5E7EB";

    const scale = React.useRef(new Animated.Value(1)).current;
    if (showResult) {
        if (selected && isCorrect) {
            backgroundColor = "#E8F5E9"; // ✅ green
            borderColor = "#2E7D32";
        } else if (selected && !isCorrect) {
            backgroundColor = "#FFEBEE"; // ❌ red
            borderColor = "#C62828";
        }
    } else if (selected) {
        borderColor = "#2E7D32";
    }
    const handlePress = () => {
        Animated.sequence([
            Animated.spring(scale, { toValue: 0.9, useNativeDriver: true }),
            Animated.spring(scale, { toValue: 1, useNativeDriver: true }),
        ]).start();

        onPress();
    };

    return (
        <TouchableOpacity
            style={[styles.box, { backgroundColor, borderColor }]}
            onPress={handlePress}
            activeOpacity={0.8}
        >
            <AppText variant="heading" lang="ar">
                {label}
            </AppText>

        </TouchableOpacity>
    );
};

export default OptionBox;

const styles = StyleSheet.create({
    box: {
        width: 54,
        height: 54,
        borderRadius: 16,
        borderWidth: 2,

        justifyContent: "center",
        alignItems: "center",

        backgroundColor: "#fff",

        // subtle shadow
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 6,
        elevation: 2,
    }
});