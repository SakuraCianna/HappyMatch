export interface LevelProgress {
  levelId: number;
  cleared: boolean;
  stars: number;
  bestScore: number;
  updatedAt: number;
}

export interface ProgressRepository {
  getAll(): Promise<LevelProgress[]>;
  save(progress: LevelProgress): Promise<void>;
  getUnlockedLevel(): Promise<number>;
}
