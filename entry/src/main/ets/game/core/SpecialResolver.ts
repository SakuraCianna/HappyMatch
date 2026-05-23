import { Board, Position, SpecialType, samePosition } from './Types';
import { MatchGroup } from './MatchResolver';

export interface SpecialCreation {
  position: Position;
  special: SpecialType;
}

export class SpecialResolver {
  static chooseCreation(groups: MatchGroup[], preferred?: Position): SpecialCreation | undefined {
    const allPositions = groups.flatMap(group => group.positions);
    if (allPositions.length < 4) {
      return undefined;
    }

    const creationPosition =
      preferred && allPositions.some(position => samePosition(position, preferred)) ? preferred : allPositions[0];

    if (allPositions.length >= 5) {
      return { position: creationPosition, special: 'rainbow' };
    }

    const hasRow = groups.some(group => group.direction === 'row' && group.positions.length >= 3);
    const hasCol = groups.some(group => group.direction === 'col' && group.positions.length >= 3);
    if (hasRow && hasCol) {
      return { position: creationPosition, special: 'bomb' };
    }

    const longest = groups.reduce((best, group) => group.positions.length > best.positions.length ? group : best, groups[0]);
    return {
      position: creationPosition,
      special: longest.direction === 'row' ? 'row_clear' : 'col_clear'
    };
  }

  static activatedPositions(board: Board, position: Position, target?: Position): Position[] {
    const piece = board.tiles[position.row][position.col].piece;
    if (!piece || piece.special === 'none') {
      return [position];
    }

    if (piece.special === 'row_clear') {
      return Array.from({ length: board.cols }, (_, col) => ({ row: position.row, col }));
    }

    if (piece.special === 'col_clear') {
      return Array.from({ length: board.rows }, (_, row) => ({ row, col: position.col }));
    }

    if (piece.special === 'bomb') {
      const result: Position[] = [];
      for (let row = position.row - 1; row <= position.row + 1; row++) {
        for (let col = position.col - 1; col <= position.col + 1; col++) {
          if (row >= 0 && row < board.rows && col >= 0 && col < board.cols) {
            result.push({ row, col });
          }
        }
      }
      return result;
    }

    const targetType = target ? board.tiles[target.row][target.col].piece?.type : undefined;
    if (piece.special === 'rainbow' && targetType) {
      const result: Position[] = [];
      for (let row = 0; row < board.rows; row++) {
        for (let col = 0; col < board.cols; col++) {
          if (board.tiles[row][col].piece?.type === targetType) {
            result.push({ row, col });
          }
        }
      }
      return result;
    }

    return [position];
  }
}
