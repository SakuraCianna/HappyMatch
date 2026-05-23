import { Board, Position, SpecialType, PieceType, positionKey, samePosition } from './Types';
import { MatchGroup } from './MatchResolver';

export interface SpecialCreation {
  position: Position;
  special: SpecialType;
}

export class SpecialResolver {
  static chooseCreation(groups: MatchGroup[], preferred?: Position): SpecialCreation | undefined {
    return this.chooseCreations(groups, preferred)[0];
  }

  static chooseCreations(groups: MatchGroup[], preferred?: Position): SpecialCreation[] {
    const creations: SpecialCreation[] = [];
    const consumed = new Set<number>();

    for (let index = 0; index < groups.length; index++) {
      const group = groups[index];
      if (group.positions.length >= 5) {
        creations.push({
          position: this.creationPositionForGroup(group, preferred),
          special: 'rainbow'
        });
        consumed.add(index);
      }
    }

    for (let rowIndex = 0; rowIndex < groups.length; rowIndex++) {
      if (consumed.has(rowIndex) || groups[rowIndex].direction !== 'row') {
        continue;
      }
      for (let colIndex = 0; colIndex < groups.length; colIndex++) {
        if (consumed.has(colIndex) || groups[colIndex].direction !== 'col') {
          continue;
        }
        const intersection = this.intersectionOf(groups[rowIndex], groups[colIndex]);
        if (intersection) {
          const cluster = this.uniquePositions([...groups[rowIndex].positions, ...groups[colIndex].positions]);
          creations.push({
            position: preferred && this.includesPosition(cluster, preferred) ? preferred : intersection,
            special: 'bomb'
          });
          consumed.add(rowIndex);
          consumed.add(colIndex);
          break;
        }
      }
    }

    for (let index = 0; index < groups.length; index++) {
      const group = groups[index];
      if (!consumed.has(index) && group.positions.length >= 4) {
        creations.push({
          position: this.creationPositionForGroup(group, preferred),
          special: group.direction === 'row' ? 'row_clear' : 'col_clear'
        });
      }
    }

    return this.mergeCreations(creations);
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

    const targetType = target ? board.tiles[target.row][target.col].piece?.type : piece.type;
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

  static expandedClearPositions(board: Board, positions: Position[]): Position[] {
    let result = this.uniquePositions(positions);
    let index = 0;
    while (index < result.length) {
      const position = result[index];
      const piece = board.tiles[position.row][position.col].piece;
      if (piece && piece.special !== 'none') {
        result = this.uniquePositions([...result, ...this.activatedPositions(board, position)]);
      }
      index++;
    }
    return result;
  }

  static swapActivatedPositions(board: Board, first: Position, second: Position): Position[] {
    const firstPiece = board.tiles[first.row][first.col].piece;
    const secondPiece = board.tiles[second.row][second.col].piece;
    if (!firstPiece || !secondPiece) {
      return [];
    }

    if (firstPiece.special === 'rainbow' && secondPiece.special !== 'rainbow') {
      return this.rainbowTargetPositions(board, secondPiece.type);
    }
    if (secondPiece.special === 'rainbow' && firstPiece.special !== 'rainbow') {
      return this.rainbowTargetPositions(board, firstPiece.type);
    }
    if (firstPiece.special === 'rainbow' && secondPiece.special === 'rainbow') {
      return this.allPositions(board);
    }

    if (firstPiece.special === 'bomb' && secondPiece.special === 'bomb') {
      return this.uniquePositions([...this.squareAround(board, first, 2), ...this.squareAround(board, second, 2)]);
    }

    if (firstPiece.special === 'bomb' && this.isLineSpecial(secondPiece.special)) {
      return this.wideLinePositions(board, second, secondPiece.special);
    }
    if (secondPiece.special === 'bomb' && this.isLineSpecial(firstPiece.special)) {
      return this.wideLinePositions(board, first, firstPiece.special);
    }

    return this.uniquePositions([
      ...this.activatedPositions(board, first, second),
      ...this.activatedPositions(board, second, first)
    ]);
  }

  private static isLineSpecial(special: SpecialType): boolean {
    return special === 'row_clear' || special === 'col_clear';
  }

  private static wideLinePositions(board: Board, position: Position, special: SpecialType): Position[] {
    const result: Position[] = [];
    if (special === 'row_clear') {
      for (let row = position.row - 1; row <= position.row + 1; row++) {
        if (row >= 0 && row < board.rows) {
          for (let col = 0; col < board.cols; col++) {
            result.push({ row, col });
          }
        }
      }
      return result;
    }
    if (special === 'col_clear') {
      for (let col = position.col - 1; col <= position.col + 1; col++) {
        if (col >= 0 && col < board.cols) {
          for (let row = 0; row < board.rows; row++) {
            result.push({ row, col });
          }
        }
      }
      return result;
    }
    return [position];
  }

  private static rainbowTargetPositions(board: Board, type: PieceType): Position[] {
    const result: Position[] = [];
    for (let row = 0; row < board.rows; row++) {
      for (let col = 0; col < board.cols; col++) {
        if (board.tiles[row][col].piece?.type === type) {
          result.push({ row, col });
        }
      }
    }
    return result;
  }

  private static allPositions(board: Board): Position[] {
    const result: Position[] = [];
    for (let row = 0; row < board.rows; row++) {
      for (let col = 0; col < board.cols; col++) {
        result.push({ row, col });
      }
    }
    return result;
  }

  private static squareAround(board: Board, center: Position, radius: number): Position[] {
    const result: Position[] = [];
    for (let row = center.row - radius; row <= center.row + radius; row++) {
      for (let col = center.col - radius; col <= center.col + radius; col++) {
        if (row >= 0 && row < board.rows && col >= 0 && col < board.cols) {
          result.push({ row, col });
        }
      }
    }
    return result;
  }

  private static creationPositionForGroup(group: MatchGroup, preferred?: Position): Position {
    if (preferred && this.includesPosition(group.positions, preferred)) {
      return preferred;
    }
    return group.positions[Math.floor(group.positions.length / 2)];
  }

  private static intersectionOf(rowGroup: MatchGroup, colGroup: MatchGroup): Position | undefined {
    for (let rowIndex = 0; rowIndex < rowGroup.positions.length; rowIndex++) {
      for (let colIndex = 0; colIndex < colGroup.positions.length; colIndex++) {
        if (samePosition(rowGroup.positions[rowIndex], colGroup.positions[colIndex])) {
          return rowGroup.positions[rowIndex];
        }
      }
    }
    return undefined;
  }

  private static includesPosition(positions: Position[], target: Position): boolean {
    return positions.some(position => samePosition(position, target));
  }

  private static mergeCreations(creations: SpecialCreation[]): SpecialCreation[] {
    const result = new Map<string, SpecialCreation>();
    creations.forEach(creation => {
      const key = positionKey(creation.position);
      const existing = result.get(key);
      if (!existing || this.creationPriority(creation.special) > this.creationPriority(existing.special)) {
        result.set(key, creation);
      }
    });
    return Array.from(result.values());
  }

  private static creationPriority(special: SpecialType): number {
    if (special === 'rainbow') {
      return 4;
    }
    if (special === 'bomb') {
      return 3;
    }
    if (special === 'row_clear' || special === 'col_clear') {
      return 2;
    }
    return 1;
  }

  private static uniquePositions(positions: Position[]): Position[] {
    const seen = new Set<string>();
    const result: Position[] = [];
    positions.forEach(position => {
      const key = positionKey(position);
      if (!seen.has(key)) {
        seen.add(key);
        result.push(position);
      }
    });
    return result;
  }
}
