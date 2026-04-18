import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import AppText from "../AppText";
import ArabicCard from "./ArabicCard";
import ArabicText from "./ArabicText";
import { useArabicAudio } from "./useArabicAudio";
import { useAppTheme } from "../../theme/ThemeContext";
import { qalqalahKiMisalen } from "../../data/jazm/qalqalaData";
import ArabicLesson from "./ArabicLesson";
import { attachAudio } from "../../utils/attachAudio";

export default function QalqalahLesson({ title, data }: any) {
    const { theme } = useAppTheme();
    const audio = useArabicAudio();
    const { play, activeId, isPlaying } = audio;

    return (

        <View style={styles.container}>

            <View style={styles.panel}>

                <AppText
                    variant="heading"
                    lang="ur"
                    size={30}
                    align="center"
                    style={{ margin: 10, padding: 10 }}
                    color={theme.blue}>
                    {title}
                </AppText>

                {data.map((row: any) => (

                    <View key={row.letter.id} style={styles.row}>

                        {/* Letter Column */}
                        <View style={styles.letterBox}>


                            <ArabicCard
                                isActive={activeId === row.letter.id}
                                onPress={() => play(row.letter.id, row.letter.audio)}
                            >
                                <ArabicText
                                    id={row.letter.id}
                                    text={row.letter.text}
                                    timings={row.letter.timings}
                                    activeId={activeId}
                                    isPlaying={isPlaying}
                                    isActive={activeId === row.letter.id}
                                    size={32}
                                    style={styles.letterText}
                                    color="#BE185D"   // pink like Noorani Qaida
                                />
                            </ArabicCard>
                        </View>



                        {/* Words */}
                        {row.words.map((item: any) => {

                            const isActive = activeId === item.id;

                            return (
                                <View key={item.id} style={styles.cell}>

                                    <ArabicCard
                                        isActive={isActive}
                                        onPress={() => play(item.id, item.audio)}
                                    >
                                        <ArabicText
                                            id={item.id}
                                            text={item.text}
                                            timings={item.timings}
                                            activeId={activeId}
                                            isPlaying={isPlaying}
                                            isActive={isActive}

                                        />
                                    </ArabicCard>

                                </View>
                            );
                        })}

                    </View>

                ))}




            </View>
            {
                qalqalahKiMisalen?.map((item, index) => (
                    <ArabicLesson
                        key={index}
                        title={item.title}
                        data={attachAudio(item.data)}
                        isRoundNumber={true}
                        index={index}
                    />
                ))
            }

        </View>
    );
}
const styles = StyleSheet.create({

    container: {
        marginTop: 20,
        marginHorizontal: 12,
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

    title: {
        marginBottom: 12,
        fontFamily: "NotoNaskhArabic-bold",
        writingDirection: "rtl",
    },

    row: {
        flexDirection: "row-reverse",
        marginBottom: 10,
    },

    letterBox: {
        width: "14%",
        justifyContent: "center",
    },

    letterText: {
        fontSize: 30,
        color: "#EC4899",
        fontFamily: "NotoNaskhArabic-bold",
    },

    cell: {
        width: "21%",
        paddingHorizontal: 4,
    },

});