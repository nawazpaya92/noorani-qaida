import React from "react";
import { ScrollView, StyleSheet, Animated } from "react-native";
import ArabicLesson from "../../components/ArabicComponents/ArabicLesson";
import Screen from "../../components/Screen";
import { LinearGradient } from "expo-linear-gradient";
import { useAppTheme } from "../../theme/ThemeContext";
import AppText from "../../components/AppText";
import AppHeader from "../../components/AppHeader";
import { useNavigation } from "../../navigation/navigationContext";
import { attachAudio, attachAudioToRows } from "../../utils/attachAudio";
import HarkaatTabs from "../../components/ArabicComponents/HarkaatTabs";
import { alifMaddah } from "../../data/madd/alifMaddah";
import { waowMaddah } from "../../data/madd/waowMaddah";
import { yaaMaddhah } from "../../data/madd/yaaMaddah";
import { umumiMaddah } from "../../data/madd/umumiMaddah";

type Props = {
    moduleKey: string;
};
const TABS = [
    {
        key: "ummumiMashq",
        example: " بَا  بُو بِي ",
        label: "عمومی مشق",
        color: "#9333EA", // slightly different
    },
    {
        key: "yaaMaddah",
        example: "بِي",
        label: "ياء مدّ",
        color: "#3B82F6",
    },
    {
        key: "waowMaddah",
        example: "بُو",
        label: "واو مدّ",
        color: "#3B82F6",
    },
    {
        key: "alifMaddah",
        example: "بَا",
        label: "ألف مدّ",
        color: "#3B82F6",
    },
];

export default function HurufeMaddaKiMashq() {
    const { theme } = useAppTheme();
    const navigation = useNavigation();

    const [activeTab, setActiveTab] = React.useState("alifMaddah");

    const fade = React.useRef(new Animated.Value(1)).current;
    const handleChange = (tab: string) => {
        Animated.sequence([
            Animated.timing(fade, { toValue: 0, duration: 150, useNativeDriver: true }),
            Animated.timing(fade, { toValue: 1, duration: 150, useNativeDriver: true }),
        ]).start();
        setActiveTab(tab);
    };


    const lessonMap = React.useMemo(() => ({
        alifMaddah: {
            data: alifMaddah
        },

        waowMaddah: {
            data: waowMaddah,
        },
        yaaMaddah: {
            data: yaaMaddhah
        },
        ummumiMashq: {
            data: umumiMaddah
        }


    }), []);


    const current = lessonMap[activeTab];

    return (
        <Screen>
            <LinearGradient colors={theme.linearGradient} style={{ flex: 1 }}>

                <AppHeader title="" onBack={navigation.pop} />

                <AppText variant="heading" lang="ur" align="center" size={40} color={theme.blue}>
                    حروفِ مدّہ کی مشق
                </AppText>

                <HarkaatTabs
                    active={activeTab}
                    onChange={handleChange}
                    tabs={TABS}
                />
                <ScrollView style={styles.container}>

                    {current?.data?.map((section: any) => (
                        <ArabicLesson
                            key={section.title}
                            title={section.title}
                            data={attachAudio(section.data)}
                        />
                    ))}

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