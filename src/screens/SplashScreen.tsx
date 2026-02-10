import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';
import * as SplashScreen from 'expo-splash-screen';
import { TitleAyatContainer } from '../components/TitleAyatContainer';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppTheme } from '../theme/ThemeContext';

type Props = {
    onDone: () => void;
};

// Keep native splash visible until we manually hide it
SplashScreen.preventAutoHideAsync();

export default function SplashScreenWithLottie({ onDone }: Props) {
    const { theme } = useAppTheme();
    useEffect(() => {
        const prepare = async () => {
            // Hide native splash ONLY after this screen is mounted
            await SplashScreen.hideAsync();

            // Wait for full Lottie animation duration
            setTimeout(() => {
                onDone();
            }, 2200); // ← adjust to your animation length
        };

        prepare();
    }, []);

    return (
        <LinearGradient colors={theme.linearGradient as readonly [string, string]} style={styles.container}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <TitleAyatContainer text='نورانی مکتب' textSize={36} />
            </View>
            <View style={{ flex: 2, }}>
                <LottieView
                    source={require('../assets/lottie/splash_screen.json')} // place your lottie here
                    autoPlay
                    loop={true}
                    style={styles.lottie}
                />
            </View>
            <View style={{ flex: 0.5, justifyContent: 'flex-end', paddingBottom: 30 }}>
                <TitleAyatContainer text='مولانا اسماعیل اجملیؒ کے والد بزرگ کی علمی خدمت' textSize={16} isDividerTobeShown={false} />
            </View>

        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#d2ddf2ff', // match splash background
        alignItems: 'center',
        justifyContent: 'center',
    },
    lottie: {
        width: 260,
        height: 260,
    },
});