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

import { modules } from ".";

import QalqalahLesson from "../../components/ArabicComponents/QalqalaLesson";

type Props = {
    moduleKey: string;
};

export default function JazmKiMashq({ moduleKey }: Props) {
    const { theme } = useAppTheme();
    const navigation = useNavigation();

    const module = modules.find(m => m.key === moduleKey);


    console.log("Received moduleKey:", module); // Debug log

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
                >{module?.title}

                </AppText>

                <ScrollView style={styles.container}>

                    {moduleKey === "qalqalah" ? (

                        <QalqalahLesson
                            title={module?.data?.title ?? ""}
                            data={attachAudioToRows(module?.data?.data ?? [])}
                        />

                    ) : (

                        module?.data?.map((item, index) => (
                            <ArabicLesson
                                key={index}
                                title={item.title}
                                data={attachAudio(item.data)}
                                isRoundNumber={true}
                                index={index}
                            />
                        ))

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