import { Board, DEFAULT_PIECES, Piece, PieceType, Tile } from './Types';

export class SeededRandom {
  private seed: number;

  constructor(seed: number) {
    this.seed = seed || 1;
  }

  next(): number {
    this.seed = (this.seed * 1664525 + 1013904223) >>> 0;
    return this.seed / 0x100000000;
  }

  pick<T>(items: T[]): T {
    return items[Math.floor(this.next() * items.length)];
  }
}

export interface BoardFactoryOptions {
  rows: number;
  cols: number;
  seed: number;
  pieceTypes?: PieceType[];
}

export class BoardFactory {
  static create(options: BoardFactoryOptions): Board {
    const random = new SeededRandom(options.seed);
    const pieceTypes = options.pieceTypes && options.pieceTypes.length > 0 ? options.pieceTypes : DEFAULT_PIECES;
    const tiles: Tile[][] = [];
    let idCounter = 0;

    for (let row = 0; row < options.rows; row++) {
      const line: Tile[] = [];
      tiles.push(line);
      for (let col = 0; col < options.cols; col++) {
        const type = BoardFactory.pickWithoutImmediateMatch(row, col, tiles, pieceTypes, random);
        const piece: Piece = {
          id: `p_${idCounter++}`,
          type,
          special: 'none'
        };
        line.push({ row, col, piece });
      }
    }

    return { rows: options.rows, cols: options.cols, tiles };
  }

  private static pickWithoutImmediateMatch(
    row: number,
    col: number,
    tiles: Tile[][],
    pieceTypes: PieceType[],
    random: SeededRandom
  ): PieceType {
    const firstIndex = Math.floor(random.next() * pieceTypes.length);
    for (let offset = 0; offset < pieceTypes.length; offset++) {
      const type = pieceTypes[(firstIndex + offset) % pieceTypes.length];
      const horizontalMatch =
        col >= 2 &&
        tiles[row][col - 1].piece?.type === type &&
        tiles[row][col - 2].piece?.type === type;
      const verticalMatch =
        row >= 2 &&
        tiles[row - 1][col].piece?.type === type &&
        tiles[row - 2][col].piece?.type === type;
      if (!horizontalMatch && !verticalMatch) {
        return type;
      }
    }
    return pieceTypes[firstIndex];
  }
}
