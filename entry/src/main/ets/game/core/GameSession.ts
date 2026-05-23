import { Board, GameStatus, PieceType, Position, samePosition } from './Types';
import { BoardFactory, SeededRandom } from './BoardFactory';
import { GravityResolver } from './GravityResolver';
import { MatchResolver } from './MatchResolver';
import { SpecialResolver } from './SpecialResolver';
import { BlockerDamageResult, BlockerResolver } from '../mechanics/BlockerResolver';
import { LevelConfig, LevelGoal } from '../levels/LevelConfig';

export interface GameState {
  board: Board;
  movesLeft: number;
  score: number;
  goals: LevelGoal[];
  status: GameStatus;
}

export class GameSession {
  private random: SeededRandom;
  private pieceTypes: PieceType[];
  state: GameState;

  constructor(level: LevelConfig, seed: number) {
    this.random = new SeededRandom(seed);
    this.pieceTypes = level.board.pieceTypes;
    const board = BoardFactory.create({
      rows: level.board.rows,
      cols: level.board.cols,
      seed,
      pieceTypes: level.board.pieceTypes
    });

    level.blockers?.forEach(blocker => {
      board.tiles[blocker.row][blocker.col].blocker = {
        type: blocker.type,
        hp: blocker.hp,
        portalId: blocker.portalId,
        targetPortalId: blocker.targetPortalId
      };
      if (blocker.type === 'marshmallow') {
        board.tiles[blocker.row][blocker.col].piece = undefined;
      }
    });

    this.state = {
      board,
      movesLeft: level.moves,
      score: 0,
      goals: level.goals.map(goal => ({ ...goal })),
      status: 'playing'
    };
  }

  trySwap(first: Position, second: Position): boolean {
    if (this.state.status !== 'playing' || !this.areAdjacent(first, second)) {
      return false;
    }
    if (!BlockerResolver.canSwap(this.state.board, first, second)) {
      return false;
    }

    const firstPiece = this.state.board.tiles[first.row][first.col].piece;
    const secondPiece = this.state.board.tiles[second.row][second.col].piece;
    if (!firstPiece || !secondPiece) {
      return false;
    }

    if (firstPiece.special !== 'none' || secondPiece.special !== 'none') {
      this.swap(first, second);
      const specialPositions = [
        ...SpecialResolver.activatedPositions(this.state.board, second, first),
        ...SpecialResolver.activatedPositions(this.state.board, first, second)
      ];
      this.state.movesLeft--;
      this.resolveClearPositions(this.uniquePositions(specialPositions));
      this.updateStatus();
      return true;
    }

    this.swap(first, second);
    const matches = MatchResolver.findMatches(this.state.board);
    if (matches.length === 0) {
      this.swap(first, second);
      return false;
    }

    this.state.movesLeft--;
    this.resolveBoard(second);
    this.updateStatus();
    return true;
  }

  resolveBoard(preferredCreation?: Position): void {
    let loopGuard = 0;
    while (loopGuard < 20) {
      const matches = MatchResolver.findMatches(this.state.board);
      if (matches.length === 0) {
        return;
      }

      const creation = SpecialResolver.chooseCreation(matches, preferredCreation);
      let positions = MatchResolver.uniqueMatchedPositions(matches);
      if (creation) {
        positions = positions.filter(position => !samePosition(position, creation.position));
        const piece = this.state.board.tiles[creation.position.row][creation.position.col].piece;
        if (piece) {
          piece.special = creation.special;
        }
      }

      this.resolveClearPositions(positions, loopGuard);
      preferredCreation = undefined;
      loopGuard++;
    }
  }

  private resolveClearPositions(positions: Position[], loopIndex: number = 0): void {
    if (positions.length === 0) {
      return;
    }
    this.state.score += positions.length * 10;
    this.updateCollectGoals(positions);
    const blockerResult = BlockerResolver.damageAdjacent(this.state.board, positions);
    this.updateBlockerGoals(blockerResult);
    GravityResolver.clearPositions(this.state.board, positions);
    GravityResolver.collapseAndRefill(this.state.board, this.pieceTypes, this.random, `s_${loopIndex}`);
  }

  private updateCollectGoals(positions: Position[]): void {
    positions.forEach(position => {
      const piece = this.state.board.tiles[position.row][position.col].piece;
      if (!piece) {
        return;
      }
      this.state.goals.forEach(goal => {
        if (goal.type === 'collect_piece' && goal.target === piece.type && goal.count > 0) {
          goal.count--;
        }
      });
    });
  }

  private updateBlockerGoals(result: BlockerDamageResult): void {
    this.state.goals.forEach(goal => {
      if (goal.type === 'clear_ice') {
        goal.count -= result.clearIce;
      }
      if (goal.type === 'break_chain') {
        goal.count -= result.breakChain;
      }
      if (goal.type === 'clear_marshmallow') {
        goal.count -= result.clearMarshmallow;
      }
    });
  }

  private updateStatus(): void {
    const goalsDone = this.state.goals.every(goal => {
      if (goal.type === 'score') {
        return this.state.score >= goal.count;
      }
      return goal.count <= 0;
    });
    if (goalsDone) {
      this.state.status = 'won';
      return;
    }
    if (this.state.movesLeft <= 0) {
      this.state.status = 'lost';
    }
  }

  private areAdjacent(first: Position, second: Position): boolean {
    return Math.abs(first.row - second.row) + Math.abs(first.col - second.col) === 1;
  }

  private swap(first: Position, second: Position): void {
    const firstPiece = this.state.board.tiles[first.row][first.col].piece;
    this.state.board.tiles[first.row][first.col].piece = this.state.board.tiles[second.row][second.col].piece;
    this.state.board.tiles[second.row][second.col].piece = firstPiece;
  }

  private uniquePositions(positions: Position[]): Position[] {
    const seen = new Set<string>();
    const result: Position[] = [];
    positions.forEach(position => {
      const key = `${position.row}_${position.col}`;
      if (!seen.has(key)) {
        seen.add(key);
        result.push(position);
      }
    });
    return result;
  }
}
