import { Board, Position } from './Types';
import { BlockerResolver } from '../mechanics/BlockerResolver';
import { SpecialResolver } from './SpecialResolver';

export class BoardMoveAnalyzer {
  static hasAvailableMove(board: Board): boolean {
    for (let row = 0; row < board.rows; row++) {
      for (let col = 0; col < board.cols; col++) {
        const current: Position = { row, col };
        if (BoardMoveAnalyzer.isValidMove(board, current, { row, col: col + 1 }) ||
          BoardMoveAnalyzer.isValidMove(board, current, { row: row + 1, col })) {
          return true;
        }
      }
    }
    return false;
  }

  static isValidMove(board: Board, first: Position, second: Position): boolean {
    if (first.row < 0 || first.row >= board.rows || first.col < 0 || first.col >= board.cols) {
      return false;
    }
    if (second.row < 0 || second.row >= board.rows || second.col < 0 || second.col >= board.cols) {
      return false;
    }
    if (!BlockerResolver.canSwap(board, first, second)) {
      return false;
    }
    const firstPiece = board.tiles[first.row][first.col].piece;
    const secondPiece = board.tiles[second.row][second.col].piece;
    if (!firstPiece || !secondPiece) {
      return false;
    }
    if (SpecialResolver.isDirectSpecialSwap(board, first, second)) {
      return true;
    }
    BoardMoveAnalyzer.swap(board, first, second);
    const matched = BoardMoveAnalyzer.hasMatchAt(board, first) || BoardMoveAnalyzer.hasMatchAt(board, second);
    BoardMoveAnalyzer.swap(board, first, second);
    return matched;
  }

  private static hasMatchAt(board: Board, position: Position): boolean {
    const piece = board.tiles[position.row][position.col].piece;
    if (!piece) {
      return false;
    }
    const rowCount = 1 +
      BoardMoveAnalyzer.countDirection(board, position, 0, -1) +
      BoardMoveAnalyzer.countDirection(board, position, 0, 1);
    if (rowCount >= 3) {
      return true;
    }
    const colCount = 1 +
      BoardMoveAnalyzer.countDirection(board, position, -1, 0) +
      BoardMoveAnalyzer.countDirection(board, position, 1, 0);
    return colCount >= 3;
  }

  private static countDirection(board: Board, position: Position, rowStep: number, colStep: number): number {
    const type = board.tiles[position.row][position.col].piece?.type;
    if (!type) {
      return 0;
    }
    let count = 0;
    let row = position.row + rowStep;
    let col = position.col + colStep;
    while (row >= 0 && row < board.rows && col >= 0 && col < board.cols &&
      board.tiles[row][col].piece?.type === type) {
      count++;
      row += rowStep;
      col += colStep;
    }
    return count;
  }

  private static swap(board: Board, first: Position, second: Position): void {
    const firstPiece = board.tiles[first.row][first.col].piece;
    board.tiles[first.row][first.col].piece = board.tiles[second.row][second.col].piece;
    board.tiles[second.row][second.col].piece = firstPiece;
  }
}
