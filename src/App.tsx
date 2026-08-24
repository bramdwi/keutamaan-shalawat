import { useState, useEffect } from 'react';
import { usePreferences } from './hooks/usePreferences';
import { useBookmarks } from './hooks/useBookmarks';
import { useLastRead } from './hooks/useLastRead';
import { getChapterById, allChapters } from './data/chapters';
import type { SectionItem } from './types';
import { Header } from './components/Header';
import { SidebarDrawer } from './components/SidebarDrawer';
import { ChapterReader } from './components/ChapterReader';
import { SettingsModal } from './components/SettingsModal';
import { SearchModal } from './components/SearchModal';
import { TasbihModal } from './components/TasbihModal';
import { BookmarksModal } from './components/BookmarksModal';
import { AboutModal } from './components/AboutModal';
import { Toast } from './components/Toast';
import type { ToastMessage } from './components/Toast';

export function App() {
  const {
    preferences,
    setTheme,
    setArabicFontSize,
    setLatinFontSize,
    setArabicFontFamily,
    toggleOption
  } = usePreferences();

  const { bookmarks, toggleBookmark, isBookmarked, removeBookmark } = useBookmarks();
  const { lastRead, saveLastRead } = useLastRead();

  const [activeChapterId, setActiveChapterId] = useState<string>(() => {
    return lastRead?.chapterId || 'bab-1';
  });
  const [targetSectionId, setTargetSectionId] = useState<string | undefined>(undefined);

  // Modals state
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isTasbihOpen, setIsTasbihOpen] = useState<boolean>(false);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState<boolean>(false);
  const [isAboutOpen, setIsAboutOpen] = useState<boolean>(false);

  // Toasts state
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (text: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString();
    const newToast: ToastMessage = { id, text, type };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2800);
  };

  const activeChapter = getChapterById(activeChapterId) || allChapters[0];

  // Auto-record last read on chapter change
  useEffect(() => {
    if (activeChapter) {
      saveLastRead(activeChapter.id, activeChapter.title, targetSectionId);
    }
  }, [activeChapterId, targetSectionId]);

  const handleSelectChapter = (chapterId: string, sectionId?: string) => {
    setActiveChapterId(chapterId);
    setTargetSectionId(sectionId);
  };

  const handleToggleBookmark = (
    chapterId: string,
    chapterTitle: string,
    section: SectionItem
  ) => {
    const wasBookmarked = isBookmarked(chapterId, section.id);
    toggleBookmark({
      chapterId,
      chapterTitle,
      sectionId: section.id,
      sectionTitle: section.title,
      previewText: section.translation || section.arabic || ''
    });

    if (wasBookmarked) {
      showToast('Hadits dihapus dari bookmark', 'info');
    } else {
      showToast('Hadits disimpan ke bookmark', 'success');
    }
  };

  const handleResumeLastRead = () => {
    if (lastRead) {
      setActiveChapterId(lastRead.chapterId);
      setTargetSectionId(lastRead.sectionId);
      showToast(`Melanjutkan membaca: ${lastRead.chapterTitle}`, 'info');
    }
  };

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-200">
      {/* Top Header */}
      <Header
        onOpenDrawer={() => setIsDrawerOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        onOpenTasbih={() => setIsTasbihOpen(true)}
        currentTheme={preferences.theme}
        bookmarkCount={bookmarks.length}
      />

      {/* Main Reader View */}
      <main className="flex-1">
        <ChapterReader
          chapter={activeChapter}
          preferences={preferences}
          onSelectChapter={handleSelectChapter}
          isBookmarked={isBookmarked}
          onToggleBookmark={handleToggleBookmark}
          onShowToast={showToast}
          targetSectionId={targetSectionId}
        />
      </main>

      {/* Footer */}
      <footer className="py-8 px-4 text-center text-xs opacity-60 border-t border-black/5 dark:border-white/5 transition-colors">
        <div className="max-w-md mx-auto space-y-1">
          <p className="font-semibold">
            Keutamaan Shalawat ﷺ • Risalah Digital
          </p>
          <p className="text-[11px] opacity-75">
            Didigitalisasi Oleh : Abu Basyir, Jakarta
          </p>
        </div>
      </footer>

      {/* Sidebar Drawer Navigation */}
      <SidebarDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        currentChapterId={activeChapterId}
        onSelectChapter={handleSelectChapter}
        currentTheme={preferences.theme}
        lastRead={lastRead}
        onResumeLastRead={handleResumeLastRead}
        onOpenAbout={() => setIsAboutOpen(true)}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        preferences={preferences}
        onSetTheme={setTheme}
        onSetArabicFontSize={setArabicFontSize}
        onSetLatinFontSize={setLatinFontSize}
        onSetArabicFontFamily={setArabicFontFamily}
        onToggleOption={toggleOption}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectResult={(chapId, secId) => handleSelectChapter(chapId, secId)}
        currentTheme={preferences.theme}
      />

      {/* Tasbih Modal */}
      <TasbihModal
        isOpen={isTasbihOpen}
        onClose={() => setIsTasbihOpen(false)}
        currentTheme={preferences.theme}
      />

      {/* Bookmarks Modal */}
      <BookmarksModal
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        bookmarks={bookmarks}
        onSelectBookmark={(chapId, secId) => handleSelectChapter(chapId, secId)}
        onRemoveBookmark={(chapId, secId) => {
          removeBookmark(chapId, secId);
          showToast('Bookmark dihapus', 'info');
        }}
        currentTheme={preferences.theme}
      />

      {/* About Modal */}
      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
        currentTheme={preferences.theme}
      />

      {/* Toast Notifications */}
      <Toast toasts={toasts} />
    </div>
  );
}

export default App;
