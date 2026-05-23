import { LevelProgress, ProgressRepository } from './ProgressRepository';

export class MemoryProgressRepository implements ProgressRepository {
  private items: LevelProgress[] = [
    { levelId: 1, cleared: false, stars: 0, bestScore: 0, updatedAt: Date.now() }
  ];

  async getAll(): Promise<LevelProgress[]> {
    return this.items.map(item => ({ ...item }));
  }

  async save(progress: LevelProgress): Promise<void> {
    const index = this.items.findIndex(item => item.levelId === progress.levelId);
    if (index >= 0) {
      this.items[index] = { ...progress };
    } else {
      this.items.push({ ...progress });
    }
  }

  async getUnlockedLevel(): Promise<number> {
    const cleared = this.items.filter(item => item.cleared).map(item => item.levelId);
    if (cleared.length === 0) {
      return 1;
    }
    return Math.min(100, Math.max(...cleared) + 1);
  }
}
