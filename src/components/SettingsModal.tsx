import React from 'react';
import { X, Sun, Moon, Coffee, Type, Check, Eye } from 'lucide-react';
import type { UserPreferences, ThemeMode, ArabicFontSize, LatinFontSize } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  preferences: UserPreferences;
  onSetTheme: (theme: ThemeMode) => void;
  onSetArabicFontSize: (size: ArabicFontSize) => void;
  onSetLatinFontSize: (size: LatinFontSize) => void;
  onSetArabicFontFamily: (font: 'amiri' | 'scheherazade' | 'lateef') => void;
  onToggleOption: (key: keyof Pick<UserPreferences, 'showArabic' | 'showTransliteration' | 'showTranslation' | 'showExplanation'>) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  preferences,
  onSetTheme,
  onSetArabicFontSize,
  onSetLatinFontSize,
  onSetArabicFontFamily,
  onToggleOption
}) => {
  if (!isOpen) return null;

  const getModalBg = () => {
    switch (preferences.theme) {
      case 'dark':
        return 'bg-[#06241a] text-white border-emerald-800/50';
      case 'sepia':
        return 'bg-[#fcf7ee] text-[#332214] border-amber-800/30';
      default:
        return 'bg-white text-slate-900 border-slate-200';
    }
  };

  const arabicFontSizes: { id: ArabicFontSize; label: string }[] = [
    { id: 'sm', label: 'Kecil' },
    { id: 'md', label: 'Sedang' },
    { id: 'lg', label: 'Besar' },
    { id: 'xl', label: 'Ekstra' },
    { id: '2xl', label: 'Jumbo' }
  ];

  const latinFontSizes: { id: LatinFontSize; label: string }[] = [
    { id: 'xs', label: 'Kecil' },
    { id: 'sm', label: 'Normal' },
    { id: 'md', label: 'Sedang' },
    { id: 'lg', label: 'Besar' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      <div
        className={`relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 shadow-2xl border z-10 animate-in zoom-in-95 duration-200 ${getModalBg()}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-black/10 dark:border-white/10 mb-6">
          <div className="flex items-center gap-2">
            <Type className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-lg sm:text-xl font-bold">Pengaturan Membaca</h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Tutup Pengaturan"
            className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Theme Selection */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider opacity-70 block mb-3">
              Tema Tampilan
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              <button
                onClick={() => onSetTheme('light')}
                className={`flex flex-col items-center justify-center gap-2 p-3.5 rounded-2xl border text-xs font-semibold transition-all ${
                  preferences.theme === 'light'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-950 shadow-sm ring-2 ring-emerald-500/20'
                    : 'border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 opacity-80'
                }`}
              >
                <Sun className="w-5 h-5 text-amber-500" />
                <span>Terang</span>
              </button>

              <button
                onClick={() => onSetTheme('sepia')}
                className={`flex flex-col items-center justify-center gap-2 p-3.5 rounded-2xl border text-xs font-semibold transition-all ${
                  preferences.theme === 'sepia'
                    ? 'border-amber-700 bg-amber-100 text-amber-950 shadow-sm ring-2 ring-amber-600/30'
                    : 'border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 opacity-80'
                }`}
              >
                <Coffee className="w-5 h-5 text-amber-700" />
                <span>Sepia</span>
              </button>

              <button
                onClick={() => onSetTheme('dark')}
                className={`flex flex-col items-center justify-center gap-2 p-3.5 rounded-2xl border text-xs font-semibold transition-all ${
                  preferences.theme === 'dark'
                    ? 'border-emerald-500 bg-emerald-900/60 text-white shadow-sm ring-2 ring-emerald-500/40'
                    : 'border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 opacity-80'
                }`}
              >
                <Moon className="w-5 h-5 text-emerald-400" />
                <span>Malam</span>
              </button>
            </div>
          </div>

          {/* Arabic Font Size */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-bold uppercase tracking-wider opacity-70">
                Ukuran Huruf Arab
              </label>
              <span className="text-xs font-arabic text-emerald-600 dark:text-emerald-400 font-bold">
                عَلَيْهِ الصَّلَاةُ وَالسَّلَامُ
              </span>
            </div>
            <div className="grid grid-cols-5 gap-1.5">
              {arabicFontSizes.map((size) => (
                <button
                  key={size.id}
                  onClick={() => onSetArabicFontSize(size.id)}
                  className={`py-2 px-1 rounded-xl border text-xs font-semibold transition-all ${
                    preferences.arabicFontSize === size.id
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                      : 'border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 opacity-80'
                  }`}
                >
                  {size.label}
                </button>
              ))}
            </div>
          </div>

          {/* Arabic Font Family */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider opacity-70 block mb-3">
              Gaya Khat / Font Arab
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => onSetArabicFontFamily('amiri')}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  preferences.arabicFontFamily === 'amiri'
                    ? 'bg-emerald-600/15 border-emerald-600 text-emerald-900 dark:text-emerald-300 font-bold shadow-sm'
                    : 'border-black/10 dark:border-white/10 opacity-80'
                }`}
              >
                <div className="text-xs font-semibold">Amiri (Klasik Naskh)</div>
                <div className={`font-arabic text-lg mt-1 text-right ${preferences.theme === 'dark' ? 'text-slate-100' : preferences.theme === 'sepia' ? 'text-[#2a1708]' : 'text-slate-900'}`}>صَلَّى اللّٰهُ عَلَيْهِ</div>
              </button>

              <button
                onClick={() => onSetArabicFontFamily('scheherazade')}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  preferences.arabicFontFamily === 'scheherazade'
                    ? 'bg-emerald-600/15 border-emerald-600 text-emerald-900 dark:text-emerald-300 font-bold shadow-sm'
                    : 'border-black/10 dark:border-white/10 opacity-80'
                }`}
              >
                <div className="text-xs font-semibold">Scheherazade (Modern)</div>
                <div className={`font-scheherazade text-lg mt-1 text-right ${preferences.theme === 'dark' ? 'text-slate-100' : preferences.theme === 'sepia' ? 'text-[#2a1708]' : 'text-slate-900'}`}>صَلَّى اللّٰهُ عَلَيْهِ</div>
              </button>
            </div>
          </div>

          {/* Latin Font Size */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider opacity-70 block mb-3">
              Ukuran Terjemahan & Teks Latin
            </label>
            <div className="grid grid-cols-4 gap-2">
              {latinFontSizes.map((size) => (
                <button
                  key={size.id}
                  onClick={() => onSetLatinFontSize(size.id)}
                  className={`py-2 px-1 rounded-xl border text-xs font-semibold transition-all ${
                    preferences.latinFontSize === size.id
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                      : 'border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 opacity-80'
                  }`}
                >
                  {size.label}
                </button>
              ))}
            </div>
          </div>

          {/* Visibility Toggles */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider opacity-70 block mb-3">
              Tampilan Elemen Teks
            </label>
            <div className="space-y-2.5">
              {[
                { key: 'showArabic' as const, label: 'Tampilkan Teks Arab' },
                { key: 'showTransliteration' as const, label: 'Tampilkan Transliterasi (Latin)' },
                { key: 'showTranslation' as const, label: 'Tampilkan Terjemahan Indonesia' },
                { key: 'showExplanation' as const, label: 'Tampilkan Faedah & Syarah' }
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() => onToggleOption(item.key)}
                  className="w-full flex items-center justify-between p-3 rounded-xl border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition-all text-xs font-medium"
                >
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>{item.label}</span>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center transition-all ${
                      preferences[item.key]
                        ? 'bg-emerald-600 text-white'
                        : 'bg-black/10 dark:bg-white/10'
                    }`}
                  >
                    {preferences[item.key] && <Check className="w-3.5 h-3.5" />}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
