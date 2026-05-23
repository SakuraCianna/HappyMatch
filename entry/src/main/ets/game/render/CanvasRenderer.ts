import { Board, Piece, PieceType } from '../core/Types';
import { BoardLayout } from './BoardLayout';

export interface RenderOptions {
  width: number;
  height: number;
}

interface PiecePalette {
  base: string;
  dark: string;
  mark: string;
}

const PALETTE: Record<PieceType, PiecePalette> = {
  red: { base: '#F27A91', dark: '#D95370', mark: '♥' },
  blue: { base: '#69B8EA', dark: '#3D91D4', mark: '◆' },
  yellow: { base: '#EFC957', dark: '#D8A73B', mark: '★' },
  green: { base: '#76D37B', dark: '#4DB862', mark: '✿' },
  purple: { base: '#B487EF', dark: '#8663D8', mark: '☾' },
  orange: { base: '#F39967', dark: '#DF7048', mark: '●' }
};

export class CanvasRenderer {
  draw(ctx: CanvasRenderingContext2D, board: Board, options: RenderOptions): void {
    const layout = BoardLayout.compute(board, options.width, options.height);

    ctx.clearRect(0, 0, options.width, options.height);
    this.drawBoardBackground(ctx, layout.offsetX, layout.offsetY, layout.boardWidth, layout.boardHeight);

    for (let row = 0; row < board.rows; row++) {
      for (let col = 0; col < board.cols; col++) {
        const tile = board.tiles[row][col];
        const center = BoardLayout.centerOf(layout, { row, col });
        if (tile.blocker) {
          this.drawBlocker(ctx, tile.blocker.type, center.x, center.y, layout.tileSize * 0.78, tile.blocker.hp);
        }
        if (tile.piece) {
          this.drawPiece(ctx, tile.piece, center.x, center.y, layout.tileSize * 0.70);
        }
      }
    }
  }

  private drawBoardBackground(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number): void {
    ctx.save();
    this.roundRect(ctx, x, y, width, height, 22);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.62)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 210, 128, 0.70)';
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.restore();
  }

  private drawPiece(ctx: CanvasRenderingContext2D, piece: Piece, cx: number, cy: number, size: number): void {
    const palette = PALETTE[piece.type];
    ctx.save();
    this.drawPieceShape(ctx, piece.type, cx, cy, size, palette.base, palette.dark);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.46)';
    ctx.beginPath();
    ctx.arc(cx - size * 0.18, cy - size * 0.18, size * 0.08, 0, Math.PI * 2);
    ctx.fill();

    this.drawSpecialMark(ctx, piece, cx, cy, size);
    ctx.fillStyle = piece.special === 'none' ? 'rgba(255, 255, 255, 0.68)' : 'rgba(255, 255, 255, 0.88)';
    ctx.font = `${Math.floor(size * 0.34)}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(piece.special === 'none' ? palette.mark : this.specialSymbol(piece.special), cx, cy + size * 0.02);
    ctx.restore();
  }

  private drawPieceShape(
    ctx: CanvasRenderingContext2D,
    type: PieceType,
    cx: number,
    cy: number,
    size: number,
    base: string,
    dark: string
  ): void {
    ctx.fillStyle = base;
    ctx.strokeStyle = dark;
    ctx.lineWidth = Math.max(2, size * 0.07);
    ctx.beginPath();
    if (type === 'blue') {
      ctx.moveTo(cx, cy - size / 2);
      ctx.lineTo(cx + size / 2, cy);
      ctx.lineTo(cx, cy + size / 2);
      ctx.lineTo(cx - size / 2, cy);
      ctx.closePath();
    } else if (type === 'yellow') {
      this.starPath(ctx, cx, cy, size * 0.52, size * 0.24, 5);
    } else if (type === 'green') {
      ctx.ellipse(cx, cy, size * 0.40, size * 0.54, Math.PI / 4, 0, Math.PI * 2);
    } else if (type === 'purple') {
      ctx.ellipse(cx, cy, size * 0.42, size * 0.54, 0, 0, Math.PI * 2);
    } else if (type === 'orange') {
      ctx.ellipse(cx, cy, size * 0.44, size * 0.54, -Math.PI / 5, 0, Math.PI * 2);
    } else {
      ctx.arc(cx, cy, size / 2, 0, Math.PI * 2);
    }
    ctx.fill();
    ctx.stroke();
  }

  private drawSpecialMark(ctx: CanvasRenderingContext2D, piece: Piece, cx: number, cy: number, size: number): void {
    if (piece.special === 'none') {
      return;
    }
    ctx.save();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.78)';
    ctx.lineWidth = Math.max(2, size * 0.07);
    if (piece.special === 'row_clear') {
      ctx.beginPath();
      ctx.moveTo(cx - size * 0.32, cy);
      ctx.lineTo(cx + size * 0.32, cy);
      ctx.stroke();
    } else if (piece.special === 'col_clear') {
      ctx.beginPath();
      ctx.moveTo(cx, cy - size * 0.32);
      ctx.lineTo(cx, cy + size * 0.32);
      ctx.stroke();
    } else if (piece.special === 'bomb') {
      ctx.beginPath();
      ctx.arc(cx, cy, size * 0.24, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();
  }

  private drawBlocker(ctx: CanvasRenderingContext2D, type: string, cx: number, cy: number, size: number, hp: number): void {
    ctx.save();
    if (type === 'ice') {
      ctx.fillStyle = hp > 1 ? 'rgba(173, 230, 255, 0.72)' : 'rgba(210, 245, 255, 0.60)';
      this.roundRect(ctx, cx - size / 2, cy - size / 2, size, size, 12);
      ctx.fill();
    } else if (type === 'chain') {
      ctx.strokeStyle = '#8C6A3D';
      ctx.lineWidth = Math.max(4, size * 0.12);
      ctx.beginPath();
      ctx.moveTo(cx - size * 0.42, cy - size * 0.42);
      ctx.lineTo(cx + size * 0.42, cy + size * 0.42);
      ctx.moveTo(cx + size * 0.42, cy - size * 0.42);
      ctx.lineTo(cx - size * 0.42, cy + size * 0.42);
      ctx.stroke();
    } else if (type === 'marshmallow') {
      ctx.fillStyle = '#FFE2EA';
      this.roundRect(ctx, cx - size / 2, cy - size / 2, size, size, 16);
      ctx.fill();
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 3;
      ctx.stroke();
    } else if (type === 'portal') {
      ctx.strokeStyle = '#7C6BFF';
      ctx.lineWidth = Math.max(3, size * 0.09);
      ctx.beginPath();
      ctx.arc(cx, cy, size * 0.36, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();
  }

  private specialSymbol(special: string): string {
    if (special === 'row_clear') {
      return '↔';
    }
    if (special === 'col_clear') {
      return '↕';
    }
    if (special === 'bomb') {
      return '✦';
    }
    return '◎';
  }

  private roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number): void {
    const r = Math.min(radius, width / 2, height / 2);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + width - r, y);
    ctx.arcTo(x + width, y, x + width, y + r, r);
    ctx.lineTo(x + width, y + height - r);
    ctx.arcTo(x + width, y + height, x + width - r, y + height, r);
    ctx.lineTo(x + r, y + height);
    ctx.arcTo(x, y + height, x, y + height - r, r);
    ctx.lineTo(x, y + r);
    ctx.arcTo(x, y, x + r, y, r);
    ctx.closePath();
  }

  private starPath(ctx: CanvasRenderingContext2D, cx: number, cy: number, outer: number, inner: number, points: number): void {
    for (let index = 0; index < points * 2; index++) {
      const radius = index % 2 === 0 ? outer : inner;
      const angle = -Math.PI / 2 + index * Math.PI / points;
      const x = cx + Math.cos(angle) * radius;
      const y = cy + Math.sin(angle) * radius;
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.closePath();
  }
}
