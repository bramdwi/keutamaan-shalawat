export type ThemeMode = 'light' | 'sepia' | 'dark';

export type ArabicFontSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
export type LatinFontSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface UserPreferences {
  theme: ThemeMode;
  arabicFontSize: ArabicFontSize;
  latinFontSize: LatinFontSize;
  showArabic: boolean;
  showTransliteration: boolean;
  showTranslation: boolean;
  showExplanation: boolean;
  arabicFontFamily: 'amiri' | 'scheherazade' | 'lateef';
}

export interface SectionItem {
  id: string;
  number?: number;
  title: string;
  subtitle?: string;
  arabic?: string;
  transliteration?: string;
  translation?: string;
  explanation?: string[];
  narrator?: string;
  hadithNumber?: string;
  tags?: string[];
}

export interface Chapter {
  id: string; // 'bab-1', 'bab-2', etc.
  numberRoman: string; // 'Bab I', 'Bab II', etc.
  numberText: string; // 'Bab Pertama', 'Bab Kedua', etc.
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  sections: SectionItem[];
}

export interface Bookmark {
  chapterId: string;
  chapterTitle: string;
  sectionId: string;
  sectionTitle: string;
  previewText: string;
  timestamp: number;
}

export interface LastRead {
  chapterId: string;
  sectionId?: string;
  chapterTitle: string;
  timestamp: number;
}
