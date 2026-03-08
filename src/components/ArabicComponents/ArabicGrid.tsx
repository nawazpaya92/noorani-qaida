import React from "react";
import { View, StyleSheet } from "react-native";
import ArabicCard from "./ArabicCard";
import ArabicText from "./ArabicText";

export default function ArabicGrid({
    data,
    audio,
}: any) {
    const { play, activeId, isPlaying } = audio;

    return (
        <View style={styles.container}>
            {data.map((item: any) => {
                const isActive = activeId === item.id;

                return (
                    <View key={item.id} style={styles.gridItem}>
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
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row-reverse",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },

    gridItem: {
        width: "24%",  // ⭐ EXACT same as Umumi Mashq
        marginBottom: 10,
    },

});
