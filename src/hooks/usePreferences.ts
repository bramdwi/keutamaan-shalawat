import { useState, useEffect } from 'react';
import type { UserPreferences, ThemeMode, ArabicFontSize, LatinFontSize } from '../types';

const STORAGE_KEY = 'keutamaan_shalawat_prefs_v1';

const defaultPreferences: UserPreferences = {
  theme: 'sepia', // Default to soothing sepia for reading
  arabicFontSize: 'xl',
  latinFontSize: 'md',
  showArabic: true,
  showTransliteration: true,
  showTranslation: true,
  showExplanation: true,
  arabicFontFamily: 'amiri'
};

export const usePreferences = () => {
  const [preferences, setPreferences] = useState<UserPreferences>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? { ...defaultPreferences, ...JSON.parse(saved) } : defaultPreferences;
    } catch {
      return defaultPreferences;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    } catch (e) {
      console.error('Failed to save preferences to localStorage', e);
    }

    // Apply theme to document body and root
    const root = document.documentElement;
    const body = document.body;

    body.classList.remove('theme-light', 'theme-sepia', 'theme-dark');
    body.classList.add(`theme-${preferences.theme}`);

    if (preferences.theme === 'dark') {
      root.classList.add('dark');
      body.classList.add('dark');
    } else {
      root.classList.remove('dark');
      body.classList.remove('dark');
    }
  }, [preferences]);

  const setTheme = (theme: ThemeMode) => {
    setPreferences((prev) => ({ ...prev, theme }));
  };

  const setArabicFontSize = (arabicFontSize: ArabicFontSize) => {
    setPreferences((prev) => ({ ...prev, arabicFontSize }));
  };

  const setLatinFontSize = (latinFontSize: LatinFontSize) => {
    setPreferences((prev) => ({ ...prev, latinFontSize }));
  };

  const setArabicFontFamily = (arabicFontFamily: 'amiri' | 'scheherazade' | 'lateef') => {
    setPreferences((prev) => ({ ...prev, arabicFontFamily }));
  };

  const toggleOption = (key: keyof Pick<UserPreferences, 'showArabic' | 'showTransliteration' | 'showTranslation' | 'showExplanation'>) => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return {
    preferences,
    setTheme,
    setArabicFontSize,
    setLatinFontSize,
    setArabicFontFamily,
    toggleOption,
    setPreferences
  };
};
