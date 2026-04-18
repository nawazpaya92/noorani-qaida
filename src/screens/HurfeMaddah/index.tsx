import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useAppTheme } from "../../theme/ThemeContext";
import { useNavigation } from "../../navigation/navigationContext";
import AppHeader from "../../components/AppHeader";
import AppText from "../../components/AppText";
import MaddCard from "./MaddCard";
import Screen from "../../components/Screen";
import RuleCard from "./RuleCard";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import { maddData, maddTableData } from "../../data/madd/maddRulesTable";
import { tableRuleStyles } from "./tableRuleStyles";
import StartMashqButton from "../../components/StartMashqButton";



const LessonScreen = () => {

    const navigation = useNavigation();
    const { theme } = useAppTheme();

    const onPress = () => {
        navigation.push({
            name: "HurufeMaddaKiMashq",
        })
    }
    const onPressForQuiz = () => {
        navigation.push({
            name: "QuizScreen",
        })
    }

    return (
        <Screen>
            <LinearGradient colors={theme.linearGradient as readonly [string, string]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.container}
            >
                <ScrollView showsVerticalScrollIndicator={false}>
                    <AppHeader title="" onBack={navigation.pop} />

                    <AppText
                        variant="heading"
                        lang="ur"
                        size={36}
                        align="center"
                        style={{ margin: 10, padding: 10 }}
                        color={theme.blue}
                    >
                        حروف مدہ کا بیان
                    </AppText>

                    {/* Madd Cards */}

                    <View style={styles.cardsContainer}>
                        {maddData.map((item) => (
                            <MaddCard
                                key={item.id}
                                letter={item.letter}
                                sound={item.sound}
                                example={item.example}
                                colors={item.colors}
                            />
                        ))}
                    </View>


                    {/* Explanation */}
                    <Text style={styles.sectionTitle}>Explanation</Text>
                    <View style={{ marginHorizontal: 16 }}>
                        <View style={tableRuleStyles.container}>
                            <TableHeader />

                            {maddTableData.map((item, index) => (
                                <React.Fragment key={item.id}>
                                    <TableRow item={item} index={index} />
                                    {index !== maddTableData.length - 1 && (
                                        <View style={tableRuleStyles.divider} />
                                    )}
                                </React.Fragment>
                            ))}
                        </View>
                        <StartMashqButton title=" مشق شروع کریں" onPress={onPress} />
                        <StartMashqButton title=" مشق شروع کریں" onPress={onPressForQuiz} />
                    </View>
                    {/* Examples */}


                </ScrollView>
            </LinearGradient>
        </Screen>
    );
};

export default LessonScreen;



// 🎨 Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F7FAF8",
    },

    icon: {
        position: "absolute",
        top: 8,
        right: 8,
        backgroundColor: "rgba(255,255,255,0.2)",
        padding: 6,
        borderRadius: 20,
    }, sound: {
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

    letter: {
        fontSize: 46,   // 🔥 Bigger
        color: "#fff",
        textAlign: "center",
        fontWeight: "bold",
    },
    header: {
        paddingTop: 20,
        paddingBottom: 10,
        alignItems: "center",
    },

    title: {
        fontSize: 30,
        fontWeight: "800",
        color: "#1B5E20",
    },

    subtitle: {
        fontSize: 14,
        color: "#666",
        marginTop: 4,
    },
    cardsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        marginTop: 24,   // ⬅ increase
    },
    maddCard: {
        width: "30%",
        borderRadius: 20,
        padding: 14,
        height: 150,
        justifyContent: "space-between",

        // Shadow (iOS)
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.15,
        shadowRadius: 8,

        // Elevation (Android)
        elevation: 6,
    },

    rule: {
        fontSize: 12,
        color: "#fff",
    },



    sectionTitle: {
        fontSize: 20,
        fontWeight: "700",
        marginTop: 24,
        marginBottom: 10,
        paddingHorizontal: 16,
    },

    cardBox: {
        backgroundColor: "#FFFFFF",
        margin: 8,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 10,
        elevation: 4,
    },

    text: {
        fontSize: 15,
        marginBottom: 10,
        color: "#333",
        lineHeight: 22,
    },

    bullet: {
        fontSize: 15,
        marginBottom: 8,
        color: "#444",
    },

    arabic: {
        fontSize: 30,   // 🔥 Bigger
        textAlign: "right",
        lineHeight: 46,
        fontWeight: "700",
        color: "#1B1B1B",
    },

    buttonContainer: {
        margin: 20,
        borderRadius: 30,
        overflow: "hidden",
    },

    button: {
        padding: 16,
        alignItems: "center",
    },

    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
});