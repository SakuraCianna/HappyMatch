import { Board, Piece, PieceType } from '../core/Types';
import { BoardLayout, BoardLayoutResult } from './BoardLayout';

export interface RenderOptions {
  width: number;
  height: number;
  layout?: BoardLayoutResult;
  animation?: BoardRenderState;
  theme?: BoardRenderTheme;
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
  fastMode?: boolean;
  fastStaticMode?: boolean;
}

export interface BoardRenderTheme {
  fill: string;
  innerFill: string;
  stroke: string;
  motif: string;
  pattern: string;
}

type PieceEffectLookup = (PieceRenderEffect | undefined)[];

const DEFAULT_BOARD_THEME: BoardRenderTheme = {
  fill: 'rgba(255, 255, 255, 0.62)',
  innerFill: 'rgba(255, 246, 212, 0.38)',
  stroke: 'rgba(255, 210, 128, 0.70)',
  motif: 'rgba(242, 122, 145, 0.12)',
  pattern: 'candy'
};

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
  light: string;
  sheen: string;
}

const PALETTE: Record<PieceType, PiecePalette> = {
  red: { base: '#F27A91', dark: '#C84F68', light: '#FFA6B8', sheen: 'rgba(255, 232, 238, 0.42)' },
  blue: { base: '#69B8EA', dark: '#327FC1', light: '#93D7F7', sheen: 'rgba(232, 249, 255, 0.42)' },
  yellow: { base: '#EFC957', dark: '#C89326', light: '#FFE27A', sheen: 'rgba(255, 250, 219, 0.46)' },
  green: { base: '#76D37B', dark: '#3FA856', light: '#9CEC9D', sheen: 'rgba(234, 255, 235, 0.42)' },
  purple: { base: '#B487EF', dark: '#7952CC', light: '#CCA8FF', sheen: 'rgba(245, 235, 255, 0.42)' },
  orange: { base: '#F39967', dark: '#D7633C', light: '#FFB487', sheen: 'rgba(255, 238, 226, 0.42)' }
};

export class CanvasRenderer {
  draw(ctx: GameCanvasContext, board: Board, options: RenderOptions): void {
    const layout = options.layout ?? BoardLayout.compute(board, options.width, options.height);
    const effectLookup = options.animation?.pieceEffects ?
      this.buildEffectLookup(options.animation.pieceEffects, board.cols) : undefined;
    const fastMode = options.animation?.fastMode === true;
    const fastStaticMode = options.animation?.fastStaticMode === true;

    ctx.clearRect(0, 0, options.width, options.height);
    this.drawBoardBackground(ctx, layout.offsetX, layout.offsetY, layout.boardWidth, layout.boardHeight, options.theme ?? DEFAULT_BOARD_THEME);

    for (let row = 0; row < board.rows; row++) {
      for (let col = 0; col < board.cols; col++) {
        const tile = board.tiles[row][col];
        const centerX = layout.offsetX + col * layout.tileSize + layout.tileSize / 2;
        const centerY = layout.offsetY + row * layout.tileSize + layout.tileSize / 2;
        if (tile.blocker && this.shouldDrawBlockerUnderPiece(tile.blocker.type)) {
          this.drawBlocker(ctx, tile.blocker.type, centerX, centerY, layout.tileSize * 0.78, tile.blocker.hp);
        }
        if (tile.piece) {
          const effect = effectLookup ? effectLookup[row * board.cols + col] : undefined;
          const offsetX = effect ? effect.offsetX : 0;
          const offsetY = effect ? effect.offsetY : 0;
          const scale = effect ? effect.scale : 1;
          const opacity = effect ? effect.opacity : 1;
          const pieceFastMode = fastMode || (fastStaticMode && !effect);
          this.drawPiece(ctx, tile.piece, centerX + offsetX, centerY + offsetY, layout.tileSize * 0.70 * scale, opacity, pieceFastMode);
        }
        if (tile.blocker && !this.shouldDrawBlockerUnderPiece(tile.blocker.type)) {
          this.drawBlocker(ctx, tile.blocker.type, centerX, centerY, layout.tileSize * 0.86, tile.blocker.hp);
        }
      }
    }
  }

  private drawBoardBackground(
    ctx: GameCanvasContext,
    x: number,
    y: number,
    width: number,
    height: number,
    theme: BoardRenderTheme
  ): void {
    ctx.save();
    this.roundRect(ctx, x, y, width, height, 22);
    ctx.fillStyle = theme.fill;
    ctx.fill();
    this.drawBoardPattern(ctx, x, y, width, height, theme);
    ctx.strokeStyle = theme.stroke;
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.restore();
  }

  private drawBoardPattern(
    ctx: GameCanvasContext,
    x: number,
    y: number,
    width: number,
    height: number,
    theme: BoardRenderTheme
  ): void {
    ctx.save();
    ctx.fillStyle = theme.innerFill;
    this.roundRect(ctx, x + 8, y + 8, width - 16, height - 16, 18);
    ctx.fill();

    ctx.strokeStyle = theme.motif;
    ctx.fillStyle = theme.motif;
    ctx.lineWidth = 2;
    if (theme.pattern === 'frost') {
      for (let index = -2; index < 7; index++) {
        ctx.beginPath();
        ctx.moveTo(x + index * width * 0.18, y + height);
        ctx.lineTo(x + width * 0.34 + index * width * 0.18, y);
        ctx.stroke();
      }
      this.drawSmallSpark(ctx, x + width * 0.78, y + height * 0.18, width * 0.036);
      this.drawSmallSpark(ctx, x + width * 0.20, y + height * 0.74, width * 0.030);
    } else if (theme.pattern === 'factory') {
      for (let index = 0; index < 5; index++) {
        const stripeX = x + width * (0.12 + index * 0.20);
        this.roundRect(ctx, stripeX, y + height * 0.08, width * 0.055, height * 0.84, 8);
        ctx.fill();
      }
      ctx.beginPath();
      ctx.arc(x + width * 0.80, y + height * 0.22, width * 0.055, 0, Math.PI * 2);
      ctx.arc(x + width * 0.20, y + height * 0.78, width * 0.050, 0, Math.PI * 2);
      ctx.fill();
    } else if (theme.pattern === 'portal') {
      for (let index = 0; index < 3; index++) {
        ctx.beginPath();
        ctx.arc(x + width * (0.24 + index * 0.26), y + height * (index % 2 === 0 ? 0.28 : 0.72), width * 0.070, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(x + width * (0.24 + index * 0.26), y + height * (index % 2 === 0 ? 0.28 : 0.72), width * 0.034, 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (theme.pattern === 'rainbow') {
      for (let index = 0; index < 6; index++) {
        ctx.beginPath();
        ctx.moveTo(x + width * 0.12, y + height * (0.16 + index * 0.12));
        ctx.lineTo(x + width * 0.88, y + height * (0.10 + index * 0.12));
        ctx.stroke();
      }
      this.drawSmallSpark(ctx, x + width * 0.78, y + height * 0.22, width * 0.040);
      this.drawSmallSpark(ctx, x + width * 0.26, y + height * 0.68, width * 0.032);
    } else {
      ctx.beginPath();
      ctx.arc(x + width * 0.20, y + height * 0.22, width * 0.065, 0, Math.PI * 2);
      ctx.arc(x + width * 0.78, y + height * 0.28, width * 0.048, 0, Math.PI * 2);
      ctx.arc(x + width * 0.36, y + height * 0.78, width * 0.050, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  private drawSmallSpark(ctx: GameCanvasContext, cx: number, cy: number, size: number): void {
    ctx.beginPath();
    ctx.moveTo(cx, cy - size);
    ctx.lineTo(cx + size * 0.22, cy - size * 0.22);
    ctx.lineTo(cx + size, cy);
    ctx.lineTo(cx + size * 0.22, cy + size * 0.22);
    ctx.lineTo(cx, cy + size);
    ctx.lineTo(cx - size * 0.22, cy + size * 0.22);
    ctx.lineTo(cx - size, cy);
    ctx.lineTo(cx - size * 0.22, cy - size * 0.22);
    ctx.closePath();
    ctx.fill();
  }

  private drawPiece(ctx: GameCanvasContext, piece: Piece, cx: number, cy: number, size: number, opacity: number, fastMode: boolean): void {
    if (opacity <= 0.01 || size <= 1) {
      return;
    }
    const palette = PALETTE[piece.type];
    ctx.save();
    ctx.globalAlpha = opacity;
    if (fastMode) {
      this.drawFastPiece(ctx, piece, cx, cy, size, palette);
      ctx.restore();
      return;
    }
    this.drawSpecialAura(ctx, piece, cx, cy, size);
    if (piece.special === 'rainbow') {
      this.drawRainbowPiece(ctx, cx, cy, size);
    } else {
      this.drawPieceShape(ctx, piece.type, cx, cy + size * 0.05, size * 1.01, 'rgba(92, 58, 74, 0.16)', 'rgba(92, 58, 74, 0.00)');
      this.drawPieceShape(ctx, piece.type, cx, cy, size, palette.base, palette.dark);
      this.drawPieceSurface(ctx, piece.type, cx, cy, size, palette);
    }

    ctx.fillStyle = 'rgba(255, 255, 255, 0.24)';
    ctx.beginPath();
    ctx.arc(cx - size * 0.19, cy - size * 0.20, size * 0.065, 0, Math.PI * 2);
    ctx.fill();

    if (piece.special === 'none') {
      this.drawPieceMark(ctx, piece.type, cx, cy, size);
    } else {
      this.drawSpecialMark(ctx, piece, cx, cy, size);
    }
    ctx.restore();
  }

  private drawFastPiece(
    ctx: GameCanvasContext,
    piece: Piece,
    cx: number,
    cy: number,
    size: number,
    palette: PiecePalette
  ): void {
    if (piece.special === 'rainbow') {
      this.drawRainbowPiece(ctx, cx, cy, size);
    } else {
      this.drawPieceShape(ctx, piece.type, cx, cy, size, palette.base, palette.dark);
      this.drawPieceSurface(ctx, piece.type, cx, cy, size, palette);
    }
    if (piece.special === 'none') {
      this.drawPieceMark(ctx, piece.type, cx, cy, size);
    }
    if (piece.special !== 'none') {
      this.drawSpecialMark(ctx, piece, cx, cy, size);
    }
  }

  private buildEffectLookup(effects: PieceRenderEffect[], cols: number): PieceEffectLookup {
    const result: PieceEffectLookup = [];
    for (let index = 0; index < effects.length; index++) {
      const effect = effects[index];
      result[effect.row * cols + effect.col] = effect;
    }
    return result;
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
    this.piecePath(ctx, type, cx, cy, size);
    ctx.fill();
    ctx.stroke();
  }

  private drawPieceSurface(
    ctx: GameCanvasContext,
    type: PieceType,
    cx: number,
    cy: number,
    size: number,
    palette: PiecePalette
  ): void {
    ctx.save();
    ctx.fillStyle = palette.light;
    ctx.beginPath();
    this.piecePath(ctx, type, cx - size * 0.035, cy - size * 0.055, size * 0.70);
    ctx.fill();

    ctx.fillStyle = palette.sheen;
    ctx.beginPath();
    if (type === 'yellow') {
      this.starPath(ctx, cx - size * 0.12, cy - size * 0.16, size * 0.16, size * 0.06, 5);
    } else if (type === 'blue') {
      ctx.moveTo(cx - size * 0.02, cy - size * 0.31);
      ctx.lineTo(cx + size * 0.24, cy - size * 0.05);
      ctx.lineTo(cx + size * 0.02, cy + size * 0.10);
      ctx.lineTo(cx - size * 0.23, cy - size * 0.08);
      ctx.closePath();
    } else {
      ctx.ellipse(cx - size * 0.13, cy - size * 0.18, size * 0.19, size * 0.10, -Math.PI / 7, 0, Math.PI * 2);
    }
    ctx.fill();

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.26)';
    ctx.lineWidth = Math.max(1, size * 0.028);
    ctx.beginPath();
    if (type === 'blue') {
      ctx.moveTo(cx, cy - size * 0.31);
      ctx.lineTo(cx, cy + size * 0.31);
      ctx.moveTo(cx - size * 0.31, cy);
      ctx.lineTo(cx + size * 0.31, cy);
    } else if (type === 'yellow') {
      this.starPath(ctx, cx, cy, size * 0.31, size * 0.13, 5);
    } else {
      ctx.ellipse(cx + size * 0.05, cy + size * 0.02, size * 0.25, size * 0.35, Math.PI / 7, Math.PI * 0.18, Math.PI * 1.28);
    }
    ctx.stroke();
    ctx.restore();
  }

  private piecePath(ctx: GameCanvasContext, type: PieceType, cx: number, cy: number, size: number): void {
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
      ctx.fillStyle = hp > 1 ? 'rgba(142, 222, 255, 0.42)' : 'rgba(201, 244, 255, 0.36)';
      this.roundRect(ctx, cx - size / 2, cy - size / 2, size, size, 14);
      ctx.fill();
      ctx.strokeStyle = hp > 1 ? 'rgba(62, 172, 218, 0.88)' : 'rgba(108, 203, 236, 0.82)';
      ctx.lineWidth = Math.max(2, size * 0.055);
      ctx.stroke();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.72)';
      ctx.lineWidth = Math.max(1, size * 0.035);
      ctx.beginPath();
      ctx.moveTo(cx - size * 0.34, cy - size * 0.10);
      ctx.lineTo(cx - size * 0.08, cy - size * 0.02);
      ctx.lineTo(cx + size * 0.08, cy - size * 0.30);
      ctx.moveTo(cx - size * 0.10, cy + size * 0.30);
      ctx.lineTo(cx + size * 0.06, cy + size * 0.05);
      ctx.lineTo(cx + size * 0.34, cy + size * 0.16);
      ctx.stroke();
      this.drawSmallSpark(ctx, cx - size * 0.25, cy - size * 0.27, size * 0.10);
      this.drawSmallSpark(ctx, cx + size * 0.26, cy + size * 0.25, size * 0.08);
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

  private shouldDrawBlockerUnderPiece(type: string): boolean {
    return type === 'hole' || type === 'marshmallow';
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
