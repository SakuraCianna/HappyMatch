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
    try {
      const store = await relationalStore.getRdbStore(this.context, STORE_CONFIG);
      await store.executeSql(
        'CREATE TABLE IF NOT EXISTS level_progress(level_id INTEGER PRIMARY KEY, cleared INTEGER, stars INTEGER, best_score INTEGER, updated_at INTEGER)'
      );
      this.store = store;
    } catch (_error) {
      this.store = undefined;
      throw new Error('Failed to initialize progress database.');
    }
  }

  async getAll(): Promise<LevelProgress[]> {
    let result: relationalStore.ResultSet | undefined = undefined;
    try {
      const store = await this.requireStore();
      result = await store.querySql(
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
      return items;
    } catch (_error) {
      return [];
    } finally {
      this.closeResult(result);
    }
  }

  async save(progress: LevelProgress): Promise<void> {
    try {
      const store = await this.requireStore();
      await store.executeSql(
        'INSERT OR REPLACE INTO level_progress(level_id, cleared, stars, best_score, updated_at) VALUES (?, ?, ?, ?, ?)',
        [progress.levelId, progress.cleared ? 1 : 0, progress.stars, progress.bestScore, progress.updatedAt]
      );
    } catch (_error) {
      throw new Error('Failed to save progress.');
    }
  }

  async getUnlockedLevel(): Promise<number> {
    const all = await this.getAll();
    const cleared = all.filter(item => item.cleared).map(item => item.levelId);
    if (cleared.length === 0) {
      return 1;
    }
    return Math.min(100, Math.max(...cleared) + 1);
  }

  private async requireStore(): Promise<relationalStore.RdbStore> {
    if (!this.store) {
      await this.init();
    }
    const store = this.store;
    if (!store) {
      throw new Error('Progress database is unavailable.');
    }
    return store;
  }

  private closeResult(result: relationalStore.ResultSet | undefined): void {
    if (!result) {
      return;
    }
    try {
      result.close();
    } catch (_error) {
      // Closing is best-effort; the main operation result is more important.
    }
  }
}
