import type { Chapter } from '../types';
import { mukadimah } from './mukadimah';
import { bab1 } from './bab-1';
import { bab2 } from './bab-2';
import { bab3 } from './bab-3';
import { bab4 } from './bab-4';
import { bab5 } from './bab-5';
import { khatimah } from './khatimah';

export const allChapters: Chapter[] = [
  mukadimah,
  bab1,
  bab2,
  bab3,
  bab4,
  bab5,
  khatimah
];

export const getChapterById = (id: string): Chapter | undefined => {
  return allChapters.find((chap) => chap.id === id);
};

export const getAdjacentChapters = (currentId: string): { prev?: Chapter; next?: Chapter } => {
  const index = allChapters.findIndex((chap) => chap.id === currentId);
  if (index === -1) return {};
  return {
    prev: index > 0 ? allChapters[index - 1] : undefined,
    next: index < allChapters.length - 1 ? allChapters[index + 1] : undefined
  };
};

export const getTotalSections = (): number => {
  return allChapters.reduce((acc, chap) => acc + chap.sections.length, 0);
};
