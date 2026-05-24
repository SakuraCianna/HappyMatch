import { Board, Position } from '../core/Types';

export interface PortalMove {
  from: Position;
  to: Position;
}

export class PortalResolver {
  static apply(board: Board): PortalMove[] {
    const moves: PortalMove[] = [];
    for (let row = 0; row < board.rows; row++) {
      for (let col = 0; col < board.cols; col++) {
        const tile = board.tiles[row][col];
        const blocker = tile.blocker;
        if (!tile.piece || blocker?.type !== 'portal' || !blocker.targetPortalId) {
          continue;
        }
        const target = PortalResolver.findTarget(board, blocker.targetPortalId);
        if (!target) {
          continue;
        }
        const targetTile = board.tiles[target.row][target.col];
        const targetPiece = targetTile.piece;
        targetTile.piece = tile.piece;
        tile.piece = targetPiece;
        moves.push({ from: { row, col }, to: target });
      }
    }
    return moves;
  }

  private static findTarget(board: Board, portalId: string): Position | undefined {
    for (let row = 0; row < board.rows; row++) {
      for (let col = 0; col < board.cols; col++) {
        if (board.tiles[row][col].blocker?.portalId === portalId) {
          return { row, col };
        }
      }
    }
    return undefined;
  }
}
