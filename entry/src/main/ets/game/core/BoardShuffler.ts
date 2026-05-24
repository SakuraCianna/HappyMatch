import { Board, Piece, PieceType, Tile } from './Types';
import { SeededRandom } from './BoardFactory';
import { MatchResolver } from './MatchResolver';
import { BoardMoveAnalyzer } from './BoardMoveAnalyzer';
import { BlockerResolver } from '../mechanics/BlockerResolver';

const MAX_FAST_SHUFFLE_ATTEMPTS = 4;

export class BoardShuffler {
  static shuffle(board: Board, random: SeededRandom, pieceTypes: PieceType[]): boolean {
    const slots = BoardShuffler.movableSlots(board);
    if (slots.length < 2) {
      return false;
    }
    const original = slots.map(tile => BoardShuffler.clonePiece(tile.piece));
    for (let attempt = 0; attempt < MAX_FAST_SHUFFLE_ATTEMPTS; attempt++) {
      BoardShuffler.refillSlotsWithoutImmediateMatches(board, slots, random, pieceTypes);
      if (!BoardMoveAnalyzer.hasAvailableMove(board)) {
        BoardShuffler.seedAvailableMove(board, pieceTypes);
      }
      if (MatchResolver.findMatches(board).length === 0 && BoardMoveAnalyzer.hasAvailableMove(board)) {
        return true;
      }
    }
    for (let index = 0; index < slots.length; index++) {
      slots[index].piece = BoardShuffler.clonePiece(original[index]);
    }
    return false;
  }

  private static movableSlots(board: Board): Tile[] {
    const result: Tile[] = [];
    for (let row = 0; row < board.rows; row++) {
      for (let col = 0; col < board.cols; col++) {
        const tile = board.tiles[row][col];
        if (tile.piece &&
          tile.blocker?.type !== 'hole' &&
          tile.blocker?.type !== 'marshmallow' &&
          tile.blocker?.type !== 'chain') {
          result.push(tile);
        }
      }
    }
    return result;
  }

  private static refillSlotsWithoutImmediateMatches(
    board: Board,
    slots: Tile[],
    random: SeededRandom,
    pieceTypes: PieceType[]
  ): void {
    for (let index = 0; index < slots.length; index++) {
      const tile = slots[index];
      const piece = tile.piece;
      if (piece) {
        piece.type = BoardShuffler.pickTypeWithoutImmediateMatch(board, tile.row, tile.col, pieceTypes, random);
      }
    }
  }

  private static pickTypeWithoutImmediateMatch(
    board: Board,
    row: number,
    col: number,
    pieceTypes: PieceType[],
    random: SeededRandom
  ): PieceType {
    const firstIndex = Math.floor(random.next() * pieceTypes.length);
    for (let offset = 0; offset < pieceTypes.length; offset++) {
      const type = pieceTypes[(firstIndex + offset) % pieceTypes.length];
      if (!BoardShuffler.wouldCreateImmediateMatch(board, row, col, type)) {
        return type;
      }
    }
    return pieceTypes[firstIndex];
  }

  private static wouldCreateImmediateMatch(board: Board, row: number, col: number, type: PieceType): boolean {
    const leftMatch = col >= 2 &&
      board.tiles[row][col - 1].piece?.type === type &&
      board.tiles[row][col - 2].piece?.type === type;
    const upMatch = row >= 2 &&
      board.tiles[row - 1][col].piece?.type === type &&
      board.tiles[row - 2][col].piece?.type === type;
    return leftMatch || upMatch;
  }

  private static seedAvailableMove(board: Board, pieceTypes: PieceType[]): boolean {
    if (pieceTypes.length < 2) {
      return false;
    }
    for (let row = 0; row < board.rows - 1; row++) {
      for (let col = 0; col < board.cols - 2; col++) {
        const left = board.tiles[row][col];
        const middle = board.tiles[row][col + 1];
        const right = board.tiles[row][col + 2];
        const below = board.tiles[row + 1][col + 1];
        if (!left.piece || !middle.piece || !right.piece || !below.piece ||
          left.piece.special !== 'none' ||
          middle.piece.special !== 'none' ||
          right.piece.special !== 'none' ||
          below.piece.special !== 'none' ||
          !BlockerResolver.canSwap(board, { row, col: col + 1 }, { row: row + 1, col: col + 1 })) {
          continue;
        }
        const original = [
          BoardShuffler.clonePiece(left.piece),
          BoardShuffler.clonePiece(middle.piece),
          BoardShuffler.clonePiece(right.piece),
          BoardShuffler.clonePiece(below.piece)
        ];
        for (let targetIndex = 0; targetIndex < pieceTypes.length; targetIndex++) {
          const targetType = pieceTypes[targetIndex];
          const otherType = pieceTypes[(targetIndex + 1) % pieceTypes.length];
          left.piece.type = targetType;
          left.piece.special = 'none';
          middle.piece.type = otherType;
          middle.piece.special = 'none';
          right.piece.type = targetType;
          right.piece.special = 'none';
          below.piece.type = targetType;
          below.piece.special = 'none';
          if (MatchResolver.findMatches(board).length === 0 &&
            BoardMoveAnalyzer.isValidMove(board, { row, col: col + 1 }, { row: row + 1, col: col + 1 })) {
            return true;
          }
        }
        left.piece = BoardShuffler.clonePiece(original[0]);
        middle.piece = BoardShuffler.clonePiece(original[1]);
        right.piece = BoardShuffler.clonePiece(original[2]);
        below.piece = BoardShuffler.clonePiece(original[3]);
      }
    }
    return false;
  }

  private static clonePiece(piece: Piece | undefined): Piece | undefined {
    if (!piece) {
      return undefined;
    }
    return {
      id: piece.id,
      type: piece.type,
      special: piece.special
    };
  }
}
