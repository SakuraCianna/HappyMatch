import { WalletState } from '../economy/EconomyService';
import { LevelProgress } from '../storage/ProgressRepository';

export type AchievementId =
  'first_clear' |
  'tutorial_graduate' |
  'chapter_one_clear' |
  'ten_three_stars' |
  'fifty_levels_clear' |
  'hundred_levels_clear' |
  'coin_saver';

export interface AchievementItem {
  id: AchievementId;
  title: string;
  description: string;
  progress: number;
  target: number;
  unlocked: boolean;
}

export interface AchievementSummary {
  items: AchievementItem[];
  unlockedCount: number;
  totalCount: number;
  next?: AchievementItem;
}

interface AchievementDefinition {
  id: AchievementId;
  title: string;
  description: string;
  target: number;
  progress: (progressItems: LevelProgress[], wallet: WalletState) => number;
}

const ZERO_WALLET: WalletState = {
  coins: 0,
  purchases: 0
};

const ACHIEVEMENTS: AchievementDefinition[] = [
  {
    id: 'first_clear',
    title: '第一颗星',
    description: '首次通关任意关卡',
    target: 1,
    progress: (items: LevelProgress[]) => clearedCount(items)
  },
  {
    id: 'tutorial_graduate',
    title: '糖果新手毕业',
    description: '通关前 5 个教学关',
    target: 5,
    progress: (items: LevelProgress[]) => clearedInRange(items, 1, 5)
  },
  {
    id: 'chapter_one_clear',
    title: '天空岛巡礼',
    description: '通关第 1 章 20 个关卡',
    target: 20,
    progress: (items: LevelProgress[]) => clearedInRange(items, 1, 20)
  },
  {
    id: 'ten_three_stars',
    title: '十次三星',
    description: '累计 10 个关卡拿到三星',
    target: 10,
    progress: (items: LevelProgress[]) => threeStarCount(items)
  },
  {
    id: 'fifty_levels_clear',
    title: '半程冒险',
    description: '累计通关 50 个关卡',
    target: 50,
    progress: (items: LevelProgress[]) => clearedCount(items)
  },
  {
    id: 'hundred_levels_clear',
    title: '彩虹终章',
    description: '完成 100 个关卡',
    target: 100,
    progress: (items: LevelProgress[]) => clearedCount(items)
  },
  {
    id: 'coin_saver',
    title: '金币罐',
    description: '持有 800 枚以上游戏金币',
    target: 800,
    progress: (_items: LevelProgress[], wallet: WalletState) => wallet.coins
  }
];

export function deriveAchievements(
  progressItems: LevelProgress[],
  wallet: WalletState = ZERO_WALLET
): AchievementSummary {
  const items = ACHIEVEMENTS.map(definition => {
    const currentProgress = Math.max(0, definition.progress(progressItems, wallet));
    const normalizedProgress = Math.min(definition.target, currentProgress);
    return {
      id: definition.id,
      title: definition.title,
      description: definition.description,
      progress: normalizedProgress,
      target: definition.target,
      unlocked: normalizedProgress >= definition.target
    };
  });
  const unlockedCount = items.filter(item => item.unlocked).length;
  const next = items.find(item => !item.unlocked);
  return {
    items,
    unlockedCount,
    totalCount: items.length,
    next
  };
}

function clearedCount(items: LevelProgress[]): number {
  return items.filter(item => item.cleared).length;
}

function clearedInRange(items: LevelProgress[], start: number, end: number): number {
  return items.filter(item => item.cleared && item.levelId >= start && item.levelId <= end).length;
}

function threeStarCount(items: LevelProgress[]): number {
  return items.filter(item => item.cleared && item.stars >= 3).length;
}
