import React from 'react';
import { Animated, StyleSheet, ViewStyle } from 'react-native';
import { useAppTheme } from '../theme/ThemeContext';
import AppText from '../components/AppText';
import useFadeIn from '../hooks/useFadeIn';


type AyatContainerProps = {
    text: string;
    style?: ViewStyle;
    textSize?: number;
    isDividerTobeShown?: boolean;
    lang?: 'ar' | 'ur';
};


export const TitleAyatContainer: React.FC<AyatContainerProps> = ({
    text,
    style,
    textSize = 26,
    lang = 'ar',
    isDividerTobeShown = true
}) => {
    const { theme } = useAppTheme();
    const fadeAnim = useFadeIn(900);


    return (
        <Animated.View style={[styles.ayahContainer, style, { opacity: fadeAnim }]}>
            <AppText
                size={textSize}
                align="center"
                color={theme.header}
                lang={lang}   // 🔥 IMPORTANT
                style={styles.ayahText}
            >
                {text}
            </AppText>


            {isDividerTobeShown &&
                <Animated.View
                    style={[
                        styles.divider,
                        { backgroundColor: theme.accent, opacity: fadeAnim },
                    ]}
                />
            }
        </Animated.View>

    );
};
const styles = StyleSheet.create({
    ayahContainer: {
        paddingHorizontal: 24,
        alignItems: 'center',
    },
    ayahText: {

        textAlign: 'center',
    },
    divider: {
        marginTop: 14,
        width: 120,
        height: 3,
        borderRadius: 2,
        opacity: 0.4,
    },
})