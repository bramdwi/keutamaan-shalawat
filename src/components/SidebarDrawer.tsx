import React from 'react';
import { X, BookOpen, Sparkles, AlertCircle, ShieldCheck, ScrollText, Feather, ChevronRight, Bookmark as BookmarkIcon, Info, RotateCcw, Smartphone } from 'lucide-react';
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
  onInstallPWA: () => void;
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
  onOpenBookmarks,
  onInstallPWA
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
        return 'bg-[#061e16] border-emerald-900/60 text-slate-100';
      case 'sepia':
        return 'bg-[#f8f1e3] border-amber-900/20 text-[#3b2a1a]';
      default:
        return 'bg-white border-slate-200 text-slate-900';
    }
  };

  const getItemHoverBg = (isSelected: boolean) => {
    if (isSelected) {
      switch (currentTheme) {
        case 'dark':
          return 'bg-emerald-800/40 text-emerald-300 font-bold border-l-4 border-emerald-500';
        case 'sepia':
          return 'bg-amber-800/15 text-amber-950 font-bold border-l-4 border-amber-800';
        default:
          return 'bg-emerald-600/10 text-emerald-900 font-bold border-l-4 border-emerald-600';
      }
    }
    return 'hover:bg-black/5 dark:hover:bg-white/5 opacity-80 hover:opacity-100 border-l-4 border-transparent';
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div
        className={`relative w-full max-w-xs sm:max-w-sm h-full shadow-2xl flex flex-col z-10 transition-transform animate-in slide-in-from-left duration-300 border-r ${getDrawerBg()}`}
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-black/10 dark:border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-600/15 flex items-center justify-center border border-emerald-600/20">
              <span className="font-arabic text-emerald-600 dark:text-emerald-400 text-base">ﷺ</span>
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold tracking-tight">Daftar Isi Risalah</h2>
              <p className="text-[11px] opacity-60">Fadhail Shalawat</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            aria-label="Tutup Menu"
          >
            <X className="w-5 h-5 opacity-70" />
          </button>
        </div>

        {/* Resume Last Read Card (if available) */}
        {lastRead && (
          <div className="p-3 mx-3 mt-3 rounded-xl border border-emerald-600/20 bg-emerald-600/10">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Terakhir Dibaca</span>
              </div>
              <span className="text-[10px] opacity-60">{lastRead.chapterTitle.split(':')[0]}</span>
            </div>
            <button
              onClick={() => {
                onResumeLastRead();
                onClose();
              }}
              className="w-full text-left text-xs font-bold truncate hover:underline py-0.5 text-emerald-800 dark:text-emerald-300"
            >
              {lastRead.chapterTitle}
            </button>
          </div>
        )}

        {/* Chapters Navigation List */}
        <div className="flex-1 overflow-y-auto py-2 divide-y divide-black/5 dark:divide-white/5 scrollbar-thin">
          {allChapters.map((chapter: Chapter) => {
            const isSelected = chapter.id === currentChapterId;
            return (
              <button
                key={chapter.id}
                onClick={() => {
                  onSelectChapter(chapter.id);
                  onClose();
                }}
                className={`w-full text-left px-4 sm:px-5 py-3.5 flex items-start gap-3 transition-all ${getItemHoverBg(
                  isSelected
                )}`}
              >
                <div className="mt-0.5">{getIcon(chapter.iconName || 'BookOpen', isSelected)}</div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                      {chapter.numberText}
                    </span>
                    {chapter.sections.length > 0 && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-black/5 dark:bg-white/10 opacity-75 font-medium">
                        {chapter.sections.length} Bagian
                      </span>
                    )}
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

        {/* Drawer Bottom Menu: Bookmark, Pasang App, Tentang */}
        <div className="p-3 border-t border-black/10 dark:border-white/10 grid grid-cols-3 gap-1.5 text-xs">
          <button
            onClick={() => {
              onOpenBookmarks();
              onClose();
            }}
            className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 py-2 px-1 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 font-medium transition-colors text-center"
            title="Daftar Bookmark"
          >
            <BookmarkIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span className="text-[11px] sm:text-xs">Bookmark</span>
          </button>
          
          <button
            onClick={() => {
              onInstallPWA();
              onClose();
            }}
            className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 py-2 px-1 rounded-xl hover:bg-emerald-600/15 active:scale-95 font-medium transition-all text-center text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-600/20"
            title="Pasang sebagai aplikasi"
          >
            <Smartphone className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span className="text-[11px] sm:text-xs font-semibold">Pasang App</span>
          </button>

          <button
            onClick={() => {
              onOpenAbout();
              onClose();
            }}
            className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 py-2 px-1 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 font-medium transition-colors text-center"
            title="Tentang Risalah"
          >
            <Info className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span className="text-[11px] sm:text-xs">Tentang</span>
          </button>
        </div>
      </div>
    </div>
  );
};
