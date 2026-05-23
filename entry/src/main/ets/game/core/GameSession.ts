import { Board, GameStatus, PieceType, Position, samePosition } from './Types';
import { cloneBoard } from './BoardSnapshot';
import { BoardFactory, SeededRandom } from './BoardFactory';
import { BoardMoveAnalyzer } from './BoardMoveAnalyzer';
import { BoardShuffler } from './BoardShuffler';
import { GravityResolver } from './GravityResolver';
import { MatchResolver } from './MatchResolver';
import { SpecialResolver } from './SpecialResolver';
import { BlockerDamageResult, BlockerResolver } from '../mechanics/BlockerResolver';
import { LevelConfig, LevelGoal } from '../levels/LevelConfig';

export const UNLIMITED_TOOL_COUNT = -1;

export interface GameState {
  board: Board;
  movesLeft: number;
  score: number;
  goals: LevelGoal[];
  status: GameStatus;
  tools: ToolState;
  reshuffles: number;
}

export interface ToolState {
  shuffle: number;
  hammer: number;
  brush: number;
  undo: number;
}

interface GameHistoryEntry {
  board: Board;
  movesLeft: number;
  score: number;
  goals: LevelGoal[];
  status: GameStatus;
  tools: ToolState;
  reshuffles: number;
}

export class GameSession {
  private random: SeededRandom;
  private pieceTypes: PieceType[];
  private history: GameHistoryEntry[] = [];
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
      if (blocker.type === 'marshmallow' || blocker.type === 'hole') {
        board.tiles[blocker.row][blocker.col].piece = undefined;
      }
    });

    level.specialPieces?.forEach(specialPiece => {
      const tile = board.tiles[specialPiece.row][specialPiece.col];
      if (tile.blocker?.type === 'hole' || tile.blocker?.type === 'marshmallow') {
        return;
      }
      if (tile.piece) {
        tile.piece.type = specialPiece.type;
        tile.piece.special = specialPiece.special;
      }
    });

    this.state = {
      board,
      movesLeft: level.moves,
      score: 0,
      goals: level.goals.map(goal => ({ ...goal })),
      status: 'playing',
      tools: {
        shuffle: UNLIMITED_TOOL_COUNT,
        hammer: UNLIMITED_TOOL_COUNT,
        brush: UNLIMITED_TOOL_COUNT,
        undo: UNLIMITED_TOOL_COUNT
      },
      reshuffles: 0
    };
    this.ensurePlayableBoard();
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

    this.saveHistory();
    if (firstPiece.special !== 'none' || secondPiece.special !== 'none') {
      this.swap(first, second);
      const specialPositions = SpecialResolver.swapActivatedPositions(this.state.board, first, second);
      this.state.movesLeft--;
      this.resolveClearPositions(this.uniquePositions(specialPositions));
      this.resolveBoard();
      this.updateStatus();
      this.ensurePlayableBoard();
      return true;
    }

    this.swap(first, second);
    const matches = MatchResolver.findMatches(this.state.board);
    if (matches.length === 0) {
      this.swap(first, second);
      this.discardLastHistory();
      return false;
    }

    this.state.movesLeft--;
    this.resolveBoard(second);
    this.updateStatus();
    this.ensurePlayableBoard();
    return true;
  }

  useShuffleTool(): boolean {
    if (this.state.status !== 'playing' || !this.hasTool(this.state.tools.shuffle)) {
      return false;
    }
    this.saveHistory();
    const shuffled = this.shuffleBoard();
    if (!shuffled) {
      this.discardLastHistory();
      return false;
    }
    this.state.tools.shuffle = this.consumeTool(this.state.tools.shuffle);
    return true;
  }

  useHammerTool(position: Position): boolean {
    if (this.state.status !== 'playing' || !this.hasTool(this.state.tools.hammer)) {
      return false;
    }
    const tile = this.state.board.tiles[position.row][position.col];
    if (!tile.piece || tile.blocker?.type === 'hole' || tile.blocker?.type === 'marshmallow') {
      return false;
    }
    this.saveHistory();
    this.resolveClearPositions(SpecialResolver.expandedClearPositions(this.state.board, [position]));
    this.resolveBoard();
    this.state.tools.hammer = this.consumeTool(this.state.tools.hammer);
    this.updateStatus();
    this.ensurePlayableBoard();
    return true;
  }

  useBrushTool(position: Position): boolean {
    if (this.state.status !== 'playing' || !this.hasTool(this.state.tools.brush)) {
      return false;
    }
    const tile = this.state.board.tiles[position.row][position.col];
    if (!tile.piece || tile.piece.special !== 'none' || tile.blocker?.type === 'hole' || tile.blocker?.type === 'marshmallow') {
      return false;
    }
    this.saveHistory();
    const currentIndex = this.pieceTypes.indexOf(tile.piece.type);
    tile.piece.type = this.pieceTypes[(currentIndex + 1) % this.pieceTypes.length];
    this.state.tools.brush = this.consumeTool(this.state.tools.brush);
    this.resolveBoard(position);
    this.updateStatus();
    this.ensurePlayableBoard();
    return true;
  }

  useUndoTool(): boolean {
    if (!this.hasTool(this.state.tools.undo) || this.history.length === 0) {
      return false;
    }
    const currentUndoCount = this.state.tools.undo;
    const snapshot = this.history.pop();
    if (!snapshot) {
      return false;
    }
    this.state.board = cloneBoard(snapshot.board);
    this.state.movesLeft = snapshot.movesLeft;
    this.state.score = snapshot.score;
    this.state.goals = snapshot.goals.map(goal => ({ ...goal }));
    this.state.status = snapshot.status;
    this.state.tools = {
      shuffle: snapshot.tools.shuffle,
      hammer: snapshot.tools.hammer,
      brush: snapshot.tools.brush,
      undo: this.consumeTool(currentUndoCount)
    };
    this.state.reshuffles = snapshot.reshuffles;
    return true;
  }

  hasAvailableMove(): boolean {
    return BoardMoveAnalyzer.hasAvailableMove(this.state.board);
  }

  resolveBoard(preferredCreation?: Position): void {
    let loopGuard = 0;
    while (loopGuard < 20) {
      const matches = MatchResolver.findMatches(this.state.board);
      if (matches.length === 0) {
        return;
      }

      const creations = SpecialResolver.chooseCreations(matches, preferredCreation);
      let positions = MatchResolver.uniqueMatchedPositions(matches);
      creations.forEach(creation => {
        positions = positions.filter(position => !samePosition(position, creation.position));
        const piece = this.state.board.tiles[creation.position.row][creation.position.col].piece;
        if (piece) {
          piece.special = creation.special;
        }
      });
      positions = SpecialResolver.expandedClearPositions(this.state.board, positions);

      this.resolveClearPositions(positions, loopGuard);
      preferredCreation = undefined;
      loopGuard++;
    }
    this.ensurePlayableBoard();
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

  private ensurePlayableBoard(): void {
    if (this.state.status !== 'playing') {
      return;
    }
    let guard = 0;
    while (!BoardMoveAnalyzer.hasAvailableMove(this.state.board) && guard < 5) {
      if (!this.shuffleBoard()) {
        return;
      }
      guard++;
    }
  }

  private shuffleBoard(): boolean {
    const shuffled = BoardShuffler.shuffle(this.state.board, this.random, this.pieceTypes);
    if (shuffled) {
      this.state.reshuffles++;
    }
    return shuffled;
  }

  private saveHistory(): void {
    this.history.push({
      board: cloneBoard(this.state.board),
      movesLeft: this.state.movesLeft,
      score: this.state.score,
      goals: this.state.goals.map(goal => ({ ...goal })),
      status: this.state.status,
      tools: { ...this.state.tools },
      reshuffles: this.state.reshuffles
    });
    if (this.history.length > 6) {
      this.history.shift();
    }
  }

  private discardLastHistory(): void {
    this.history.pop();
  }

  private hasTool(count: number): boolean {
    return count !== 0;
  }

  private consumeTool(count: number): number {
    if (count < 0) {
      return count;
    }
    return Math.max(0, count - 1);
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
