import { Board, Piece, PieceType, Tile } from './Types';
import { SeededRandom } from './BoardFactory';
import { MatchResolver } from './MatchResolver';
import { BoardMoveAnalyzer } from './BoardMoveAnalyzer';

export class BoardShuffler {
  static shuffle(board: Board, random: SeededRandom, pieceTypes: PieceType[]): boolean {
    const slots = BoardShuffler.movableSlots(board);
    if (slots.length < 2) {
      return false;
    }
    const original = slots.map(tile => tile.piece);
    for (let attempt = 0; attempt < 80; attempt++) {
      const shuffled = BoardShuffler.shuffledPieces(original, random, pieceTypes, attempt);
      for (let index = 0; index < slots.length; index++) {
        slots[index].piece = shuffled[index];
      }
      if (MatchResolver.findMatches(board).length === 0 && BoardMoveAnalyzer.hasAvailableMove(board)) {
        return true;
      }
    }
    for (let index = 0; index < slots.length; index++) {
      slots[index].piece = original[index];
    }
    return false;
  }

  private static movableSlots(board: Board): Tile[] {
    const result: Tile[] = [];
    for (let row = 0; row < board.rows; row++) {
      for (let col = 0; col < board.cols; col++) {
        const tile = board.tiles[row][col];
        if (tile.piece && tile.blocker?.type !== 'hole' && tile.blocker?.type !== 'marshmallow') {
          result.push(tile);
        }
      }
    }
    return result;
  }

  private static shuffledPieces(
    pieces: (Piece | undefined)[],
    random: SeededRandom,
    pieceTypes: PieceType[],
    attempt: number
  ): (Piece | undefined)[] {
    const result = pieces.map(piece => piece);
    for (let index = result.length - 1; index > 0; index--) {
      const target = Math.floor(random.next() * (index + 1));
      const current = result[index];
      result[index] = result[target];
      result[target] = current;
    }
    if (attempt > 30) {
      for (let index = 0; index < result.length; index++) {
        const piece = result[index];
        if (piece) {
          result[index] = {
            id: piece.id,
            type: random.pick(pieceTypes),
            special: 'none'
          };
        }
      }
    }
    return result;
  }
}
