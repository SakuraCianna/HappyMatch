import { LEVEL_CHAPTERS } from './LevelChapters';

export function isWorldEntryLevel(levelId: number): boolean {
  return LEVEL_CHAPTERS.some(chapter => chapter.startLevel === levelId);
}

export function isLevelPlayable(levelId: number, unlockedLevel: number): boolean {
  return levelId <= unlockedLevel || isWorldEntryLevel(levelId);
}
