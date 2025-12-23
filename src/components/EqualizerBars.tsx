import React from 'react';
import { View, Animated, StyleSheet } from 'react-native';

type Props = {
  active: boolean;
  color?: string;
};

export default function EqualizerBars({
  active,
  color = '#4CAF50',
}: Props) {
  const bars = React.useRef([
    new Animated.Value(0.4),
    new Animated.Value(0.7),
    new Animated.Value(0.5),
  ]).current;

  const opacityAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (!active) {
      // 🌫 Fade out
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 100,
        useNativeDriver: false,
      }).start();
      return;
    }

    // ✨ Fade in
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 140,
      useNativeDriver: false,
    }).start();

    const loops = bars.map((bar) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(bar, {
            toValue: Math.random(),
            duration: 260 + Math.random() * 220,
            useNativeDriver: false,
          }),
          Animated.timing(bar, {
            toValue: 0.3,
            duration: 260,
            useNativeDriver: false,
          }),
        ])
      )
    );

    loops.forEach(l => l.start());

    return () => {
      loops.forEach(l => l.stop());
    };
  }, [active]);

  // Keep mounted for fade-out
  if (!active && opacityAnim.__getValue?.() === 0) {
    return null;
  }

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.container,
        { opacity: opacityAnim },
      ]}
    >
      {bars.map((bar, i) => (
        <Animated.View
          key={i}
          style={[
            styles.bar,
            {
              backgroundColor: color,
              height: bar.interpolate({
                inputRange: [0, 1],
                outputRange: [5, 14],
              }),
            },
          ]}
        />
      ))}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
    gap: 3,
    zIndex: 10,
  },
  bar: {
    width: 3,
    borderRadius: 2,
    opacity: 0.9,
  },
});
