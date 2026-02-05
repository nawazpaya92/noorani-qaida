import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AppHeader from '../../components/AppHeader';
import LetterFormsTable from '../../components/MajmuaaTable';
import Screen from '../../components/Screen';
import { useNavigation } from '../../navigation/Router';
import { useAppTheme } from '../../theme/ThemeContext';
import MajmuaaTable from '../../components/MajmuaaTable';
import MurakkabatTable from '../../components/MurakkabatTable';
import { majmuaaAndMurakkabat } from '../../data/MajmuaaAndMurakkabat';
import AppText from '../../components/AppText';
import ExpandableSection from '../../components/ExpandableSection';
import { LinearGradient } from 'react-native-svg';

export default function JointLetters() {
    const navigation = useNavigation();
    const { theme } = useAppTheme();
    const [openId, setOpenId] = React.useState<string | null>(null);
    const scrollRef = React.useRef<ScrollView>(null);

    return (

        <Screen>

            <AppHeader title="" onBack={navigation.pop} />
            <AppText variant='heading' weight='bold' size={24} align='center' style={{ margin: 10 }} color={theme.blue}>
                مرکبات کی ابتدائی، درمیانی اور آخری شکلیں
            </AppText>
            <ScrollView ref={scrollRef} contentContainerStyle={styles.container}>
                {majmuaaAndMurakkabat.map((section) => (
                    <ExpandableSection key={section.id} title={section.title} open={openId === section.id}
                        onToggle={() =>
                            setOpenId((prev) => (prev === section.id ? null : section.id))

                        }>
                        <MajmuaaTable majmuaa={section.majmuaa} />

                        <MurakkabatTable murakkabat={section.murakkabat} />
                    </ExpandableSection>
                ))}

            </ScrollView>
        </Screen>
    );
}

const styles = StyleSheet.create({

    container: {
        padding: 5,
        marginVertical: 20,
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
        fontFamily: 'Amiri-Bold',
    },

    rightSpacer: {
        width: 40,               // 👈 same width as back button
    },
});
