import { BlockerType, PieceType, SpecialType } from '../core/Types';

export type GoalType =
  'score' |
  'clear_ice' |
  'break_chain' |
  'clear_marshmallow' |
  'collect_piece' |
  'collect_special' |
  'combo_goal' |
  'special_combo_goal';

export type SpecialComboGoalType = 'rainbow_functional' | 'rainbow_color' | 'functional_combo' | 'bomb_bomb';

export interface LevelGoal {
  type: GoalType;
  target?: PieceType;
  targetSpecial?: SpecialType;
  comboLength?: number;
  comboType?: SpecialComboGoalType;
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

export interface LevelSpecialPieceConfig {
  row: number;
  col: number;
  type: PieceType;
  special: SpecialType;
}

export interface LevelConfig {
  id: number;
  title: string;
  mapPath?: string;
  shape?: string;
  availableCells?: number;
  moves: number;
  board: {
    rows: number;
    cols: number;
    pieceTypes: PieceType[];
  };
  goals: LevelGoal[];
  blockers?: LevelBlockerConfig[];
  specialPieces?: LevelSpecialPieceConfig[];
  tutorial?: string[];
}
