import React from "react";
import { View, Text, StyleSheet } from "react-native";

const RuleCard = ({ example, rules }: any) => {
    return (
        <View style={styles.card}>
            <Text style={styles.example}>{example}</Text>

            {rules.map((item: any, index: number) => (
                <Text key={index} style={styles.rule}>
                    {item.icon} {item.text}
                </Text>
            ))}
        </View>
    );
};

export default RuleCard;

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        marginHorizontal: 16,
        marginBottom: 12,
        padding: 16,
        borderRadius: 16,

        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
    },

    example: {
        fontSize: 22,
        textAlign: "right",
        marginBottom: 10,
        fontWeight: "700",
    },

    rule: {
        fontSize: 14,
        marginBottom: 6,
        color: "#444",
    },
});