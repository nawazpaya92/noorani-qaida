// DashboardScreen.tsx
import React, { useRef } from 'react';
import { Animated, StyleSheet, Text, Pressable, View, Platform, Image } from 'react-native';
import LottieView from 'lottie-react-native';
import { useAppTheme } from '../theme/ThemeContext';
import { useNavigation } from '../navigation/Router';

// 👉 Import Route to extract the name union
import type {Route } from '../navigation/Router';
import BismillahGlow from '../components/BismillahGlow';
type SimpleRouteName = Extract<Route, { name: 'Dashboard' | 'Baccho' | 'Alphabets' }>['name'];
// Helper: the union of valid route names from your Router type
type RouteName = Route['name'];

type Card = {
  id: string;
  title: string;
  subtitle: string;
 route?: SimpleRouteName;  
  animation?: any;
};

const cards: Card[] = [
  { id: 'c1', title: 'Baccho ka Tohfa', subtitle: 'Learn with songs and stories', route: 'Baccho', animation: require('../assets/lottie/bachonkathofa.json') },
  { id: 'c2', title: 'Taleem-ud-deen', subtitle: 'Foundations of faith & practice', animation: require('../assets/lottie/taleemuddin.json') },
  { id: 'c3', title: 'Mahfuzaat', subtitle: 'Short duas & memorization', animation: require('../assets/lottie/mahfoozat.json') },
  { id: 'c4', title: 'Coming soon', subtitle: 'New features arriving soon', animation: require('../assets/lottie/comingsoon.json') },
];

const DashboardScreen: React.FC = () => {
  const { theme } = useAppTheme();
  const navigation = useNavigation();

  return (
    <View style={[styles.screen, { backgroundColor: theme.bg }]}>
     <BismillahGlow/>
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
    </View>
  );
};

const CardView: React.FC<{ card: Card; theme: any; onPress?: () => void }> = ({ card, theme, onPress }) => {
  const scale = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    if (Platform.OS === 'ios')
      Animated.spring(scale, { toValue: 0.95, useNativeDriver: true }).start();
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
      <Animated.View
        style={[
          styles.card,
          { backgroundColor: theme.card, transform: [{ scale }] }
        ]}
      >

        {/* Lottie Animation */}
        {card.animation && (
          <LottieView
            source={card.animation}
            autoPlay
            loop
            style={styles.lottie}
          />
        )}

        {/* Title */}
        <Text style={[styles.cardTitle, { color: theme.blue }]}>
          {card.title}
        </Text>

        {/* Subtitle */}
        <Text style={[styles.cardSubtitle, { color: theme.subtitle }]}>
          {card.subtitle}
        </Text>

        {/* Accents */}
      
      </Animated.View>
    </Pressable>
  );
};


const styles = StyleSheet.create({
  screen: { flex: 1 },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 24,
    paddingTop: 8,
  },

  cardWrapper: {
    width: '48%',
    marginBottom: 16,
  },

  card: {
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',

    // Good for equal layout
    minHeight: 200,
    maxHeight: 200,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,

    position: 'relative',
  },

  lottie: {
    width: 80,
    height: 80,
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

  topRightDot: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 10,
    height: 10,
    borderRadius: 5,
    opacity: 0.95,
  },

  bottomAccent: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 6,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
});


export default DashboardScreen;
