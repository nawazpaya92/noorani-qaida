import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Animated,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { arabicLetters } from '../data/arabicLetters';
import { useAppTheme } from '../theme/ThemeContext';
import { playArabicLetter } from '../utils/audio';
import EqualizerBars from './EqualizerBars';

import introAudio from '../assets/audio/introductions/1_title.m4a';

/* ---------------- Alphabet Grid ---------------- */

export default function AlphabetGrid() {
  const [activeLetterId, setActiveLetterId] = React.useState<number | null>(null);
const playingIdRef = React.useRef<number | null>(null);

  // RTL-friendly rows
  const reverseRows = (arr: any[], rowSize: number) => {
    const result: any[] = [];
    for (let i = 0; i < arr.length; i += rowSize) {
      result.push(...arr.slice(i, i + rowSize).reverse());
    }
    return result;
  };

  const gridData = reverseRows(arabicLetters, 3);
 React.useEffect(() => {
  let stopIntro: (() => Promise<void>) | undefined;

  (async () => {
    const res = await playArabicLetter(introAudio);
    stopIntro = res?.stop;
  })();

  return () => {
    // 👈 THIS runs when Back is pressed
    if (stopIntro) {
      stopIntro();
    }
  };
}, []);

  return (
    <FlatList
      data={gridData}
      numColumns={3}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        <AnimatedTile
          item={item}
          isActive={activeLetterId === item.id}
          onPlayStart={() => {
             playingIdRef.current = item.id;
            setActiveLetterId(item.id)}}
          onPlayEnd={(endedId) => {
              if (playingIdRef.current === endedId) {
      playingIdRef.current = null;
      setActiveLetterId(null);
    }
          }}
        />
      )}
    />
  );
}

/* ---------------- Animated Tile ---------------- */

function AnimatedTile({
  item,
  isActive,
  onPlayStart,
  onPlayEnd,
}: {
  item: any;
  isActive: boolean;
  onPlayStart: () => void;
  onPlayEnd: (endedId: number) => void;
}) {
  const { theme } = useAppTheme();

  const scaleAnim = React.useRef(new Animated.Value(1)).current;
  const glowAnim = React.useRef(new Animated.Value(0)).current;
  const traceAnim = React.useRef(new Animated.Value(0)).current;
  const letterScale = React.useRef(new Animated.Value(1)).current;


  // Glow animation
  React.useEffect(() => {
    Animated.timing(glowAnim, {
      toValue: isActive ? 1 : 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  }, [isActive]);

  // Letter trace
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
  React.useEffect(() => {
  Animated.spring(letterScale, {
    toValue: isActive ?1.3: 1, // 👈 adjust if needed
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

    onPlayStart();
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    playArabicLetter(item.audio, {
      onFinish: () => {
          onPlayEnd(item.id);
      },
    });
  };

  const borderColor = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#E5E7EB', theme.blue],
  });

  const shadowOpacity = glowAnim.interpolate({
  inputRange: [0, 1],
  outputRange: [0.22, 0.9], // 👈 starts from base shadow
});

  return (
    <Pressable
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={styles.itemWrapper}
    >
      <Animated.View
        style={[
          styles.box,
          {
            transform: [{ scale: scaleAnim }],
            borderColor,
          shadowColor: isActive ? theme.blue : '#000',
shadowOpacity: isActive ? shadowOpacity : 0.1,
shadowRadius: isActive ? 14 : 10,
          },
        ]}
      >
        {/* Letter */}
        <View style={styles.letterWrap}>
          {isActive && (
            <Animated.Text
              style={[
                styles.letterStroke,
                {
                  opacity: traceAnim,
                },
              ]}
            >
              {item.letter}
            </Animated.Text>
          )}
          <Animated.Text
  style={[
    styles.letter,
    {
      transform: [{ scale: letterScale }],
    },
  ]}
>
  {item.letter}
</Animated.Text>
        </View>

        {/* Equalizer */}
        <EqualizerBars active={isActive} color={theme.blue} />
      </Animated.View>
    </Pressable>
  );
}

/* ---------------- Styles ---------------- */

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },

  itemWrapper: {
    width: '33.33%',
    padding: 6,
  },

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
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },

  letter: {
    fontSize: 42,
    fontWeight: '700',
    color: '#1F2937',
  },
});
