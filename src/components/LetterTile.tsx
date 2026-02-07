import React from 'react';
import {
  View,
  Text,
  Pressable,
  Animated,
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
  onPlayEnd?: (endedId: number) => void;

  // style overrides
  wrapperStyle?: any;
  boxStyle?: any;
  letterStyle?: any;
  compact?: boolean;
  showEqualizer?: boolean;

};

export default function LetterTile({
  item,
  isActive = false,
  onPlayStart,
  onPlayEnd,
  wrapperStyle,
  boxStyle,
  letterStyle,
  showEqualizer = false,
  compact = false,
  mode = 'tap',   // 👈 NEW (default safe)
}: Props & { mode?: 'tap' | 'timed' }) {
  const { theme } = useAppTheme();

  const isTimed = mode === 'timed';

  const scaleAnim = React.useRef(new Animated.Value(1)).current;
  const glowAnim = React.useRef(new Animated.Value(0)).current;
  const traceAnim = React.useRef(new Animated.Value(0)).current;
  const letterScale = React.useRef(new Animated.Value(1)).current;

  const shadowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.22, 0.85],
  });

  const shadowRadius = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [10, 16],
  });

  // Glow
  React.useEffect(() => {
    Animated.spring(letterScale, {
      toValue: isTimed
        ? (isActive ? 1.08 : 1)        // ✨ gentle glow for Murakkabat
        : (isActive ? (compact ? 1.05 : 1.3) : 1), // old behavior
      speed: 20,
      bounciness: isTimed ? 0 : (compact ? 2 : 6),
      useNativeDriver: false,
    }).start();
  }, [isActive, isTimed]);


  // Trace
  React.useEffect(() => {
    if (!isActive) {
      traceAnim.setValue(0);
      return;
    }
    Animated.timing(traceAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: false,
    }).start();
  }, [isActive]);

  // Letter scale
  React.useEffect(() => {
    Animated.spring(letterScale, {
      toValue: isActive ? (compact ? 1.05 : 1.3) : 1,
      speed: 20,
      bounciness: compact ? 2 : 6,
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

    // 🔹 Only vibrate in tap mode (not timed)
    if (!isTimed) {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    playArabicLetter(item.audio, {
      onFinish: () => {
        onPlayEnd?.(item.id);
      },
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
      style={wrapperStyle}
    >
      <Animated.View
        style={[
          styles.box,
          boxStyle,
          {
            transform: [{ scale: scaleAnim }],
            borderColor,

            backgroundColor: isActive ? '#F2F8FF' : '#FFFFFF',

            shadowColor: isActive ? theme.blue : '#000',
            shadowOpacity: isActive ? 0.45 : 0.22,
            shadowRadius: isActive ? 18 : 12,
            shadowOffset: {
              width: 0,
              height: isActive ? 10 : 6,
            },
            elevation: isActive ? 14 : 10,
          },
        ]}
      >
        <View style={styles.letterWrap}>
          {(!isTimed && isActive && !compact) && (
            <Animated.Text
              style={[
                styles.letterStroke,
                { opacity: traceAnim },
              ]}
            >
              {item.letter}
            </Animated.Text>
          )}

          <Animated.Text
            style={[
              styles.letter,
              letterStyle,
              { transform: [{ scale: letterScale }] },
            ]}
          >
            {item.letter}
          </Animated.Text>
        </View>

        {showEqualizer && (
          <EqualizerBars active={isActive} color={theme.blue} />
        )}

      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  box: {
    aspectRatio: 1,
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 12,
    elevation: 10,
  },
  letterWrap: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  letterStroke: {
    position: 'absolute',
    fontSize: 46,
    fontWeight: '800',
    color: '#fff',
    opacity: 0.45,
    textShadowColor: '#fff',
    textShadowRadius: 10,
  },
  letter: {
    fontSize: 42,
    fontWeight: '700',
    color: '#1F2937',
    fontFamily: 'Naskh-Bold',
  },
});
