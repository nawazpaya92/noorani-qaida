import React from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import lessons, { Lesson } from '../data/lessons';

type Props = {
  onSelect: (lesson: Lesson) => void;
};

const LessonList: React.FC<Props> = ({ onSelect }) => {
  const renderItem = ({ item }: ListRenderItemInfo<Lesson>) => (
    <TouchableOpacity style={styles.item} onPress={() => onSelect(item)}>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.itemSubtitle}>{item.arabic}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList data={lessons} keyExtractor={(i) => i.id} renderItem={renderItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  item: {
    padding: 14,
    borderRadius: 8,
    backgroundColor: '#f2f6ff',
    marginBottom: 10,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  itemSubtitle: {
    marginTop: 6,
    color: '#333',
  },
});

export default LessonList;
