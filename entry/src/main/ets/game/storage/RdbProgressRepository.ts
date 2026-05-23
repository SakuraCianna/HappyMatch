import { common } from '@kit.AbilityKit';
import { relationalStore } from '@kit.ArkData';
import { LevelProgress, ProgressRepository } from './ProgressRepository';

const STORE_CONFIG: relationalStore.StoreConfig = {
  name: 'happy_match.db',
  securityLevel: relationalStore.SecurityLevel.S1
};

export class RdbProgressRepository implements ProgressRepository {
  private store?: relationalStore.RdbStore;

  constructor(private context: common.Context) {
  }

  async init(): Promise<void> {
    this.store = await relationalStore.getRdbStore(this.context, STORE_CONFIG);
    await this.store.executeSql(
      'CREATE TABLE IF NOT EXISTS level_progress(level_id INTEGER PRIMARY KEY, cleared INTEGER, stars INTEGER, best_score INTEGER, updated_at INTEGER)'
    );
  }

  async getAll(): Promise<LevelProgress[]> {
    if (!this.store) {
      await this.init();
    }
    const result = await this.store!.querySql(
      'SELECT level_id, cleared, stars, best_score, updated_at FROM level_progress ORDER BY level_id ASC'
    );
    const items: LevelProgress[] = [];
    while (result.goToNextRow()) {
      items.push({
        levelId: result.getLong(result.getColumnIndex('level_id')),
        cleared: result.getLong(result.getColumnIndex('cleared')) === 1,
        stars: result.getLong(result.getColumnIndex('stars')),
        bestScore: result.getLong(result.getColumnIndex('best_score')),
        updatedAt: result.getLong(result.getColumnIndex('updated_at'))
      });
    }
    result.close();
    return items;
  }

  async save(progress: LevelProgress): Promise<void> {
    if (!this.store) {
      await this.init();
    }
    await this.store!.executeSql(
      'INSERT OR REPLACE INTO level_progress(level_id, cleared, stars, best_score, updated_at) VALUES (?, ?, ?, ?, ?)',
      [progress.levelId, progress.cleared ? 1 : 0, progress.stars, progress.bestScore, progress.updatedAt]
    );
  }

  async getUnlockedLevel(): Promise<number> {
    const all = await this.getAll();
    const cleared = all.filter(item => item.cleared).map(item => item.levelId);
    if (cleared.length === 0) {
      return 1;
    }
    return Math.min(100, Math.max(...cleared) + 1);
  }
}
