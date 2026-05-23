import { Board, Position } from '../core/Types';
import { PieceRenderEffect } from './CanvasRenderer';

export interface PieceFallMotion {
  row: number;
  col: number;
  offsetX: number;
  offsetY: number;
  opacity: number;
}

export class BoardAnimationPlanner {
  static buildFallEffects(previous: Board, next: Board, tileSize: number, progress: number): PieceRenderEffect[] {
    return BoardAnimationPlanner.interpolateFallEffects(
      BoardAnimationPlanner.planFallEffects(previous, next, tileSize),
      progress
    );
  }

  static planFallEffects(previous: Board, next: Board, tileSize: number): PieceFallMotion[] {
    const previousPositions = BoardAnimationPlanner.indexPieces(previous);
    const spawnedBySegment = new Map<string, number>();
    const motions: PieceFallMotion[] = [];

    for (let row = 0; row < next.rows; row++) {
      for (let col = 0; col < next.cols; col++) {
        const piece = next.tiles[row][col].piece;
        if (!piece) {
          continue;
        }

        const previousPosition = previousPositions.get(piece.id);
        let startRow = row;
        let startCol = col;
        let opacity = 1;

        if (previousPosition) {
          startRow = previousPosition.row;
          startCol = previousPosition.col;
        } else {
          const segmentTop = BoardAnimationPlanner.segmentTopRow(next, row, col);
          const segmentKey = `${segmentTop}_${col}`;
          const spawnedCount = spawnedBySegment.get(segmentKey) ?? 0;
          spawnedBySegment.set(segmentKey, spawnedCount + 1);
          startRow = segmentTop - 1 - spawnedCount;
          opacity = 0.38;
        }

        motions.push({
          row,
          col,
          offsetX: (startCol - col) * tileSize,
          offsetY: (startRow - row) * tileSize,
          opacity
        });
      }
    }

    return motions;
  }

  static interpolateFallEffects(motions: PieceFallMotion[], progress: number): PieceRenderEffect[] {
    const clampedProgress = Math.max(0, Math.min(1, progress));
    const effects: PieceRenderEffect[] = [];
    for (let index = 0; index < motions.length; index++) {
      const motion = motions[index];
      effects.push({
        row: motion.row,
        col: motion.col,
        offsetX: motion.offsetX * (1 - clampedProgress),
        offsetY: motion.offsetY * (1 - clampedProgress),
        scale: 0.96 + clampedProgress * 0.04,
        opacity: motion.opacity + (1 - motion.opacity) * clampedProgress
      });
    }
    return effects;
  }

  private static indexPieces(board: Board): Map<string, Position> {
    const result = new Map<string, Position>();
    for (let row = 0; row < board.rows; row++) {
      for (let col = 0; col < board.cols; col++) {
        const piece = board.tiles[row][col].piece;
        if (piece) {
          result.set(piece.id, { row, col });
        }
      }
    }
    return result;
  }

  private static segmentTopRow(board: Board, row: number, col: number): number {
    let top = row;
    while (top > 0 && !BoardAnimationPlanner.isGravityBarrier(board, top - 1, col)) {
      top--;
    }
    return top;
  }

  private static isGravityBarrier(board: Board, row: number, col: number): boolean {
    const blocker = board.tiles[row][col].blocker;
    return blocker?.type === 'hole' || blocker?.type === 'marshmallow';
  }
}
