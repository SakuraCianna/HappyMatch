import { LevelBlockerConfig, LevelConfig, LevelGoal, LevelSpecialPieceConfig } from './LevelConfig';
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
  if (id >= 10 && id < 20) {
    return [
      { type: 'score', count: 700 + id * 100 },
      { type: 'collect_piece', target: piecesForLevel(id)[id % piecesForLevel(id).length], count: 6 + Math.floor(id / 3) }
    ];
  }
  if (id < 20) {
    return [{ type: 'score', count: 500 + id * 120 }];
  }
  if (id < 40) {
    return [{ type: 'clear_ice', count: blockerCountForGoal(id, 'ice') }];
  }
  if (id < 60) {
    return [{ type: 'break_chain', count: blockerCountForGoal(id, 'chain') }];
  }
  if (id < 80) {
    return [{ type: 'clear_marshmallow', count: blockerCountForGoal(id, 'marshmallow') }];
  }
  return [{ type: 'score', count: 2500 + id * 80 }];
}

function tutorialForLevel(id: number): string[] | undefined {
  const tutorials: Record<number, string[]> = {
    1: ['交换相邻果冻，让三个相同方块连成一线。'],
    2: ['消除后，上方果冻会落下并补齐棋盘。'],
    3: ['在步数用完前完成目标即可通关。'],
    4: ['四个相同方块可以形成横消或竖消特殊方块。'],
    5: ['发光果冻会从这一关出现，左右箭头、上下箭头、炸弹和彩虹块都有不同效果。'],
    10: ['空心棋盘会改变下落路径，空洞不能交换，也不会被填充。']
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
  const shapeBlockers = shapeBlockersForLevel(id);
  if (id < 20) {
    return shapeBlockers;
  }
  if (id < 40) {
    return mergeBlockers(shapeBlockers, spreadBlockers('ice', id >= 30 ? 2 : 1, Math.min(12, 4 + Math.floor((id - 20) / 2))));
  }
  if (id < 60) {
    return mergeBlockers(shapeBlockers, spreadBlockers('chain', 1, Math.min(12, 5 + Math.floor((id - 40) / 2))));
  }
  if (id < 80) {
    return mergeBlockers(shapeBlockers, spreadBlockers('marshmallow', id >= 70 ? 2 : 1, Math.min(10, 4 + Math.floor((id - 60) / 3))));
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
  return mergeBlockers(shapeBlockers, blockers);
}

function blockerCountForGoal(id: number, type: LevelBlockerConfig['type']): number {
  return blockersForLevel(id).filter(blocker => blocker.type === type).length;
}

function shapeBlockersForLevel(id: number): LevelBlockerConfig[] {
  if (id < 10) {
    return [];
  }
  const patterns: LevelBlockerConfig[][] = [
    holeBlockers([{ row: 0, col: 0 }, { row: 0, col: 7 }, { row: 7, col: 0 }, { row: 7, col: 7 }]),
    holeBlockers([{ row: 3, col: 3 }, { row: 3, col: 4 }, { row: 4, col: 3 }, { row: 4, col: 4 }]),
    holeBlockers([{ row: 0, col: 3 }, { row: 0, col: 4 }, { row: 7, col: 3 }, { row: 7, col: 4 }]),
    holeBlockers([{ row: 2, col: 0 }, { row: 5, col: 0 }, { row: 2, col: 7 }, { row: 5, col: 7 }])
  ];
  const base = patterns[Math.floor((id - 10) / 5) % patterns.length];
  if (id < 25) {
    return base;
  }
  return mergeBlockers(base, holeBlockers([{ row: 1, col: 3 }, { row: 6, col: 4 }]));
}

function holeBlockers(positions: { row: number; col: number }[]): LevelBlockerConfig[] {
  return positions.map(position => ({ ...position, type: 'hole', hp: 1 }));
}

function mergeBlockers(first: LevelBlockerConfig[], second: LevelBlockerConfig[]): LevelBlockerConfig[] {
  const result: LevelBlockerConfig[] = [];
  const used = new Set<string>();
  [...first, ...second].forEach(blocker => {
    const key = `${blocker.row}_${blocker.col}`;
    if (!used.has(key)) {
      used.add(key);
      result.push(blocker);
    }
  });
  return result;
}

function specialPiecesForLevel(id: number): LevelSpecialPieceConfig[] {
  const specialPieces: LevelSpecialPieceConfig[] = [];
  if (id >= 5) {
    specialPieces.push({ row: 3, col: 3, type: 'yellow', special: 'row_clear' });
  }
  if (id >= 8) {
    specialPieces.push({ row: 4, col: 4, type: 'blue', special: 'col_clear' });
  }
  if (id >= 15) {
    specialPieces.push({ row: 2, col: 5, type: 'purple', special: 'bomb' });
  }
  if (id >= 30) {
    specialPieces.push({ row: 5, col: 2, type: 'purple', special: 'rainbow' });
  }
  return specialPieces;
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
    specialPieces: specialPiecesForLevel(id),
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
