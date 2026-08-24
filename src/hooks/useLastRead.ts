import { useState } from 'react';
import type { LastRead } from '../types';

const STORAGE_KEY = 'keutamaan_shalawat_lastread_v1';

export const useLastRead = () => {
  const [lastRead, setLastRead] = useState<LastRead | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const saveLastRead = (chapterId: string, chapterTitle: string, sectionId?: string) => {
    const data: LastRead = {
      chapterId,
      chapterTitle,
      sectionId,
      timestamp: Date.now()
    };
    setLastRead(data);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save last read', e);
    }
  };

  return {
    lastRead,
    saveLastRead
  };
};
