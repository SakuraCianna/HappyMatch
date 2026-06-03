import { common } from '@kit.AbilityKit';
import { progressService } from './ProgressService';
import { RdbProgressRepository } from './RdbProgressRepository';

let bootstrapped = false;

export async function bootstrapProgress(context: common.Context): Promise<void> {
  if (bootstrapped) {
    return;
  }
  try {
    const repository = new RdbProgressRepository(context);
    await repository.init();
    progressService.setRepository(repository);
    bootstrapped = true;
  } catch (_err) {
    // Keep the in-memory repository so gameplay can continue even if RDB is unavailable.
  }
}
