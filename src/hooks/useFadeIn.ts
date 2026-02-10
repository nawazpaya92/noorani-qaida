import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

export default function useFadeIn(duration: number = 900) {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration,
            useNativeDriver: true,
        }).start();
    }, [duration, fadeAnim]);

    return fadeAnim;
}
