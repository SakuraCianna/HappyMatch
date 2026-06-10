import { Board, Piece, PieceType, SpecialType } from '../core/Types';
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
  canvasFill: string;
  fill: string;
  innerFill: string;
  stroke: string;
  motif: string;
  pattern: string;
}

type PieceEffectLookup = (PieceRenderEffect | undefined)[];

interface CachedImageBitmap {
  close(): void;
}

interface StaticLayerCache {
  key: string;
  bitmap: CachedImageBitmap;
}

interface PieceBitmapCacheEntry {
  bitmap: CachedImageBitmap;
  canvasSize: number;
  renderSize: number;
}

const DEFAULT_BOARD_THEME: BoardRenderTheme = {
  canvasFill: '#FFF8E7',
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
  drawImage?(image: CachedImageBitmap, dx: number, dy: number, dw: number, dh: number): void;
}

declare class OffscreenCanvasRenderingContext2D {
  fillStyle: string;
  strokeStyle: string;
  lineWidth: number;
  font: string;
  textAlign: string;
  textBaseline: string;
  globalAlpha: number;
  constructor(width: number, height: number);
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
  transferToImageBitmap(): CachedImageBitmap;
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

const PREWARM_SPECIALS: SpecialType[] = ['none', 'row_clear', 'col_clear', 'bomb', 'rainbow'];

export class CanvasRenderer {
  private staticLayerCache?: StaticLayerCache;
  private pieceBitmapCache: Map<string, PieceBitmapCacheEntry> = new Map();
  private maxPieceBitmapCacheEntries: number = 96;
  private bitmapCacheAvailable: boolean = true;

  clearCache(): void {
    this.releaseStaticLayerCache();
  }

  dispose(): void {
    this.releaseStaticLayerCache();
    this.releasePieceBitmapCache();
  }

  warmPieceCache(pieceTypes: PieceType[], baseSize: number): void {
    if (!this.bitmapCacheAvailable) {
      return;
    }
    for (let typeIndex = 0; typeIndex < pieceTypes.length; typeIndex++) {
      for (let specialIndex = 0; specialIndex < PREWARM_SPECIALS.length; specialIndex++) {
        const special = PREWARM_SPECIALS[specialIndex];
        const piece: Piece = {
          id: `warm_${pieceTypes[typeIndex]}_${special}`,
          type: pieceTypes[typeIndex],
          special
        };
        this.ensurePieceBitmap(piece, baseSize);
      }
    }
  }

  drawGuidePiece(ctx: GameCanvasContext, piece: Piece, width: number, height: number): void {
    ctx.clearRect(0, 0, width, height);
    const size = Math.min(width, height) * 0.72;
    this.drawPiece(ctx, piece, width / 2, height / 2, size, 1);
  }

  drawGuideBlocker(ctx: GameCanvasContext, type: string, width: number, height: number, hp: number = 1): void {
    ctx.clearRect(0, 0, width, height);
    this.drawBlocker(ctx, type, width / 2, height / 2, Math.min(width, height) * 0.74, hp);
  }

  drawGuideTool(ctx: GameCanvasContext, type: string, width: number, height: number): void {
    ctx.clearRect(0, 0, width, height);
    const cx = width / 2;
    const cy = height / 2;
    const size = Math.min(width, height) * 0.76;
    ctx.save();
    ctx.fillStyle = this.toolFill(type);
    ctx.strokeStyle = this.toolStroke(type);
    ctx.lineWidth = Math.max(2, size * 0.065);
    ctx.beginPath();
    ctx.arc(cx, cy, size * 0.50, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    if (type === 'shuffle') {
      this.drawShuffleTool(ctx, cx, cy, size);
    } else if (type === 'hammer') {
      this.drawHammerTool(ctx, cx, cy, size);
    } else if (type === 'brush') {
      this.drawBrushTool(ctx, cx, cy, size);
    } else if (type === 'add_moves') {
      this.drawAddMovesTool(ctx, cx, cy, size);
    }
    ctx.restore();
  }

  draw(ctx: GameCanvasContext, board: Board, options: RenderOptions): void {
    const layout = options.layout ?? BoardLayout.compute(board, options.width, options.height);
    const effectLookup = options.animation?.pieceEffects ?
      this.buildEffectLookup(options.animation.pieceEffects, board.cols) : undefined;
    const fastMode = options.animation?.fastMode === true;
    const fastStaticMode = options.animation?.fastStaticMode === true;
    const theme = options.theme ?? DEFAULT_BOARD_THEME;

    if (options.animation?.pieceEffects && options.animation.pieceEffects.length > 0 &&
      this.drawCachedAnimationFrame(ctx, board, options, layout, theme, options.animation.pieceEffects, fastMode)) {
      return;
    }

    this.paintCanvasBase(ctx, options.width, options.height, theme.canvasFill);
    this.drawBoardBackground(
      ctx,
      layout.offsetX,
      layout.offsetY,
      layout.boardWidth,
      layout.boardHeight,
      theme,
      fastMode || fastStaticMode
    );

    this.drawBoardTiles(ctx, board, layout, effectLookup, fastMode, fastStaticMode, false);
  }

  private drawCachedAnimationFrame(
    ctx: GameCanvasContext,
    board: Board,
    options: RenderOptions,
    layout: BoardLayoutResult,
    theme: BoardRenderTheme,
    effects: PieceRenderEffect[],
    fastMode: boolean
  ): boolean {
    if (!ctx.drawImage) {
      return false;
    }
    const cache = this.ensureStaticLayerCache(board, options, layout, theme, effects);
    if (!cache) {
      return false;
    }
    ctx.drawImage(cache.bitmap, 0, 0, options.width, options.height);
    this.drawAnimatedPieces(ctx, board, layout, effects, fastMode);
    return true;
  }

  private ensureStaticLayerCache(
    board: Board,
    options: RenderOptions,
    layout: BoardLayoutResult,
    theme: BoardRenderTheme,
    effects: PieceRenderEffect[]
  ): StaticLayerCache | undefined {
    if (!this.bitmapCacheAvailable) {
      return undefined;
    }
    const cacheKey = this.staticLayerKey(board, options, layout, theme, effects);
    if (this.staticLayerCache && this.staticLayerCache.key === cacheKey) {
      return this.staticLayerCache;
    }
    try {
      const offscreen = new OffscreenCanvasRenderingContext2D(
        Math.max(1, Math.ceil(options.width)),
        Math.max(1, Math.ceil(options.height))
      );
      const offscreenContext = offscreen as GameCanvasContext;
      const effectLookup = this.buildEffectLookup(effects, board.cols);
      this.paintCanvasBase(offscreenContext, options.width, options.height, theme.canvasFill);
      this.drawBoardBackground(
        offscreenContext,
        layout.offsetX,
        layout.offsetY,
        layout.boardWidth,
        layout.boardHeight,
        theme,
        false
      );
      this.drawBoardTiles(offscreenContext, board, layout, effectLookup, false, false, true);
      const nextCache: StaticLayerCache = {
        key: cacheKey,
        bitmap: offscreen.transferToImageBitmap()
      };
      this.releaseStaticLayerCache();
      this.staticLayerCache = nextCache;
      return nextCache;
    } catch (_error) {
      this.bitmapCacheAvailable = false;
      this.releaseStaticLayerCache();
      return undefined;
    }
  }

  private drawBoardTiles(
    ctx: GameCanvasContext,
    board: Board,
    layout: BoardLayoutResult,
    effectLookup: PieceEffectLookup | undefined,
    fastMode: boolean,
    fastStaticMode: boolean,
    skipAnimatedPieces: boolean
  ): void {
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
          if (!skipAnimatedPieces || !effect) {
            const offsetX = effect ? effect.offsetX : 0;
            const offsetY = effect ? effect.offsetY : 0;
            const scale = effect ? effect.scale : 1;
            const opacity = effect ? effect.opacity : 1;
            if (fastMode || (fastStaticMode && !effect)) {
              this.drawFastPiece(ctx, tile.piece, centerX + offsetX, centerY + offsetY, layout.tileSize * 0.70 * scale, opacity);
            } else {
              this.drawPieceWithCache(ctx, tile.piece, centerX + offsetX, centerY + offsetY, layout.tileSize * 0.70 * scale, opacity);
            }
          }
        }
        if (tile.blocker && !this.shouldDrawBlockerUnderPiece(tile.blocker.type)) {
          this.drawBlocker(ctx, tile.blocker.type, centerX, centerY, layout.tileSize * 0.86, tile.blocker.hp);
        }
      }
    }
  }

  private drawAnimatedPieces(
    ctx: GameCanvasContext,
    board: Board,
    layout: BoardLayoutResult,
    effects: PieceRenderEffect[],
    fastMode: boolean
  ): void {
    for (let index = 0; index < effects.length; index++) {
      const effect = effects[index];
      if (effect.row < 0 || effect.row >= board.rows || effect.col < 0 || effect.col >= board.cols) {
        continue;
      }
      const piece = board.tiles[effect.row][effect.col].piece;
      if (!piece) {
        continue;
      }
      const centerX = layout.offsetX + effect.col * layout.tileSize + layout.tileSize / 2;
      const centerY = layout.offsetY + effect.row * layout.tileSize + layout.tileSize / 2;
      const size = layout.tileSize * 0.70 * effect.scale;
      if (fastMode) {
        this.drawFastPiece(ctx, piece, centerX + effect.offsetX, centerY + effect.offsetY, size, effect.opacity);
      } else {
        this.drawPieceWithCache(ctx, piece, centerX + effect.offsetX, centerY + effect.offsetY, size, effect.opacity);
      }
    }
  }

  private staticLayerKey(
    board: Board,
    options: RenderOptions,
    layout: BoardLayoutResult,
    theme: BoardRenderTheme,
    effects: PieceRenderEffect[]
  ): string {
    return [
      `${options.width}x${options.height}`,
      `${layout.offsetX},${layout.offsetY},${layout.boardWidth},${layout.boardHeight},${layout.tileSize}`,
      `${theme.canvasFill}|${theme.fill}|${theme.innerFill}|${theme.stroke}|${theme.motif}|${theme.pattern}`,
      this.boardVisualKey(board),
      this.effectPositionKey(effects)
    ].join('#');
  }

  private boardVisualKey(board: Board): string {
    const parts: string[] = [`${board.rows}x${board.cols}`];
    for (let row = 0; row < board.rows; row++) {
      for (let col = 0; col < board.cols; col++) {
        const tile = board.tiles[row][col];
        const piece = tile.piece ? `${tile.piece.id}:${tile.piece.type}:${tile.piece.special}` : '-';
        const blocker = tile.blocker ?
          `${tile.blocker.type}:${tile.blocker.hp}:${tile.blocker.portalId ?? ''}:${tile.blocker.targetPortalId ?? ''}` :
          '-';
        parts.push(`${piece}/${blocker}`);
      }
    }
    return parts.join('|');
  }

  private effectPositionKey(effects: PieceRenderEffect[]): string {
    const keys: string[] = [];
    for (let index = 0; index < effects.length; index++) {
      keys.push(`${effects[index].row}_${effects[index].col}`);
    }
    keys.sort();
    return keys.join(',');
  }

  private releaseStaticLayerCache(): void {
    if (!this.staticLayerCache) {
      return;
    }
    this.staticLayerCache.bitmap.close();
    this.staticLayerCache = undefined;
  }

  private releasePieceBitmapCache(): void {
    this.pieceBitmapCache.forEach((entry: PieceBitmapCacheEntry) => {
      entry.bitmap.close();
    });
    this.pieceBitmapCache.clear();
  }

  private paintCanvasBase(ctx: GameCanvasContext, width: number, height: number, fill: string): void {
    ctx.save();
    ctx.globalAlpha = 1;
    ctx.fillStyle = fill;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(width, 0);
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
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
      this.drawPieceShape(ctx, piece.type, cx, cy + size * 0.05, size * 1.01, 'rgba(92, 58, 74, 0.16)', 'rgba(92, 58, 74, 0.00)');
      this.drawPieceShape(ctx, piece.type, cx, cy, size, palette.base, palette.dark);
      this.drawPieceSurface(ctx, piece.type, cx, cy, size, palette);
    }

    ctx.fillStyle = 'rgba(255, 255, 255, 0.24)';
    ctx.beginPath();
    ctx.arc(cx - size * 0.19, cy - size * 0.20, size * 0.065, 0, Math.PI * 2);
    ctx.fill();

    this.drawPieceIdentity(ctx, piece, cx, cy, size);
    ctx.restore();
  }

  private drawPieceWithCache(ctx: GameCanvasContext, piece: Piece, cx: number, cy: number, size: number, opacity: number): void {
    if (opacity <= 0.01 || size <= 1) {
      return;
    }
    if (!ctx.drawImage) {
      this.drawPiece(ctx, piece, cx, cy, size, opacity);
      return;
    }
    const entry = this.ensurePieceBitmap(piece, size);
    if (!entry) {
      this.drawPiece(ctx, piece, cx, cy, size, opacity);
      return;
    }
    const scale = size / entry.renderSize;
    const drawSize = entry.canvasSize * scale;
    ctx.save();
    ctx.globalAlpha = opacity;
    ctx.drawImage(entry.bitmap, cx - drawSize / 2, cy - drawSize / 2, drawSize, drawSize);
    ctx.restore();
  }

  private ensurePieceBitmap(piece: Piece, size: number): PieceBitmapCacheEntry | undefined {
    if (!this.bitmapCacheAvailable) {
      return undefined;
    }
    const renderSize = this.pieceBitmapRenderSize(size);
    const key = this.pieceBitmapKey(piece, renderSize);
    const cached = this.pieceBitmapCache.get(key);
    if (cached) {
      return cached;
    }
    try {
      if (this.pieceBitmapCache.size >= this.maxPieceBitmapCacheEntries) {
        this.releasePieceBitmapCache();
      }
      const padding = Math.ceil(renderSize * 0.44);
      const canvasSize = Math.max(1, renderSize + padding * 2);
      const offscreen = new OffscreenCanvasRenderingContext2D(canvasSize, canvasSize);
      const offscreenContext = offscreen as GameCanvasContext;
      offscreenContext.clearRect(0, 0, canvasSize, canvasSize);
      this.drawPiece(offscreenContext, piece, canvasSize / 2, canvasSize / 2, renderSize, 1);
      const entry: PieceBitmapCacheEntry = {
        bitmap: offscreen.transferToImageBitmap(),
        canvasSize,
        renderSize
      };
      this.pieceBitmapCache.set(key, entry);
      return entry;
    } catch (_error) {
      this.bitmapCacheAvailable = false;
      this.releasePieceBitmapCache();
      return undefined;
    }
  }

  private pieceBitmapRenderSize(size: number): number {
    const rounded = Math.max(16, Math.round(size));
    return Math.max(16, Math.round(rounded / 4) * 4);
  }

  private pieceBitmapKey(piece: Piece, renderSize: number): string {
    return `piece_v3_${piece.type}_${piece.special}_${renderSize}`;
  }

  private drawFastPiece(ctx: GameCanvasContext, piece: Piece, cx: number, cy: number, size: number, opacity: number): void {
    if (opacity <= 0.01 || size <= 1) {
      return;
    }
    const palette = PALETTE[piece.type];
    ctx.save();
    ctx.globalAlpha = opacity;
    if (piece.special === 'rainbow') {
      ctx.fillStyle = '#F9F7FF';
      ctx.strokeStyle = 'rgba(83, 67, 172, 0.72)';
      ctx.lineWidth = Math.max(2, size * 0.060);
      ctx.beginPath();
      ctx.arc(cx, cy, size * 0.50, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    } else {
      this.drawPieceShape(ctx, piece.type, cx, cy, size, palette.base, palette.dark);
    }
    if (piece.special !== 'none') {
      ctx.strokeStyle = this.specialAuraStroke(piece.special);
      ctx.lineWidth = Math.max(2, size * 0.055);
      ctx.beginPath();
      ctx.arc(cx, cy, size * 0.58, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();
  }

  private drawPieceIdentity(ctx: GameCanvasContext, piece: Piece, cx: number, cy: number, size: number): void {
    if (piece.special === 'none') {
      this.drawPieceMark(ctx, piece.type, cx, cy, size);
      return;
    }
    if (piece.special !== 'rainbow') {
      this.drawPieceMark(ctx, piece.type, cx, cy, size, true);
      this.drawSpecialMark(ctx, piece, cx, cy, size);
      return;
    }
    this.drawSpecialMark(ctx, piece, cx, cy, size);
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

  private drawPieceMark(ctx: GameCanvasContext, type: PieceType, cx: number, cy: number, size: number, subtle: boolean = false): void {
    ctx.save();
    ctx.fillStyle = subtle ? 'rgba(255, 255, 255, 0.44)' : 'rgba(255, 255, 255, 0.58)';
    ctx.strokeStyle = subtle ? 'rgba(255, 255, 255, 0.54)' : 'rgba(255, 255, 255, 0.66)';
    ctx.lineWidth = Math.max(1, size * (subtle ? 0.026 : 0.035));
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
      this.drawDirectionalBadge(ctx, cx, cy, size, true);
      this.drawSpecialEdgeCaps(ctx, cx, cy, size, true, '#FF4F9A');
      ctx.strokeStyle = 'rgba(112, 31, 75, 0.95)';
      ctx.lineWidth = Math.max(5, size * 0.13);
      ctx.beginPath();
      this.rowArrowPath(ctx, cx, cy, size);
      ctx.stroke();
      ctx.strokeStyle = '#FFF8C7';
      ctx.lineWidth = Math.max(3, size * 0.066);
      ctx.beginPath();
      this.rowArrowPath(ctx, cx, cy, size);
      ctx.stroke();
      this.drawArrowHeadDots(ctx, cx, cy, size, true);
    } else if (piece.special === 'col_clear') {
      this.drawDirectionalBadge(ctx, cx, cy, size, false);
      this.drawSpecialEdgeCaps(ctx, cx, cy, size, false, '#38CFFF');
      ctx.strokeStyle = 'rgba(43, 62, 162, 0.95)';
      ctx.lineWidth = Math.max(5, size * 0.13);
      ctx.beginPath();
      this.colArrowPath(ctx, cx, cy, size);
      ctx.stroke();
      ctx.strokeStyle = '#F5FFFF';
      ctx.lineWidth = Math.max(3, size * 0.066);
      ctx.beginPath();
      this.colArrowPath(ctx, cx, cy, size);
      ctx.stroke();
      this.drawArrowHeadDots(ctx, cx, cy, size, false);
    } else if (piece.special === 'bomb') {
      this.drawExplosionBadge(ctx, cx, cy, size);
      this.drawBombGlyph(ctx, cx, cy, size * 0.92);
    } else if (piece.special === 'rainbow') {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.86)';
      ctx.lineWidth = Math.max(2, size * 0.050);
      ctx.beginPath();
      ctx.arc(cx, cy, size * 0.38, 0, Math.PI * 2);
      ctx.stroke();
      this.drawRainbowCore(ctx, cx, cy, size * 0.88);
    }
    ctx.restore();
  }

  private drawSpecialAura(ctx: GameCanvasContext, piece: Piece, cx: number, cy: number, size: number): void {
    if (piece.special === 'none') {
      return;
    }
    ctx.save();
    ctx.fillStyle = this.specialAuraFill(piece.special);
    ctx.beginPath();
    ctx.arc(cx, cy, size * 0.64, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = this.specialAuraStroke(piece.special);
    ctx.lineWidth = Math.max(3, size * 0.075);
    ctx.beginPath();
    ctx.arc(cx, cy, size * 0.61, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  private specialAuraFill(special: string): string {
    if (special === 'row_clear') {
      return 'rgba(255, 103, 152, 0.22)';
    }
    if (special === 'col_clear') {
      return 'rgba(179, 94, 255, 0.22)';
    }
    if (special === 'bomb') {
      return 'rgba(255, 137, 64, 0.24)';
    }
    if (special === 'rainbow') {
      return 'rgba(255, 112, 205, 0.22)';
    }
    return 'rgba(255, 132, 176, 0.22)';
  }

  private specialAuraStroke(special: string): string {
    if (special === 'row_clear') {
      return 'rgba(255, 103, 152, 0.82)';
    }
    if (special === 'col_clear') {
      return 'rgba(179, 94, 255, 0.82)';
    }
    if (special === 'bomb') {
      return 'rgba(255, 137, 64, 0.84)';
    }
    if (special === 'rainbow') {
      return 'rgba(255, 112, 205, 0.80)';
    }
    return 'rgba(255, 132, 176, 0.80)';
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

  private drawDirectionalBadge(ctx: GameCanvasContext, cx: number, cy: number, size: number, horizontal: boolean): void {
    ctx.fillStyle = horizontal ? 'rgba(255, 82, 154, 0.48)' : 'rgba(54, 207, 255, 0.48)';
    if (horizontal) {
      this.roundRect(ctx, cx - size * 0.48, cy - size * 0.16, size * 0.96, size * 0.32, 10);
    } else {
      this.roundRect(ctx, cx - size * 0.16, cy - size * 0.48, size * 0.32, size * 0.96, 10);
    }
    ctx.fill();
    ctx.strokeStyle = horizontal ? 'rgba(255, 246, 143, 0.96)' : 'rgba(255, 255, 255, 0.96)';
    ctx.lineWidth = Math.max(2, size * 0.050);
    ctx.stroke();
  }

  private drawSpecialEdgeCaps(ctx: GameCanvasContext, cx: number, cy: number, size: number, horizontal: boolean, fill: string): void {
    ctx.fillStyle = fill;
    ctx.strokeStyle = '#FFF8C7';
    ctx.lineWidth = Math.max(2, size * 0.045);
    ctx.beginPath();
    if (horizontal) {
      ctx.arc(cx - size * 0.51, cy, size * 0.12, 0, Math.PI * 2);
      ctx.arc(cx + size * 0.51, cy, size * 0.12, 0, Math.PI * 2);
    } else {
      ctx.arc(cx, cy - size * 0.51, size * 0.12, 0, Math.PI * 2);
      ctx.arc(cx, cy + size * 0.51, size * 0.12, 0, Math.PI * 2);
    }
    ctx.fill();
    ctx.stroke();
  }

  private drawExplosionBadge(ctx: GameCanvasContext, cx: number, cy: number, size: number): void {
    ctx.fillStyle = 'rgba(255, 203, 62, 0.92)';
    ctx.strokeStyle = 'rgba(184, 69, 24, 0.98)';
    ctx.lineWidth = Math.max(3, size * 0.070);
    ctx.beginPath();
    this.starPath(ctx, cx, cy, size * 0.55, size * 0.34, 12);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = 'rgba(255, 246, 150, 0.96)';
    ctx.beginPath();
    this.starPath(ctx, cx, cy, size * 0.35, size * 0.22, 12);
    ctx.fill();
    ctx.strokeStyle = 'rgba(102, 43, 26, 0.52)';
    ctx.lineWidth = Math.max(1, size * 0.032);
    for (let index = 0; index < 8; index++) {
      const angle = index * Math.PI / 4;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(angle) * size * 0.40, cy + Math.sin(angle) * size * 0.40);
      ctx.lineTo(cx + Math.cos(angle) * size * 0.52, cy + Math.sin(angle) * size * 0.52);
      ctx.stroke();
    }
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
    ctx.fillStyle = 'rgba(58, 45, 43, 0.98)';
    ctx.beginPath();
    ctx.arc(cx - size * 0.03, cy + size * 0.08, size * 0.23, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#FFF0A8';
    ctx.lineWidth = Math.max(2, size * 0.046);
    ctx.stroke();

    ctx.fillStyle = '#FFF2AF';
    this.roundRect(ctx, cx + size * 0.06, cy - size * 0.16, size * 0.16, size * 0.10, 4);
    ctx.fill();
    ctx.strokeStyle = 'rgba(58, 45, 43, 0.92)';
    ctx.lineWidth = Math.max(1, size * 0.030);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(76, 48, 34, 0.96)';
    ctx.lineWidth = Math.max(2, size * 0.052);
    ctx.beginPath();
    ctx.moveTo(cx + size * 0.16, cy - size * 0.17);
    ctx.lineTo(cx + size * 0.26, cy - size * 0.26);
    ctx.lineTo(cx + size * 0.34, cy - size * 0.20);
    ctx.stroke();

    ctx.fillStyle = '#FFF6B0';
    ctx.beginPath();
    this.starPath(ctx, cx + size * 0.39, cy - size * 0.20, size * 0.12, size * 0.045, 6);
    ctx.fill();
    ctx.fillStyle = 'rgba(255, 132, 64, 0.92)';
    ctx.beginPath();
    ctx.arc(cx + size * 0.39, cy - size * 0.20, size * 0.042, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'rgba(255, 255, 255, 0.82)';
    ctx.beginPath();
    ctx.arc(cx - size * 0.12, cy - size * 0.01, size * 0.052, 0, Math.PI * 2);
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

  private drawShuffleTool(ctx: GameCanvasContext, cx: number, cy: number, size: number): void {
    ctx.strokeStyle = '#1C8DAD';
    ctx.lineWidth = Math.max(3, size * 0.085);
    ctx.beginPath();
    ctx.arc(cx, cy, size * 0.24, Math.PI * 0.02, Math.PI * 1.34);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx, cy, size * 0.24, Math.PI * 1.08, Math.PI * 2.40);
    ctx.stroke();
    ctx.fillStyle = '#F7FCFF';
    ctx.beginPath();
    ctx.moveTo(cx + size * 0.25, cy - size * 0.13);
    ctx.lineTo(cx + size * 0.40, cy - size * 0.12);
    ctx.lineTo(cx + size * 0.31, cy + size * 0.01);
    ctx.closePath();
    ctx.moveTo(cx - size * 0.25, cy + size * 0.13);
    ctx.lineTo(cx - size * 0.40, cy + size * 0.12);
    ctx.lineTo(cx - size * 0.31, cy - size * 0.01);
    ctx.closePath();
    ctx.fill();
  }

  private drawHammerTool(ctx: GameCanvasContext, cx: number, cy: number, size: number): void {
    ctx.strokeStyle = '#8B5A25';
    ctx.lineWidth = Math.max(5, size * 0.15);
    ctx.beginPath();
    ctx.moveTo(cx - size * 0.18, cy + size * 0.26);
    ctx.lineTo(cx + size * 0.12, cy - size * 0.05);
    ctx.stroke();
    ctx.fillStyle = '#FFE8A8';
    ctx.strokeStyle = '#A66E28';
    ctx.lineWidth = Math.max(2, size * 0.060);
    this.roundRect(ctx, cx - size * 0.02, cy - size * 0.30, size * 0.43, size * 0.18, 6);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#FFF7D6';
    this.roundRect(ctx, cx + size * 0.02, cy - size * 0.27, size * 0.15, size * 0.04, 3);
    ctx.fill();
  }

  private drawBrushTool(ctx: GameCanvasContext, cx: number, cy: number, size: number): void {
    ctx.strokeStyle = '#2E9B53';
    ctx.lineWidth = Math.max(5, size * 0.13);
    ctx.beginPath();
    ctx.moveTo(cx - size * 0.20, cy + size * 0.25);
    ctx.lineTo(cx + size * 0.12, cy - size * 0.06);
    ctx.stroke();
    ctx.fillStyle = '#F6FFF2';
    ctx.strokeStyle = '#2E9B53';
    ctx.lineWidth = Math.max(2, size * 0.055);
    this.roundRect(ctx, cx + size * 0.02, cy - size * 0.28, size * 0.25, size * 0.18, 7);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#75D37A';
    ctx.beginPath();
    ctx.arc(cx - size * 0.18, cy + size * 0.24, size * 0.075, 0, Math.PI * 2);
    ctx.fill();
  }

  private drawAddMovesTool(ctx: GameCanvasContext, cx: number, cy: number, size: number): void {
    ctx.fillStyle = '#FFFFFF';
    ctx.font = `${Math.floor(size * 0.35)}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('+3', cx, cy - size * 0.02);
    ctx.strokeStyle = '#FFF2B9';
    ctx.lineWidth = Math.max(2, size * 0.052);
    ctx.beginPath();
    ctx.arc(cx, cy, size * 0.32, Math.PI * 0.10, Math.PI * 1.64);
    ctx.stroke();
    ctx.fillStyle = '#FFF2B9';
    this.drawSmallSpark(ctx, cx + size * 0.28, cy - size * 0.24, size * 0.070);
  }

  private toolFill(type: string): string {
    if (type === 'shuffle') {
      return '#78D7F3';
    }
    if (type === 'hammer') {
      return '#F2B84B';
    }
    if (type === 'brush') {
      return '#76D37B';
    }
    if (type === 'add_moves') {
      return '#F7C36C';
    }
    return '#76D37B';
  }

  private toolStroke(type: string): string {
    if (type === 'shuffle') {
      return '#FFFFFF';
    }
    if (type === 'hammer') {
      return '#FFF4B8';
    }
    if (type === 'brush') {
      return '#EFFFF0';
    }
    if (type === 'add_moves') {
      return '#FFFFFF';
    }
    return '#FFFFFF';
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
