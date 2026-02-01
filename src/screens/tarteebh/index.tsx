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
import { useNavigation } from '../../navigation/Router';
import { arabicLetters } from '../../data/arabicLetters';

/* ---------------- Helpers ---------------- */

const getLettersByDots = (dots: number) =>
  arabicLetters.filter((l: any) => l.dots === dots);

const SPECIAL_LETTERS = ['ص', 'ض', 'ط', 'ظ', 'خ', 'غ', 'ق'];

/* ---------------- Screen ---------------- */

export default function Tarteebh() {
  const { theme } = useAppTheme();
  const navigation = useNavigation();

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
        <CategoryCard
  title="بغیر نقطے والے حروف"
  letters={noDotLetters}
/>

<CategoryCard
  title="نقطے والے حروف"
  letters={[
    ...oneDotLetters,
    ...twoDotLetters,
    ...threeDotLetters,
  ]}
/>
        </View>

        <LetterSection
          title="ایک نقطے والے حروف"
          letters={oneDotLetters}
        />

        <LetterSection
          title="دو نقطے والے حروف"
          letters={twoDotLetters}
        />

        <LetterSection
          title="تین نقطے والے حروف"
          letters={threeDotLetters}
        />

        <LetterSection
          title="سات حروف"
          letters={specialLetters}
        />
      </ScrollView>
    </Screen>
  );
}

/* ---------------- Components ---------------- */

function CategoryCard({
  title,
  letters,
}: {
  title: string;
  letters: any[];
}) {
  return (
    <View style={styles.categoryCard}>
      {/* 🔹 Highlighted Title */}
      <View style={styles.categoryHeader}>
        <Text style={styles.categoryTitle}>{title}</Text>
        <Text style={styles.categoryCount}>({letters.length})</Text>
      </View>

      {/* 🔹 Letter grid (fixed height, scrollable) */}
     <View style={styles.categoryGrid}>
  {letters.map((item) => (
  <View style={{marginTop:10}}>
      <MiniLetterTile key={item.id} item={item} />
  </View>
  ))}
</View>
    </View>
  );
}


function LetterSection({
  title,
  letters,
}: {
  title: string;
  letters: any[];
}) {
  return (
    <View style={styles.sectionCard}>
      {/* Header */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>
          {title}{' '}
          <Text style={styles.sectionCount}>({letters.length})</Text>
        </Text>
      </View>

      {/* Letters */}
      <View style={styles.sectionGrid}>
        {letters.map((item) => (
  <MiniLetterTile key={item.id} item={item} />
))}
      </View>
    </View>
  );
}
import * as Haptics from 'expo-haptics';
import { playArabicLetter } from '../../utils/audio';
import Screen from '../../components/Screen';

function MiniLetterTile({ item }: { item: any }) {
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.92,
      speed: 30,
      bounciness: 0,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      speed: 20,
      bounciness: 8,
      useNativeDriver: true,
    }).start();
  };

  const onPress = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    playArabicLetter(item.audio);
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
    >
      <Animated.View
        style={[
          styles.sectionTile,
          { transform: [{ scale: scaleAnim }] },
        ]}
      >
        <Text style={styles.sectionTileText}>{item.letter}</Text>
      </Animated.View>
    </Pressable>
  );
}




/* ---------------- Styles ---------------- */

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  container: {
    padding: 16,
    paddingBottom: 32,
  },

  topRow: {
    flexDirection: 'row-reverse',
    gap: 12,
    marginBottom: 20,
    alignItems:'stretch',
  },

  categoryCard: {
  flex: 1,
  backgroundColor: '#F8F9FA',
  borderRadius: 18,
  padding: 12,

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
  justifyContent: 'space-between',
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
