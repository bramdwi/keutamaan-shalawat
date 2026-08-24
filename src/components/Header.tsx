import React from 'react';
import { Menu, Search, Sliders, Bookmark as BookmarkIcon, Sparkles } from 'lucide-react';
import type { ThemeMode } from '../types';

interface HeaderProps {
  onOpenDrawer: () => void;
  onOpenSearch: () => void;
  onOpenSettings: () => void;
  onOpenBookmarks: () => void;
  onOpenTasbih: () => void;
  currentTheme: ThemeMode;
  bookmarkCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenDrawer,
  onOpenSearch,
  onOpenSettings,
  onOpenBookmarks,
  onOpenTasbih,
  currentTheme,
  bookmarkCount
}) => {
  const getHeaderBg = () => {
    switch (currentTheme) {
      case 'dark':
        return 'bg-[#06241a]/90 border-emerald-800/40 text-emerald-100';
      case 'sepia':
        return 'bg-[#f4ecd8]/95 border-amber-800/20 text-[#2c1d11]';
      default:
        return 'bg-white/95 border-slate-200 text-slate-900';
    }
  };

  return (
    <header className={`sticky top-0 z-30 w-full backdrop-blur-md border-b transition-colors duration-200 ${getHeaderBg()}`}>
      <div className="max-w-5xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2">
        {/* Left: Menu & App Brand */}
        <div className="flex items-center gap-2 sm:gap-3.5 min-w-0">
          <button
            onClick={onOpenDrawer}
            aria-label="Buka Daftar Isi"
            className="p-2 sm:p-2.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 transition-all text-emerald-700 dark:text-emerald-400"
          >
            <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <div className="min-w-0 cursor-pointer" onClick={onOpenDrawer}>
            <div className="flex items-center gap-1.5">
              <h1 className="text-base sm:text-lg font-bold tracking-tight truncate flex items-center gap-1.5">
                <span>Keutamaan Shalawat</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-arabic text-sm sm:text-base font-normal">ﷺ</span>
              </h1>
            </div>
            <p className="text-[11px] sm:text-xs opacity-70 truncate hidden xs:block">
              Risalah Fadhilah, Adab & Kisah Shalawat
            </p>
          </div>
        </div>

        {/* Right: Quick Action Tools */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          {/* Tasbih Button */}
          <button
            onClick={onOpenTasbih}
            aria-label="Buka Tasbih Digital"
            title="Tasbih Digital"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600/10 text-emerald-800 dark:text-emerald-300 dark:bg-emerald-500/20 hover:bg-emerald-600/20 active:scale-95 transition-all"
          >
            <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span className="hidden sm:inline">Tasbih</span>
          </button>

          {/* Search Button */}
          <button
            onClick={onOpenSearch}
            aria-label="Pencarian"
            title="Cari Hadits & Faedah"
            className="p-2 sm:p-2.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 transition-all opacity-80 hover:opacity-100"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Bookmarks Button */}
          <button
            onClick={onOpenBookmarks}
            aria-label="Penanda / Bookmark"
            title="Daftar Bookmark"
            className="relative p-2 sm:p-2.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 transition-all opacity-80 hover:opacity-100"
          >
            <BookmarkIcon className="w-5 h-5" />
            {bookmarkCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center">
                {bookmarkCount}
              </span>
            )}
          </button>

          {/* Settings Button */}
          <button
            onClick={onOpenSettings}
            aria-label="Pengaturan Tampilan"
            title="Pengaturan Huruf & Tema"
            className="p-2 sm:p-2.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 transition-all opacity-80 hover:opacity-100"
          >
            <Sliders className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};
