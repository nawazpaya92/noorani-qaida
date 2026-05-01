import React from "react";
import { View, StyleSheet } from "react-native";
import ArabicCard from "./ArabicCard";
import ArabicText from "./ArabicText";

function getItemWidth(text: string) {
    if (text.includes(" ")) return "49%";
    if (text.length >= 8) return "32%";
    return "24%";
}

export default function ArabicGrid({
    data,
    audio,
}: any) {
    const {
        play,
        activeId,
        isPlaying,
        playbackPositionMillis,
        playbackDurationMillis,
    } = audio;

    return (
        <View style={styles.container}>
            {data.map((item: any) => {
                const isActive = activeId === item.id;

                return (
                    <View
                        key={item.id}
                        style={[styles.gridItem, { width: getItemWidth(item.text) }]}
                    >
                        <ArabicCard
                            isActive={isActive}
                            onPress={() => play(item.id, item.audio)}
                        >
                            <ArabicText
                                id={item.id}
                                size={28}
                                text={item.text}
                                timings={item.timings}
                                activeId={activeId}
                                isPlaying={isPlaying}
                                isActive={isActive}
                                playbackPositionMillis={playbackPositionMillis}
                                playbackDurationMillis={playbackDurationMillis}
                            />
                        </ArabicCard>
                    </View>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row-reverse",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },

    gridItem: {
        marginBottom: 10,
    },

});
