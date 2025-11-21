import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Lesson } from '../data/lessons';

type Props = {
  lesson: Lesson;
  onBack: () => void;
};

const LessonScreen: React.FC<Props> = ({ lesson, onBack }) => {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.header}>{lesson.title}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.arabic}>{lesson.arabic}</Text>
        {lesson.transliteration ? <Text style={styles.trans}>{lesson.transliteration}</Text> : null}
        {lesson.notes ? <Text style={styles.notes}>{lesson.notes}</Text> : null}

        <View style={styles.audioPlaceholder}>
          <Text style={{ color: '#666' }}>Audio playback coming soon</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  topRow: { padding: 12, backgroundColor: '#fff' },
  backButton: { paddingVertical: 6, paddingHorizontal: 8 },
  backText: { color: '#0b3d91', fontWeight: '600' },
  header: { fontSize: 18, fontWeight: '700', marginTop: 4 },
  content: { padding: 16 },
  arabic: { fontSize: 32, textAlign: 'center', marginVertical: 12 },
  trans: { fontSize: 16, textAlign: 'center', color: '#333' },
  notes: { marginTop: 16, color: '#444' },
  audioPlaceholder: {
    marginTop: 24,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    alignItems: 'center',
  },
});

export default LessonScreen;
