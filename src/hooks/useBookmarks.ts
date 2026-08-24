import { useState, useEffect } from 'react';
import type { Bookmark } from '../types';

const STORAGE_KEY = 'keutamaan_shalawat_bookmarks_v1';

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
    } catch (e) {
      console.error('Failed to save bookmarks', e);
    }
  }, [bookmarks]);

  const toggleBookmark = (item: Omit<Bookmark, 'timestamp'>) => {
    setBookmarks((prev) => {
      const exists = prev.some(
        (b) => b.chapterId === item.chapterId && b.sectionId === item.sectionId
      );
      if (exists) {
        return prev.filter(
          (b) => !(b.chapterId === item.chapterId && b.sectionId === item.sectionId)
        );
      } else {
        return [{ ...item, timestamp: Date.now() }, ...prev];
      }
    });
  };

  const isBookmarked = (chapterId: string, sectionId: string): boolean => {
    return bookmarks.some((b) => b.chapterId === chapterId && b.sectionId === sectionId);
  };

  const removeBookmark = (chapterId: string, sectionId: string) => {
    setBookmarks((prev) =>
      prev.filter((b) => !(b.chapterId === chapterId && b.sectionId === sectionId))
    );
  };

  return {
    bookmarks,
    toggleBookmark,
    isBookmarked,
    removeBookmark
  };
};
