import { MemoryProgressRepository } from './MemoryProgressRepository';
import { LevelProgress, ProgressRepository } from './ProgressRepository';

export interface LevelResult {
  levelId: number;
  won: boolean;
  score: number;
  movesLeft: number;
  targetScore: number;
}

export class ProgressService {
  constructor(private repository: ProgressRepository = new MemoryProgressRepository()) {
  }

  setRepository(repository: ProgressRepository): void {
    this.repository = repository;
  }

  async getAll(): Promise<LevelProgress[]> {
    return this.repository.getAll();
  }

  async getUnlockedLevel(): Promise<number> {
    return this.repository.getUnlockedLevel();
  }

  async recordResult(result: LevelResult): Promise<LevelProgress> {
    const existing = (await this.repository.getAll()).find(item => item.levelId === result.levelId);
    const nextStars = this.calculateStars(result.won, result.score, result.targetScore);
    const progress: LevelProgress = {
      levelId: result.levelId,
      cleared: Boolean(existing?.cleared || result.won),
      stars: Math.max(existing?.stars ?? 0, nextStars),
      bestScore: Math.max(existing?.bestScore ?? 0, result.score),
      updatedAt: Date.now()
    };
    await this.repository.save(progress);
    return progress;
  }

  calculateStars(won: boolean, score: number, targetScore: number): number {
    if (!won) {
      return 0;
    }
    const safeTarget = Math.max(1, targetScore);
    if (score >= safeTarget * 1.5) {
      return 3;
    }
    if (score >= safeTarget * 1.2) {
      return 2;
    }
    return 1;
  }
}

export const progressService = new ProgressService();
