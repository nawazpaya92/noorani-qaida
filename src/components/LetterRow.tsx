import React from "react";
import { StyleSheet, Text, View } from "react-native";
import LetterTile from "./LetterTile";

export default function LetterRow({ item, activeCell, onActivate }: any) {
    const isRowActive = activeCell?.rowId === item.id;

    const isActive = (form: string) =>
        isRowActive && activeCell.form === form;

    return (
        <View
            style={[
                styles.row,
                isRowActive && styles.activeRow,
            ]}
        >
            {(['isolated', 'initial', 'medial', 'final'] as const).map(
                (form, index) => (
                    <React.Fragment key={form}>
                        <LetterTile
                            item={{
                                id: item.id,
                                letter: item[form],
                                audio: item.audio,
                            }}
                            isActive={isActive(form)}
                            onPlayStart={() =>
                                onActivate({ rowId: item.id, form })
                            }
                            onPlayEnd={() => onActivate(null)}
                            compact
                            wrapperStyle={styles.cellWrapper}
                            boxStyle={[
                                styles.cellBox,
                                index === 0 && styles.baseLetterBox,
                            ]}
                            letterStyle={styles.cellLetter}
                        />

                        {/* ✅ Arrow only when row is active */}
                        {isRowActive && index < 3 && (
                            <Text style={styles.arrow}>←</Text>
                        )}
                    </React.Fragment>
                )
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
        fontSize: 24,
        fontWeight: '600',
    },
    /* 🔹 Header */
    row: {
        flexDirection: 'row-reverse',
        marginBottom: 10,
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
