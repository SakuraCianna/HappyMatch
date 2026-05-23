import { LevelConfig, LevelGoal } from './LevelConfig';
import { LevelBlockerConfig } from './LevelConfig';
import { PieceType } from '../core/Types';

const ALL_PIECES: PieceType[] = ['red', 'blue', 'yellow', 'green', 'purple', 'orange'];

function piecesForLevel(id: number): PieceType[] {
  if (id <= 5) {
    return ['red', 'blue', 'yellow', 'green'];
  }
  if (id < 40) {
    return ['red', 'blue', 'yellow', 'green', 'purple'];
  }
  return ALL_PIECES;
}

function baseGoal(id: number): LevelGoal[] {
  if (id < 20) {
    return [{ type: 'score', count: 500 + id * 120 }];
  }
  if (id < 40) {
    return [{ type: 'clear_ice', count: blockersForLevel(id).length }];
  }
  if (id < 60) {
    return [{ type: 'break_chain', count: blockersForLevel(id).length }];
  }
  if (id < 80) {
    return [{ type: 'clear_marshmallow', count: blockersForLevel(id).length }];
  }
  return [{ type: 'score', count: 2500 + id * 80 }];
}

function tutorialForLevel(id: number): string[] | undefined {
  const tutorials: Record<number, string[]> = {
    1: ['交换相邻果冻，让三个相同方块连成一线。'],
    2: ['消除后，上方果冻会落下并补齐棋盘。'],
    3: ['在步数用完前完成目标即可通关。'],
    4: ['四个相同方块可以形成横消或竖消特殊方块。'],
    5: ['特殊方块可以帮助你更快完成目标。']
  };
  return tutorials[id];
}

function spreadBlockers(type: LevelBlockerConfig['type'], hp: number, count: number): LevelBlockerConfig[] {
  const positions = [
    { row: 1, col: 1 }, { row: 1, col: 6 }, { row: 2, col: 3 }, { row: 2, col: 4 },
    { row: 3, col: 2 }, { row: 3, col: 5 }, { row: 4, col: 2 }, { row: 4, col: 5 },
    { row: 5, col: 3 }, { row: 5, col: 4 }, { row: 6, col: 1 }, { row: 6, col: 6 }
  ];
  return positions.slice(0, count).map(position => ({ ...position, type, hp }));
}

function blockersForLevel(id: number): LevelBlockerConfig[] {
  if (id < 20) {
    return [];
  }
  if (id < 40) {
    return spreadBlockers('ice', id >= 30 ? 2 : 1, Math.min(12, 4 + Math.floor((id - 20) / 2)));
  }
  if (id < 60) {
    return spreadBlockers('chain', 1, Math.min(12, 5 + Math.floor((id - 40) / 2)));
  }
  if (id < 80) {
    return spreadBlockers('marshmallow', id >= 70 ? 2 : 1, Math.min(10, 4 + Math.floor((id - 60) / 3)));
  }
  const blockers: LevelBlockerConfig[] = [
    { row: 0, col: 3, type: 'portal', hp: 1, portalId: 'a_in', targetPortalId: 'a_out' },
    { row: 7, col: 3, type: 'portal', hp: 1, portalId: 'a_out' }
  ];
  if (id >= 90) {
    blockers.push(
      { row: 0, col: 4, type: 'portal', hp: 1, portalId: 'b_in', targetPortalId: 'b_out' },
      { row: 7, col: 4, type: 'portal', hp: 1, portalId: 'b_out' }
    );
  }
  return blockers;
}

export const LEVELS: LevelConfig[] = Array.from({ length: 100 }, (_, index) => {
  const id = index + 1;
  return {
    id,
    title: `第 ${id} 关`,
    moves: Math.max(18, 32 - Math.floor(id / 8)),
    board: {
      rows: 8,
      cols: 8,
      pieceTypes: piecesForLevel(id)
    },
    goals: baseGoal(id),
    blockers: blockersForLevel(id),
    tutorial: tutorialForLevel(id)
  };
});

LEVELS[99].title = '第 100 关：糖果天空岛毕业挑战';
LEVELS[99].moves = 24;
LEVELS[99].goals = [
  { type: 'score', count: 12000 },
  { type: 'clear_ice', count: 10 },
  { type: 'break_chain', count: 8 },
  { type: 'clear_marshmallow', count: 8 }
];
LEVELS[99].blockers = [
  ...spreadBlockers('ice', 2, 6),
  ...spreadBlockers('chain', 1, 4),
  ...spreadBlockers('marshmallow', 2, 4),
  { row: 0, col: 3, type: 'portal', hp: 1, portalId: 'a_in', targetPortalId: 'a_out' },
  { row: 7, col: 3, type: 'portal', hp: 1, portalId: 'a_out' }
];
