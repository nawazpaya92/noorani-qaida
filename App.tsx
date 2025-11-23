// App.tsx
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet } from 'react-native';
import { ThemeProvider, useAppTheme } from './src/theme/ThemeContext';
import { NavigationProvider, Router } from './src/navigation/Router';

function AppContent() {
  const { theme } = useAppTheme(); // ✅ read theme from provider
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]}>
      <StatusBar style={theme.mode === 'dark' ? 'light' : 'dark'} backgroundColor={theme.bg} />
      <Router />
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <NavigationProvider>
        <AppContent />
      </NavigationProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
