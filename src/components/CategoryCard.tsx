import React, { useRef } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Animated,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { playArabicLetter } from '../utils/audio';
import { useAppTheme } from '../theme/ThemeContext';

type Props = {
  title: string;
  letters: any[];
  audio: any;
};

export default function CategoryCard({ title, letters, audio }: Props) {
  const scale = useRef(new Animated.Value(1)).current;
  const glow = useRef(new Animated.Value(0)).current;
  const { theme } = useAppTheme();

  const borderColor = glow.interpolate({
    inputRange: [0, 1],
    outputRange: ['#E5E7EB', theme.blue],
  });

  const onPressIn = () => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 0.97,
        speed: 30,
        useNativeDriver: false,
      }),
      Animated.timing(glow, {
        toValue: 1,
        duration: 120,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const onPressOut = () => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1,
        speed: 20,
        useNativeDriver: false,
      }),
      Animated.timing(glow, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const onPress = async () => {
    if (!audio) return;

    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    playArabicLetter(audio);
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
    >
      <Animated.View
        style={[
          styles.card,
          {
            transform: [{ scale }],
            borderColor,
          },
        ]}
      >
        {/* Title */}
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.count}>({letters.length})</Text>
        </View>

        {/* Letters */}
        <View style={styles.grid}>
          {letters.map((item) => (
            <View key={item.id} style={styles.tile}>
              <Text style={styles.letter}>{item.letter}</Text>
            </View>
          ))}
        </View>
      </Animated.View>
    </Pressable>
  );
}
  const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    borderRadius: 18,
    padding: 12,
    borderWidth: 1,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },

  header: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },

  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
  },

  count: {
    fontSize: 14,
    opacity: 0.6,
  },

  grid: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },

  tile: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
  },

  letter: {
    fontSize: 20,
    fontWeight: '700',
  },
});


