import { Board, Piece, PieceType, Position } from './Types';
import { SeededRandom } from './BoardFactory';
import { PortalResolver } from '../mechanics/PortalResolver';

export interface GravityResult {
  moved: number;
  spawned: number;
}

export class GravityResolver {
  static clearPositions(board: Board, positions: Position[]): void {
    positions.forEach(position => {
      board.tiles[position.row][position.col].piece = undefined;
    });
  }

  static collapseAndRefill(board: Board, pieceTypes: PieceType[], random: SeededRandom, idPrefix: string): GravityResult {
    let moved = 0;
    let spawned = 0;

    for (let col = 0; col < board.cols; col++) {
      let row = board.rows - 1;
      while (row >= 0) {
        if (GravityResolver.isGravityBarrier(board, row, col)) {
          row--;
          continue;
        }

        const segmentRows: number[] = [];
        while (row >= 0 && !GravityResolver.isGravityBarrier(board, row, col)) {
          segmentRows.push(row);
          row--;
        }

        const pieces: Piece[] = [];
        segmentRows.forEach(segmentRow => {
          const tile = board.tiles[segmentRow][col];
          if (tile.piece) {
            pieces.push(tile.piece);
          }
        });

        segmentRows.forEach(segmentRow => {
          const tile = board.tiles[segmentRow][col];
          const nextPiece = pieces.shift();
          if (nextPiece) {
            if (tile.piece?.id !== nextPiece.id) {
              moved++;
            }
            tile.piece = nextPiece;
          } else {
            tile.piece = {
              id: `${idPrefix}_${col}_${segmentRow}_${spawned}`,
              type: random.pick(pieceTypes),
              special: 'none'
            };
            spawned++;
          }
        });
      }
    }

    const portalMoves = PortalResolver.apply(board).length;
    moved += portalMoves;
    if (portalMoves > 0) {
      spawned += GravityResolver.refillEmptyTiles(board, pieceTypes, random, `${idPrefix}_portal`);
    }
    return { moved, spawned };
  }

  private static refillEmptyTiles(board: Board, pieceTypes: PieceType[], random: SeededRandom, idPrefix: string): number {
    let spawned = 0;
    for (let row = 0; row < board.rows; row++) {
      for (let col = 0; col < board.cols; col++) {
        const tile = board.tiles[row][col];
        if (tile.piece || GravityResolver.isGravityBarrier(board, row, col)) {
          continue;
        }
        tile.piece = {
          id: `${idPrefix}_${col}_${row}_${spawned}`,
          type: random.pick(pieceTypes),
          special: 'none'
        };
        spawned++;
      }
    }
    return spawned;
  }

  private static isGravityBarrier(board: Board, row: number, col: number): boolean {
    const blocker = board.tiles[row][col].blocker;
    return blocker?.type === 'hole' || blocker?.type === 'marshmallow';
  }
}
