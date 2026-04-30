import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { majmuaaAndMurakkabat } from '../data/MajmuaaAndMurakkabat';
import Cell from './LetterCell';
import HeaderCell from './HeaderCell';
import LetterTile from './LetterTile';
import LetterRow from './LetterRow';
import { useAppTheme } from '../theme/ThemeContext';
import MurakkabatRow from './LearningCard';
import AppText from './AppText';
import LearningCard from './LearningCard';


export default function MurakkabatTable({
  sectionId,
  murakkabat,
  playId,
  isPlaying,
  playbackPositionMillis,
  playbackDurationMillis,
  onPlayWord,
  hideHeader = false,
}: any) {


  const { theme } = useAppTheme();

  return (
    <View style={styles.container}>
      {/* Title */}
      <View style={{ alignItems: 'center' }}>
        <AppText
          variant="heading"
          weight="bold"
          size={20}
          align="center"
          style={{
            marginBottom: 10,
            backgroundColor: theme.blue,
            borderRadius: 10,
            paddingHorizontal: 14,
          }}
          color={theme.bg}
        >
          مرکبات کی شکلیں
        </AppText>
      </View>

      {/* Header */}
      {!hideHeader &&
        <View style={[styles.headerRow, { backgroundColor: theme.lightBlue }]}>
          {['اصل شکل', 'ابتدائی شکل', 'درمیانی شکل', 'آخری شکل', 'مجموعہ'].map(title => (
            <View key={title} style={styles.cellWrapper}>
              <HeaderCell title={title} />
            </View>
          ))}
        </View>
      }

      {/* Rows */}
      <View style={[styles.listContainer, hideHeader && styles.gridContainer]}>
        {murakkabat.map((item: any) => (
          <View
            key={item.id}
            style={hideHeader ? styles.gridItem : undefined} // ⭐ 4 per row
          >
            <LearningCard
              key={item.id}
              sectionId={sectionId}
              item={item}
              playId={playId}
              isPlaying={isPlaying}
              playbackPositionMillis={playbackPositionMillis}
              playbackDurationMillis={playbackDurationMillis}
              onPlayWord={onPlayWord}
            />
          </View>
        ))}
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {

  },
  listContainer: {
    flexDirection: 'column',
  },

  /* ⭐ Umumi Mashq grid */
  gridContainer: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  gridItem: {
    width: '24%',          // ⭐ 4 items per row
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#180909ff',
    borderRadius: 18,


    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },
  headerRow: {
    flexDirection: 'row-reverse',
    borderRadius: 14,
    paddingVertical: 8,
    marginBottom: 12,
    marginHorizontal: 6,
  },
  row: {
    flexDirection: 'row-reverse',
    marginBottom: 10,
  },
  cellWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  murakkabatCellWrapper: {
    flex: 1.15,        // 👈 key change
    alignItems: 'center',

  }
})
