import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const items = [
  { id: 1, label: 'Name' },
  { id: 2, label: 'Alpha' },
  { id: 3, label: 'Address' },
  { id: 4, label: 'Beta' },
  { id: 5, label: 'Gamma' },
  { id: 6, label: 'Zeta' },
];

const colors = ['#FF6B6B', '#4ECDC4', '#5567FF', '#FFB347', '#9B59B6', '#26A65B'];

const getRandomColor = () => {
  const index = Math.floor(Math.random() * colors.length);
  return colors[index];
};

export default function NumberedList() {
  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ padding: 20 }}
      renderItem={({ item }) => (
        <View style={styles.itemRow}>
          <View style={[styles.circle, { backgroundColor: getRandomColor() }]}>
            <Text style={styles.circleText}>{item.id}</Text>
          </View>
          <Text style={styles.labelText}>{item.label}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  circle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  circleText: {
    color: 'white',
    fontWeight: 'bold',
  },
  labelText: {
    fontSize: 16,
  },
});
