import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { majmuaaAndMurakkabat } from '../data/MajmuaaAndMurakkabat';
import Cell from './LetterCell';
import HeaderCell from './HeaderCell';
import LetterTile from './LetterTile';
import LetterRow from './LetterRow';
import { useAppTheme } from '../theme/ThemeContext';

export default function MajmuaaTable({ majmuaa }) {
    const [activeCell, setActiveCell] = React.useState<any>(null);
    const { theme } = useAppTheme();

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                {/* Header */}
                <View style={[styles.headerRow, { backgroundColor: theme.lightBlue }]}>
                    {['اصل شکل', 'ابتدائی شکل', 'درمیانی شکل', 'آخری شکل'].map(title => (
                        <View key={title} style={styles.cellWrapper}>
                            <HeaderCell title={title} />
                        </View>
                    ))}
                </View>

                {/* Grid */}
                {majmuaa.map(item => (
                    <LetterRow
                        key={item.id}
                        item={item}
                        activeCell={activeCell}
                        onActivate={setActiveCell}
                    />
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    headerRow: {
        flexDirection: 'row-reverse',
        borderRadius: 14,
        paddingVertical: 8,
        marginBottom: 12,
        marginHorizontal: 6, // slight inset from card edges
    },
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


    container: {

    },

    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 18,
        paddingVertical: 12,   // ✅ vertical only
        paddingHorizontal: 0, // ❌ no horizontal padding

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.12,
        shadowRadius: 16,
        elevation: 8,
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
        fontSize: 28,
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

