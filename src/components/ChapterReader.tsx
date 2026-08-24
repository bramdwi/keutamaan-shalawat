import React, { useEffect, useRef } from 'react';
import { Bookmark, Share2, Copy, ArrowLeft, ArrowRight, BookOpen, Sparkles, Check, Hash, ArrowUp } from 'lucide-react';
import type { Chapter, UserPreferences, SectionItem } from '../types';
import { getAdjacentChapters } from '../data/chapters';

interface ChapterReaderProps {
  chapter: Chapter;
  preferences: UserPreferences;
  onSelectChapter: (chapterId: string) => void;
  isBookmarked: (chapterId: string, sectionId: string) => boolean;
  onToggleBookmark: (chapterId: string, chapterTitle: string, section: SectionItem) => void;
  onShowToast: (text: string, type?: 'success' | 'info' | 'error') => void;
  targetSectionId?: string;
}

export const ChapterReader: React.FC<ChapterReaderProps> = ({
  chapter,
  preferences,
  onSelectChapter,
  isBookmarked,
  onToggleBookmark,
  onShowToast,
  targetSectionId
}) => {
  const { prev, next } = getAdjacentChapters(chapter.id);
  const readerTopRef = useRef<HTMLDivElement>(null);
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  // Scroll to targeted section or top on chapter change
  useEffect(() => {
    if (targetSectionId) {
      const el = document.getElementById(targetSectionId);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [chapter.id, targetSectionId]);

  const getArabicSizeClass = () => {
    switch (preferences.arabicFontSize) {
      case 'sm':
        return 'text-xl sm:text-2xl leading-[2.2]';
      case 'md':
        return 'text-2xl sm:text-3xl leading-[2.3]';
      case 'lg':
        return 'text-3xl sm:text-4xl leading-[2.4]';
      case 'xl':
        return 'text-3xl sm:text-4xl md:text-5xl leading-[2.5]';
      case '2xl':
        return 'text-4xl sm:text-5xl md:text-6xl leading-[2.6]';
      case '3xl':
        return 'text-5xl sm:text-6xl md:text-7xl leading-[2.7]';
      default:
        return 'text-3xl sm:text-4xl leading-[2.4]';
    }
  };

  const getLatinSizeClass = () => {
    switch (preferences.latinFontSize) {
      case 'xs':
        return 'text-xs sm:text-sm';
      case 'sm':
        return 'text-sm sm:text-base';
      case 'md':
        return 'text-base sm:text-lg';
      case 'lg':
        return 'text-lg sm:text-xl';
      case 'xl':
        return 'text-xl sm:text-2xl';
      default:
        return 'text-base sm:text-lg';
    }
  };

  const handleCopyText = (section: SectionItem) => {
    let textToCopy = `📖 ${section.title}\n\n`;
    if (section.arabic) {
      textToCopy += `${section.arabic}\n\n`;
    }
    if (section.transliteration) {
      textToCopy += `Latin: ${section.transliteration}\n\n`;
    }
    if (section.translation) {
      textToCopy += `Artinya: "${section.translation}"\n\n`;
    }
    if (section.narrator) {
      textToCopy += `📚 Riwayat: ${section.narrator}\n`;
    }
    textToCopy += `\n(Disalin dari Aplikasi PWA Keutamaan Shalawat ﷺ)`;

    navigator.clipboard.writeText(textToCopy);
    setCopiedId(section.id);
    onShowToast('Teks hadits & faedah berhasil disalin', 'success');
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleShareWhatsApp = (section: SectionItem) => {
    let shareText = `*${chapter.title}*\n_${section.title}_\n\n`;
    if (section.arabic) {
      shareText += `${section.arabic}\n\n`;
    }
    if (section.translation) {
      shareText += `"${section.translation}"\n\n`;
    }
    if (section.narrator) {
      shareText += `📚 *Riwayat:* ${section.narrator}\n`;
    }
    shareText += `\n_Aplikasi PWA Keutamaan Shalawat ﷺ_`;

    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };

  const getCardBg = () => {
    switch (preferences.theme) {
      case 'dark':
        return 'bg-[#08291e] border-emerald-800/40 text-white shadow-md';
      case 'sepia':
        return 'bg-[#fcf7ee] border-amber-800/20 text-[#3b2a1a] shadow-sm';
      default:
        return 'bg-white border-slate-200/90 text-slate-900 shadow-sm';
    }
  };

  const getFaedahBoxBg = () => {
    switch (preferences.theme) {
      case 'dark':
        return 'bg-emerald-950/70 border-emerald-700/40 text-white';
      case 'sepia':
        return 'bg-[#f4ece0] border-amber-700/20 text-[#4c3621]';
      default:
        return 'bg-emerald-50/60 border-emerald-200/80 text-emerald-950';
    }
  };

  const getArabicTextColor = () => {
    switch (preferences.theme) {
      case 'dark':
        return 'text-white';
      case 'sepia':
        return 'text-[#2a1708]';
      default:
        return 'text-slate-900';
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div ref={readerTopRef} className="max-w-4xl mx-auto px-3.5 sm:px-6 py-6 sm:py-10">
      {/* Chapter Banner */}
      <div className="mb-8 sm:mb-12 text-center relative overflow-hidden rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-emerald-600/20 bg-gradient-to-b from-emerald-700/10 via-emerald-600/5 to-transparent">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-600/15 text-emerald-800 dark:text-white mb-3 border border-emerald-600/20">
          <BookOpen className="w-3.5 h-3.5 text-emerald-600 dark:text-white" />
          <span>{chapter.numberText}</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight mb-3 text-inherit dark:text-white">
          {chapter.title}
        </h1>

        {chapter.subtitle && (
          <p className="text-sm sm:text-base font-medium opacity-80 dark:opacity-100 max-w-2xl mx-auto mb-4 text-inherit dark:text-white">
            {chapter.subtitle}
          </p>
        )}

        {chapter.description && (
          <p className="text-xs sm:text-sm opacity-70 dark:opacity-90 max-w-xl mx-auto leading-relaxed italic border-t border-black/5 dark:border-white/10 pt-3 text-inherit dark:text-white">
            "{chapter.description}"
          </p>
        )}
      </div>

      {/* Sections List */}
      <div className="space-y-6 sm:space-y-8">
        {chapter.sections.length === 0 ? (
          <div className="text-center py-16 px-4 rounded-2xl border border-dashed border-emerald-600/30 bg-emerald-500/5">
            <Sparkles className="w-12 h-12 text-emerald-500 mx-auto mb-3 opacity-60 animate-pulse" />
            <h3 className="text-lg font-bold mb-1 text-inherit dark:text-white">Menunggu Isi Teks Bab Ini</h3>
            <p className="text-xs sm:text-sm opacity-70 dark:opacity-90 max-w-md mx-auto text-inherit dark:text-white">
              Silakan paste isi teks untuk {chapter.title} di chat, dan konten akan otomatis tampil di sini secara terstruktur.
            </p>
          </div>
        ) : (
          chapter.sections.map((section, idx) => {
            const bookmarked = isBookmarked(chapter.id, section.id);
            const isCopied = copiedId === section.id;

            return (
              <article
                key={section.id}
                id={section.id}
                className={`rounded-2xl sm:rounded-3xl border p-5 sm:p-8 transition-all relative ${getCardBg()}`}
              >
                {/* Section Header */}
                <div className="flex items-start justify-between gap-3 pb-4 border-b border-black/10 dark:border-white/10 mb-6">
                  <div className="flex items-start gap-2.5">
                    <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-emerald-600/15 text-emerald-800 dark:text-white font-bold text-xs sm:text-sm flex items-center justify-center shrink-0 mt-0.5 border border-emerald-600/20">
                      {section.number || idx + 1}
                    </span>
                    <div>
                      <h2 className="text-base sm:text-xl font-bold leading-snug text-inherit dark:text-white">
                        {section.title}
                      </h2>
                      {section.hadithNumber && (
                        <div className="flex items-center gap-1 text-[11px] sm:text-xs opacity-70 dark:opacity-90 dark:text-white mt-1">
                          <Hash className="w-3 h-3 text-emerald-600 dark:text-white" />
                          <span>{section.hadithNumber}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions (Bookmark, Share, Copy) */}
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => handleCopyText(section)}
                      title="Salin Hadits"
                      aria-label="Salin Hadits"
                      className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 transition-all text-xs opacity-75 hover:opacity-100"
                    >
                      {isCopied ? (
                        <Check className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>

                    <button
                      onClick={() => handleShareWhatsApp(section)}
                      title="Bagikan ke WhatsApp"
                      aria-label="Bagikan ke WhatsApp"
                      className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 transition-all text-xs opacity-75 hover:opacity-100"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() =>
                        onToggleBookmark(chapter.id, chapter.title, section)
                      }
                      title={bookmarked ? 'Hapus Bookmark' : 'Simpan ke Bookmark'}
                      aria-label="Bookmark Hadits"
                      className={`p-2 rounded-xl active:scale-95 transition-all ${
                        bookmarked
                          ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 font-bold'
                          : 'opacity-75 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/10'
                      }`}
                    >
                      <Bookmark
                        className="w-4 h-4"
                        fill={bookmarked ? 'currentColor' : 'none'}
                      />
                    </button>
                  </div>
                </div>

                {/* Arabic Text */}
                {preferences.showArabic && section.arabic && (
                  <div className="my-6 py-2 px-1">
                    <p
                      className={`${preferences.arabicFontFamily === 'scheherazade' ? 'font-scheherazade' : 'font-arabic'} ${getArabicSizeClass()} ${getArabicTextColor()} font-normal select-text tracking-wide`}
                    >
                      {section.arabic}
                    </p>
                  </div>
                )}

                {/* Transliteration */}
                {preferences.showTransliteration && section.transliteration && (
                  <div className="mb-4 text-xs sm:text-sm italic leading-relaxed bg-black/5 dark:bg-white/10 p-3 sm:p-4 rounded-xl border border-black/5 dark:border-white/10 dark:text-slate-100">
                    <span className="font-semibold not-italic text-[11px] block uppercase tracking-wider text-emerald-700 dark:text-emerald-300 mb-1">
                      Transliterasi:
                    </span>
                    {section.transliteration}
                  </div>
                )}

                {/* Indonesian Translation */}
                {preferences.showTranslation && section.translation && (
                  <div className="my-4">
                    <p className={`${getLatinSizeClass()} font-normal leading-relaxed text-inherit dark:text-white`}>
                      "{section.translation}"
                    </p>
                  </div>
                )}

                {/* Narrator / Perawi */}
                {section.narrator && (
                  <div className="mt-3 text-xs sm:text-sm font-medium text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                    <span>Riwayat: {section.narrator}</span>
                  </div>
                )}

                {/* Explanation / Faedah / Syarah */}
                {preferences.showExplanation &&
                  section.explanation &&
                  section.explanation.length > 0 && (
                    <div className={`mt-6 p-4 sm:p-5 rounded-xl sm:rounded-2xl border ${getFaedahBoxBg()}`}>
                      <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm mb-2.5 text-emerald-800 dark:text-white uppercase tracking-wide">
                        <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-300 shrink-0" />
                        <span>Faedah & Penjelasan:</span>
                      </div>
                      <ul className="space-y-2 text-xs sm:text-sm leading-relaxed">
                        {section.explanation.map((exp, expIdx) => (
                          <li key={expIdx} className="flex items-start gap-2">
                            <span className="text-emerald-600 dark:text-emerald-300 font-bold shrink-0 mt-0.5">
                              •
                            </span>
                            <span className="opacity-95 text-inherit dark:text-white">{exp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                {/* Tags */}
                {section.tags && section.tags.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-black/5 dark:border-white/5 flex flex-wrap gap-1.5">
                    {section.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] sm:text-[11px] px-2 py-0.5 rounded-md bg-black/5 dark:bg-white/10 opacity-70 font-medium text-inherit dark:text-white"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            );
          })
        )}
      </div>

      {/* Chapter Bottom Navigation (Prev / Next) */}
      <div className="mt-12 pt-8 border-t border-black/10 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        {prev ? (
          <button
            onClick={() => onSelectChapter(prev.id)}
            className="w-full sm:w-auto flex-1 flex items-center gap-3 p-4 rounded-2xl border border-emerald-600/30 hover:bg-emerald-600/10 active:scale-98 transition-all text-left group"
          >
            <div className="p-2 rounded-xl bg-emerald-600/15 text-emerald-700 dark:text-emerald-300 group-hover:-translate-x-1 transition-transform">
              <ArrowLeft className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-bold uppercase tracking-wider opacity-60 dark:text-white/70 block">
                Bab Sebelumnya
              </span>
              <span className="text-xs sm:text-sm font-bold truncate block text-inherit dark:text-white">
                {prev.numberRoman}: {prev.title}
              </span>
            </div>
          </button>
        ) : (
          <div className="hidden sm:block flex-1" />
        )}

        {next ? (
          <button
            onClick={() => onSelectChapter(next.id)}
            className="w-full sm:w-auto flex-1 flex items-center justify-end gap-3 p-4 rounded-2xl border border-emerald-600/30 hover:bg-emerald-600/10 active:scale-98 transition-all text-right group"
          >
            <div className="min-w-0">
              <span className="text-[10px] font-bold uppercase tracking-wider opacity-60 dark:text-white/70 block">
                Bab Selanjutnya
              </span>
              <span className="text-xs sm:text-sm font-bold truncate block text-inherit dark:text-white">
                {next.numberRoman}: {next.title}
              </span>
            </div>
            <div className="p-2 rounded-xl bg-emerald-600/15 text-emerald-700 dark:text-emerald-300 group-hover:translate-x-1 transition-transform">
              <ArrowRight className="w-5 h-5" />
            </div>
          </button>
        ) : (
          <div className="hidden sm:block flex-1" />
        )}
      </div>

      {/* Floating Scroll to Top */}
      <button
        onClick={scrollToTop}
        title="Kembali ke atas"
        aria-label="Kembali ke atas"
        className="fixed bottom-6 right-6 p-3 rounded-full bg-emerald-600 text-white shadow-xl hover:bg-emerald-700 active:scale-95 transition-all z-20"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </div>
  );
};
