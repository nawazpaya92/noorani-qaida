

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Animated,
  Platform,
} from 'react-native';
import { useAppTheme } from '../theme/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';


export function ChapterItem({ index, title, onPress }: any) {
  const { theme } = useAppTheme();
  const scale = React.useRef(new Animated.Value(1)).current;


  const pressIn = () => {
    if (Platform.OS === 'ios')
      Animated.spring(scale, { toValue: 0.96, useNativeDriver: true }).start();
  };


  const pressOut = () => {
    if (Platform.OS === 'ios')
      Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();
  };


  return (
    <Pressable onPressIn={pressIn} onPressOut={pressOut} onPress={onPress}>
      <Animated.View style={[styles.cardWrapper, { transform: [{ scale }] }]}>
        <LinearGradient
          colors={['#f9fbfcff', '#E0F2FE']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.card}
        >
          <View style={[styles.circle, { backgroundColor: theme.grey }]}>
            <Text style={styles.circleText}>{index + 1}</Text>
          </View>


          <Text style={[styles.title, { color: theme.text }]} numberOfLines={2}>
            {title}
          </Text>


          <Ionicons name="chevron-forward" size={18} color={theme.muted} />
        </LinearGradient>
      </Animated.View>
    </Pressable>
  );
}


const styles = StyleSheet.create({
  cardWrapper: {
    marginBottom: 14,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },


  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 18,
  },


  circle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },


  circleText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#3730a3',
  },


  title: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
  },
});