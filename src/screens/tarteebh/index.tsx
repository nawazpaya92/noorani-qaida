import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AppHeader from '../../components/AppHeader';
import { useAppTheme } from '../../theme/ThemeContext';
import { useNavigation } from '../../navigation/navigationContext';
import { arabicLetters } from '../../data/arabicLetters';
import Screen from '../../components/Screen';
import LetterTile from '../../components/LetterTile';
import AppText from '../../components/AppText';

const getLettersByDots = (dots: number) =>
  arabicLetters.filter((l: any) => l.dots === dots);

const SPECIAL_LETTERS = ['ص', 'ض', 'ط', 'ظ', 'خ', 'غ', 'ق'];

export default function Tarteebh() {
  const { theme } = useAppTheme();
  const navigation = useNavigation();
  const [activeLetterId, setActiveLetterId] = React.useState<number | null>(null);
  const playingIdRef = React.useRef<number | null>(null);

  const noDotLetters = getLettersByDots(0);
  const oneDotLetters = getLettersByDots(1);
  const twoDotLetters = getLettersByDots(2);
  const threeDotLetters = getLettersByDots(3);
  const specialLetters = arabicLetters.filter((l: any) =>
    SPECIAL_LETTERS.includes(l.letter)
  );
  const dottedLetters = [...oneDotLetters, ...twoDotLetters, ...threeDotLetters];

  const handlePlayStart = (id: number) => {
    playingIdRef.current = id;
    setActiveLetterId(id);
  };

  const handlePlayEnd = (endedId: number) => {
    if (playingIdRef.current === endedId) {
      playingIdRef.current = null;
      setActiveLetterId(null);
    }
  };

  return (
    <Screen backgroundColor="#F8FBFF">
      <LinearGradient colors={['#F8FBFF', '#EEF5FF']} style={styles.gradient}>
        <AppHeader title="" onBack={navigation.pop} />

        <View style={styles.hero}>
          <AppText
            variant="heading"
            lang="ur"
            size={32}
            align="center"
            color={theme.blue}
          >
            ترتیبِ حروف
          </AppText>
          <AppText
            lang="ur"
            size={18}
            align="center"
            color="#4B5563"
            style={styles.subtitle}
          >
            نقطوں کے اعتبار سے
          </AppText>
        </View>

        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
          <View style={styles.overviewPanel}>
            <OverviewStat
              title="بغیر نقطے والے حروف"
              count={noDotLetters.length}
              accent="#DBEAFE"
            />
            <OverviewStat
              title="نقطے والے حروف"
              count={dottedLetters.length}
              accent="#E0F2FE"
            />
          </View>

          <LetterGroupCard
            title="بغیر نقطے والے حروف"
            letters={noDotLetters}
            activeLetterId={activeLetterId}
            columns={5}
            onPlayStart={handlePlayStart}
            onPlayEnd={handlePlayEnd}
          />

          <LetterGroupCard
            title="ایک نقطے والے حروف"
            letters={oneDotLetters}
            activeLetterId={activeLetterId}
            columns={5}
            onPlayStart={handlePlayStart}
            onPlayEnd={handlePlayEnd}
          />

          <LetterGroupCard
            title="دو نقطے والے حروف"
            letters={twoDotLetters}
            activeLetterId={activeLetterId}
            columns={5}
            onPlayStart={handlePlayStart}
            onPlayEnd={handlePlayEnd}
          />

          <LetterGroupCard
            title="تین نقطے والے حروف"
            letters={threeDotLetters}
            activeLetterId={activeLetterId}
            columns={4}
            onPlayStart={handlePlayStart}
            onPlayEnd={handlePlayEnd}
          />

          <LetterGroupCard
            title="نقطے والے تمام حروف"
            letters={dottedLetters}
            activeLetterId={activeLetterId}
            columns={5}
            onPlayStart={handlePlayStart}
            onPlayEnd={handlePlayEnd}
          />

          <LetterGroupCard
            title="سات حروف"
            letters={specialLetters}
            activeLetterId={activeLetterId}
            columns={4}
            onPlayStart={handlePlayStart}
            onPlayEnd={handlePlayEnd}
          />
        </ScrollView>
      </LinearGradient>
    </Screen>
  );
}

function OverviewStat({
  title,
  count,
  accent,
}: {
  title: string;
  count: number;
  accent: string;
}) {
  return (
    <View style={styles.statCard}>
      <View style={[styles.statBadge, { backgroundColor: accent }]}>
        <AppText lang="ur" size={22} align="center" color="#1E3A8A">
          {count}
        </AppText>
      </View>
      <AppText lang="ur" size={18} align="center" color="#1F2937">
        {title}
      </AppText>
    </View>
  );
}

function LetterGroupCard({
  title,
  letters,
  activeLetterId,
  onPlayStart,
  onPlayEnd,
  columns,
  compactTiles = false,
}: {
  title: string;
  letters: any[];
  activeLetterId: number | null;
  onPlayStart: (id: number) => void;
  onPlayEnd: (id: number) => void;
  columns: number;
  compactTiles?: boolean;
}) {
  const tileSize = compactTiles ? 56 : 66;
  const tileFont = compactTiles ? 33 : 38;
  const tileWidth = `${100 / columns}%` as `${number}%`;

  return (
    <View style={styles.groupCard}>
      <View style={styles.groupHeader}>
        <AppText lang="ur" size={20} align="center" color="#1E3A8A">
          {title}
        </AppText>
        <View style={styles.countPill}>
          <AppText lang="ur" size={15} align="center" color="#1E3A8A">
            {letters.length} حروف
          </AppText>
        </View>
      </View>

      <View style={[styles.grid, compactTiles && styles.gridCompact]}>
        {letters.map((item) => (
          <View key={item.id} style={[styles.tileSlot, { width: tileWidth }]}>
            <LetterTile
              item={item}
              compact
              isActive={activeLetterId === item.id}
              onPlayStart={() => onPlayStart(item.id)}
              onPlayEnd={onPlayEnd}
              wrapperStyle={styles.tilePressable}
              boxStyle={[
                styles.tileBox,
                { width: tileSize, height: tileSize, borderRadius: compactTiles ? 12 : 14 },
              ]}
              letterStyle={{ fontSize: tileFont, fontFamily: 'Quranic', color: '#0F172A' }}
            />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  hero: {
    paddingHorizontal: 20,
    paddingTop: 6,
    paddingBottom: 10,
  },
  subtitle: {
    marginTop: -4,
  },
  container: {
    paddingHorizontal: 12,
    paddingBottom: 28,
  },
  overviewPanel: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 12,
    marginHorizontal: 6,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 5,
    flexDirection: 'row-reverse',
    gap: 10,
  },
  statCard: {
    flex: 1,
    borderRadius: 18,
    backgroundColor: '#F8FBFF',
    paddingVertical: 16,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 126,
  },
  statBadge: {
    minWidth: 58,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginBottom: 10,
  },
  groupCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 12,
    marginHorizontal: 6,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 5,
  },
  groupHeader: {
    backgroundColor: '#DBEAFE',
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 12,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  countPill: {
    backgroundColor: '#FFFFFFCC',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  grid: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridCompact: {
    justifyContent: 'space-between',
  },
  tileSlot: {
    alignItems: 'center',
    marginBottom: 10,
  },
  tilePressable: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tileBox: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
});
