import React from "react";
import { ScrollView, View, StyleSheet, Animated } from "react-native";
import ArabicLesson from "../../components/ArabicComponents/ArabicLesson";
import {
    zabarLetters,
    zabarTwoLetters,
    zabarThreeLetters,
    zabarFourLetters,
} from "../../data/harkaat/zabar";
import Screen from "../../components/Screen";
import { LinearGradient } from "expo-linear-gradient";
import { useAppTheme } from "../../theme/ThemeContext";
import AppText from "../../components/AppText";
import AppHeader from "../../components/AppHeader";
import { useNavigation } from "../../navigation/navigationContext";
import HarkaatTabs from "../../components/ArabicComponents/HarkaatTabs";
import { zerLetters } from "../../data/harkaat/zer/zerLetters";
import { zerTwoLetter } from "../../data/harkaat/zer/zerTwoLetters";
import { zerThreeLetter } from "../../data/harkaat/zer/zerThreeLetters";
import { attachAudio } from "../../utils/attachAudio";
import { peshLetters } from "../../data/harkaat/pesh/peshLetters";
import { peshTwoLetter } from "../../data/harkaat/pesh/peshTwoLetters";
import { peshThreeLetters } from "../../data/harkaat/pesh/peshThreeLetters";

const TABS = [
    {
        key: "pesh",
        example: "بُ",
        label: "پیش",
        color: "#3B82F6",
    },
    {
        key: "zer",
        example: "بِ",
        label: "زیر",
        color: "#3B82F6",
    },
    {
        key: "zabar",
        example: "بَ",
        label: "زبر",
        color: "#3B82F6",
    },
];

export default function Harkaat() {
    const { theme } = useAppTheme();
    const navigation = useNavigation();
    const [activeTab, setActiveTab] = React.useState("zabar");
    const fade = React.useRef(new Animated.Value(1)).current;
    const handleChange = (tab: string) => {
        Animated.sequence([
            Animated.timing(fade, { toValue: 0, duration: 150, useNativeDriver: true }),
            Animated.timing(fade, { toValue: 1, duration: 150, useNativeDriver: true }),
        ]).start();
        setActiveTab(tab);
    };
    const lessonMap = React.useMemo(() => ({
        zabar: {
            letters: { title: zabarLetters.title, data: attachAudio(zabarLetters.data) },
            two: { title: zabarTwoLetters.title, data: attachAudio(zabarTwoLetters.data) },
            three: { title: zabarThreeLetters.title, data: attachAudio(zabarThreeLetters.data) },
            four: { title: zabarFourLetters.title, data: attachAudio(zabarFourLetters.data) },


        },
        zer: {
            letters: { title: zerLetters.title, data: attachAudio(zerLetters.data) },
            two: { title: zerTwoLetter.title, data: attachAudio(zerTwoLetter.data) },
            three: { title: zerThreeLetter.title, data: attachAudio(zerThreeLetter.data) },
            four: [],
        },
        pesh: {
            letters: { title: peshLetters.title, data: attachAudio(peshLetters.data) },
            two: { title: peshTwoLetter.title, data: attachAudio(peshTwoLetter.data) },
            three: { title: peshThreeLetters.title, data: attachAudio(peshThreeLetters.data) },
            four: [],

        },
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
                    حرکات
                </AppText>
                <HarkaatTabs active={activeTab} onChange={handleChange} tabs={TABS} />
                <ScrollView style={styles.container} >
                    {current.letters.data.length > 0 &&
                        <ArabicLesson
                            title={current.letters.title}
                            data={current.letters.data}
                        />
                    }
                    {current.two.data.length > 0 &&
                        <ArabicLesson
                            title={current.two.title}
                            data={current.two.data}
                        />
                    }
                    {current.three.data.length > 0 &&
                        <ArabicLesson
                            title={current.three.title}
                            data={current.three.data}
                        />
                    }                    {current.four.length > 0 &&
                        <ArabicLesson
                            title={current.four.title}
                            data={current.four.data}
                        />
                    }
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
