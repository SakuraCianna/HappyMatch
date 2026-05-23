import { Board, Position, positionKey } from './Types';

export interface MatchGroup {
  positions: Position[];
  direction: 'row' | 'col';
}

export class MatchResolver {
  static findMatches(board: Board): MatchGroup[] {
    const groups: MatchGroup[] = [];

    for (let row = 0; row < board.rows; row++) {
      let start = 0;
      while (start < board.cols) {
        const type = board.tiles[row][start].piece?.type;
        let end = start + 1;
        while (type && end < board.cols && board.tiles[row][end].piece?.type === type) {
          end++;
        }
        if (type && end - start >= 3) {
          groups.push({
            direction: 'row',
            positions: Array.from({ length: end - start }, (_, index) => ({ row, col: start + index }))
          });
        }
        start = end;
      }
    }

    for (let col = 0; col < board.cols; col++) {
      let start = 0;
      while (start < board.rows) {
        const type = board.tiles[start][col].piece?.type;
        let end = start + 1;
        while (type && end < board.rows && board.tiles[end][col].piece?.type === type) {
          end++;
        }
        if (type && end - start >= 3) {
          groups.push({
            direction: 'col',
            positions: Array.from({ length: end - start }, (_, index) => ({ row: start + index, col }))
          });
        }
        start = end;
      }
    }

    return groups;
  }

  static uniqueMatchedPositions(groups: MatchGroup[]): Position[] {
    const seen = new Set<string>();
    const result: Position[] = [];
    groups.forEach(group => {
      group.positions.forEach(position => {
        const key = positionKey(position);
        if (!seen.has(key)) {
          seen.add(key);
          result.push(position);
        }
      });
    });
    return result;
  }
}
