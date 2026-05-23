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
      const pieces: Piece[] = [];
      for (let row = board.rows - 1; row >= 0; row--) {
        const tile = board.tiles[row][col];
        if (tile.piece && tile.blocker?.type !== 'marshmallow') {
          pieces.push(tile.piece);
        }
      }

      for (let row = board.rows - 1; row >= 0; row--) {
        const tile = board.tiles[row][col];
        if (tile.blocker?.type === 'marshmallow') {
          continue;
        }
        const nextPiece = pieces.shift();
        if (nextPiece) {
          if (tile.piece?.id !== nextPiece.id) {
            moved++;
          }
          tile.piece = nextPiece;
        } else {
          tile.piece = {
            id: `${idPrefix}_${col}_${row}_${spawned}`,
            type: random.pick(pieceTypes),
            special: 'none'
          };
          spawned++;
        }
      }
    }

    moved += PortalResolver.apply(board).length;
    return { moved, spawned };
  }
}
