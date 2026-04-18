import React from "react";
import { View, StyleSheet, Pressable, ScrollView } from "react-native";
import Screen from "../../components/Screen";
import AppHeader from "../../components/AppHeader";
import AppText from "../../components/AppText";
import { useNavigation } from "../../navigation/navigationContext";
import { LinearGradient } from "expo-linear-gradient";
import { lightTheme } from "../../theme/colors";
import { useAppTheme } from "../../theme/ThemeContext";
import LessonModuleCard from "../../components/LessonModuleCard";
import RoundNumber from "../../components/RoundNumber";
import { jazmKiMashq } from "../../data/jazm/jazmKiMashq";
import { hamzahSakeenKiMashq } from "../../data/jazm/hamzahSakeenkiMashq";
import { qalqalahData } from "../../data/jazm/qalqalaData";

const jazmPracticeItems = [
    "دو حرفی الفاظ میں جزم کی مشق",
    "سر حرفی الفاظ میں درمیانی حرف ساکن",
    "سر حرفی الفاظ میں آخری حرف ساکن",
    "چار حرفی الفاظ میں جزم کی مشق",
    "ایک کلمہ میں متعدد جزم کی مشق",
];
export const modules = [
    {
        key: "jazmPractice",
        title: "جزم کی مشق",
        color: "#4F46E5",
        screen: "JazmKiMashq",
        items: jazmPracticeItems,
        data: jazmKiMashq,
    },
    {
        key: "hamzah",
        title: "ہمزہ ساکنہ کے متعلق ہدایات",
        color: "#10B981",
        screen: "hamzahSaakin",
        data: hamzahSakeenKiMashq
    },
    {
        key: "qalqalah",
        title: "قلقلہ کا بیان",
        color: "#F59E0B",
        screen: "qalqalah",
        data: qalqalahData
    },
];
const jazmPoints = [
    "جزم کی پہچان اور اس کو بنانے کا طریقہ",
    "ساکن حرف پر پڑھنے کا طریقہ",
    "ساکن کلمات کی مشق",
    "جزم کی تمام صورتوں کی مشق",
    "تمثیل اشارہ",
];

export default function Jazm() {

    const navigation = useNavigation();
    const { theme } = useAppTheme();

    return (
        <Screen>
            <LinearGradient colors={theme.linearGradient as readonly [string, string]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.container}
            >
                <AppHeader title="" onBack={navigation.pop} />

                <AppText
                    variant="heading"
                    lang="ur"
                    size={36}
                    align="center"
                    style={{ margin: 10, padding: 10, }}
                    color={theme.blue}
                >
                    جزم کا بیان
                </AppText>
                <ScrollView>
                    <View style={styles.lessonBox}>
                        {jazmPoints.map((point, index) => (
                            <View key={index}>

                                <View style={styles.pointRow}>

                                    <AppText lang="ur" style={styles.pointText} size={24}>
                                        {point}
                                    </AppText>

                                    <RoundNumber number={index + 1} style={{ marginLeft: 8 }} />
                                </View>

                                {index !== jazmPoints.length - 1 && (
                                    <View style={styles.divider} />
                                )}

                            </View>
                        ))}
                    </View>

                    <View style={styles.container}>

                        {modules.map((module) => (
                            <LessonModuleCard
                                isQalQalah={module.key === "qalqalah"}
                                key={module.key}
                                title={module.title}
                                color={module.color}
                                onPress={() => navigation.push({
                                    name: "JazmKiMashq",
                                    params: { moduleKey: module.key }
                                })}
                            />
                        ))}
                    </View>
                </ScrollView>

            </LinearGradient>
        </Screen>
    );
}
const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingHorizontal: 10,
    },

    card: {
        marginBottom: 18,
        borderRadius: 18,
        padding: 20,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E5E7EB",
    },
    gradient: {
        paddingVertical: 28,
        paddingHorizontal: 20,
    },

    title: {
        fontSize: 26,
        color: "#1F2937",
        fontFamily: "NotoNaskhArabic-Bold",
    },

    subtitle: {
        fontSize: 18,
        color: "#374151",
        marginTop: 6,
    },

    small: {
        fontSize: 16,
        color: "#6B7280",
        marginTop: 6,
    },
    lessonBox: {
        marginHorizontal: 20,
        marginTop: 10,
        marginBottom: 24,
        paddingVertical: 12,
        paddingHorizontal: 16,

        backgroundColor: "#F9FAFB",
        borderRadius: 16,

        borderWidth: 1,
        borderColor: "#E5E7EB",
    },

    pointRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
    },

    pointText: {
        flex: 1,
        textAlign: "right",
        fontSize: 24,
        lineHeight: 26,
        color: "#1F2937",
        fontFamily: "Noori",
    },



    divider: {
        height: 1,
        backgroundColor: "#E5E7EB",
    },

});