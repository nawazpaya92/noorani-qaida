import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import LessonList from './src/components/LessonList';
import LessonScreen from './src/screens/LessonScreen';
import { Lesson } from './src/data/lessons';
import NumberedList from './src/screens/DashboardScreen';

export default function App() {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Noorani Qaida</Text>
      </View>

      <NumberedList/>
     
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    backgroundColor: '#0b3d91',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
  },
});
