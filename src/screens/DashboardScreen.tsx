import React, { useRef, useEffect } from 'react';
import { Animated, StyleSheet, Text, Pressable, View, Platform } from 'react-native';
import LottieView from 'lottie-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppTheme } from '../theme/ThemeContext';
import { useNavigation } from '../navigation/navigationContext';
import type { Route } from '../navigation/Router';
import AppText from '../components/AppText';
import useFadeIn from '../hooks/useFadeIn';
import { TitleAyatContainer } from '../components/TitleAyatContainer';

// ================= ROUTE TYPES =================

type SimpleRouteName = Extract<Route, { name: 'Dashboard' | 'Baccho' | 'Alphabets' }>['name'];

type Card = {
  id: string;
  title: string;
  subtitle: string;
  route?: SimpleRouteName;
  animation?: any;
};

// ================= DATA =================

const cards: Card[] = [
  { id: 'c1', title: 'Baccho ka Tohfa', subtitle: 'Learn with songs and stories', route: 'Baccho', animation: require('../assets/lottie/bachonkathofa.json') },
  { id: 'c2', title: 'Taleem-ud-deen', subtitle: 'Foundations of faith & practice', animation: require('../assets/lottie/taleemuddin.json') },
  { id: 'c3', title: 'Mahfuzaat', subtitle: 'Short duas & memorization', animation: require('../assets/lottie/mahfoozat.json') },
  { id: 'c4', title: 'Coming soon', subtitle: 'New features arriving soon', animation: require('../assets/lottie/comingsoon.json') },
];

// ================= MAIN SCREEN =================

const DashboardScreen: React.FC = () => {
  const { theme } = useAppTheme();
  const navigation = useNavigation();

  const fadeAnim = useFadeIn();

  return (
    <LinearGradient colors={theme.linearGradient as readonly [string, string]} style={styles.screen}>

      {/* ================= AYAH SECTION ================= */}

      <View style={{ flex: .25, justifyContent: 'flex-end', paddingBottom: 30, paddingHorizontal: 30 }}>
        <TitleAyatContainer
          text=" وَلَقَدْ يَسَّرْنَا الْقُرْآنَ لِلذِّكْرِ فَهَلْ مِنْ مُدَّكِرٍ ۝" />
      </View>


      {/* ================= GRID ================= */}

      <View style={styles.grid}>
        {cards.map((card) => (
          <CardView
            key={card.id}
            card={card}
            theme={theme}
            onPress={() => card.route && navigation.push({ name: card.route })}
          />
        ))}
      </View>
      <View style={{ flex: 0.25, }}></View>
    </LinearGradient>
  );
};

// ================= CARD =================

const CardView: React.FC<{ card: Card; theme: any; onPress?: () => void }> = ({ card, theme, onPress }) => {
  const scale = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    if (Platform.OS === 'ios')
      Animated.spring(scale, { toValue: 0.94, useNativeDriver: true }).start();
  };

  const onPressOut = () => {
    if (Platform.OS === 'ios')
      Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();
  };

  return (
    <Pressable
      android_ripple={{ color: 'rgba(0,0,0,0.06)' }}
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={styles.cardWrapper}
    >
      <Animated.View style={{ transform: [{ scale }] }}>
        <View style={styles.cardShadow}>
          <LinearGradient
            colors={theme.cardGradient ?? ['#FFFFFF', '#fefefeff']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.card, { shadowColor: theme.shadow }]}
          >
            {card.animation && (
              <LottieView source={card.animation} autoPlay loop style={styles.lottie} />
            )}

            <Text style={[styles.cardTitle, { color: theme.blue }]}>{card.title}</Text>

            <Text style={[styles.cardSubtitle, { color: theme.subtitle }]}>{card.subtitle}</Text>
          </LinearGradient>
        </View>
      </Animated.View>
    </Pressable>
  );
};

// ================= STYLES =================

const styles = StyleSheet.create({
  screen: { flex: 1 },

  ayahContainer: {
    paddingTop: 90, // more breathing space from top
    paddingBottom: 24,
    paddingHorizontal: 24,
    alignItems: 'center',
  },

  ayahText: {
    lineHeight: 44,
    writingDirection: 'rtl',
    textAlign: 'center',
  },

  divider: {
    marginTop: 14,
    width: 120,
    height: 3,
    borderRadius: 2,
    opacity: 0.4,
  },
  grid: {
    flex: 0.5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 24,
  },

  cardWrapper: {
    width: '48%',
    marginBottom: 16,
  },

  cardShadow: {
    borderRadius: 18,
    backgroundColor: '#fff',   // REQUIRED for iOS shadow

    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.18,
    shadowRadius: 20,

    // Android
    elevation: 10,
  },

  card: {
    borderRadius: 18,
    paddingVertical: 22,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 200,
  },

  lottie: {
    width: 82,
    height: 82,
    marginBottom: 10,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },

  cardSubtitle: {
    marginTop: 6,
    fontSize: 12,
    textAlign: 'center',
  },
});

export default DashboardScreen;
