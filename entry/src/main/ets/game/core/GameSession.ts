import { Board, GameStatus, PieceType, Position, SpecialType, samePosition } from './Types';
import { cloneBoard } from './BoardSnapshot';
import { BoardFactory, SeededRandom } from './BoardFactory';
import { BoardMoveAnalyzer } from './BoardMoveAnalyzer';
import { BoardShuffler } from './BoardShuffler';
import { GravityResolver } from './GravityResolver';
import { MatchResolver } from './MatchResolver';
import { SpecialResolver } from './SpecialResolver';
import { BlockerDamageResult, BlockerResolver } from '../mechanics/BlockerResolver';
import { LevelConfig, LevelGoal, SpecialComboGoalType } from '../levels/LevelConfig';

export const UNLIMITED_TOOL_COUNT = -1;

export interface GameState {
  board: Board;
  movesLeft: number;
  score: number;
  goals: LevelGoal[];
  status: GameStatus;
  tools: ToolState;
  reshuffles: number;
  lastCascadeCount: number;
}

export interface ToolState {
  shuffle: number;
  hammer: number;
  brush: number;
  addMoves: number;
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
  lastCascadeCount: number;
}

export interface RemainingMoveBonus {
  convertedBoard: Board;
  convertedPositions: Position[];
  clearPositions: Position[];
}

export interface ResolutionStep {
  beforeBoard: Board;
  clearPositions: Position[];
  afterBoard: Board;
}

export class GameSession {
  private random: SeededRandom;
  private pieceTypes: PieceType[];
  private history: GameHistoryEntry[] = [];
  private refillSequence: number = 0;
  lastResolutionSteps: ResolutionStep[] = [];
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
        addMoves: UNLIMITED_TOOL_COUNT,
        undo: UNLIMITED_TOOL_COUNT
      },
      reshuffles: 0,
      lastCascadeCount: 0
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
    this.lastResolutionSteps = [];
    this.state.lastCascadeCount = 0;
    if (SpecialResolver.isDirectSpecialSwap(this.state.board, first, second)) {
      this.swap(first, second);
      this.updateSpecialComboGoals(this.specialComboTypeForSwap(first, second));
      this.applyRainbowFunctionalConversion(first, second);
      const specialPositions = SpecialResolver.swapActivatedPositions(this.state.board, first, second);
      this.state.movesLeft--;
      this.resolveClearPositions(this.uniquePositions(specialPositions));
      this.resolveBoard();
      this.updateComboGoals();
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
    this.updateComboGoals();
    this.updateStatus();
    this.ensurePlayableBoard();
    return true;
  }

  useShuffleTool(): boolean {
    if (this.state.status !== 'playing' || !this.hasTool(this.state.tools.shuffle)) {
      return false;
    }
    this.saveHistory();
    this.lastResolutionSteps = [];
    this.state.lastCascadeCount = 0;
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
    this.lastResolutionSteps = [];
    this.state.lastCascadeCount = 0;
    this.resolveClearPositions(SpecialResolver.expandedClearPositions(this.state.board, [position]));
    this.resolveBoard();
    this.updateComboGoals();
    this.state.tools.hammer = this.consumeTool(this.state.tools.hammer);
    this.updateStatus();
    this.ensurePlayableBoard();
    return true;
  }

  useBrushTool(position: Position, targetType?: PieceType): boolean {
    if (this.state.status !== 'playing' || !this.hasTool(this.state.tools.brush)) {
      return false;
    }
    const tile = this.state.board.tiles[position.row][position.col];
    if (!tile.piece || tile.piece.special !== 'none' || tile.blocker?.type === 'hole' || tile.blocker?.type === 'marshmallow') {
      return false;
    }
    const nextType = targetType ?? this.nextPieceType(tile.piece.type);
    if (this.pieceTypes.indexOf(nextType) < 0 || tile.piece.type === nextType) {
      return false;
    }
    this.saveHistory();
    this.lastResolutionSteps = [];
    this.state.lastCascadeCount = 0;
    tile.piece.type = nextType;
    this.state.tools.brush = this.consumeTool(this.state.tools.brush);
    this.resolveBoard(position);
    this.updateComboGoals();
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
      addMoves: snapshot.tools.addMoves,
      undo: this.consumeTool(currentUndoCount)
    };
    this.state.reshuffles = snapshot.reshuffles;
    this.state.lastCascadeCount = snapshot.lastCascadeCount;
    return true;
  }

  useAddMovesTool(extraMoves: number = 3): boolean {
    if (this.state.status !== 'playing' || !this.hasTool(this.state.tools.addMoves) || extraMoves <= 0) {
      return false;
    }
    this.saveHistory();
    this.lastResolutionSteps = [];
    this.state.lastCascadeCount = 0;
    this.state.movesLeft += extraMoves;
    this.state.tools.addMoves = this.consumeTool(this.state.tools.addMoves);
    return true;
  }

  shouldAwardRemainingMovesBonus(): boolean {
    return this.state.status === 'playing' &&
      this.state.movesLeft > 0 &&
      this.hasCompletedBaseGoals() &&
      this.state.score >= this.threeStarScoreValue();
  }

  awardRemainingMovesAsSpecials(): RemainingMoveBonus | undefined {
    if (!this.shouldAwardRemainingMovesBonus()) {
      return undefined;
    }
    const convertedPositions = this.pickRemainingMoveBonusPositions(this.state.movesLeft);
    this.lastResolutionSteps = [];
    convertedPositions.forEach((position, index) => {
      const piece = this.state.board.tiles[position.row][position.col].piece;
      if (piece) {
        piece.special = this.bonusSpecialForIndex(index);
      }
    });
    const convertedBoard = cloneBoard(this.state.board);
    const clearPositions = this.uniquePositions(SpecialResolver.expandedClearPositions(this.state.board, convertedPositions));
    this.state.movesLeft = 0;
    if (clearPositions.length > 0) {
      this.resolveClearPositions(clearPositions);
      this.resolveBoard();
    }
    this.state.status = this.hasCompletedBaseGoals() ? 'won' : 'lost';
    return {
      convertedBoard,
      convertedPositions,
      clearPositions
    };
  }

  reviveWithMoves(extraMoves: number): boolean {
    if (this.state.status !== 'lost' || extraMoves <= 0) {
      return false;
    }
    this.state.movesLeft = extraMoves;
    this.state.status = 'playing';
    this.state.lastCascadeCount = 0;
    this.ensurePlayableBoard();
    return true;
  }

  scoreGoalValue(): number {
    const scoreGoal = this.scoreGoal();
    if (!scoreGoal) {
      return Math.max(1, this.state.score);
    }
    return Math.max(1, scoreGoal.count);
  }

  twoStarScoreValue(): number {
    return Math.ceil(this.scoreGoalValue() * 1.2);
  }

  threeStarScoreValue(): number {
    return Math.ceil(this.scoreGoalValue() * 1.5);
  }

  hasCompletedBaseGoals(): boolean {
    return this.state.goals.every(goal => {
      if (goal.type === 'score') {
        return this.state.score >= goal.count;
      }
      return goal.count <= 0;
    });
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
    const beforeBoard = cloneBoard(this.state.board);
    this.state.lastCascadeCount++;
    this.state.score += this.scoreForClear(positions.length, this.state.lastCascadeCount);
    this.updateCollectGoals(positions);
    const blockerResult = BlockerResolver.damageAdjacent(this.state.board, positions);
    this.updateBlockerGoals(blockerResult);
    GravityResolver.clearPositions(this.state.board, positions);
    const refillId = this.refillSequence++;
    GravityResolver.collapseAndRefill(this.state.board, this.pieceTypes, this.random, `s_${refillId}_${loopIndex}`);
    this.lastResolutionSteps.push({
      beforeBoard,
      clearPositions: positions.map(position => ({ row: position.row, col: position.col })),
      afterBoard: cloneBoard(this.state.board)
    });
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
        if (goal.type === 'collect_special' && goal.targetSpecial === piece.special && goal.count > 0) {
          goal.count--;
        }
      });
    });
  }

  private scoreForClear(clearCount: number, cascadeIndex: number): number {
    const comboMultiplier = 1 + Math.max(0, cascadeIndex - 1) * 0.5;
    return Math.round(clearCount * 10 * comboMultiplier);
  }

  private applyRainbowFunctionalConversion(first: Position, second: Position): void {
    const conversion = SpecialResolver.rainbowFunctionalConversion(this.state.board, first, second);
    if (!conversion) {
      return;
    }
    conversion.positions.forEach(position => {
      const piece = this.state.board.tiles[position.row][position.col].piece;
      if (piece && piece.special !== 'rainbow') {
        piece.special = conversion.special;
      }
    });
  }

  private updateComboGoals(): void {
    if (this.state.lastCascadeCount < 2) {
      return;
    }
    this.state.goals.forEach(goal => {
      const requiredComboLength = Math.max(2, goal.comboLength ?? 2);
      if (goal.type === 'combo_goal' && goal.count > 0 && this.state.lastCascadeCount >= requiredComboLength) {
        goal.count--;
      }
    });
  }

  private updateSpecialComboGoals(comboType?: SpecialComboGoalType): void {
    if (!comboType) {
      return;
    }
    this.state.goals.forEach(goal => {
      if (goal.type === 'special_combo_goal' &&
        goal.count > 0 &&
        (!goal.comboType || goal.comboType === comboType)) {
        goal.count--;
      }
    });
  }

  private specialComboTypeForSwap(first: Position, second: Position): SpecialComboGoalType | undefined {
    const firstPiece = this.state.board.tiles[first.row][first.col].piece;
    const secondPiece = this.state.board.tiles[second.row][second.col].piece;
    if (!firstPiece || !secondPiece) {
      return undefined;
    }
    if (firstPiece.special === 'rainbow' && secondPiece.special === 'rainbow') {
      return 'rainbow_color';
    }
    if ((firstPiece.special === 'rainbow' && this.isFunctionalSpecial(secondPiece.special)) ||
      (secondPiece.special === 'rainbow' && this.isFunctionalSpecial(firstPiece.special))) {
      return 'rainbow_functional';
    }
    if (firstPiece.special === 'rainbow' || secondPiece.special === 'rainbow') {
      return 'rainbow_color';
    }
    if (firstPiece.special === 'bomb' && secondPiece.special === 'bomb') {
      return 'bomb_bomb';
    }
    if (this.isFunctionalSpecial(firstPiece.special) && this.isFunctionalSpecial(secondPiece.special)) {
      return 'functional_combo';
    }
    return undefined;
  }

  private isFunctionalSpecial(special: SpecialType): boolean {
    return special === 'row_clear' || special === 'col_clear' || special === 'bomb';
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
    if (this.state.movesLeft <= 0) {
      this.state.status = this.hasCompletedBaseGoals() ? 'won' : 'lost';
      return;
    }
    this.state.status = 'playing';
  }

  private ensurePlayableBoard(): void {
    if (this.state.status !== 'playing') {
      return;
    }
    let guard = 0;
    while (guard < 5) {
      const hasInitialMatches = MatchResolver.findMatches(this.state.board).length > 0;
      const hasAvailableMove = BoardMoveAnalyzer.hasAvailableMove(this.state.board);
      if (!hasInitialMatches && hasAvailableMove) {
        return;
      }
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
      reshuffles: this.state.reshuffles,
      lastCascadeCount: this.state.lastCascadeCount
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

  private scoreGoal(): LevelGoal | undefined {
    for (let index = 0; index < this.state.goals.length; index++) {
      const goal = this.state.goals[index];
      if (goal.type === 'score') {
        return goal;
      }
    }
    return undefined;
  }

  private pickRemainingMoveBonusPositions(count: number): Position[] {
    const candidates: Position[] = [];
    for (let row = 0; row < this.state.board.rows; row++) {
      for (let col = 0; col < this.state.board.cols; col++) {
        const tile = this.state.board.tiles[row][col];
        if (tile.piece &&
          tile.piece.special === 'none' &&
          tile.blocker?.type !== 'hole' &&
          tile.blocker?.type !== 'marshmallow' &&
          tile.blocker?.type !== 'chain') {
          candidates.push({ row, col });
        }
      }
    }
    const result: Position[] = [];
    while (result.length < count && candidates.length > 0) {
      const index = Math.floor(this.random.next() * candidates.length);
      result.push(candidates[index]);
      candidates.splice(index, 1);
    }
    return result;
  }

  private bonusSpecialForIndex(index: number): SpecialType {
    const cycle = index % 3;
    if (cycle === 0) {
      return 'row_clear';
    }
    if (cycle === 1) {
      return 'col_clear';
    }
    return 'bomb';
  }

  private nextPieceType(type: PieceType): PieceType {
    const currentIndex = this.pieceTypes.indexOf(type);
    if (currentIndex < 0) {
      return this.pieceTypes[0];
    }
    return this.pieceTypes[(currentIndex + 1) % this.pieceTypes.length];
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
