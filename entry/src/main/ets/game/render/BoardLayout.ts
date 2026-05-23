import { Board, Position } from '../core/Types';

export interface BoardLayoutResult {
  tileSize: number;
  boardWidth: number;
  boardHeight: number;
  offsetX: number;
  offsetY: number;
}

export class BoardLayout {
  static compute(board: Board, width: number, height: number): BoardLayoutResult {
    const tileSize = Math.floor(Math.min(width / board.cols, height / board.rows));
    const boardWidth = tileSize * board.cols;
    const boardHeight = tileSize * board.rows;
    return {
      tileSize,
      boardWidth,
      boardHeight,
      offsetX: Math.floor((width - boardWidth) / 2),
      offsetY: Math.floor((height - boardHeight) / 2)
    };
  }

  static centerOf(layout: BoardLayoutResult, position: Position): { x: number; y: number } {
    return {
      x: layout.offsetX + position.col * layout.tileSize + layout.tileSize / 2,
      y: layout.offsetY + position.row * layout.tileSize + layout.tileSize / 2
    };
  }

  static hitTest(board: Board, layout: BoardLayoutResult, x: number, y: number): Position | undefined {
    const col = Math.floor((x - layout.offsetX) / layout.tileSize);
    const row = Math.floor((y - layout.offsetY) / layout.tileSize);
    if (row < 0 || row >= board.rows || col < 0 || col >= board.cols) {
      return undefined;
    }
    return { row, col };
  }
}
