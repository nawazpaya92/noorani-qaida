import React from 'react';
import { View, StyleSheet, Platform, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
export default function Screen({
  children,
  backgroundColor = '#fff',
}: {
  children: React.ReactNode;
  backgroundColor?: string;
}) {
  return (
    <LinearGradient
      colors={['#000813ff', '#EEF5FF']}
      style={{ flex: 1 }}
    >
      <View
        style={[
          styles.container,
          {
            backgroundColor,
            paddingTop:
              Platform.OS === 'android' ? StatusBar.currentHeight : 0,
          },
        ]}
      >
        {children}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
