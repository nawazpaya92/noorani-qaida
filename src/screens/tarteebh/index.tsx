import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Animated,
} from 'react-native';
import AppHeader from '../../components/AppHeader';
import { useAppTheme } from '../../theme/ThemeContext';
import { useNavigation } from '../../navigation/navigationContext';
import { arabicLetters } from '../../data/arabicLetters';

import Screen from '../../components/Screen';
import LetterTile from '../../components/LetterTile';
import AppText from '../../components/AppText';


/* ---------------- Helpers ---------------- */

const getLettersByDots = (dots: number) =>
  arabicLetters.filter((l: any) => l.dots === dots);

const SPECIAL_LETTERS = ['ص', 'ض', 'ط', 'ظ', 'خ', 'غ', 'ق'];


/* ---------------- Screen ---------------- */

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

  return (
    <Screen backgroundColor={theme.bg}>
      <AppHeader title="Tarteebh" onBack={navigation.pop} />

      <ScrollView contentContainerStyle={styles.container}>
        {/* Top Cards */}
        <View style={styles.topRow}>
          <SmallLetterTile
            title="بغیر نقطے والے حروف"
            letters={noDotLetters}
            activeLetterId={activeLetterId}
            isThreeRows={true}
            onPlayStart={(id) => {
              playingIdRef.current = id;
              setActiveLetterId(id);
            }}
            onPlayEnd={(endedId) => {
              if (playingIdRef.current === endedId) {
                playingIdRef.current = null;
                setActiveLetterId(null);
              }
            }}
          />

          <SmallLetterTile
            title="نقطے والے حروف"
            letters={[
              ...oneDotLetters,
              ...twoDotLetters,
              ...threeDotLetters,
            ]}
            activeLetterId={activeLetterId}
            isThreeRows={true}
            onPlayStart={(id) => {
              playingIdRef.current = id;
              setActiveLetterId(id);
            }}
            onPlayEnd={(endedId) => {
              if (playingIdRef.current === endedId) {
                playingIdRef.current = null;
                setActiveLetterId(null);
              }
            }}
          />
        </View>

        <SmallLetterTile
          title="ایک نقطے والے حروف"
          letters={oneDotLetters}
          activeLetterId={activeLetterId}
          justify='center'
          onPlayStart={(id) => {
            playingIdRef.current = id;
            setActiveLetterId(id);
          }}
          onPlayEnd={(endedId) => {
            if (playingIdRef.current === endedId) {
              playingIdRef.current = null;
              setActiveLetterId(null);
            }
          }}
        />



        <SmallLetterTile
          title="دو نقطے والے حروف"
          letters={twoDotLetters}
          activeLetterId={activeLetterId}
          justify='center'
          onPlayStart={(id) => {
            playingIdRef.current = id;
            setActiveLetterId(id);
          }}
          onPlayEnd={(endedId) => {
            if (playingIdRef.current === endedId) {
              playingIdRef.current = null;
              setActiveLetterId(null);
            }
          }}
        />

        <SmallLetterTile
          title="تین نقطے والے حروف"
          letters={threeDotLetters}
          justify='center'
          activeLetterId={activeLetterId}
          onPlayStart={(id) => {
            playingIdRef.current = id;
            setActiveLetterId(id);
          }}
          onPlayEnd={(endedId) => {
            if (playingIdRef.current === endedId) {
              playingIdRef.current = null;
              setActiveLetterId(null);
            }
          }}
        />

        <SmallLetterTile
          title="سات حروف"
          letters={specialLetters}
          activeLetterId={activeLetterId}
          justify='center'
          onPlayStart={(id) => {
            playingIdRef.current = id;
            setActiveLetterId(id);
          }}
          onPlayEnd={(endedId) => {
            if (playingIdRef.current === endedId) {
              playingIdRef.current = null;
              setActiveLetterId(null);
            }
          }}

        />
      </ScrollView>
    </Screen>
  );
}

/* ---------------- Components ---------------- */

function SmallLetterTile({
  title,
  letters,
  activeLetterId,
  onPlayStart,
  onPlayEnd,
  justify = "space-between",
  isThreeRows = false,
}: {
  title: string;
  letters: any[];
  activeLetterId: number | null;
  onPlayStart: (id: number) => void;
  onPlayEnd: (id: number) => void;
  isThreeRows?: boolean;
  justify?: 'center' | 'space-between';
}) {
  return (
    <View style={styles.categoryCard}>
      {/* 🔹 Highlighted Title */}
      <View style={styles.categoryHeader}>

        <AppText variant="heading" weight="semibold" size={18} color="#1F2937" align='center'>
          {title} ({letters.length})
        </AppText>
      </View>

      {/* 🔹 Letter grid (fixed height, scrollable) */}
      <View style={[styles.categoryGrid, { justifyContent: justify }]}>
        {letters.map((item) => (
          <View style={isThreeRows ? styles.threeRowTileWrapper : styles.tileWrapper}>
            <LetterTile
              item={item}
              compact
              isActive={activeLetterId === item.id}
              wrapperStyle={isThreeRows ? null : { marginHorizontal: 6 }}
              onPlayStart={() => onPlayStart(item.id)}
              onPlayEnd={onPlayEnd}
              boxStyle={{
                width: 44,
                height: 44,
                borderRadius: 10,
              }}
              letterStyle={{ fontSize: 22, fontFamily: 'Naskh-Bold' }}

            />
          </View>
        ))}
      </View>
    </View>
  );
}





/* ---------------- Styles ---------------- */

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  container: {
    padding: 2,
    paddingBottom: 32,
  },
  tileWrapper: {
    marginTop: 10,
  },

  threeRowTileWrapper: {
    width: '33.33%',   // 👈 guarantees 3 columns on ALL devices
    paddingTop: 10,
    alignItems: 'center',
  },

  topRow: {
    flexDirection: 'row-reverse',
    marginBottom: 20,
    alignItems: 'stretch',
  },

  categoryCard: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    borderRadius: 18,
    padding: 12,
    marginHorizontal: 6,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },

  /* 🔹 Title Highlight */
  categoryHeader: {
    backgroundColor: '#E5F0FF', // subtle highlight
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginBottom: 12,

    alignItems: 'center',
  },

  categoryTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1F2937',
    textAlign: 'center',
  },

  categoryCount: {
    marginTop: 2,
    fontSize: 14,
    color: '#374151',
    fontWeight: '600',
  },

  /* 🔹 Letter grid area */

  categoryGrid: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',

  },

  categoryTile: {
    width: '30%',   // 👈 forces 3 tiles per row
    aspectRatio: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.16,
    shadowRadius: 6,
    elevation: 4,
  },


  categoryTileText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
  },

  /* ---------- Section ---------- */

  section: {
    marginBottom: 28,
  },

  /* 🔹 SAME AS CATEGORY CARD TITLE */
  sectionHeader: {
    // 👈 centers the block
    backgroundColor: '#E5F0FF',   // same highlight
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 14,
    alignItems: 'center',
  },
  /* ---------- Section Card ---------- */

  sectionCard: {
    backgroundColor: '#F9FAFB',   // very subtle
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginBottom: 24,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 6,
  },

  /* Header (already aligned with top cards) */


  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1F2937',
    textAlign: 'center',
  },

  sectionCount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },

  /* Letters grid */
  sectionGrid: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
  },

  sectionTile: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.14,
    shadowRadius: 6,
    elevation: 4,
  },

  sectionTileText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
  },


  lettersRow: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    gap: 10,
  },
  tile: {
    width: 64,
    height: 64,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 6,
  },

  tileText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#111827',
  },
  categoryLettersRow: {
    marginTop: 10,
    flexDirection: 'row-reverse', // 👈 RTL
    flexWrap: 'wrap',
    gap: 6,
    justifyContent: 'center',
  },

  categoryLetter: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1F2937',
  },

  moreText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#6B7280',
  },

});
