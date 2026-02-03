import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AppHeader from '../../components/AppHeader';
import LetterFormsTable from '../../components/LetterFormsTable';
import Screen from '../../components/Screen';
import { useNavigation } from '../../navigation/Router';
import { useAppTheme } from '../../theme/ThemeContext';

export default function JointLetters() {
    const navigation = useNavigation();
    const { theme } = useAppTheme();

    return (
        <Screen>
            <AppHeader title="Joint Letters" onBack={navigation.pop} />

            <Text style={styles.headerTitle}>
                مرکبات کی ابتدائی، درمیانی اور آخری شکلیں
            </Text>



            <ScrollView contentContainerStyle={styles.container}>
                <LetterFormsTable />
            </ScrollView>
        </Screen>
    );
}

const styles = StyleSheet.create({

    container: {
        padding: 20,
    },
    headerRow: {
        alignItems: 'center',
        height: 64,
        paddingHorizontal: 12,
    },

    backBtn: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },

    backText: {
        fontSize: 34,
        lineHeight: 34,
        fontWeight: '600',
    },

    headerTitleWrapper: {
        flex: 1,                 // 👈 center takes remaining space
        alignItems: 'center',
        paddingHorizontal: 8,
    },

    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        textAlign: 'center',
        margin: 12,
        lineHeight: 28,          // Arabic readability
        color: '#1E3A8A',
        fontFamily: 'Amiri-Bold',
    },

    rightSpacer: {
        width: 40,               // 👈 same width as back button
    },
});
