import React from 'react';
import { View, FlatList, StyleSheet, Animated } from 'react-native';
import { chapters } from '../data/chapters';
import AppHeader from '../components/AppHeader';
import ChapterItem from '../components/ChapterItem';
import { useAppTheme } from '../theme/ThemeContext';
import { useNavigation } from '../navigation/Router';

export default function BacchoKaThofa() {
  const{theme} = useAppTheme();
  const navigation = useNavigation();

  const goToAlphabets = () => navigation.push({ name: 'Alphabets' });

  return (
    <Animated.View style={[styles.screen, { backgroundColor: theme.bg }]}>
      <AppHeader title="Baccho Ka Tohfa" onBack={navigation.pop} />

      <FlatList
        data={chapters}
        keyExtractor={(_, i) => String(i)}
        contentContainerStyle={{ padding: 12 }}
        renderItem={({ item, index }) => (
          <ChapterItem index={index} title={item} onPress={goToAlphabets} />
        )}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
