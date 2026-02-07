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
import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions } from 'react-native';
import * as Haptics from 'expo-haptics';
import { playArabicLetter } from '../../utils/audio';



export default function JointLetters() {
    const navigation = useNavigation();
    const { theme } = useAppTheme();
    const [openId, setOpenId] = React.useState<string | null>(null);
    const scrollRef = React.useRef<ScrollView>(null);
    const sectionRefs = React.useRef<Record<string, View | null>>({});
    const [playId, setPlayId] = React.useState<string | null>(null);
    const [isPlaying, setIsPlaying] = React.useState(false);

    const handlePlayWord = async (id: string, audio: any) => {
        setPlayId(id);
        setIsPlaying(true);

        await playArabicLetter(audio, {
            onFinish: () => {
                setIsPlaying(false);
                setPlayId(null);
            },
        });
    };
    const handleToggle = (id: string, index: number) => {
        const willOpen = openId !== id;
        setOpenId(willOpen ? id : null);

        if (willOpen) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        // 🚫 No scroll for first 4 sections
        if (!willOpen || index < 4) return;

        setTimeout(() => {
            const sectionRef = sectionRefs.current[id];
            const scrollNode = scrollRef.current;

            if (!sectionRef || !scrollNode) return;

            sectionRef.measureInWindow((x, y, width, height) => {
                const windowHeight = Dimensions.get('window').height;
                const sectionBottom = y + height;

                scrollNode.scrollTo({
                    y: sectionBottom - windowHeight + 60,
                    animated: true,
                });
            });
        }, 350);
    };




    return (

        <Screen>
            <LinearGradient
                colors={['#F8FBFF', '#EEF5FF']}
                style={{ flex: 1 }}
            >

                <AppHeader title="" onBack={navigation.pop} />
                <AppText variant='heading' weight='bold' size={30} align='center' style={{ margin: 10, padding: 10 }} color={theme.blue}>
                    مرکبات کی ابتدائی، درمیانی اور آخری شکلیں
                </AppText>
                <ScrollView ref={scrollRef} contentContainerStyle={styles.container}>
                    {majmuaaAndMurakkabat.map((section, index) => (
                        <ExpandableSection
                            key={section.id}
                            title={section.title}
                            open={openId === section.id}
                            ref={(ref) => (sectionRefs.current[section.id] = ref)}
                            onToggle={() => handleToggle(section.id, index)}

                        >
                            <MajmuaaTable majmuaa={section.majmuaa} />

                            <View style={styles.murakkabatSection}>
                                <MurakkabatTable
                                    murakkabat={section.murakkabat}
                                    playId={playId}
                                    isPlaying={isPlaying}
                                    onPlayWord={handlePlayWord}
                                />
                            </View>
                        </ExpandableSection>
                    ))}

                </ScrollView>
            </LinearGradient>
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
    murakkabatSection: {
        backgroundColor: '#F1F5F9',   // soft grey-blue panel
        borderRadius: 24,
        paddingTop: 14,
        paddingBottom: 18,
        paddingHorizontal: 10,
        marginVertical: 12,
        marginHorizontal: 6,

        // subtle shadow → balances Majmuaa card weight
        shadowColor: '#000',
        shadowOpacity: 0.4,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 6 },
        elevation: 3,
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
