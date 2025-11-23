import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {useAppTheme} from '../theme/ThemeContext';

export default function AppHeader({ title, onBack }: any) {
  const{theme} = useAppTheme();

  return (
    <View style={[styles.header]}>
      <TouchableOpacity onPress={onBack} style={styles.backBtn}>
        <Text style={[styles.backText, { color: theme.text }]}>{'‹'}</Text>
      </TouchableOpacity>

      <Text style={[styles.headerTitle, { color: theme.text }]}>{title}</Text>
      <View style={{ width: 40 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    justifyContent: 'space-between',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  backBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backText: {
    fontSize: 34,
    lineHeight: 34,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
  },
});
