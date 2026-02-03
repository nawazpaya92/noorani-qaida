import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function HeaderCell({ title }: { title: string }) {
    return (
        <View style={[styles.cell, styles.headerCell]}>
            <Text style={styles.headerText}>{title}</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    cell: {
        flex: 1,
        paddingVertical: 14,
        alignItems: 'center',
        justifyContent: 'center',
        borderLeftWidth: 1,
        borderColor: '#E5E7EB',
    },
    headerText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#1E3A8A',
        textAlign: 'center',
    },
    headerCell: {
        backgroundColor: '#DBEAFE',
    },


});