import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { majmuaaAndMurakkabat } from '../data/MajmuaaAndMurakkabat';
import Cell from './LetterCell';
import HeaderCell from './HeaderCell';
import LetterTile from './LetterTile';
import LetterRow from './LetterRow';
import { useAppTheme } from '../theme/ThemeContext';
import MurakkabatRow from './MurakkabatRow';
import AppText from './AppText';


export default function MurakkabatTable({
  murakkabat,
  playId,
  isPlaying,
  onPlayWord,
}: any) {
  const [activeCell, setActiveCell] = React.useState<any>(null);

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
            margin: 10,
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
      <View style={[styles.headerRow, { backgroundColor: theme.lightBlue }]}>
        {['اصل شکل', 'ابتدائی شکل', 'درمیانی شکل', 'آخری شکل', 'مجموعہ'].map(title => (
          <View key={title} style={styles.cellWrapper}>
            <HeaderCell title={title} />
          </View>
        ))}
      </View>

      {/* Rows */}
      {murakkabat.map(item => (
        <MurakkabatRow
          key={item.id}
          item={item}
          playId={playId}
          isPlaying={isPlaying}
          onPlayWord={onPlayWord}
        />
      ))}
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingVertical: 12,   // ✅ vertical only
    paddingHorizontal: 10, // ❌ no horizontal padding

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

