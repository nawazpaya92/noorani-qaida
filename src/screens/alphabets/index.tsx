import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AlphabetGrid from '../../components/AlphabetGrid';
import { useNavigation } from '../../navigation/navigationContext';
import Carousel from '../../components/Carousel';
import AppHeader from '../../components/AppHeader';
import Screen from '../../components/Screen';

export default function AlphabetScreen() {
  const { pop } = useNavigation();
  const [isCarousel, setIsCarousel] = useState(false);
  const [carouselText, setCarouselText] = useState('Switch to Carousel View');
  const navigation = useNavigation()
  const carouselViewToggle = (value: boolean) => {
    setIsCarousel(value);
    setCarouselText(value ? 'Switch to Grid View' : 'Switch to Carousel View');
  }
  return (
    <Screen >
      {/* Header */}
      <View style={styles.header}>
        <AppHeader title="Arabic Alphabets" onBack={navigation.pop} />

        {/* <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>{carouselText}</Text>
          <Switch value={isCarousel} onValueChange={()=>carouselViewToggle(!isCarousel)} />
        </View> */}
      </View>
      {isCarousel ? (
        <View style={styles.carouselContainer}>
          <Carousel />
        </View>
      ) : (
        <AlphabetGrid />
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  header: {
    backgroundColor: '#F8F9FA'
  },
  headerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333'
  },
  switchRow: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  switchLabel: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333'
  },
  carouselContainer: {
    flex: 1,
    alignItems: 'center',
    // <— this is the key!
    paddingTop: 10,
  },
});
