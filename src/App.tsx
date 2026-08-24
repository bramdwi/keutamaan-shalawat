import { useState, useEffect } from 'react';
import { usePreferences } from './hooks/usePreferences';
import { useBookmarks } from './hooks/useBookmarks';
import { useLastRead } from './hooks/useLastRead';
import { usePWAInstall } from './hooks/usePWAInstall';
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
  const { triggerInstall, isInstalled } = usePWAInstall();

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

  // Toast state
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (text: string, type: ToastMessage['type'] = 'info') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  // Scroll to top when activeChapter changes (without target section)
  useEffect(() => {
    if (!targetSectionId) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [activeChapterId, targetSectionId]);

  const currentChapter = getChapterById(activeChapterId) || allChapters[0];

  const handleSelectChapter = (chapterId: string) => {
    setTargetSectionId(undefined);
    setActiveChapterId(chapterId);
    const targetChapter = getChapterById(chapterId);
    if (targetChapter) {
      saveLastRead(targetChapter.id, targetChapter.title);
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleSelectSearchResult = (chapterId: string, sectionId: string) => {
    setActiveChapterId(chapterId);
    setTargetSectionId(sectionId);
    const targetChapter = getChapterById(chapterId);
    if (targetChapter) {
      saveLastRead(targetChapter.id, targetChapter.title, sectionId);
    }
  };

  const handleResumeLastRead = () => {
    if (lastRead) {
      setActiveChapterId(lastRead.chapterId);
      setTargetSectionId(lastRead.sectionId);
      showToast(`Melanjutkan: ${lastRead.chapterTitle}`, 'info');
    }
  };

  const handleToggleBookmark = (
    chapterId: string,
    chapterTitle: string,
    section: SectionItem
  ) => {
    const alreadyBookmarked = isBookmarked(chapterId, section.id);
    toggleBookmark({
      chapterId,
      chapterTitle,
      sectionId: section.id,
      sectionTitle: section.title,
      previewText: section.translation || section.arabic || section.title
    });
    showToast(
      alreadyBookmarked ? 'Dihapus dari Bookmark' : 'Ditambahkan ke Bookmark',
      alreadyBookmarked ? 'info' : 'success'
    );
  };

  const handleInstallPWA = () => {
    if (isInstalled) {
      showToast('Aplikasi sudah terpasang di perangkat Anda', 'info');
      return;
    }
    triggerInstall(() => {
      setIsAboutOpen(true);
      showToast('Ketuk menu browser lalu "Tambahkan ke Layar Utama" (Add to Home screen)', 'info');
    });
  };

  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors duration-200">
      {/* Top Fixed Header */}
      <Header
        onOpenDrawer={() => setIsDrawerOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenTasbih={() => setIsTasbihOpen(true)}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        currentTheme={preferences.theme}
        bookmarkCount={bookmarks.length}
      />

      {/* Main Content Body */}
      <main className="flex-1">
        <ChapterReader
          chapter={currentChapter}
          preferences={preferences}
          onSelectChapter={handleSelectChapter}
          onToggleBookmark={handleToggleBookmark}
          isBookmarked={isBookmarked}
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
        onInstallPWA={handleInstallPWA}
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
        onSelectResult={handleSelectSearchResult}
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
        onRemoveBookmark={removeBookmark}
        onSelectBookmark={handleSelectSearchResult}
        currentTheme={preferences.theme}
      />

      {/* About Modal */}
      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
        currentTheme={preferences.theme}
      />

      {/* Global Toast Notifications */}
      <Toast toasts={toasts} />
    </div>
  );
}
export default App;
