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
  drawGuidePiece(ctx: GameCanvasContext, piece: Piece, width: number, height: number): void {
    ctx.clearRect(0, 0, width, height);
    const size = Math.min(width, height) * 0.72;
    this.drawPiece(ctx, piece, width / 2, height / 2, size, 1, false);
  }

  drawGuideBlocker(ctx: GameCanvasContext, type: string, width: number, height: number, hp: number = 1): void {
    ctx.clearRect(0, 0, width, height);
    this.drawBlocker(ctx, type, width / 2, height / 2, Math.min(width, height) * 0.74, hp);
  }

  draw(ctx: GameCanvasContext, board: Board, options: RenderOptions): void {
    const layout = options.layout ?? BoardLayout.compute(board, options.width, options.height);
    const effectLookup = options.animation?.pieceEffects ?
      this.buildEffectLookup(options.animation.pieceEffects, board.cols) : undefined;
    const fastMode = options.animation?.fastMode === true;
    const fastStaticMode = options.animation?.fastStaticMode === true;

    ctx.clearRect(0, 0, options.width, options.height);
    this.drawBoardBackground(
      ctx,
      layout.offsetX,
      layout.offsetY,
      layout.boardWidth,
      layout.boardHeight,
      options.theme ?? DEFAULT_BOARD_THEME,
      fastMode || fastStaticMode
    );

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
    theme: BoardRenderTheme,
    simplified: boolean
  ): void {
    ctx.save();
    this.roundRect(ctx, x, y, width, height, 22);
    ctx.fillStyle = theme.fill;
    ctx.fill();
    if (!simplified) {
      this.drawBoardPattern(ctx, x, y, width, height, theme);
    }
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
    this.drawSpecialAura(ctx, piece, cx, cy, size);
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

    ctx.fillStyle = 'rgba(255, 255, 255, 0.48)';
    ctx.beginPath();
    ctx.ellipse(cx - size * 0.20, cy - size * 0.24, size * 0.07, size * 0.035, -Math.PI / 6, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.34)';
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
    if (piece.special === 'row_clear') {
      this.drawSpecialBadge(ctx, cx, cy, size, 'rgba(35, 188, 232, 0.90)', 'rgba(255, 255, 255, 0.96)');
      this.drawBeamBadge(ctx, cx, cy, size, true);
      ctx.strokeStyle = 'rgba(18, 84, 122, 0.92)';
      ctx.lineWidth = Math.max(5, size * 0.14);
      ctx.beginPath();
      this.rowArrowPath(ctx, cx, cy, size);
      ctx.stroke();
      ctx.strokeStyle = '#F5FFFF';
      ctx.lineWidth = Math.max(3, size * 0.08);
      ctx.beginPath();
      this.rowArrowPath(ctx, cx, cy, size);
      ctx.stroke();
      this.drawArrowHeadDots(ctx, cx, cy, size, true);
    } else if (piece.special === 'col_clear') {
      this.drawSpecialBadge(ctx, cx, cy, size, 'rgba(116, 92, 242, 0.90)', 'rgba(255, 255, 255, 0.96)');
      this.drawBeamBadge(ctx, cx, cy, size, false);
      ctx.strokeStyle = 'rgba(50, 39, 142, 0.92)';
      ctx.lineWidth = Math.max(5, size * 0.14);
      ctx.beginPath();
      this.colArrowPath(ctx, cx, cy, size);
      ctx.stroke();
      ctx.strokeStyle = '#F5FFFF';
      ctx.lineWidth = Math.max(3, size * 0.08);
      ctx.beginPath();
      this.colArrowPath(ctx, cx, cy, size);
      ctx.stroke();
      this.drawArrowHeadDots(ctx, cx, cy, size, false);
    } else if (piece.special === 'bomb') {
      this.drawSpecialBadge(ctx, cx, cy, size, 'rgba(255, 199, 66, 0.94)', 'rgba(255, 255, 255, 0.96)');
      this.drawBombGlyph(ctx, cx, cy, size);
    } else if (piece.special === 'rainbow') {
      this.drawSpecialBadge(ctx, cx, cy, size, 'rgba(255, 255, 255, 0.94)', 'rgba(124, 107, 255, 0.92)');
      this.drawRainbowCore(ctx, cx, cy, size);
    }
    ctx.restore();
  }

  private drawSpecialAura(ctx: GameCanvasContext, piece: Piece, cx: number, cy: number, size: number): void {
    if (piece.special === 'none') {
      return;
    }
    ctx.save();
    const innerAura = this.specialAuraColor(piece.special, true);
    const outerAura = this.specialAuraColor(piece.special, false);
    ctx.strokeStyle = outerAura;
    ctx.lineWidth = Math.max(6, size * 0.16);
    ctx.beginPath();
    ctx.arc(cx, cy, size * 0.72, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = innerAura;
    ctx.lineWidth = Math.max(4, size * 0.12);
    ctx.beginPath();
    ctx.arc(cx, cy, size * 0.58, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.78)';
    ctx.lineWidth = Math.max(2, size * 0.052);
    ctx.beginPath();
    ctx.arc(cx, cy, size * 0.45, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  private specialAuraColor(special: string, inner: boolean): string {
    if (special === 'row_clear') {
      return inner ? 'rgba(255, 103, 152, 0.96)' : 'rgba(255, 214, 96, 0.76)';
    }
    if (special === 'col_clear') {
      return inner ? 'rgba(179, 94, 255, 0.96)' : 'rgba(255, 206, 103, 0.76)';
    }
    if (special === 'bomb') {
      return inner ? 'rgba(255, 137, 64, 0.97)' : 'rgba(255, 220, 80, 0.82)';
    }
    if (special === 'rainbow') {
      return inner ? 'rgba(255, 112, 205, 0.94)' : 'rgba(255, 226, 94, 0.82)';
    }
    return inner ? 'rgba(255, 132, 176, 0.94)' : 'rgba(255, 218, 100, 0.76)';
  }

  private drawRainbowPiece(ctx: GameCanvasContext, cx: number, cy: number, size: number): void {
    const colors: string[] = ['#F27A91', '#F39967', '#EFC957', '#76D37B', '#69B8EA', '#B487EF'];
    ctx.save();
    ctx.fillStyle = '#F9F7FF';
    ctx.strokeStyle = 'rgba(83, 67, 172, 0.72)';
    ctx.lineWidth = Math.max(3, size * 0.075);
    ctx.beginPath();
    ctx.arc(cx, cy, size * 0.50, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    for (let index = 0; index < colors.length; index++) {
      ctx.strokeStyle = colors[index];
      ctx.lineWidth = Math.max(4, size * 0.105);
      ctx.beginPath();
      const start = -Math.PI / 2 + index * Math.PI / 3;
      ctx.arc(cx, cy, size * 0.32, start, start + Math.PI / 3);
      ctx.stroke();
    }
    this.drawRainbowCore(ctx, cx, cy, size * 1.04);
    ctx.restore();
  }

  private drawBlocker(ctx: GameCanvasContext, type: string, cx: number, cy: number, size: number, hp: number): void {
    ctx.save();
    if (type === 'ice') {
      ctx.fillStyle = hp > 1 ? 'rgba(90, 198, 255, 0.62)' : 'rgba(164, 233, 255, 0.56)';
      this.roundRect(ctx, cx - size / 2, cy - size / 2, size, size, 14);
      ctx.fill();
      ctx.strokeStyle = hp > 1 ? 'rgba(20, 123, 184, 0.98)' : 'rgba(42, 160, 214, 0.98)';
      ctx.lineWidth = Math.max(4, size * 0.080);
      ctx.stroke();
      this.drawIceSymbol(ctx, cx, cy, size, hp);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.86)';
      ctx.lineWidth = Math.max(2, size * 0.045);
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
      ctx.fillStyle = 'rgba(255, 219, 119, 0.30)';
      this.roundRect(ctx, cx - size / 2, cy - size / 2, size, size, 12);
      ctx.fill();
      ctx.strokeStyle = 'rgba(118, 77, 34, 0.76)';
      ctx.lineWidth = Math.max(2, size * 0.050);
      ctx.stroke();
      ctx.strokeStyle = 'rgba(63, 43, 29, 0.92)';
      ctx.lineWidth = Math.max(8, size * 0.22);
      ctx.beginPath();
      ctx.moveTo(cx - size * 0.42, cy - size * 0.42);
      ctx.lineTo(cx + size * 0.42, cy + size * 0.42);
      ctx.moveTo(cx + size * 0.42, cy - size * 0.42);
      ctx.lineTo(cx - size * 0.42, cy + size * 0.42);
      ctx.stroke();
      ctx.strokeStyle = '#F4C15F';
      ctx.lineWidth = Math.max(5, size * 0.13);
      ctx.beginPath();
      ctx.moveTo(cx - size * 0.42, cy - size * 0.42);
      ctx.lineTo(cx + size * 0.42, cy + size * 0.42);
      ctx.moveTo(cx + size * 0.42, cy - size * 0.42);
      ctx.lineTo(cx - size * 0.42, cy + size * 0.42);
      ctx.stroke();
      ctx.strokeStyle = 'rgba(255, 248, 201, 0.96)';
      ctx.lineWidth = Math.max(2, size * 0.045);
      ctx.beginPath();
      ctx.moveTo(cx - size * 0.38, cy - size * 0.38);
      ctx.lineTo(cx + size * 0.38, cy + size * 0.38);
      ctx.moveTo(cx + size * 0.38, cy - size * 0.38);
      ctx.lineTo(cx - size * 0.38, cy + size * 0.38);
      ctx.stroke();
      this.drawChainLinks(ctx, cx, cy, size, 1);
      this.drawChainLinks(ctx, cx, cy, size, -1);
      this.drawLockCap(ctx, cx, cy, size);
    } else if (type === 'marshmallow') {
      ctx.fillStyle = '#FFD2E2';
      this.roundRect(ctx, cx - size / 2, cy - size / 2, size, size, 16);
      ctx.fill();
      ctx.strokeStyle = 'rgba(198, 82, 128, 0.88)';
      ctx.lineWidth = Math.max(3, size * 0.065);
      ctx.stroke();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.94)';
      ctx.lineWidth = Math.max(2, size * 0.060);
      ctx.beginPath();
      ctx.moveTo(cx - size * 0.38, cy - size * 0.18);
      ctx.lineTo(cx + size * 0.14, cy - size * 0.44);
      ctx.moveTo(cx - size * 0.38, cy + size * 0.08);
      ctx.lineTo(cx + size * 0.34, cy - size * 0.28);
      ctx.moveTo(cx - size * 0.12, cy + size * 0.42);
      ctx.lineTo(cx + size * 0.40, cy + size * 0.14);
      ctx.stroke();
      ctx.fillStyle = 'rgba(205, 79, 126, 0.34)';
      ctx.beginPath();
      ctx.arc(cx + size * 0.22, cy + size * 0.20, size * 0.055, 0, Math.PI * 2);
      ctx.arc(cx - size * 0.20, cy - size * 0.18, size * 0.040, 0, Math.PI * 2);
      ctx.fill();
      this.drawMarshmallowSwirl(ctx, cx, cy, size);
    } else if (type === 'portal') {
      ctx.fillStyle = 'rgba(124, 107, 255, 0.26)';
      ctx.beginPath();
      ctx.arc(cx, cy, size * 0.48, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(57, 217, 255, 0.98)';
      ctx.lineWidth = Math.max(5, size * 0.13);
      ctx.beginPath();
      ctx.arc(cx, cy, size * 0.42, 0, Math.PI * 2);
      ctx.stroke();
      ctx.strokeStyle = 'rgba(124, 107, 255, 0.98)';
      ctx.lineWidth = Math.max(3, size * 0.075);
      ctx.beginPath();
      ctx.arc(cx, cy, size * 0.27, Math.PI * 0.10, Math.PI * 1.72);
      ctx.stroke();
      ctx.fillStyle = 'rgba(255, 255, 255, 0.82)';
      ctx.beginPath();
      ctx.arc(cx + size * 0.16, cy - size * 0.18, size * 0.055, 0, Math.PI * 2);
      ctx.fill();
      this.drawPortalGlyph(ctx, cx, cy, size);
    } else if (type === 'hole') {
      ctx.fillStyle = 'rgba(71, 55, 64, 0.30)';
      this.roundRect(ctx, cx - size / 2, cy - size / 2, size, size, 14);
      ctx.fill();
      ctx.fillStyle = 'rgba(38, 33, 38, 0.36)';
      ctx.beginPath();
      ctx.arc(cx, cy, size * 0.30, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.70)';
      ctx.lineWidth = Math.max(2, size * 0.055);
      ctx.stroke();
      ctx.strokeStyle = 'rgba(255, 226, 175, 0.78)';
      ctx.lineWidth = Math.max(1, size * 0.032);
      ctx.beginPath();
      ctx.arc(cx, cy, size * 0.36, Math.PI * 0.16, Math.PI * 1.84);
      ctx.stroke();
    }
    ctx.restore();
  }

  private shouldDrawBlockerUnderPiece(type: string): boolean {
    return type === 'hole' || type === 'marshmallow';
  }

  private drawSpecialBadge(ctx: GameCanvasContext, cx: number, cy: number, size: number, fill: string, stroke: string): void {
    ctx.fillStyle = 'rgba(92, 58, 74, 0.18)';
    ctx.beginPath();
    ctx.arc(cx, cy + size * 0.04, size * 0.42, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.34)';
    ctx.beginPath();
    ctx.arc(cx, cy, size * 0.43, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = fill;
    ctx.strokeStyle = stroke;
    ctx.lineWidth = Math.max(3, size * 0.070);
    ctx.beginPath();
    ctx.arc(cx, cy, size * 0.35, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }

  private drawBeamBadge(ctx: GameCanvasContext, cx: number, cy: number, size: number, horizontal: boolean): void {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.42)';
    if (horizontal) {
      this.roundRect(ctx, cx - size * 0.38, cy - size * 0.11, size * 0.76, size * 0.22, 8);
    } else {
      this.roundRect(ctx, cx - size * 0.11, cy - size * 0.38, size * 0.22, size * 0.76, 8);
    }
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.68)';
    ctx.lineWidth = Math.max(1, size * 0.032);
    ctx.stroke();
  }

  private drawArrowHeadDots(ctx: GameCanvasContext, cx: number, cy: number, size: number, horizontal: boolean): void {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.96)';
    ctx.beginPath();
    if (horizontal) {
      ctx.arc(cx - size * 0.43, cy, size * 0.045, 0, Math.PI * 2);
      ctx.arc(cx + size * 0.43, cy, size * 0.045, 0, Math.PI * 2);
    } else {
      ctx.arc(cx, cy - size * 0.43, size * 0.045, 0, Math.PI * 2);
      ctx.arc(cx, cy + size * 0.43, size * 0.045, 0, Math.PI * 2);
    }
    ctx.fill();
  }

  private drawBombGlyph(ctx: GameCanvasContext, cx: number, cy: number, size: number): void {
    ctx.fillStyle = 'rgba(117, 70, 24, 0.94)';
    ctx.beginPath();
    ctx.arc(cx - size * 0.02, cy + size * 0.03, size * 0.20, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#FFF4A6';
    ctx.lineWidth = Math.max(2, size * 0.050);
    ctx.stroke();
    ctx.strokeStyle = 'rgba(117, 70, 24, 0.92)';
    ctx.lineWidth = Math.max(2, size * 0.055);
    ctx.beginPath();
    ctx.moveTo(cx + size * 0.10, cy - size * 0.11);
    ctx.lineTo(cx + size * 0.24, cy - size * 0.24);
    ctx.stroke();
    ctx.fillStyle = '#FFF8C8';
    ctx.beginPath();
    this.starPath(ctx, cx + size * 0.30, cy - size * 0.30, size * 0.13, size * 0.05, 5);
    ctx.fill();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.78)';
    ctx.beginPath();
    ctx.arc(cx - size * 0.09, cy - size * 0.04, size * 0.050, 0, Math.PI * 2);
    ctx.fill();
  }

  private drawRainbowCore(ctx: GameCanvasContext, cx: number, cy: number, size: number): void {
    const colors: string[] = ['#F27A91', '#F39967', '#EFC957', '#76D37B', '#69B8EA', '#B487EF'];
    for (let index = 0; index < colors.length; index++) {
      ctx.strokeStyle = colors[index];
      ctx.lineWidth = Math.max(2, size * 0.038);
      ctx.beginPath();
      ctx.arc(cx, cy + size * 0.02, size * (0.08 + index * 0.030), Math.PI * 1.04, Math.PI * 1.96);
      ctx.stroke();
    }
    ctx.fillStyle = 'rgba(255, 255, 255, 0.94)';
    ctx.beginPath();
    ctx.arc(cx, cy + size * 0.11, size * 0.10, 0, Math.PI * 2);
    ctx.fill();
    this.drawSmallSpark(ctx, cx + size * 0.18, cy - size * 0.18, size * 0.070);
  }

  private drawIceSymbol(ctx: GameCanvasContext, cx: number, cy: number, size: number, hp: number): void {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.94)';
    ctx.lineWidth = Math.max(1, size * 0.030);
    ctx.beginPath();
    ctx.moveTo(cx - size * 0.36, cy - size * 0.34);
    ctx.lineTo(cx + size * 0.36, cy + size * 0.34);
    ctx.moveTo(cx + size * 0.32, cy - size * 0.38);
    ctx.lineTo(cx - size * 0.30, cy + size * 0.34);
    ctx.stroke();
    ctx.strokeStyle = hp > 1 ? 'rgba(15, 118, 180, 0.78)' : 'rgba(28, 160, 210, 0.72)';
    ctx.lineWidth = Math.max(2, size * 0.045);
    ctx.beginPath();
    ctx.moveTo(cx, cy - size * 0.30);
    ctx.lineTo(cx, cy + size * 0.30);
    ctx.moveTo(cx - size * 0.26, cy - size * 0.15);
    ctx.lineTo(cx + size * 0.26, cy + size * 0.15);
    ctx.moveTo(cx + size * 0.26, cy - size * 0.15);
    ctx.lineTo(cx - size * 0.26, cy + size * 0.15);
    ctx.stroke();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.90)';
    ctx.beginPath();
    ctx.arc(cx, cy, size * 0.045, 0, Math.PI * 2);
    ctx.fill();
  }

  private drawMarshmallowSwirl(ctx: GameCanvasContext, cx: number, cy: number, size: number): void {
    ctx.strokeStyle = 'rgba(169, 65, 114, 0.54)';
    ctx.lineWidth = Math.max(2, size * 0.045);
    ctx.beginPath();
    ctx.arc(cx, cy, size * 0.24, Math.PI * 0.16, Math.PI * 1.72);
    ctx.stroke();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.92)';
    ctx.lineWidth = Math.max(1, size * 0.030);
    ctx.beginPath();
    ctx.arc(cx, cy, size * 0.16, Math.PI * 0.26, Math.PI * 1.60);
    ctx.stroke();
  }

  private drawPortalGlyph(ctx: GameCanvasContext, cx: number, cy: number, size: number): void {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.84)';
    ctx.lineWidth = Math.max(2, size * 0.052);
    ctx.beginPath();
    ctx.arc(cx, cy, size * 0.19, Math.PI * 0.10, Math.PI * 1.70);
    ctx.stroke();
    ctx.strokeStyle = 'rgba(57, 217, 255, 0.92)';
    ctx.lineWidth = Math.max(1, size * 0.034);
    ctx.beginPath();
    ctx.arc(cx, cy, size * 0.33, Math.PI * 1.12, Math.PI * 2.62);
    ctx.stroke();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.88)';
    ctx.beginPath();
    ctx.moveTo(cx + size * 0.26, cy - size * 0.02);
    ctx.lineTo(cx + size * 0.12, cy - size * 0.10);
    ctx.lineTo(cx + size * 0.17, cy + size * 0.06);
    ctx.closePath();
    ctx.fill();
  }

  private drawChainLinks(ctx: GameCanvasContext, cx: number, cy: number, size: number, slope: number): void {
    const rotation = slope > 0 ? Math.PI * 0.25 : -Math.PI * 0.25;
    for (let index = -1; index <= 1; index++) {
      const linkX = cx + index * size * 0.24;
      const linkY = cy + slope * index * size * 0.24;
      ctx.strokeStyle = 'rgba(58, 40, 28, 0.96)';
      ctx.lineWidth = Math.max(3, size * 0.075);
      ctx.beginPath();
      ctx.ellipse(linkX, linkY, size * 0.16, size * 0.075, rotation, 0, Math.PI * 2);
      ctx.stroke();
      ctx.strokeStyle = '#FFE49B';
      ctx.lineWidth = Math.max(1, size * 0.030);
      ctx.beginPath();
      ctx.ellipse(linkX, linkY, size * 0.10, size * 0.045, rotation, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  private drawLockCap(ctx: GameCanvasContext, cx: number, cy: number, size: number): void {
    ctx.fillStyle = '#F6C15A';
    this.roundRect(ctx, cx - size * 0.16, cy - size * 0.02, size * 0.32, size * 0.25, 6);
    ctx.fill();
    ctx.strokeStyle = 'rgba(70, 46, 28, 0.92)';
    ctx.lineWidth = Math.max(2, size * 0.045);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx, cy - size * 0.02, size * 0.13, Math.PI, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = 'rgba(82, 48, 30, 0.88)';
    ctx.beginPath();
    ctx.arc(cx, cy + size * 0.09, size * 0.035, 0, Math.PI * 2);
    ctx.fill();
  }

  private rowArrowPath(ctx: GameCanvasContext, cx: number, cy: number, size: number): void {
    ctx.moveTo(cx - size * 0.40, cy);
    ctx.lineTo(cx + size * 0.40, cy);
    ctx.moveTo(cx - size * 0.40, cy);
    ctx.lineTo(cx - size * 0.22, cy - size * 0.15);
    ctx.moveTo(cx - size * 0.40, cy);
    ctx.lineTo(cx - size * 0.22, cy + size * 0.15);
    ctx.moveTo(cx + size * 0.40, cy);
    ctx.lineTo(cx + size * 0.22, cy - size * 0.15);
    ctx.moveTo(cx + size * 0.40, cy);
    ctx.lineTo(cx + size * 0.22, cy + size * 0.15);
  }

  private colArrowPath(ctx: GameCanvasContext, cx: number, cy: number, size: number): void {
    ctx.moveTo(cx, cy - size * 0.40);
    ctx.lineTo(cx, cy + size * 0.40);
    ctx.moveTo(cx, cy - size * 0.40);
    ctx.lineTo(cx - size * 0.15, cy - size * 0.22);
    ctx.moveTo(cx, cy - size * 0.40);
    ctx.lineTo(cx + size * 0.15, cy - size * 0.22);
    ctx.moveTo(cx, cy + size * 0.40);
    ctx.lineTo(cx - size * 0.15, cy + size * 0.22);
    ctx.moveTo(cx, cy + size * 0.40);
    ctx.lineTo(cx + size * 0.15, cy + size * 0.22);
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
