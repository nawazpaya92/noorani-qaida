import React from "react";
import { View, StyleSheet } from "react-native";
import LetterTile from "./LetterTile";

export default function MurakkabatRow({ item, activeCell, onActivate }: any) {
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
        <View style={[styles.row, isRowActive && styles.activeRow]}>
            {columns.map((col, index) => (
                <LetterTile
                    key={col.key}
                    item={{
                        id: `${item.id}-${col.key}`,
                        letter: item[col.key],
                    }}
                    compact
                    isActive={isActive(col.key)}
                    onPlayStart={() =>
                        onActivate({ rowId: item.id, col: col.key })
                    }
                    onPlayEnd={() => onActivate(null)}
                    wrapperStyle={styles.murakkabatCellWrapper}
                    boxStyle={[
                        styles.cellBox,
                        //styles.murakkabatCellBox,
                        col.highlight && styles.baseLetterBox,
                    ]}
                    letterStyle={styles.cellLetter}
                />
            ))}
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
        fontSize: 22,
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
