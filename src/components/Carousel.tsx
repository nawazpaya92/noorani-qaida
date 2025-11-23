import React, { useEffect, useRef } from 'react';
import {
  ScrollView,
  View,
  Text,
  Dimensions,
  StyleSheet
} from 'react-native';
import { arabicLetters } from '../data/arabicLetters';

const { width } = Dimensions.get('window');

export default function Carousel() {
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: false });
    }, 10);
  }, []);

  return (
    <ScrollView
      ref={scrollRef}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
    >
      {[...arabicLetters].reverse().map((letter) => (
        <View key={letter.id} style={styles.carouselItem}>
          <View style={styles.card}>
            <Text style={styles.carouselLetter}>{letter.letter}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {},
  carouselItem: {
    width,
    alignItems: 'center',
    paddingVertical: 40
  },
  card: {
    width: width * 0.8,
    height: width * 0.8,
    backgroundColor: '#fff',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    elevation: 8,
    shadowOpacity: 0.2,
    shadowRadius: 10
  },
  carouselLetter: {
    fontSize: 160,
    fontWeight: 'bold',
    color: '#333'
  }
});
