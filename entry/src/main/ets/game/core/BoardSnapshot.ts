import { Board, Blocker, Piece, Position, Tile } from './Types';

export function clonePiece(piece: Piece | undefined): Piece | undefined {
  if (!piece) {
    return undefined;
  }
  return {
    id: piece.id,
    type: piece.type,
    special: piece.special
  };
}

export function cloneBlocker(blocker: Blocker | undefined): Blocker | undefined {
  if (!blocker) {
    return undefined;
  }
  return {
    type: blocker.type,
    hp: blocker.hp,
    portalId: blocker.portalId,
    targetPortalId: blocker.targetPortalId
  };
}

export function cloneBoard(board: Board): Board {
  const tiles: Tile[][] = [];
  for (let row = 0; row < board.rows; row++) {
    const line: Tile[] = [];
    for (let col = 0; col < board.cols; col++) {
      const tile = board.tiles[row][col];
      line.push({
        row,
        col,
        piece: clonePiece(tile.piece),
        blocker: cloneBlocker(tile.blocker)
      });
    }
    tiles.push(line);
  }
  return {
    rows: board.rows,
    cols: board.cols,
    tiles
  };
}

export function swapPieces(board: Board, first: Position, second: Position): boolean {
  const firstPiece = board.tiles[first.row][first.col].piece;
  const secondPiece = board.tiles[second.row][second.col].piece;
  if (!firstPiece || !secondPiece) {
    return false;
  }
  board.tiles[first.row][first.col].piece = secondPiece;
  board.tiles[second.row][second.col].piece = firstPiece;
  return true;
}
