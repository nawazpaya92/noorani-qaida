import React, { useRef, useEffect } from 'react';
import { View, Image, Animated, StyleSheet } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';

const IMG_WIDTH = 440;
const IMG_HEIGHT = 190;

// Shimmer band thickness (center area)
const BAND_RATIO = 0.55;
const BAND_HEIGHT = IMG_HEIGHT * BAND_RATIO;
const BAND_TOP = (IMG_HEIGHT - BAND_HEIGHT) / 2;

export default function BismillahShimmer() {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const translateX = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-200, IMG_WIDTH + 200],
  });

  return (
    <View style={styles.container}>
      <MaskedView
        style={{ width: IMG_WIDTH, height: IMG_HEIGHT }}
        maskElement={
          <Image
            source={require('../assets/images/bismillah.jpg')}
            style={{ width: IMG_WIDTH, height: IMG_HEIGHT, resizeMode: 'contain' }}
          />
        }
      >
        {/* Base Image */}
        <Image
          source={require('../assets/images/bismillah.jpg')}
          style={{ width: IMG_WIDTH, height: IMG_HEIGHT, resizeMode: 'contain' }}
        />

        {/* Shimmer band */}
        <Animated.View
          style={[
            styles.shimmerWrapper,
            { transform: [{ translateX }] },
          ]}
        >
          <LinearGradient
            colors={[
              'rgba(255,255,255,0)',
              'rgba(255,255,255,0.4)',
              'rgba(255,255,255,0.8)',
              'rgba(255,255,255,0.4)',
              'rgba(255,255,255,0)'
            ]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.shimmer}
          />
        </Animated.View>
      </MaskedView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
  },

  shimmerWrapper: {
    position: 'absolute',
    top: BAND_TOP,
    left: -200,
    width: IMG_WIDTH + 400,
    height: BAND_HEIGHT,
  },

  shimmer: {
    flex: 1,
    borderRadius: 20,
  },
});
