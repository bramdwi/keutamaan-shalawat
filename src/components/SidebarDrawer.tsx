import React from 'react';
import { X, BookOpen, Sparkles, AlertCircle, ShieldCheck, ScrollText, Feather, ChevronRight, Bookmark as BookmarkIcon, Info, RotateCcw } from 'lucide-react';
import type { Chapter, ThemeMode, LastRead } from '../types';
import { allChapters } from '../data/chapters';

interface SidebarDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentChapterId: string;
  onSelectChapter: (chapterId: string) => void;
  currentTheme: ThemeMode;
  lastRead: LastRead | null;
  onResumeLastRead: () => void;
  onOpenAbout: () => void;
  onOpenBookmarks: () => void;
}

export const SidebarDrawer: React.FC<SidebarDrawerProps> = ({
  isOpen,
  onClose,
  currentChapterId,
  onSelectChapter,
  currentTheme,
  lastRead,
  onResumeLastRead,
  onOpenAbout,
  onOpenBookmarks
}) => {
  if (!isOpen) return null;

  const getIcon = (iconName: string, isSelected: boolean) => {
    const className = `w-5 h-5 shrink-0 ${isSelected ? 'text-emerald-500 font-bold' : 'opacity-70'}`;
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className={className} />;
      case 'BookOpen':
        return <BookOpen className={className} />;
      case 'AlertCircle':
        return <AlertCircle className={className} />;
      case 'ShieldCheck':
        return <ShieldCheck className={className} />;
      case 'ScrollText':
        return <ScrollText className={className} />;
      case 'Feather':
        return <Feather className={className} />;
      default:
        return <BookOpen className={className} />;
    }
  };

  const getDrawerBg = () => {
    switch (currentTheme) {
      case 'dark':
        return 'bg-[#041911] text-emerald-100 border-emerald-800/40';
      case 'sepia':
        return 'bg-[#f7efe0] text-[#332214] border-amber-800/20';
      default:
        return 'bg-white text-slate-900 border-slate-200';
    }
  };

  const getItemClass = (isSelected: boolean) => {
    if (isSelected) {
      return currentTheme === 'dark'
        ? 'bg-emerald-900/60 border-emerald-500/50 text-white font-semibold shadow-sm'
        : currentTheme === 'sepia'
        ? 'bg-amber-200/60 border-amber-700/40 text-amber-950 font-semibold shadow-sm'
        : 'bg-emerald-50 border-emerald-500/40 text-emerald-900 font-semibold shadow-sm';
    }
    return currentTheme === 'dark'
      ? 'hover:bg-emerald-950/40 text-emerald-200/80 hover:text-white border-transparent'
      : currentTheme === 'sepia'
      ? 'hover:bg-amber-100/50 text-[#4a3420] border-transparent'
      : 'hover:bg-slate-100 text-slate-700 border-transparent';
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
        onClick={onClose}
      />

      {/* Drawer Body */}
      <div
        className={`relative w-full max-w-xs sm:max-w-sm h-full flex flex-col shadow-2xl border-r z-10 transition-transform duration-300 animate-in slide-in-from-left ${getDrawerBg()}`}
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-black/10 dark:border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 text-white flex items-center justify-center shadow-md font-bold text-lg">
              <span className="font-arabic">ﷺ</span>
            </div>
            <div>
              <h2 className="font-bold text-base leading-tight">Daftar Isi Risalah</h2>
              <p className="text-xs opacity-70">Keutamaan & Adab Shalawat</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Tutup Menu"
            className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Last Read Quick Resume */}
        {lastRead && (
          <div className="p-3.5 mx-4 mt-3 rounded-xl border border-emerald-600/30 bg-emerald-600/10 flex items-center justify-between">
            <div className="min-w-0 pr-2">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Terakhir Dibaca</span>
              </div>
              <p className="text-xs font-bold truncate mt-0.5">{lastRead.chapterTitle}</p>
            </div>
            <button
              onClick={() => {
                onResumeLastRead();
                onClose();
              }}
              className="px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-semibold shrink-0 transition-all"
            >
              Lanjut
            </button>
          </div>
        )}

        {/* Chapter List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-1.5">
          <div className="text-[11px] font-bold uppercase tracking-wider opacity-50 px-2 mb-2">
            Bagian & Bab Risalah
          </div>

          {allChapters.map((chapter: Chapter) => {
            const isSelected = chapter.id === currentChapterId;
            return (
              <button
                key={chapter.id}
                onClick={() => {
                  onSelectChapter(chapter.id);
                  onClose();
                }}
                className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-3 ${getItemClass(
                  isSelected
                )}`}
              >
                <div className="mt-0.5">{getIcon(chapter.iconName, isSelected)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[11px] font-bold tracking-wide uppercase opacity-75">
                      {chapter.numberRoman}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-black/5 dark:bg-white/10 opacity-75 font-medium">
                      {chapter.sections.length} Hadits/Pasal
                    </span>
                  </div>
                  <h3 className="text-xs sm:text-sm font-semibold leading-snug line-clamp-2 mt-0.5">
                    {chapter.title}
                  </h3>
                </div>
                <ChevronRight className={`w-4 h-4 shrink-0 mt-1 opacity-40 ${isSelected ? 'translate-x-0.5 text-emerald-500' : ''}`} />
              </button>
            );
          })}
        </div>

        {/* Drawer Bottom Menu */}
        <div className="p-3 border-t border-black/10 dark:border-white/10 flex items-center justify-between gap-2 text-xs">
          <button
            onClick={() => {
              onOpenBookmarks();
              onClose();
            }}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 font-medium transition-colors"
          >
            <BookmarkIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Bookmark</span>
          </button>
          
          <div className="h-4 w-px bg-black/10 dark:bg-white/10" />

          <button
            onClick={() => {
              onOpenAbout();
              onClose();
            }}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 font-medium transition-colors"
          >
            <Info className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Tentang</span>
          </button>
        </div>
      </div>
    </div>
  );
};
