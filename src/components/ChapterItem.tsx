

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

type Props = {
  index: number;
  title: string;
  onPress: () => void;
  enabled?: boolean;
  statusLabel?: string;
};

export function ChapterItem({
  index,
  title,
  onPress,
  enabled = true,
  statusLabel,
}: Props) {
  const { theme } = useAppTheme();
  const scale = React.useRef(new Animated.Value(1)).current;


  const pressIn = () => {
    if (enabled && Platform.OS === 'ios')
      Animated.spring(scale, { toValue: 0.96, useNativeDriver: true }).start();
  };


  const pressOut = () => {
    if (enabled && Platform.OS === 'ios')
      Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();
  };


  return (
    <Pressable
      disabled={!enabled}
      onPressIn={pressIn}
      onPressOut={pressOut}
      onPress={onPress}
    >
      <Animated.View style={[styles.cardWrapper, !enabled && styles.disabledShadow, { transform: [{ scale }] }]}>
        <LinearGradient
          colors={enabled ? ['#FFFFFF', '#E0F2FE'] : ['#FFFFFF', '#F1F5F9']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.card, !enabled && styles.disabledCard]}
        >
          <View style={[styles.circle, { backgroundColor: enabled ? '#DBEAFE' : '#E5E7EB' }]}>
            <Text style={[styles.circleText, !enabled && styles.disabledCircleText]}>
              {index + 1}
            </Text>
          </View>

          <View style={styles.textBlock}>
            <Text style={[styles.title, { color: enabled ? theme.text : '#64748B' }]} numberOfLines={2}>
              {title}
            </Text>
          </View>

          <View style={[styles.statusPill, enabled ? styles.readyPill : styles.soonPill]}>
            <Text style={[styles.statusText, enabled ? styles.readyText : styles.soonText]}>
              {statusLabel ?? (enabled ? 'Start' : 'Coming soon')}
            </Text>
          </View>

          <Ionicons
            name={enabled ? 'chevron-forward' : 'lock-closed-outline'}
            size={18}
            color={enabled ? theme.muted : '#CBD5E1'}
          />
        </LinearGradient>
      </Animated.View>
    </Pressable>
  );
}


const styles = StyleSheet.create({
  cardWrapper: {
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.07,
    shadowRadius: 14,
    elevation: 3,
  },

  disabledShadow: {
    shadowOpacity: 0.03,
    elevation: 1,
  },


  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#E0E7FF',
  },

  disabledCard: {
    borderColor: '#E2E8F0',
  },


  circle: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },


  circleText: {
    fontSize: 17,
    fontWeight: '800',
    color: '#1D4ED8',
  },

  disabledCircleText: {
    color: '#94A3B8',
  },

  textBlock: {
    flex: 1,
    paddingRight: 8,
  },

  title: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '700',
  },

  statusPill: {
    borderRadius: 8,
    paddingHorizontal: 9,
    paddingVertical: 5,
    marginRight: 8,
  },

  readyPill: {
    backgroundColor: '#DCFCE7',
  },

  soonPill: {
    backgroundColor: '#F1F5F9',
  },

  statusText: {
    fontSize: 11,
    fontWeight: '800',
  },

  readyText: {
    color: '#047857',
  },

  soonText: {
    color: '#94A3B8',
  },
});
