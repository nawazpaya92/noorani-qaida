import React from "react";
import { ScrollView, StyleSheet, Animated } from "react-native";
import ArabicLesson from "../../components/ArabicComponents/ArabicLesson";
import Screen from "../../components/Screen";
import { LinearGradient } from "expo-linear-gradient";
import { useAppTheme } from "../../theme/ThemeContext";
import AppText from "../../components/AppText";
import AppHeader from "../../components/AppHeader";
import { useNavigation } from "../../navigation/navigationContext";
import HarkaatTabs from "../../components/ArabicComponents/HarkaatTabs";
import { attachAudio } from "../../utils/attachAudio";

import { doZabar } from "../../data/tanveen/doZabar/doZabar";
import { doZabarWords } from "../../data/tanveen/doZabar/doZabarWords";

import { doZer } from "../../data/tanveen/doZer/doZer";
import { doZerWords } from "../../data/tanveen/doZer/doZerWords";

import { doPesh } from "../../data/tanveen/doPesh/doPesh";
import { doPeshWords } from "../../data/tanveen/doPesh/doPeshWords";
import { umumiMashq } from "../../data/tanveen/umumiMashq";




const TABS = [
    {
        key: "umumiMashq",
        example: "اً ٍ ٌ",
        label: "عمومی مشق",
        color: "#9333EA", // slightly different
        isCombined: true,

    },
    {
        key: "doPesh",
        example: "اٌ",
        label: "پیش",
        color: "#3B82F6",
    },
    {
        key: "doZer",
        example: "اٍ",
        label: "زیر",
        color: "#3B82F6",
    },
    {
        key: "doZabar",
        example: "اً",
        label: "زبر",
        color: "#3B82F6",
    },
];

export default function Tanveen() {
    const { theme } = useAppTheme();
    const navigation = useNavigation();

    const [activeTab, setActiveTab] = React.useState("doZabar");

    const fade = React.useRef(new Animated.Value(1)).current;

    const handleChange = (tab: string) => {
        Animated.sequence([
            Animated.timing(fade, { toValue: 0, duration: 150, useNativeDriver: true }),
            Animated.timing(fade, { toValue: 1, duration: 150, useNativeDriver: true }),
        ]).start();

        setActiveTab(tab);
    };

    const lessonMap = React.useMemo(() => ({
        doZabar: {
            letters: {
                title: doZabar.title,
                data: attachAudio(doZabar.data),
            },
            words: {
                title: doZabarWords.title,
                data: attachAudio(doZabarWords.data),
            },
        },

        doZer: {
            letters: {
                title: doZer.title,
                data: attachAudio(doZer.data),
            },
            words: {
                title: doZerWords.title,
                data: attachAudio(doZerWords.data),
            },
        },

        doPesh: {
            letters: {
                title: doPesh.title,
                data: attachAudio(doPesh.data),
            },
            words: {
                title: doPeshWords.title,
                data: attachAudio(doPeshWords.data),
            },
        },
        umumiMashq: {
            letters: { title: '', data: [] },
            words: {
                title: umumiMashq.title,
                data: attachAudio(umumiMashq.data),
            }
        }

    }), []);

    const current = lessonMap[activeTab];

    return (
        <Screen>
            <LinearGradient colors={theme.linearGradient} style={{ flex: 1 }}>

                <AppHeader title="" onBack={navigation.pop} />

                <AppText
                    variant="heading"
                    weight="bold"
                    size={30}
                    align="center"
                    style={{ margin: 10, padding: 10 }}
                    color={theme.blue}
                >
                    تنوین
                </AppText>

                <HarkaatTabs
                    active={activeTab}
                    onChange={handleChange}
                    tabs={TABS}
                />

                <ScrollView style={styles.container}>

                    {current.letters.data.length > 0 && (
                        <ArabicLesson
                            title={current.letters.title}
                            data={current.letters.data}
                        />
                    )}

                    {current.words.data.length > 0 && (
                        <ArabicLesson
                            title={current.words.title}
                            data={current.words.data}
                        />
                    )}


                </ScrollView>

            </LinearGradient>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        paddingBottom: 40,
    },
});