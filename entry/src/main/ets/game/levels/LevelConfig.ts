import { BlockerType, PieceType } from '../core/Types';

export type GoalType = 'score' | 'clear_ice' | 'break_chain' | 'clear_marshmallow' | 'collect_piece';

export interface LevelGoal {
  type: GoalType;
  target?: PieceType;
  count: number;
}

export interface LevelBlockerConfig {
  row: number;
  col: number;
  type: BlockerType;
  hp: number;
  portalId?: string;
  targetPortalId?: string;
}

export interface LevelConfig {
  id: number;
  title: string;
  moves: number;
  board: {
    rows: number;
    cols: number;
    pieceTypes: PieceType[];
  };
  goals: LevelGoal[];
  blockers?: LevelBlockerConfig[];
  tutorial?: string[];
}
