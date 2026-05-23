import { Board, Position } from '../core/Types';
import { BoardLayout, BoardLayoutResult } from '../render/BoardLayout';

export interface DragSelection {
  from: Position;
  to: Position;
}

export class BoardInputMapper {
  private start?: Position;

  begin(board: Board, layout: BoardLayoutResult, x: number, y: number): void {
    this.start = BoardLayout.hitTest(board, layout, x, y);
  }

  end(board: Board, layout: BoardLayoutResult, x: number, y: number): DragSelection | undefined {
    if (!this.start) {
      return undefined;
    }
    const end = BoardLayout.hitTest(board, layout, x, y);
    const start = this.start;
    this.start = undefined;
    if (!end || Math.abs(start.row - end.row) + Math.abs(start.col - end.col) !== 1) {
      return undefined;
    }
    return { from: start, to: end };
  }
}
