import React from "react";
import { ScrollView, StyleSheet, Animated } from "react-native";
import ArabicLesson from "../../components/ArabicComponents/ArabicLesson";
import Screen from "../../components/Screen";
import { LinearGradient } from "expo-linear-gradient";
import { useAppTheme } from "../../theme/ThemeContext";
import AppText from "../../components/AppText";
import AppHeader from "../../components/AppHeader";
import { useNavigation } from "../../navigation/Router";
import { attachAudio } from "../../utils/attachAudio";
import { jazmKiMashq } from "../../data/jazm/jazmKiMashq";



export default function JazmKiMashq() {
    const { theme } = useAppTheme();
    const navigation = useNavigation();





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
                    جزم کی مشق
                </AppText>

                <ScrollView style={styles.container}>

                    {jazmKiMashq.map((item, index) => (
                        <ArabicLesson
                            key={index}
                            title={item.title}
                            data={attachAudio(item.data)}
                            isRoundNumber={true}
                            index={index}
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