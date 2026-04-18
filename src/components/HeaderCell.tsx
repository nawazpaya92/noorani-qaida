import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AppText from './AppText';

export default function HeaderCell({ title }: { title: string }) {
    return (
        <View style={[styles.cell, styles.headerCell]}>
            <AppText lang='ur' variant='caption' color='#1E3A8A' size={18} align='center' style={{ paddingTop: 4 }}>
                {title}
            </AppText>
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
        fontSize: 20,
        color: '#1E3A8A',
        textAlign: 'center',
        fontFamily: 'Naskh-SemiBold', // ✅ key line
        writingDirection: 'rtl',


    },
    headerCell: {
        backgroundColor: '#DBEAFE',
    },


});