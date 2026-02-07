import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import AppText from './AppText';

export default function ExpandableTitle({
    title,
    open,
}: {
    title: string;
    open: boolean;
}) {
    const rotateAnim = React.useRef(new Animated.Value(open ? 1 : 0)).current;

    React.useEffect(() => {
        Animated.timing(rotateAnim, {
            toValue: open ? 1 : 0,
            duration: 200,
            useNativeDriver: true,
        }).start();
    }, [open]);

    const rotate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['-90deg', '0deg'],
    });

    return (
        <LinearGradient
            colors={['#E0F2FE', '#BAE6FD']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.container}
        >
            {/* Rotating arrow */}
            <Animated.View style={{ transform: [{ rotate }] }}>
                <Ionicons name="chevron-back" size={22} color="#0369A1" />
            </Animated.View>

            {/* Book icon */}
            <View style={styles.iconWrap}>
                <Ionicons name="book-outline" size={22} color="#0369A1" />
            </View>

            {/* Title */}
            <AppText variant="heading" weight="bold" size={22} style={styles.text}>
                {title}
            </AppText>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 16,
        marginHorizontal: 10,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowRadius: 6,
        elevation: 2,
    },
    iconWrap: {
        width: 26,
        height: 26,
        borderRadius: 13,
        backgroundColor: 'rgba(255,255,255,0.7)',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
    },
    text: {
        flex: 1,
        textAlign: 'right',
        color: '#0F172A',
    },
});
