import { Board, Piece, PieceType } from '../core/Types';
import { BoardLayout, BoardLayoutResult } from './BoardLayout';

export interface RenderOptions {
  width: number;
  height: number;
  layout?: BoardLayoutResult;
  animation?: BoardRenderState;
}

export interface PieceRenderEffect {
  row: number;
  col: number;
  offsetX: number;
  offsetY: number;
  scale: number;
  opacity: number;
}

export interface BoardRenderState {
  pieceEffects?: PieceRenderEffect[];
}

export interface GameCanvasContext {
  fillStyle: string;
  strokeStyle: string;
  lineWidth: number;
  font: string;
  textAlign: string;
  textBaseline: string;
  globalAlpha: number;
  clearRect(x: number, y: number, width: number, height: number): void;
  save(): void;
  restore(): void;
  fill(): void;
  stroke(): void;
  beginPath(): void;
  closePath(): void;
  arc(x: number, y: number, radius: number, startAngle: number, endAngle: number): void;
  arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): void;
  ellipse(
    x: number,
    y: number,
    radiusX: number,
    radiusY: number,
    rotation: number,
    startAngle: number,
    endAngle: number
  ): void;
  moveTo(x: number, y: number): void;
  lineTo(x: number, y: number): void;
  fillText(text: string, x: number, y: number): void;
}

interface PiecePalette {
  base: string;
  dark: string;
}

const PALETTE: Record<PieceType, PiecePalette> = {
  red: { base: '#F27A91', dark: '#D95370' },
  blue: { base: '#69B8EA', dark: '#3D91D4' },
  yellow: { base: '#EFC957', dark: '#D8A73B' },
  green: { base: '#76D37B', dark: '#4DB862' },
  purple: { base: '#B487EF', dark: '#8663D8' },
  orange: { base: '#F39967', dark: '#DF7048' }
};

export class CanvasRenderer {
  draw(ctx: GameCanvasContext, board: Board, options: RenderOptions): void {
    const layout = options.layout ?? BoardLayout.compute(board, options.width, options.height);
    const effectMap = options.animation?.pieceEffects ? this.buildEffectMap(options.animation.pieceEffects) : undefined;

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
          const effect = effectMap?.get(this.cellKey(row, col));
          const offsetX = effect ? effect.offsetX : 0;
          const offsetY = effect ? effect.offsetY : 0;
          const scale = effect ? effect.scale : 1;
          const opacity = effect ? effect.opacity : 1;
          this.drawPiece(ctx, tile.piece, center.x + offsetX, center.y + offsetY, layout.tileSize * 0.70 * scale, opacity);
        }
      }
    }
  }

  private drawBoardBackground(ctx: GameCanvasContext, x: number, y: number, width: number, height: number): void {
    ctx.save();
    this.roundRect(ctx, x, y, width, height, 22);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.62)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 210, 128, 0.70)';
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.restore();
  }

  private drawPiece(ctx: GameCanvasContext, piece: Piece, cx: number, cy: number, size: number, opacity: number): void {
    if (opacity <= 0.01 || size <= 1) {
      return;
    }
    const palette = PALETTE[piece.type];
    ctx.save();
    ctx.globalAlpha = opacity;
    this.drawSpecialAura(ctx, piece, cx, cy, size);
    if (piece.special === 'rainbow') {
      this.drawRainbowPiece(ctx, cx, cy, size);
    } else {
      this.drawPieceShape(ctx, piece.type, cx, cy, size, palette.base, palette.dark);
    }

    ctx.fillStyle = 'rgba(255, 255, 255, 0.28)';
    ctx.beginPath();
    ctx.arc(cx - size * 0.18, cy - size * 0.18, size * 0.08, 0, Math.PI * 2);
    ctx.fill();

    if (piece.special === 'none') {
      this.drawPieceMark(ctx, piece.type, cx, cy, size);
    } else {
      this.drawSpecialMark(ctx, piece, cx, cy, size);
    }
    ctx.restore();
  }

  private buildEffectMap(effects: PieceRenderEffect[] | undefined): Map<string, PieceRenderEffect> {
    const result = new Map<string, PieceRenderEffect>();
    if (!effects) {
      return result;
    }
    for (let index = 0; index < effects.length; index++) {
      const effect = effects[index];
      result.set(this.cellKey(effect.row, effect.col), effect);
    }
    return result;
  }

  private cellKey(row: number, col: number): string {
    return `${row}_${col}`;
  }

  private drawPieceShape(
    ctx: GameCanvasContext,
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

  private drawPieceMark(ctx: GameCanvasContext, type: PieceType, cx: number, cy: number, size: number): void {
    ctx.save();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.58)';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.66)';
    ctx.lineWidth = Math.max(1, size * 0.035);
    if (type === 'red') {
      ctx.beginPath();
      ctx.arc(cx - size * 0.045, cy - size * 0.01, size * 0.035, 0, Math.PI * 2);
      ctx.arc(cx + size * 0.045, cy - size * 0.01, size * 0.035, 0, Math.PI * 2);
      ctx.moveTo(cx - size * 0.075, cy + size * 0.02);
      ctx.lineTo(cx, cy + size * 0.095);
      ctx.lineTo(cx + size * 0.075, cy + size * 0.02);
      ctx.fill();
    } else if (type === 'blue') {
      ctx.beginPath();
      ctx.moveTo(cx, cy - size * 0.08);
      ctx.lineTo(cx + size * 0.08, cy);
      ctx.lineTo(cx, cy + size * 0.08);
      ctx.lineTo(cx - size * 0.08, cy);
      ctx.closePath();
      ctx.fill();
    } else if (type === 'yellow') {
      ctx.beginPath();
      this.starPath(ctx, cx, cy, size * 0.10, size * 0.04, 4);
      ctx.fill();
    } else if (type === 'green') {
      ctx.beginPath();
      ctx.arc(cx - size * 0.07, cy, size * 0.03, 0, Math.PI * 2);
      ctx.arc(cx + size * 0.07, cy, size * 0.03, 0, Math.PI * 2);
      ctx.fill();
    } else if (type === 'purple') {
      ctx.beginPath();
      ctx.arc(cx, cy, size * 0.07, Math.PI * 0.20, Math.PI * 1.72);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.moveTo(cx - size * 0.08, cy);
      ctx.lineTo(cx + size * 0.08, cy);
      ctx.moveTo(cx, cy - size * 0.08);
      ctx.lineTo(cx, cy + size * 0.08);
      ctx.stroke();
    }
    ctx.restore();
  }

  private drawSpecialMark(ctx: GameCanvasContext, piece: Piece, cx: number, cy: number, size: number): void {
    if (piece.special === 'none') {
      return;
    }
    ctx.save();
    ctx.strokeStyle = 'rgba(228, 255, 255, 0.96)';
    ctx.fillStyle = '#EFFFFF';
    ctx.lineWidth = Math.max(3, size * 0.08);
    if (piece.special === 'row_clear') {
      ctx.beginPath();
      ctx.moveTo(cx - size * 0.38, cy);
      ctx.lineTo(cx + size * 0.38, cy);
      ctx.moveTo(cx - size * 0.38, cy);
      ctx.lineTo(cx - size * 0.22, cy - size * 0.13);
      ctx.moveTo(cx - size * 0.38, cy);
      ctx.lineTo(cx - size * 0.22, cy + size * 0.13);
      ctx.moveTo(cx + size * 0.38, cy);
      ctx.lineTo(cx + size * 0.22, cy - size * 0.13);
      ctx.moveTo(cx + size * 0.38, cy);
      ctx.lineTo(cx + size * 0.22, cy + size * 0.13);
      ctx.stroke();
    } else if (piece.special === 'col_clear') {
      ctx.beginPath();
      ctx.moveTo(cx, cy - size * 0.38);
      ctx.lineTo(cx, cy + size * 0.38);
      ctx.moveTo(cx, cy - size * 0.38);
      ctx.lineTo(cx - size * 0.13, cy - size * 0.22);
      ctx.moveTo(cx, cy - size * 0.38);
      ctx.lineTo(cx + size * 0.13, cy - size * 0.22);
      ctx.moveTo(cx, cy + size * 0.38);
      ctx.lineTo(cx - size * 0.13, cy + size * 0.22);
      ctx.moveTo(cx, cy + size * 0.38);
      ctx.lineTo(cx + size * 0.13, cy + size * 0.22);
      ctx.stroke();
    } else if (piece.special === 'bomb') {
      ctx.strokeStyle = 'rgba(255, 248, 191, 0.96)';
      ctx.lineWidth = Math.max(2, size * 0.06);
      ctx.beginPath();
      ctx.arc(cx, cy, size * 0.32, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = '#FFF5AA';
      ctx.beginPath();
      this.starPath(ctx, cx, cy, size * 0.18, size * 0.07, 5);
      ctx.fill();
    } else if (piece.special === 'rainbow') {
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(cx, cy, size * 0.13, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  private drawSpecialAura(ctx: GameCanvasContext, piece: Piece, cx: number, cy: number, size: number): void {
    if (piece.special === 'none') {
      return;
    }
    ctx.save();
    if (piece.special === 'bomb') {
      ctx.strokeStyle = 'rgba(255, 241, 121, 0.64)';
    } else if (piece.special === 'rainbow') {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.78)';
    } else {
      ctx.strokeStyle = 'rgba(128, 234, 255, 0.66)';
    }
    ctx.lineWidth = Math.max(3, size * 0.10);
    ctx.beginPath();
    ctx.arc(cx, cy, size * 0.56, 0, Math.PI * 2);
    ctx.stroke();
    ctx.lineWidth = Math.max(2, size * 0.04);
    ctx.beginPath();
    ctx.arc(cx, cy, size * 0.66, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  private drawRainbowPiece(ctx: GameCanvasContext, cx: number, cy: number, size: number): void {
    const colors: string[] = ['#F27A91', '#F39967', '#EFC957', '#76D37B', '#69B8EA', '#B487EF'];
    ctx.save();
    ctx.fillStyle = '#FBFBFF';
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = Math.max(2, size * 0.06);
    ctx.beginPath();
    ctx.arc(cx, cy, size * 0.50, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    for (let index = 0; index < colors.length; index++) {
      ctx.strokeStyle = colors[index];
      ctx.lineWidth = Math.max(3, size * 0.10);
      ctx.beginPath();
      const start = -Math.PI / 2 + index * Math.PI / 3;
      ctx.arc(cx, cy, size * 0.32, start, start + Math.PI / 3);
      ctx.stroke();
    }
    ctx.fillStyle = 'rgba(255, 255, 255, 0.82)';
    ctx.beginPath();
    ctx.arc(cx, cy, size * 0.18, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  private drawBlocker(ctx: GameCanvasContext, type: string, cx: number, cy: number, size: number, hp: number): void {
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
    } else if (type === 'hole') {
      ctx.fillStyle = 'rgba(92, 58, 74, 0.16)';
      this.roundRect(ctx, cx - size / 2, cy - size / 2, size, size, 14);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.62)';
      ctx.lineWidth = Math.max(2, size * 0.05);
      ctx.stroke();
    }
    ctx.restore();
  }

  private roundRect(ctx: GameCanvasContext, x: number, y: number, width: number, height: number, radius: number): void {
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

  private starPath(ctx: GameCanvasContext, cx: number, cy: number, outer: number, inner: number, points: number): void {
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
