import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import LetterTile from "./LetterTile";
import TimedArabicWord from "./TimedArabicWord";
import { Animated } from "react-native";
import MurakkabatAnimatedCard from "./MurakkabatAnimatedCard";

export default function MurakkabatRow({ item, activeCell, playId, isPlaying, onPlayWord }: any) {
    const isRowActive = activeCell?.rowId === item.id;

    const isActive = (col: string) =>
        isRowActive && activeCell.col === col;


    const columns = [
        { key: 'base', highlight: true },
        { key: 'initial' },
        { key: 'medial' },
        { key: 'final' },
        { key: 'group' },
    ];

    return (
        <View style={[styles.row,]}>
            {columns.map((col, index) => {
                const wordId = `${item.id}-${col.key}`;
                const isCurrent = playId === wordId;

                return (
                    <MurakkabatAnimatedCard
                        key={col.key}
                        isActive={isCurrent}
                        onPress={() => onPlayWord(wordId, item[col.key].audio)}
                    >
                        <TimedArabicWord
                            id={wordId}
                            text={item[col.key].text}
                            timings={item[col.key].timings}
                            playId={playId === wordId ? wordId : null}
                            isPlaying={isPlaying}
                        />
                    </MurakkabatAnimatedCard>

                )
            }
            )}
        </View>
    );
}
const styles = StyleSheet.create({

    arrow: {
        alignSelf: 'center',
        color: '#94A3B8',
        fontSize: 14,
        marginHorizontal: 2,
    },
    activeRow: {
        backgroundColor: '#F8FAFF', // extremely light blue
        borderRadius: 14,
        paddingVertical: 6,
    },
    activeMurakkabatCard: {
        transform: [{ scale: 1.2 }],      // gentle zoom (kid-friendly)
        shadowOpacity: 0.18,               // stronger depth
        shadowRadius: 14,
        elevation: 8,                      // Android lift
        backgroundColor: '#EEF5FF',        // soft highlight tint
    },
    murakkabatCard: {
        flex: 1,
        marginHorizontal: 4,
        marginVertical: 6,

        backgroundColor: '#F8FBFF',     // very soft blue tint
        borderRadius: 16,
        paddingVertical: 14,
        paddingHorizontal: 10,

        // iOS shadow
        shadowColor: '#1D4ED8',
        shadowOpacity: 0.08,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 6 },

        // Android shadow
        elevation: 4,

        alignItems: 'center',
        justifyContent: 'center',
    },
    baseLetterBox: {
        backgroundColor: '#EFF6FF', // very soft blue
        borderWidth: 1,
        borderColor: '#93C5FD',
    },
    cellBox: {
        height: 56,
        borderRadius: 12,
        backgroundColor: '#FFFFFF',

        elevation: 2,
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    cellLetter: {
        fontSize: 30,
        fontWeight: '600',
        fontFamily: 'Naskh-Regular', // ✅ key line
        writingDirection: 'rtl',
        textAlign: 'center',
    },
    murakkabatCellBox: {
        height: 56,
        borderRadius: 12,
        paddingHorizontal: 4, // 👈 tighter padding
        backgroundColor: '#FFFFFF',
    },
    /* 🔹 Header */
    row: {
        flexDirection: 'row-reverse',
        marginBottom: 10,
    },

    murakkabatCellWrapper: {
        flex: 1.15,        // 👈 key change
        alignItems: 'center',
    },
    cellWrapper: {
        flex: 1,
        alignItems: 'center'
    },
    rowActive: {
        borderWidth: 2,
        borderColor: '#2563EB',

        shadowColor: '#2563EB',
        shadowOpacity: 0.35,
        shadowRadius: 10,
        elevation: 6,
    },

    /* 🔹 Each alphabet row */
    rowCard: {
        flexDirection: 'row-reverse',
        borderRadius: 14,
        overflow: 'hidden',
        backgroundColor: '#F8FAFF',
        marginBottom: 14,

        // iOS shadow (bottom focused)
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 }, // 👈 bottom only
        shadowOpacity: 0.15,
        shadowRadius: 6,
        // Android shadow
        elevation: 4,
        borderBottomWidth: 2,
        borderBottomColor: '#E5E7EB',
    },

});
