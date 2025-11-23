import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Animated,
  Platform,
} from 'react-native';
import {useAppTheme} from '../theme/ThemeContext';

export default function ChapterItem({ index, title, onPress }: any) {
  const{theme} = useAppTheme();
  const scale = React.useRef(new Animated.Value(1)).current;

  const pressIn = () => {
    if (Platform.OS === 'ios')
      Animated.spring(scale, { toValue: 0.95, useNativeDriver: true }).start();
  };

  const pressOut = () => {
    if (Platform.OS === 'ios')
      Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();
  };

  return (
    <Pressable onPressIn={pressIn} onPressOut={pressOut} onPress={onPress}>
      <Animated.View
        style={[
          styles.card,
          {
            backgroundColor: theme.card,
            transform: [{ scale }],
          },
        ]}
      >
        <View style={[styles.circle, { backgroundColor: theme.grey }]}>
          <Text style={[styles.circleText]}>{index + 1}</Text>
        </View>

        <Text style={[styles.title, { color: theme.text }]}>
          {title}
        </Text>

        <View style={[styles.rightAccent, { backgroundColor: theme.accent }]} />
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 14,
    position: 'relative',
    marginBottom: 12,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  circle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  circleText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0b1cb7ff',
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
  },
  rightAccent: {
    width: 8,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.2,
  },
});
