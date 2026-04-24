import React from "react";
import { Animated, ScrollView, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AppHeader from "../../components/AppHeader";
import AppText from "../../components/AppText";
import ArabicLesson from "../../components/ArabicComponents/ArabicLesson";
import HarkaatTabs from "../../components/ArabicComponents/HarkaatTabs";
import Screen from "../../components/Screen";
import { useNavigation } from "../../navigation/navigationContext";
import { useAppTheme } from "../../theme/ThemeContext";
import { attachAudio } from "../../utils/attachAudio";
import { umumiLeen, waowLeen, yaaLeen } from "../../data/hurufeLeen";

const TABS = [
    {
        key: "umumiMashq",
        example: "بَوْ بَيْ",
        label: "عمومی مشق",
        color: "#9333EA",
        isCombined: true,
    },
    {
        key: "yaaLeen",
        example: "بَيْ",
        label: "یاے لین",
        color: "#047857",
    },
    {
        key: "waowLeen",
        example: "بَوْ",
        label: "واوِ لین",
        color: "#2563EB",
    },
];

const TashdeedKiMashq = () => {
    const { theme } = useAppTheme();
    const navigation = useNavigation();
    const [activeTab, setActiveTab] = React.useState("waowLeen");
    const fade = React.useRef(new Animated.Value(1)).current;
    const scrollRef = React.useRef<ScrollView>(null);



    return (
        <Screen>
            <LinearGradient
                colors={theme.linearGradient as readonly [string, string]}
                style={styles.screen}
            >
                <AppHeader title="" onBack={navigation.pop} />

                <AppText
                    variant="heading"
                    lang="ur"
                    align="center"
                    size={38}
                    color={theme.blue}
                    style={styles.title}
                >
                    حروفِ لین کی مشق
                </AppText>


                <Animated.View style={[styles.body, { opacity: fade }]}>
                    <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false}>

                    </ScrollView>
                </Animated.View>
            </LinearGradient>
        </Screen>
    );
};

export default TashdeedKiMashq;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    title: {
        marginHorizontal: 16,
        marginBottom: 4,
    },
    body: {
        flex: 1,
    },
    emptyCard: {
        marginHorizontal: 16,
        marginTop: 28,
        padding: 20,
        borderRadius: 12,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#DBEAFE",
    },
    emptyText: {
        marginTop: 10,
    },
});
