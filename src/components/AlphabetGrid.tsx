import React from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import { arabicLetters } from '../data/arabicLetters';
import { playArabicLetter } from '../utils/audio';
import LetterTile from './LetterTile';
import AppText from './AppText';
import { useAppTheme } from '../theme/ThemeContext';

import introAudio from '../assets/audio/introductions/1_title.m4a';

const COLUMN_COUNT = 4;

export default function AlphabetGrid() {
  const { theme } = useAppTheme();
  const [activeLetterId, setActiveLetterId] = React.useState<number | null>(null);
  const playingIdRef = React.useRef<number | null>(null);

  const reverseRows = (arr: any[], rowSize: number) => {
    const result: any[] = [];
    for (let i = 0; i < arr.length; i += rowSize) {
      result.push(...arr.slice(i, i + rowSize).reverse());
    }
    return result;
  };

  const gridData = reverseRows(arabicLetters, COLUMN_COUNT);

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
    <View style={styles.wrapper}>
      <View style={styles.summaryRow}>
        <View style={[styles.summaryPill, { backgroundColor: theme.lightBlue }]}>
          <AppText lang="ur" size={16} color={theme.blue}>
            کل 28 حروف
          </AppText>
        </View>
      </View>

      <View style={styles.panel}>
        <FlatList
          data={gridData}
          numColumns={COLUMN_COUNT}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.container}
          columnWrapperStyle={styles.columnRow}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 12,
    paddingBottom: 28,
  },
  summaryRow: {
    alignItems: 'center',
    marginBottom: 10,
  },
  summaryPill: {
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  panel: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingHorizontal: 10,
    paddingTop: 16,
    paddingBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 5,
  },
  container: {
    gap: 2,
  },
  columnRow: {
    justifyContent: 'space-between',
  },
  itemWrapper: {
    width: '24%',
    marginBottom: 10,
  },
  box: {
    aspectRatio: 1,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 10,
    elevation: 6,
  },
  letter: {
    fontSize: 34,
    color: '#0F172A',
    fontFamily: 'Quranic',
  },
});
