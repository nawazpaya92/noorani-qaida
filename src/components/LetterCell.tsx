import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

export default function Cell({
    value,
    onPress,
}: {
    value: string;
    onPress?: () => void;
}) {
    return (
        <Pressable onPress={onPress} style={styles.cell}>
            <Text style={styles.cellText}>{value}</Text>
        </Pressable>
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
    cellText: {
        fontSize: 28,
        fontWeight: '700',
        color: '#111827',
    },

});
