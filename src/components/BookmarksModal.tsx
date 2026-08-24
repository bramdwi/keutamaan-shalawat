import React from 'react';
import { X, Bookmark as BookmarkIcon, Trash2, ChevronRight } from 'lucide-react';
import type { ThemeMode, Bookmark } from '../types';

interface BookmarksModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarks: Bookmark[];
  onSelectBookmark: (chapterId: string, sectionId: string) => void;
  onRemoveBookmark: (chapterId: string, sectionId: string) => void;
  currentTheme: ThemeMode;
}

export const BookmarksModal: React.FC<BookmarksModalProps> = ({
  isOpen,
  onClose,
  bookmarks,
  onSelectBookmark,
  onRemoveBookmark,
  currentTheme
}) => {
  if (!isOpen) return null;

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      <div
        className={`relative w-full max-w-lg max-h-[85vh] flex flex-col rounded-3xl p-6 shadow-2xl border z-10 animate-in zoom-in-95 duration-200 ${getModalBg()}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-black/10 dark:border-white/10 mb-4">
          <div className="flex items-center gap-2">
            <BookmarkIcon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-lg font-bold">Daftar Bookmark ({bookmarks.length})</h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Tutup Bookmark"
            className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto space-y-2.5">
          {bookmarks.length === 0 ? (
            <div className="text-center py-16 opacity-60">
              <BookmarkIcon className="w-12 h-12 mx-auto mb-3 opacity-30 text-emerald-600 dark:text-emerald-400" />
              <p className="text-sm font-semibold">Belum Ada Hadits yang Ditandai</p>
              <p className="text-xs opacity-75 mt-1 max-w-xs mx-auto">
                Sentuh ikon bookmark pada pasal/hadits yang ingin Anda simpan untuk dibaca kembali dengan cepat.
              </p>
            </div>
          ) : (
            bookmarks.map((bm) => (
              <div
                key={`${bm.chapterId}-${bm.sectionId}`}
                className="p-3.5 rounded-2xl border border-black/10 dark:border-white/10 hover:border-emerald-600/40 bg-black/5 dark:bg-white/5 flex items-start justify-between gap-3 group transition-all"
              >
                <button
                  onClick={() => {
                    onSelectBookmark(bm.chapterId, bm.sectionId);
                    onClose();
                  }}
                  className="flex-1 text-left min-w-0"
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 block mb-0.5">
                    {bm.chapterTitle}
                  </span>
                  <h3 className="text-xs sm:text-sm font-bold leading-snug truncate group-hover:text-emerald-700 dark:group-hover:text-emerald-300">
                    {bm.sectionTitle}
                  </h3>
                  {bm.previewText && (
                    <p className="text-[11px] opacity-70 line-clamp-1 italic mt-0.5">
                      "{bm.previewText}"
                    </p>
                  )}
                  <span className="text-[10px] opacity-40 block mt-1">
                    {new Date(bm.timestamp).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </span>
                </button>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => {
                      onSelectBookmark(bm.chapterId, bm.sectionId);
                      onClose();
                    }}
                    title="Buka hadits"
                    className="p-2 rounded-xl hover:bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onRemoveBookmark(bm.chapterId, bm.sectionId)}
                    title="Hapus bookmark"
                    className="p-2 rounded-xl hover:bg-rose-500/10 text-rose-500 opacity-60 hover:opacity-100 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
