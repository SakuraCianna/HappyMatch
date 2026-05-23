import { Board, Position } from '../core/Types';

export interface BlockerDamageResult {
  clearIce: number;
  breakChain: number;
  clearMarshmallow: number;
}

export class BlockerResolver {
  static emptyResult(): BlockerDamageResult {
    return {
      clearIce: 0,
      breakChain: 0,
      clearMarshmallow: 0
    };
  }

  static damageAdjacent(board: Board, cleared: Position[]): BlockerDamageResult {
    const result = BlockerResolver.emptyResult();
    const directions = [
      { row: -1, col: 0 },
      { row: 1, col: 0 },
      { row: 0, col: -1 },
      { row: 0, col: 1 }
    ];

    cleared.forEach(position => {
      BlockerResolver.damageTile(board, position.row, position.col, result);
      directions.forEach(direction => {
        const row = position.row + direction.row;
        const col = position.col + direction.col;
        if (row < 0 || row >= board.rows || col < 0 || col >= board.cols) {
          return;
        }
        BlockerResolver.damageTile(board, row, col, result);
      });
    });

    return result;
  }

  static canSwap(board: Board, first: Position, second: Position): boolean {
    const firstBlocker = board.tiles[first.row][first.col].blocker;
    const secondBlocker = board.tiles[second.row][second.col].blocker;
    return firstBlocker?.type !== 'chain' &&
      secondBlocker?.type !== 'chain' &&
      firstBlocker?.type !== 'marshmallow' &&
      secondBlocker?.type !== 'marshmallow';
  }

  private static damageTile(board: Board, row: number, col: number, result: BlockerDamageResult): void {
    const blocker = board.tiles[row][col].blocker;
    if (!blocker || blocker.type === 'portal') {
      return;
    }
    blocker.hp--;
    if (blocker.hp > 0) {
      return;
    }
    if (blocker.type === 'ice') {
      result.clearIce++;
    }
    if (blocker.type === 'chain') {
      result.breakChain++;
    }
    if (blocker.type === 'marshmallow') {
      result.clearMarshmallow++;
    }
    board.tiles[row][col].blocker = undefined;
  }
}
