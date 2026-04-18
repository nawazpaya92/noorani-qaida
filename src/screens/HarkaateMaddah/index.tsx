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
import Screen from "../../components/Screen";
import HarkaateMaddahParaExplaination from "./HarkaateMaddahParaExplaination";
import LetterRowHarkaatExplaination from "./HarkaateMaddahRowExplaination";
import HarkaateMaddahRowExplaination from "./HarkaateMaddahRowExplaination";
import HarkaateMaddahComparison from "./HarkaateMaddahComparision";
import HarkaateMaddahFAQ from "./HarkaateMaddahFAQ";
import StartMashqButton from "../../components/StartMashqButton";


const tableComparisiondata = [
    { left: "ٰٰبٰ", right: "با" },
    { left: "بٖ", right: "بی" },
    { left: "بٗ", right: "بو" },
];


const HarkaateMaddah = () => {

    const navigation = useNavigation();
    const { theme } = useAppTheme();
    const onPress = () => {
        navigation.push({ name: "HarkaateMaddahMashq" });
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
                        حرکات مدہ کا بیان
                    </AppText>

                    <HarkaateMaddahParaExplaination />
                    <HarkaateMaddahRowExplaination />
                    <HarkaateMaddahComparison data={tableComparisiondata} title="حرکات مدہ اور حروف مدہ کا تقابلی جائزہ" />
                    <HarkaateMaddahFAQ />
                    <StartMashqButton title=" مشق شروع کریں" onPress={onPress} />
                </ScrollView>
            </LinearGradient>
        </Screen>
    );
};

export default HarkaateMaddah;



// 🎨 Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F7FAF8",
        paddingBottom: 12,
    },



});