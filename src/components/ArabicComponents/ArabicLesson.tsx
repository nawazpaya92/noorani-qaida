import React from "react";
import { View, StyleSheet } from "react-native";
import AppText from "../AppText";
import { useAppTheme } from "../../theme/ThemeContext";
import { useArabicAudio } from "./useArabicAudio";
import ArabicGrid from "./ArabicGrid";
import RoundNumber from "../RoundNumber";

export default function ArabicLesson({
    title,
    data,
    isRoundNumber = false,
    index = 0,
}: any) {

    const { theme } = useAppTheme();
    const audio = useArabicAudio();

    return (
        <View style={styles.container}>

            <View style={styles.panel}>

                {title && (
                    <View style={styles.titleContainer}>
                        {isRoundNumber && (<RoundNumber number={index + 1} />)}
                        <AppText variant="heading" lang="ur" align="center" size={24} color={theme.blue}>
                            {title}
                        </AppText>
                    </View>
                )}

                <ArabicGrid data={data} audio={audio} />

            </View>

        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        marginTop: 20,
    },

    panel: {
        backgroundColor: "#ffffff",
        borderRadius: 24,
        paddingTop: 28,
        paddingBottom: 18,
        paddingHorizontal: 10,
        marginVertical: 12,
        marginHorizontal: 12,

    },

    titleContainer: {
        alignItems: "center",
        marginBottom: 12,
    },

    title: {
        paddingHorizontal: 18,
        paddingVertical: 8,
        includeFontPadding: false,
        writingDirection: "rtl",
    },

});
