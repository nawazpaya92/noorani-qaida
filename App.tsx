// App.tsx
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet } from 'react-native';
import { ThemeProvider, useAppTheme } from './src/theme/ThemeContext';
import { NavigationProvider, Router } from './src/navigation/Router';
import { UIManager, Platform } from 'react-native';
import { useFonts } from 'expo-font';
function AppContent() {
  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental?.(true);
  }
  const [fontsLoaded] = useFonts({
    'Naskh-Regular': require('./src/assets/fonts/NotoNaskhArabic-Regular.ttf'),
    'Naskh-Medium': require('./src/assets/fonts/NotoNaskhArabic-Medium.ttf'),
    'Naskh-SemiBold': require('./src/assets/fonts/NotoNaskhArabic-SemiBold.ttf'),
    'Naskh-Bold': require('./src/assets/fonts/NotoNaskhArabic-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null; // or splash / loader
  }
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
