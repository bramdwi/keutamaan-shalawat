import React, { useState, useMemo } from 'react';
import { X, Search, ChevronRight, Hash } from 'lucide-react';
import type { ThemeMode, SectionItem } from '../types';
import { allChapters } from '../data/chapters';

interface SearchResultItem {
  chapterId: string;
  chapterTitle: string;
  chapterNumber: string;
  section: SectionItem;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectResult: (chapterId: string, sectionId: string) => void;
  currentTheme: ThemeMode;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectResult,
  currentTheme
}) => {
  const [query, setQuery] = useState('');

  const getModalBg = () => {
    switch (currentTheme) {
      case 'dark':
        return 'bg-[#06241a] text-white border-emerald-800/50';
      case 'sepia':
        return 'bg-[#fcf7ee] text-[#332214] border-amber-800/30';
      default:
        return 'bg-white text-slate-900 border-slate-200';
    }
  };

  const results: SearchResultItem[] = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q || q.length < 2) return [];

    const matches: SearchResultItem[] = [];

    allChapters.forEach((chapter) => {
      chapter.sections.forEach((sec) => {
        const inTitle = sec.title.toLowerCase().includes(q);
        const inTranslation = sec.translation?.toLowerCase().includes(q);
        const inArabic = sec.arabic?.includes(q);
        const inTransliteration = sec.transliteration?.toLowerCase().includes(q);
        const inNarrator = sec.narrator?.toLowerCase().includes(q);
        const inHadithNum = sec.hadithNumber?.toLowerCase().includes(q);
        const inExplanation = sec.explanation?.some((e) => e.toLowerCase().includes(q));
        const inTags = sec.tags?.some((t) => t.toLowerCase().includes(q));

        if (
          inTitle ||
          inTranslation ||
          inArabic ||
          inTransliteration ||
          inNarrator ||
          inHadithNum ||
          inExplanation ||
          inTags
        ) {
          matches.push({
            chapterId: chapter.id,
            chapterTitle: chapter.title,
            chapterNumber: chapter.numberRoman,
            section: sec
          });
        }
      });
    });

    return matches;
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-6 pt-12 sm:pt-20">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      <div
        className={`relative w-full max-w-2xl max-h-[80vh] flex flex-col rounded-3xl shadow-2xl border z-10 animate-in zoom-in-95 duration-200 overflow-hidden ${getModalBg()}`}
      >
        {/* Search Header Bar */}
        <div className="p-4 sm:p-5 border-b border-black/10 dark:border-white/10 flex items-center gap-3">
          <Search className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari hadits, faedah, kata kunci, perawi..."
            autoFocus
            className="w-full bg-transparent text-sm sm:text-base outline-hidden placeholder:opacity-50 font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 text-xs opacity-60 hover:opacity-100"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            aria-label="Tutup Pencarian"
            className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Results Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
          {query.trim().length < 2 ? (
            <div className="text-center py-12 opacity-60">
              <Search className="w-10 h-10 mx-auto mb-2 opacity-40 text-emerald-600 dark:text-emerald-400" />
              <p className="text-xs sm:text-sm font-medium">
                Ketik minimal 2 karakter untuk mencari dalam seluruh bab risalah
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-1.5 max-w-sm mx-auto">
                {['Jum\'at', 'Ibrahimiyah', 'Syafaat', 'Bakhil', 'Ubay bin Ka\'ab'].map((chip) => (
                  <button
                    key={chip}
                    onClick={() => setQuery(chip)}
                    className="text-[11px] px-2.5 py-1 rounded-full bg-black/5 dark:bg-white/10 hover:bg-emerald-600 hover:text-white transition-all"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-12 opacity-70">
              <p className="text-sm font-semibold">Tidak ditemukan hasil untuk "{query}"</p>
              <p className="text-xs opacity-75 mt-1">Coba kata kunci lain atau periksa ejaan</p>
            </div>
          ) : (
            <>
              <div className="text-xs font-bold uppercase tracking-wider opacity-60 px-1 mb-2">
                Ditemukan {results.length} Hasil
              </div>
              {results.map((res, idx) => (
                <button
                  key={`${res.chapterId}-${res.section.id}-${idx}`}
                  onClick={() => {
                    onSelectResult(res.chapterId, res.section.id);
                    onClose();
                  }}
                  className="w-full text-left p-4 rounded-2xl border border-black/10 dark:border-white/10 hover:border-emerald-600/40 hover:bg-emerald-600/5 active:scale-99 transition-all group"
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-600/10 text-emerald-800 dark:text-emerald-300">
                      {res.chapterNumber}
                    </span>
                    {res.section.hadithNumber && (
                      <span className="text-[10px] opacity-60 flex items-center gap-1">
                        <Hash className="w-2.5 h-2.5" />
                        {res.section.hadithNumber}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xs sm:text-sm font-bold leading-snug group-hover:text-emerald-700 dark:group-hover:text-emerald-300">
                    {res.section.title}
                  </h3>

                  {res.section.translation && (
                    <p className="text-xs opacity-75 line-clamp-2 mt-1 italic">
                      "{res.section.translation}"
                    </p>
                  )}

                  <div className="mt-2 flex items-center justify-between text-[11px] opacity-60 pt-2 border-t border-black/5 dark:border-white/5">
                    <span className="truncate">{res.chapterTitle}</span>
                    <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-semibold group-hover:translate-x-0.5 transition-transform">
                      Buka <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </button>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
