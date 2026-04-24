import React from "react";
import { ScrollView, StyleSheet, Animated, View } from "react-native";
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
import { khadaZabar } from "../../data/harkaateMaddah/khadaZabar";
import { khadiZer } from "../../data/harkaateMaddah/khadiZer";
import { ultaPesh } from "../../data/harkaateMaddah/ultaPesh";
import HarkaateMaddahComparison from "./HarkaateMaddahComparision";

type Props = {
    moduleKey: string;
};
const TABS = [
    // {
    //     key: "ummumiMashq",
    //     example: " بَا  بُو بِي ",
    //     label: "عمومی مشق",
    //     color: "#9333EA", // slightly different
    // },
    {
        key: "ultaPesh",
        example: "بٗ",
        label: "الٹا پیش ",
        color: "#3B82F6",
    },
    {
        key: "khadiZer",
        example: "بٖ",
        label: "کھڑی زیر",
        color: "#3B82F6",
    },
    {
        key: "khadaZabar",
        example: "بٰ",
        label: "کھڑا زبر",
        color: "#3B82F6",
    },
];

export default function HarkaateMaddahMashq() {
    const { theme } = useAppTheme();
    const navigation = useNavigation();

    const [activeTab, setActiveTab] = React.useState("khadaZabar");

    const fade = React.useRef(new Animated.Value(1)).current;
    const scrollRef = React.useRef<ScrollView>(null);
    const handleChange = (tab: string) => {
        scrollRef.current?.scrollTo({ y: 0, animated: false });

        Animated.sequence([
            Animated.timing(fade, { toValue: 0, duration: 150, useNativeDriver: true }),
            Animated.timing(fade, { toValue: 1, duration: 150, useNativeDriver: true }),
        ]).start();
        setActiveTab(tab);
    };


    const lessonMap = React.useMemo(() => ({
        khadaZabar: {
            data: khadaZabar,
            comparisonTitle: "کھڑا زبر اور الف مدہ",
            comparison: [
                { left: "بٰ", right: "با" },
                { left: "مٰ", right: "ما" },
                { left: "سٰ", right: "سا" },
                { left: "فٰ", right: "فَا" },
                { left: "شٰ", right: "شا" },
                { left: "قٰ", right: "قَا" },
            ],

        },

        khadiZer: {
            data: khadiZer,
            comparisonTitle: "کھڑی زیر اور یاء مدہ",
            comparison: [
                { left: "تٖ", right: "تی" },
                { left: "دٖ", right: "دی" },
                { left: "ذٖ", right: "ذی" },
                { left: "نٖ", right: "نی" },
            ],
        },
        ultaPesh: {
            data: ultaPesh,
            comparisonTitle: "الٹا پیش اور واؤ مدہ",
            comparison: [
                { left: "بٗ", right: "بو" },
                { left: "تٗ", right: "تُو" },
                { left: "فٗ", right: "فُو" },
                { left: "جٗ", right: "جو" },
                { left: "سٗ", right: "سُو" },
                { left: "خٗ", right: "خُو" },
            ],
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
                    حرکاتِ مدّہ کی مشق
                </AppText>

                <HarkaatTabs
                    active={activeTab}
                    onChange={handleChange}
                    tabs={TABS}
                />
                <ScrollView ref={scrollRef} style={styles.container}>

                    <View style={{ marginHorizontal: 30, }}>
                        <HarkaateMaddahComparison
                            data={current?.comparison || []}
                            title={current?.comparisonTitle || ""}
                            titleSize={15}
                        />
                    </View>
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
