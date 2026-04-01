import React, { useRef } from 'react';
import { View, FlatList, StyleSheet, Animated } from 'react-native';
import { chapters } from '../data/chapters';
import AppHeader from '../components/AppHeader';
import { useAppTheme } from '../theme/ThemeContext';
import { useNavigation } from '../navigation/navigationContext';
import Screen from '../components/Screen';
import { LinearGradient } from 'expo-linear-gradient';
import { ChapterItem } from '../components/ChapterItem';
import AppText from '../components/AppText';
import useFadeIn from '../hooks/useFadeIn';
import { TitleAyatContainer } from '../components/TitleAyatContainer';



export default function BacchoKaThofa() {
  const { theme } = useAppTheme();
  const navigation = useNavigation();
  const fadeAnim = useFadeIn();


  const goToChapter = (index: number) => {
    switch (index) {
      case 0:
        navigation.push({ name: 'Alphabets' });
        break;


      case 1:
        navigation.push({ name: 'Tarteebh' });
        break;


      case 2:
        navigation.push({ name: 'JointLetters' });
        break;


      case 3:
        navigation.push({ name: 'Harkaat' });
        break;
      case 4:
        navigation.push({ name: 'Tanveen' });
        break;
      case 5:
        navigation.push({ name: 'Jazm' });
        break;
      case 6:
        navigation.push({ name: 'HurfeMaddah' });
        break;


      default:
        console.log('Screen not mapped yet');
    }
  };


  return (
    <Screen>
      <LinearGradient colors={theme.linearGradient as readonly [string, string]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}
      >

        <Animated.View style={styles.screen}>
          <AppHeader title="" onBack={navigation.pop} />

          <TitleAyatContainer text='بچوں کا تحفہ' lang='ur' textSize={36}
          />

          <FlatList
            data={chapters}
            keyExtractor={(_, i) => String(i)}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <ChapterItem
                index={index}
                title={item}
                onPress={() => goToChapter(index)}
              />
            )}
          />
        </Animated.View>
      </LinearGradient>
    </Screen>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },


  screen: {
    flex: 1,
  },

  divider: {
    marginTop: 14,
    width: 120,
    height: 3,
    borderRadius: 2,
    opacity: 0.4,
  },
  ayahContainer: {
    paddingTop: 10, // more breathing space from top
    alignItems: 'center',
  },
  ayahText: {
    lineHeight: 44,
    writingDirection: 'rtl',
    textAlign: 'center',
  },
  listContent: {
    marginTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
});