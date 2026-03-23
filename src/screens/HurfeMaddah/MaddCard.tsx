// 🧩 Madd Card Component
import { Ionicons } from "@expo/vector-icons";
import AppHeader from "../../components/AppHeader";
import AppText from "../../components/AppText";
import { LinearGradient } from "expo-linear-gradient";
import { useAppTheme } from "../../theme/ThemeContext";
import { useNavigation } from "../../navigation/Router";
import { StyleSheet, Text, View } from "react-native";

import React from "react";


const MaddCard = ({ letter, sound, example, colors }: any) => {
    return (
        <View style={styles.shadowWrapper}>
            <View style={styles.cardContainer}>

                {/* Top */}
                <LinearGradient colors={colors} style={styles.topSection}>
                    <AppText style={styles.letter} variant="heading" weight="bold">{letter}</AppText>
                </LinearGradient>

                {/* Bottom */}
                <View style={styles.bottomSection}>
                    <Text style={styles.sound}>{sound}</Text>
                    <Text style={styles.example}>{example}</Text>
                </View>

            </View>
        </View>
    );
};
export default MaddCard;

const styles = StyleSheet.create({

    shadowWrapper: {
        width: "30%",
        borderRadius: 20,

        // ✅ iOS Shadow
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.12,
        shadowRadius: 10,

        // ✅ Android
        elevation: 6,
    },

    cardContainer: {
        borderRadius: 20,
        overflow: "hidden",   // ✅ now safe here
        backgroundColor: "#fff",

        borderWidth: 1,
        borderColor: "#E6ECEA",
    },

    topSection: {
        height: 80,   // ⬅ reduce from 90
        justifyContent: "center",
        alignItems: "center",
    },

    bottomSection: {
        backgroundColor: "#fff",
        paddingVertical: 12,
        paddingHorizontal: 6,
        alignItems: "center",

        borderTopWidth: 1,
        borderTopColor: "#EEF2F1",  // 👈 subtle separator
    },
    letter: {
        fontSize: 44,
        color: "#fff",
        fontWeight: "bold",
    },



    icon: {
        position: "absolute",
        top: 6,
        right: 6,
        backgroundColor: "rgba(255,255,255,0.18)", // lighter
        padding: 5,
        borderRadius: 20,
    },

    rule: {
        fontSize: 12,
        color: "#666",
        marginBottom: 4,
        textAlign: "center",
        writingDirection: "rtl",   // 🔥 important for Arabic
    },
    sound: {
        fontSize: 13,
        color: "#666",
        marginBottom: 4,
        textAlign: "center",
    },

    example: {
        fontSize: 18,
        fontWeight: "700",
        color: "#1B1B1B",
    },
});