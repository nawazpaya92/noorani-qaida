import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import AppText from "./AppText";
import { Ionicons } from "@expo/vector-icons";


export default function LessonModuleCard({
    title,
    items,
    onPress,
    color,
    isQalQalah,
}: {
    title: string
    items?: string[]
    color: string
    onPress: () => void
    isQalQalah?: boolean
}) {

    const leftItems = items?.filter((_, i) => i % 2 === 0)
    const rightItems = items?.filter((_, i) => i % 2 !== 0)
    return (
        <Pressable
            style={[styles.card, {
                borderBottomWidth: 5,
                borderBottomLeftRadius: 18,
                borderBottomRightRadius: 18, borderBottomColor: color
            }]}
            onPress={onPress}
        >

            <View style={{ flexDirection: "row-reverse" }}>
                <AppText align="center" lang="ur" style={styles.title}>
                    {title}
                </AppText>
                {isQalQalah &&
                    <AppText style={styles.qalqalahLetters} lang="ar">
                        (ق ط ب ج د)
                    </AppText>}
            </View>
            <Ionicons
                name="chevron-forward"
                size={18}
                color="#9CA3AF"
                style={styles.arrow}
            />
            {items && (
                <View style={styles.itemsContainer}>
                    {items.map((item, index) => (
                        <View key={index} style={styles.itemRow}>

                            <AppText style={styles.itemText}>
                                {item}
                            </AppText>

                            <AppText style={styles.number}>
                                {index + 1}
                            </AppText>

                        </View>
                    ))}
                </View>
            )}

        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        padding: 18,
        borderRadius: 18,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#E5E7EB",
        marginBottom: 18,
    },
    title: {
        textAlign: "right",
        fontSize: 22,
        fontFamily: "Noori",
        marginBottom: 10,
    },
    arrow: {
        marginTop: 6,
        alignSelf: "flex-end",
        opacity: 1,
    },
    itemsContainer: {
        marginTop: 4,
    },
    qalqalahLetters: {
        fontSize: 24,
        fontFamily: "Quranic",
        marginRight: 6,
        color: "#f50b0bff",   // matches your module color
        fontWeight: "700",
    },

    itemRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 6,
    },

    itemText: {
        flex: 1,
        textAlign: "right",
        fontSize: 14,
        color: "#4B5563",
    },

    number: {
        marginLeft: 8,
        color: "#EC4899",
        fontWeight: "700",
    },
    columns: {
        flexDirection: "row",
    },

    column: {
        flex: 1,
    },

    row: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 6,
    },

    text: {
        flex: 1,
        textAlign: "right",
        fontSize: 8,
        lineHeight: 20,
        color: "#4B5563",
    },

});