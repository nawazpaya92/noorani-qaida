import React from "react";
import { StyleSheet, Text, View } from "react-native";
import LetterTile from "./LetterTile";

export default function LetterRow({ item, activeCell, onActivate }: any) {
    const isRowActive = activeCell?.rowId === item.id;

    const isActive = (form: string) =>
        isRowActive && activeCell.form === form;

    return (
        <View

            style={[styles.majmuaCard]}>
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
    majmuaCard: {
        flex: 1,
        marginHorizontal: 4,
        marginVertical: 6,

        backgroundColor: '#F8FBFF',     // very soft blue tint
        flexDirection: 'row-reverse',
        borderRadius: 16,



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

    activeRow: {
        backgroundColor: '#EEF5FF',   // softer highlight

    },
    baseLetterBox: {
        backgroundColor: '#EFF6FF', // very soft blue
        borderWidth: 1,
        borderColor: '#93C5FD',
    },
    cellBox: {
        height: 66,
        borderRadius: 14,

        // 🌙 ultra-soft premium shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.08,   // 👈 KEY change (was too strong)
        shadowRadius: 6,

        elevation: 2,          // 👈 reduce Android depth
    },

    cellLetter: {
        fontSize: 22,
        color: '#111827',
        fontFamily: 'Naskh-SemiBold',
        writingDirection: 'rtl',
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
        borderRadius: 18,
        backgroundColor: '#F8FAFC',   // ultra-soft surface
        marginBottom: 14,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: '#EEF2F7',       // subtle separation
    },



});
