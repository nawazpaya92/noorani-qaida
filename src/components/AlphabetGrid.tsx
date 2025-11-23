import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Animated,
  Dimensions
} from 'react-native';
import { arabicLetters } from '../data/arabicLetters';
import { useAppTheme } from '../theme/ThemeContext';

export default function AlphabetGrid() {
  
  // Reverse each row of 3 items (RTL layout)
  const reverseRows = (arr: any[], rowSize: number) => {
    const result: any[] = [];
    for (let i = 0; i < arr.length; i += rowSize) {
      const row = arr.slice(i, i + rowSize).reverse();
      result.push(...row);
    }
    return result;
  };

  const gridData = reverseRows(arabicLetters, 3);

  return (
    <FlatList
      data={gridData}
      numColumns={3}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => <AnimatedTile item={item} />}
    />
  );
}

/* ---------------- Animated Tile ---------------- */

const AnimatedTile = ({ item }: any) => {
  const scaleAnim = React.useRef(new Animated.Value(1)).current;
  const { theme } = useAppTheme();

  const onPressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.92,
      useNativeDriver: true,
      speed: 30,
      bounciness: 0
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
      bounciness: 8
    }).start();
  };

  return (
    <Pressable
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      android_ripple={{ color: theme.grey }}
      style={styles.itemWrapper}
    >
      <Animated.View
        style={[
          styles.box,
          { backgroundColor: theme.grey, transform: [{ scale: scaleAnim }] }
        ]}
      >
        <Text style={styles.letter}>{item.letter}</Text>
      </Animated.View>
    </Pressable>
  );
};

/* ---------------- Styles ---------------- */

const styles = StyleSheet.create({
  container: { padding: 12 },

box: {
  aspectRatio: 1,
  borderRadius: 18,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#fff',

  shadowColor: '#000',
  shadowOffset: { width: 0, height: 10 },
  shadowOpacity: 0.25,
  shadowRadius: 10,
  elevation: 12,
},
itemWrapper: {
  width: '33.33%',   // exactly 3 columns
  padding: 6,
},
  letter: {
    fontSize: 42, // bigger font for bigger box
    fontWeight: '700',
    color: '#333'
  }
});
