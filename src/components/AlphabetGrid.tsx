import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { arabicLetters } from '../data/arabicLetters';
import { playArabicLetter } from '../utils/audio';
import LetterTile from './LetterTile';

import introAudio from '../assets/audio/introductions/1_title.m4a';

/* ---------------- Alphabet Grid ---------------- */

export default function AlphabetGrid() {
  const [activeLetterId, setActiveLetterId] = React.useState<number | null>(null);
  const playingIdRef = React.useRef<number | null>(null);

  // RTL-friendly rows (3 columns)
  const reverseRows = (arr: any[], rowSize: number) => {
    const result: any[] = [];
    for (let i = 0; i < arr.length; i += rowSize) {
      result.push(...arr.slice(i, i + rowSize).reverse());
    }
    return result;
  };

  const gridData = reverseRows(arabicLetters, 3);

  // Intro audio
  React.useEffect(() => {
    let stopIntro: (() => Promise<void>) | undefined;

    (async () => {
      const res = await playArabicLetter(introAudio);
      stopIntro = res?.stop;
    })();

    return () => {
      stopIntro?.();
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
        <LetterTile
          item={item}
          isActive={activeLetterId === item.id}
          onPlayStart={() => {
            playingIdRef.current = item.id;
            setActiveLetterId(item.id);
          }}
          onPlayEnd={(endedId) => {
            if (playingIdRef.current === endedId) {
              playingIdRef.current = null;
              setActiveLetterId(null);
            }
          }}
          wrapperStyle={styles.itemWrapper}
          boxStyle={styles.box}
          letterStyle={styles.letter}
          showEqualizer
        />
      )}
    />
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

  letter: {
    fontSize: 42,
    fontWeight: '700',
    color: '#1F2937',
  },
});
