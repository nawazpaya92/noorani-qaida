import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { majmuaaAndMurakkabat } from '../data/MajmuaaAndMurakkabat';
import Cell from './LetterCell';
import HeaderCell from './HeaderCell';

import { useAppTheme } from '../theme/ThemeContext';
import LearningCard from './LearningCard';

export default function MajmuaaTable({ majmuaa,
    sectionId,
    playId,
    isPlaying,
    onPlayWord,
    onPlaySequence,
    isHamzah = false }: any) {
    const { theme } = useAppTheme();


    const defaultTitles = [
        'اصل شکل',
        'ابتدائی شکل',
        'درمیانی شکل',
        'آخری شکل',
    ];

    const hamzahTitles = [
        'ہمزہ اصلی شکل میں',
        'ہمزہ الف کی شکل میں',
        'ہمزہ واؤ کی شکل میں',
        'ہمزہ یا کی شکل میں',
    ];
    const titles = isHamzah ? hamzahTitles : defaultTitles;
    return (
        <View style={styles.container}>
            <View style={{ alignItems: 'center' }}>
                {/* Header */}
                <View style={[styles.headerRow, { backgroundColor: theme.lightBlue }]}>
                    {titles.map(title => (
                        <View key={title} style={styles.cellWrapper}>
                            <HeaderCell title={title} />
                        </View>
                    ))}
                </View>

                {/* Grid */}
                {majmuaa.map((item: any) => (
                    <LearningCard
                        key={item.id}
                        sectionId={sectionId}
                        item={item}
                        playId={playId}
                        isPlaying={isPlaying}
                        onPlayWord={onPlayWord}
                        onPlaySequence={onPlaySequence}
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
        marginHorizontal: 6, // slight horizontal margin to separate from screen edges
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
