export type PieceType = 'red' | 'blue' | 'yellow' | 'green' | 'purple' | 'orange';
export type SpecialType = 'none' | 'row_clear' | 'col_clear' | 'bomb' | 'rainbow';
export type BlockerType = 'ice' | 'chain' | 'marshmallow' | 'portal' | 'hole';
export type GameStatus = 'playing' | 'won' | 'lost';

export interface Piece {
  id: string;
  type: PieceType;
  special: SpecialType;
}

export interface Blocker {
  type: BlockerType;
  hp: number;
  portalId?: string;
  targetPortalId?: string;
}

export interface Tile {
  row: number;
  col: number;
  piece?: Piece;
  blocker?: Blocker;
}

export interface Board {
  rows: number;
  cols: number;
  tiles: Tile[][];
}

export interface Position {
  row: number;
  col: number;
}

export const DEFAULT_PIECES: PieceType[] = ['red', 'blue', 'yellow', 'green', 'purple', 'orange'];

export function samePosition(first: Position, second: Position): boolean {
  return first.row === second.row && first.col === second.col;
}

export function positionKey(position: Position): string {
  return `${position.row}_${position.col}`;
}
