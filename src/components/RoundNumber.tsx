import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import AppText from "./AppText";

export default function RoundNumber({
    number,
    size = 26,
    color = "#EC4899",
    style,

}: {
    number: number;
    size?: number;
    color?: string;
    style?: ViewStyle;

}) {
    return (
        <View
            style={[
                styles.circle,
                {
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                    backgroundColor: color,
                },
                style
            ]}
        >
            <AppText style={styles.text}>
                {number}
            </AppText>
        </View>
    );
}

const styles = StyleSheet.create({

    circle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: "#EC4899",
        alignItems: "center",
        justifyContent: "center",

    },

    text: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "700",
    },


});