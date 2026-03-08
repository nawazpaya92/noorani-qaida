import React from 'react';
import { ScrollView, StyleSheet, View, Dimensions } from 'react-native';
import AppHeader from '../../components/AppHeader';
import Screen from '../../components/Screen';
import { useNavigation } from '../../navigation/Router';
import { useAppTheme } from '../../theme/ThemeContext';
import MajmuaaTable from '../../components/MajmuaaTable';
import MurakkabatTable from '../../components/MurakkabatTable';
import { majmuaaAndMurakkabat } from '../../data/MajmuaaAndMurakkabat';
import AppText from '../../components/AppText';
import ExpandableSection from '../../components/ExpandableSection';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { playArabicLetter } from '../../utils/audio';

export default function JointLetters() {
    const navigation = useNavigation();
    const { theme } = useAppTheme();

    const [openId, setOpenId] = React.useState<string | null>(null);
    const scrollRef = React.useRef<ScrollView>(null);
    const sectionRefs = React.useRef<Record<string, View | null>>({});

    /** 🎧 Separate players */
    const [majmuaaPlayId, setMajmuaaPlayId] = React.useState<string | null>(null);
    const [majmuaaPlaying, setMajmuaaPlaying] = React.useState(false);

    const [murakkabatPlayId, setMurakkabatPlayId] = React.useState<string | null>(null);
    const [murakkabatPlaying, setMurakkabatPlaying] = React.useState(false);

    /** 🛑 stop everything expose */
    const stopAllPlayback = React.useCallback(() => {
        setMajmuaaPlaying(false);
        setMajmuaaPlayId(null);

        setMurakkabatPlaying(false);
        setMurakkabatPlayId(null);
    }, []);

    /**
     * 🟦 MAJMUAA PLAYER (returns Promise → REQUIRED for sequence)
     */
    const handlePlayMajmuaa = React.useCallback(
        (id: string, audio: any) => {
            stopAllPlayback();

            setMajmuaaPlayId(id);
            setMajmuaaPlaying(true);

            return new Promise<void>((resolve) => {
                playArabicLetter(audio, {
                    onFinish: () => {
                        setMajmuaaPlaying(false);
                        setMajmuaaPlayId(null);
                        resolve(); // ⭐ critical for sequence sync
                    },
                });
            });
        },
        [stopAllPlayback]
    );

    /**
     * 🟪 MURAKKABAT PLAYER
     */
    const handlePlayMurakkabat = React.useCallback(
        async (id: string, audio: any) => {
            stopAllPlayback();

            setMurakkabatPlayId(id);
            setMurakkabatPlaying(true);

            await playArabicLetter(audio, {
                onFinish: () => {
                    setMurakkabatPlaying(false);
                    setMurakkabatPlayId(null);
                },
            });
        },
        [stopAllPlayback]
    );

    /**
     * 🔽 Expand behaviour
     */
    const handleToggle = (id: string, index: number) => {
        const willOpen = openId !== id;
        setOpenId(willOpen ? id : null);

        if (willOpen) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        if (!willOpen || index < 4) return;

        setTimeout(() => {
            const sectionRef = sectionRefs.current[id];
            const scrollNode = scrollRef.current;
            if (!sectionRef || !scrollNode) return;

            sectionRef.measureInWindow((x, y, width, height) => {
                const windowHeight = Dimensions.get('window').height;
                scrollNode.scrollTo({
                    y: y + height - windowHeight + 60,
                    animated: true,
                });
            });
        }, 350);
    };

    return (
        <Screen>
            <LinearGradient colors={['#F8FBFF', '#EEF5FF']} style={{ flex: 1 }}>
                <AppHeader title="" onBack={navigation.pop} />

                <AppText
                    variant="heading"
                    weight="bold"
                    size={30}
                    align="center"
                    style={{ margin: 10, padding: 10 }}
                    color={theme.blue}
                >
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
                            {section.majmuaa.length > 0 &&
                                <View style={styles.section}>
                                    <MajmuaaTable
                                        majmuaa={section.majmuaa}
                                        playId={majmuaaPlayId}
                                        isPlaying={majmuaaPlaying}
                                        onPlayWord={handlePlayMajmuaa}
                                        isHamzah={section.isHamzah}
                                    />
                                </View>
                            }

                            {section.murakkabat.length > 0 &&
                                <View style={styles.section}>
                                    <MurakkabatTable
                                        murakkabat={section.murakkabat}
                                        playId={murakkabatPlayId}
                                        isPlaying={murakkabatPlaying}
                                        onPlayWord={handlePlayMurakkabat}
                                    />
                                </View>
                            }
                            {section.umumiMashq && section.umumiMashq?.length > 0 &&
                                <View style={styles.section}>
                                    <MurakkabatTable
                                        murakkabat={section.umumiMashq}
                                        playId={murakkabatPlayId}
                                        isPlaying={murakkabatPlaying}
                                        onPlayWord={handlePlayMurakkabat}
                                        hideHeader

                                    />
                                </View>
                            }
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
    section: {
        backgroundColor: '#F1F5F9',
        borderRadius: 24,
        paddingTop: 14,
        paddingBottom: 18,
        paddingHorizontal: 10,
        marginVertical: 12,
        marginHorizontal: 6,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 6 },
        elevation: 3,
    },
});
