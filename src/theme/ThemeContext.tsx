import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance } from 'react-native';
import { Theme, lightTheme, darkTheme } from './colors';

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
  setLight: () => void;
  setDark: () => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children }: any) => {
  const systemScheme = Appearance.getColorScheme();
  const [mode, setMode] = useState<'light' | 'dark'>(systemScheme || 'light');

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    const stored = await AsyncStorage.getItem('app-theme');
    if (stored === 'light' || stored === 'dark') {
      setMode(stored);
    }
  };

  const saveTheme = async (mode: 'light' | 'dark') => {
    await AsyncStorage.setItem('app-theme', mode);
  };

  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    saveTheme(newMode);
  };

  const setLight = () => {
    setMode('light');
    saveTheme('light');
  };

  const setDark = () => {
    setMode('dark');
    saveTheme('dark');
  };

  const theme = mode === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setLight, setDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useAppTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useAppTheme must be used inside ThemeProvider");
  return ctx;
};
