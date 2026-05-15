import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AlphabetGrid from '../../components/AlphabetGrid';
import { useNavigation } from '../../navigation/navigationContext';
import Carousel from '../../components/Carousel';
import AppHeader from '../../components/AppHeader';
import Screen from '../../components/Screen';
import AppText from '../../components/AppText';
import { useAppTheme } from '../../theme/ThemeContext';

export default function AlphabetScreen() {
  const [isCarousel] = useState(false);
  const navigation = useNavigation();
  const { theme } = useAppTheme();

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
            عربی حروفِ تہجی
          </AppText>
          <AppText
            lang="ur"
            size={18}
            align="center"
            color="#4B5563"
            style={styles.subtitle}
          >
            انفرادی حروف
          </AppText>
        </View>

        {isCarousel ? (
          <View style={styles.carouselContainer}>
            <Carousel />
          </View>
        ) : (
          <AlphabetGrid />
        )}
      </LinearGradient>
    </Screen>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  hero: {
    paddingHorizontal: 20,
    paddingTop: 6,
    paddingBottom: 14,
  },
  subtitle: {
    marginTop: -4,
  },
  carouselContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 10,
  },
});
