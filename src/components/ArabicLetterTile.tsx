import React from 'react';
import {
  Pressable,
  Animated,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { useAppTheme } from '../theme/ThemeContext';
import { playArabicLetter } from '../utils/audio';
import EqualizerBars from './EqualizerBars';

type Props = {
  item: any;
  isActive?: boolean;
  onPlayStart?: () => void;
  onPlayEnd?: (id: number) => void;

  // 👇 style overrides
  containerStyle?: any;
  textStyle?: any;
  showEqualizer?: boolean;
};

export default function ArabicLetterTile({
  item,
  isActive = false,
  onPlayStart,
  onPlayEnd,
  containerStyle,
  textStyle,
  showEqualizer = false,
}: Props) {
  const { theme } = useAppTheme();

  const scaleAnim = React.useRef(new Animated.Value(1)).current;
  const glowAnim = React.useRef(new Animated.Value(0)).current;
  const letterScale = React.useRef(new Animated.Value(1)).current;

  /* ---------------- Animations ---------------- */

  React.useEffect(() => {
    Animated.timing(glowAnim, {
      toValue: isActive ? 1 : 0,
      duration: 150,
      useNativeDriver: false,
    }).start();

    Animated.spring(letterScale, {
      toValue: isActive ? 1.3 : 1,
      speed: 20,
      bounciness: 6,
      useNativeDriver: false,
    }).start();
  }, [isActive]);

  const onPressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.94,
      speed: 30,
      bounciness: 0,
      useNativeDriver: false,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      speed: 20,
      bounciness: 8,
      useNativeDriver: false,
    }).start();
  };

  const onPress = async () => {
    if (isActive) return;

    onPlayStart?.();
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    playArabicLetter(item.audio, {
      onFinish: () => onPlayEnd?.(item.id),
    });
  };

  const borderColor = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#E5E7EB', theme.blue],
  });

  return (
    <Pressable
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
    >
      <Animated.View
        style={[
          styles.baseTile,
          containerStyle,
          {
            transform: [{ scale: scaleAnim }],
            borderColor,
          },
        ]}
      >
        <Animated.Text
          style={[
            styles.baseText,
            textStyle,
            { transform: [{ scale: letterScale }] },
          ]}
        >
          {item.letter}
        </Animated.Text>

        {showEqualizer && (
          <EqualizerBars active={isActive} color={theme.blue} />
        )}
      </Animated.View>
    </Pressable>
  );
}

/* ---------------- Base Styles ---------------- */

const styles = StyleSheet.create({
  baseTile: {
    borderWidth: 2,
    borderRadius: 14,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  baseText: {
    fontWeight: '700',
    color: '#111827',
  },
});
