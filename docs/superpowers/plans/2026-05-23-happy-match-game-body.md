# HappyMatch Game Body Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the playable HappyMatch game body: ArkUI pages, Canvas board, core match-3 rules, 100 level entries, local progress, and the first set of soft-highlight jelly visuals.

**Architecture:** Keep game rules independent from ArkUI and Canvas. The `game/core` modules own board state and deterministic rule resolution; the `game/render` modules draw that state on Canvas; pages orchestrate user flow and storage.

**Tech Stack:** HarmonyOS 6.0.2, ArkTS, ArkUI, Canvas, ArkData relationalStore for local progress, Hypium tests where the local toolchain supports them.

---

## File Structure

- Modify `entry/src/main/ets/pages/Index.ets`: temporary app shell while pages are introduced.
- Create `entry/src/main/ets/pages/HomePage.ets`: start and continue entry.
- Create `entry/src/main/ets/pages/LevelSelectPage.ets`: 100-level selection grid.
- Create `entry/src/main/ets/pages/GamePage.ets`: HUD, Canvas board, pause/restart, result dialog.
- Create `entry/src/main/ets/game/core/Types.ts`: shared rule types.
- Create `entry/src/main/ets/game/core/BoardFactory.ts`: deterministic board creation.
- Create `entry/src/main/ets/game/core/MatchResolver.ts`: match detection and special-piece creation.
- Create `entry/src/main/ets/game/core/GravityResolver.ts`: falling and refill logic.
- Create `entry/src/main/ets/game/core/SpecialResolver.ts`: special-piece creation and activation.
- Create `entry/src/main/ets/game/core/GameSession.ts`: player moves, score, goals, win/lose state.
- Create `entry/src/main/ets/game/mechanics/BlockerResolver.ts`: ice, chain, marshmallow, portal behavior.
- Create `entry/src/main/ets/game/mechanics/PortalResolver.ts`: portal entry and exit movement.
- Create `entry/src/main/ets/game/levels/LevelConfig.ts`: level config types.
- Create `entry/src/main/ets/game/levels/levels.ts`: 100 level configs.
- Create `entry/src/main/ets/game/render/BoardLayout.ts`: board-to-canvas coordinate mapping.
- Create `entry/src/main/ets/game/render/CanvasRenderer.ts`: board drawing and soft jelly shapes.
- Create `entry/src/main/ets/game/render/AnimationQueue.ts`: swap, clear, fall, pulse animation records.
- Create `entry/src/main/ets/game/input/BoardInputMapper.ts`: tap and drag translation into board positions.
- Create `entry/src/main/ets/game/storage/ProgressRepository.ts`: local progress interface.
- Create `entry/src/main/ets/game/storage/RdbProgressRepository.ts`: relationalStore implementation.
- Create `entry/src/main/ets/game/storage/MemoryProgressRepository.ts`: fallback for emulator/debug.
- Create `entry/src/test/GameCore.test.ets`: core rule tests.

---

## Refinement Decisions

- Build the rules first and keep the first playable board independent of generated images.
- Use soft procedural Canvas pieces at first: different silhouettes plus translucent marks. Generated PNG assets replace them only after the board loop is stable.
- Read `levelId` from router params in `GamePage`. If no param is present, default to level 1.
- Store all board geometry in `BoardLayout`; both the renderer and input mapper use the same layout values so taps line up with drawn tiles.
- Count mechanism goals inside `BlockerResolver` results rather than by scanning the board after the fact.
- Keep portal behavior deterministic: portals only affect falling/refill paths, not manual swaps.
- Keep local progress behind `ProgressRepository`; pages should not call RDB APIs directly.

---

## Task 1: Core Types And Board Factory

**Files:**
- Create: `entry/src/main/ets/game/core/Types.ts`
- Create: `entry/src/main/ets/game/core/BoardFactory.ts`
- Create: `entry/src/test/GameCore.test.ets`

- [ ] **Step 1: Add shared core types**

Create `entry/src/main/ets/game/core/Types.ts`:

```ts
export type PieceType = 'red' | 'blue' | 'yellow' | 'green' | 'purple' | 'orange';
export type SpecialType = 'none' | 'row_clear' | 'col_clear' | 'bomb' | 'rainbow';
export type BlockerType = 'ice' | 'chain' | 'marshmallow' | 'portal';

export interface Piece {
  id: string;
  type: PieceType;
  special: SpecialType;
}

export interface Blocker {
  type: BlockerType;
  hp: number;
  portalId?: string;
  targetPortalId?: string;
}

export interface Tile {
  row: number;
  col: number;
  piece?: Piece;
  blocker?: Blocker;
}

export interface Board {
  rows: number;
  cols: number;
  tiles: Tile[][];
}

export interface Position {
  row: number;
  col: number;
}

export const DEFAULT_PIECES: PieceType[] = ['red', 'blue', 'yellow', 'green', 'purple', 'orange'];
```

- [ ] **Step 2: Add deterministic board factory**

Create `entry/src/main/ets/game/core/BoardFactory.ts`:

```ts
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
      for (let col = 0; col < options.cols; col++) {
        const type = BoardFactory.pickWithoutImmediateMatch(row, col, tiles, pieceTypes, random);
        const piece: Piece = {
          id: `p_${idCounter++}`,
          type,
          special: 'none'
        };
        line.push({ row, col, piece });
      }
      tiles.push(line);
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
    const candidates = pieceTypes.slice();
    for (let attempts = 0; attempts < candidates.length * 2; attempts++) {
      const type = random.pick(candidates);
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
    return candidates[0];
  }
}
```

- [ ] **Step 3: Add first core test**

Create `entry/src/test/GameCore.test.ets`:

```ts
import { describe, it, expect } from '@ohos/hypium';
import { BoardFactory } from '../main/ets/game/core/BoardFactory';

export default function gameCoreTest() {
  describe('GameCore', () => {
    it('createBoardWithoutInitialMatches', 0, () => {
      const board = BoardFactory.create({ rows: 8, cols: 8, seed: 20260523 });
      let foundMatch = false;
      for (let row = 0; row < board.rows; row++) {
        for (let col = 0; col < board.cols; col++) {
          const current = board.tiles[row][col].piece?.type;
          if (col >= 2 && current === board.tiles[row][col - 1].piece?.type && current === board.tiles[row][col - 2].piece?.type) {
            foundMatch = true;
          }
          if (row >= 2 && current === board.tiles[row - 1][col].piece?.type && current === board.tiles[row - 2][col].piece?.type) {
            foundMatch = true;
          }
        }
      }
      expect(foundMatch).assertFalse();
    });
  });
}
```

- [ ] **Step 4: Wire the test suite entry**

Create `entry/src/test/List.test.ets`:

```ts
import gameCoreTest from './GameCore.test';

export default function testsuite() {
  gameCoreTest();
}
```

- [ ] **Step 5: Run available verification**

Run from `HappyMatch`:

```powershell
$OutputEncoding = [Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()
Get-ChildItem -LiteralPath 'entry\src\main\ets\game\core' -File
```

Expected: `Types.ts` and `BoardFactory.ts` are present. If DevEco command-line build is configured, also run the project test/build task from DevEco Studio.

---

## Task 2: Match Detection, Swap Rules, And Gravity

**Files:**
- Create: `entry/src/main/ets/game/core/MatchResolver.ts`
- Create: `entry/src/main/ets/game/core/GravityResolver.ts`
- Modify: `entry/src/test/GameCore.test.ets`

- [ ] **Step 1: Add match resolver**

Create `entry/src/main/ets/game/core/MatchResolver.ts`:

```ts
import { Board, Position } from './Types';

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
        const key = `${position.row}_${position.col}`;
        if (!seen.has(key)) {
          seen.add(key);
          result.push(position);
        }
      });
    });
    return result;
  }
}
```

- [ ] **Step 2: Add gravity resolver**

Create `entry/src/main/ets/game/core/GravityResolver.ts`:

```ts
import { Board, Piece, PieceType } from './Types';
import { SeededRandom } from './BoardFactory';

export interface GravityResult {
  moved: number;
  spawned: number;
}

export class GravityResolver {
  static clearPositions(board: Board, positions: Array<{ row: number; col: number }>): void {
    positions.forEach(position => {
      board.tiles[position.row][position.col].piece = undefined;
    });
  }

  static collapseAndRefill(board: Board, pieceTypes: PieceType[], random: SeededRandom, idPrefix: string): GravityResult {
    let moved = 0;
    let spawned = 0;

    for (let col = 0; col < board.cols; col++) {
      const pieces: Piece[] = [];
      for (let row = board.rows - 1; row >= 0; row--) {
        const tile = board.tiles[row][col];
        if (tile.piece) {
          pieces.push(tile.piece);
        }
      }

      for (let row = board.rows - 1; row >= 0; row--) {
        const nextPiece = pieces.shift();
        if (nextPiece) {
          if (board.tiles[row][col].piece?.id !== nextPiece.id) {
            moved++;
          }
          board.tiles[row][col].piece = nextPiece;
        } else {
          board.tiles[row][col].piece = {
            id: `${idPrefix}_${col}_${row}_${spawned}`,
            type: random.pick(pieceTypes),
            special: 'none'
          };
          spawned++;
        }
      }
    }

    return { moved, spawned };
  }
}
```

- [ ] **Step 3: Extend tests for match and gravity**

Append inside the `describe('GameCore', ...)` block in `entry/src/test/GameCore.test.ets`:

```ts
it('findHorizontalMatch', 0, () => {
  const board = BoardFactory.create({ rows: 3, cols: 3, seed: 7 });
  board.tiles[0][0].piece!.type = 'red';
  board.tiles[0][1].piece!.type = 'red';
  board.tiles[0][2].piece!.type = 'red';
  const matches = MatchResolver.findMatches(board);
  expect(matches.length).assertLarger(0);
});
```

Add imports:

```ts
import { MatchResolver } from '../main/ets/game/core/MatchResolver';
```

- [ ] **Step 4: Verify imports and file presence**

Run:

```powershell
$OutputEncoding = [Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()
Select-String -Path 'entry\src\test\GameCore.test.ets' -Pattern 'MatchResolver'
```

Expected: one import and one test usage are shown.

---

## Task 3: Game Session And Goals

**Files:**
- Create: `entry/src/main/ets/game/core/GameSession.ts`
- Create: `entry/src/main/ets/game/levels/LevelConfig.ts`
- Modify: `entry/src/test/GameCore.test.ets`

- [ ] **Step 1: Add level config types**

Create `entry/src/main/ets/game/levels/LevelConfig.ts`:

```ts
import { BlockerType, PieceType } from '../core/Types';

export type GoalType = 'score' | 'clear_ice' | 'break_chain' | 'clear_marshmallow' | 'collect_piece';

export interface LevelGoal {
  type: GoalType;
  target?: PieceType;
  count: number;
}

export interface LevelBlockerConfig {
  row: number;
  col: number;
  type: BlockerType;
  hp: number;
  portalId?: string;
  targetPortalId?: string;
}

export interface LevelConfig {
  id: number;
  title: string;
  moves: number;
  board: {
    rows: number;
    cols: number;
    pieceTypes: PieceType[];
  };
  goals: LevelGoal[];
  blockers?: LevelBlockerConfig[];
  tutorial?: string[];
}
```

- [ ] **Step 2: Add game session**

Create `entry/src/main/ets/game/core/GameSession.ts`:

```ts
import { Board, PieceType, Position } from './Types';
import { BoardFactory, SeededRandom } from './BoardFactory';
import { MatchResolver } from './MatchResolver';
import { GravityResolver } from './GravityResolver';
import { LevelConfig, LevelGoal } from '../levels/LevelConfig';

export interface GameState {
  board: Board;
  movesLeft: number;
  score: number;
  goals: LevelGoal[];
  status: 'playing' | 'won' | 'lost';
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
    this.swap(first, second);
    const matches = MatchResolver.findMatches(this.state.board);
    if (matches.length === 0) {
      this.swap(first, second);
      return false;
    }
    this.state.movesLeft--;
    this.resolveBoard();
    this.updateStatus();
    return true;
  }

  resolveBoard(): void {
    let loopGuard = 0;
    while (loopGuard < 20) {
      const matches = MatchResolver.findMatches(this.state.board);
      if (matches.length === 0) {
        return;
      }
      const positions = MatchResolver.uniqueMatchedPositions(matches);
      this.state.score += positions.length * 10;
      this.updateCollectGoals(positions);
      GravityResolver.clearPositions(this.state.board, positions);
      GravityResolver.collapseAndRefill(this.state.board, this.pieceTypes, this.random, `s_${loopGuard}`);
      loopGuard++;
    }
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

  private updateStatus(): void {
    const goalsDone = this.state.goals.every(goal => goal.count <= 0 || (goal.type === 'score' && this.state.score >= goal.count));
    if (goalsDone) {
      this.state.status = 'won';
    } else if (this.state.movesLeft <= 0) {
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
}
```

- [ ] **Step 3: Add session test**

Append inside `entry/src/test/GameCore.test.ets`:

```ts
it('rejectNonAdjacentSwap', 0, () => {
  const session = new GameSession({
    id: 1,
    title: 'Test',
    moves: 5,
    board: { rows: 8, cols: 8, pieceTypes: ['red', 'blue', 'yellow', 'green'] },
    goals: [{ type: 'collect_piece', target: 'red', count: 3 }]
  }, 11);
  const accepted = session.trySwap({ row: 0, col: 0 }, { row: 2, col: 2 });
  expect(accepted).assertFalse();
  expect(session.state.movesLeft).assertEqual(5);
});
```

Add import:

```ts
import { GameSession } from '../main/ets/game/core/GameSession';
```

---

## Task 3A: Special Piece Creation And Activation

**Files:**
- Create: `entry/src/main/ets/game/core/SpecialResolver.ts`
- Modify: `entry/src/main/ets/game/core/GameSession.ts`
- Modify: `entry/src/test/GameCore.test.ets`

- [ ] **Step 1: Add special resolver**

Create `entry/src/main/ets/game/core/SpecialResolver.ts`:

```ts
import { Board, Position, SpecialType } from './Types';
import { MatchGroup } from './MatchResolver';

export interface SpecialCreation {
  position: Position;
  special: SpecialType;
}

export class SpecialResolver {
  static chooseCreation(groups: MatchGroup[], preferred?: Position): SpecialCreation | undefined {
    const allPositions = groups.flatMap(group => group.positions);
    if (allPositions.length < 4) {
      return undefined;
    }

    const creationPosition = preferred && allPositions.some(pos => pos.row === preferred.row && pos.col === preferred.col)
      ? preferred
      : allPositions[0];

    if (allPositions.length >= 5) {
      return { position: creationPosition, special: 'rainbow' };
    }

    const hasRow = groups.some(group => group.direction === 'row' && group.positions.length >= 3);
    const hasCol = groups.some(group => group.direction === 'col' && group.positions.length >= 3);
    if (hasRow && hasCol) {
      return { position: creationPosition, special: 'bomb' };
    }

    const longest = groups.reduce((best, group) => group.positions.length > best.positions.length ? group : best, groups[0]);
    return {
      position: creationPosition,
      special: longest.direction === 'row' ? 'row_clear' : 'col_clear'
    };
  }

  static activatedPositions(board: Board, position: Position, target?: Position): Position[] {
    const piece = board.tiles[position.row][position.col].piece;
    if (!piece || piece.special === 'none') {
      return [position];
    }

    if (piece.special === 'row_clear') {
      return Array.from({ length: board.cols }, (_, col) => ({ row: position.row, col }));
    }

    if (piece.special === 'col_clear') {
      return Array.from({ length: board.rows }, (_, row) => ({ row, col: position.col }));
    }

    if (piece.special === 'bomb') {
      const result: Position[] = [];
      for (let row = position.row - 1; row <= position.row + 1; row++) {
        for (let col = position.col - 1; col <= position.col + 1; col++) {
          if (row >= 0 && row < board.rows && col >= 0 && col < board.cols) {
            result.push({ row, col });
          }
        }
      }
      return result;
    }

    const targetType = target ? board.tiles[target.row][target.col].piece?.type : undefined;
    if (piece.special === 'rainbow' && targetType) {
      const result: Position[] = [];
      for (let row = 0; row < board.rows; row++) {
        for (let col = 0; col < board.cols; col++) {
          if (board.tiles[row][col].piece?.type === targetType) {
            result.push({ row, col });
          }
        }
      }
      return result;
    }

    return [position];
  }
}
```

- [ ] **Step 2: Apply special creation in GameSession**

In `GameSession.resolveBoard`, after computing `matches`, call `SpecialResolver.chooseCreation(matches)` before clearing positions. Keep the chosen position out of the clear list and change that piece to the chosen special type:

```ts
const creation = SpecialResolver.chooseCreation(matches);
let positions = MatchResolver.uniqueMatchedPositions(matches);
if (creation) {
  positions = positions.filter(position => position.row !== creation.position.row || position.col !== creation.position.col);
  const piece = this.state.board.tiles[creation.position.row][creation.position.col].piece;
  if (piece) {
    piece.special = creation.special;
  }
}
```

Add import:

```ts
import { SpecialResolver } from './SpecialResolver';
```

- [ ] **Step 3: Add special resolver test**

Append inside `entry/src/test/GameCore.test.ets`:

```ts
it('createsRainbowForFiveMatch', 0, () => {
  const board = BoardFactory.create({ rows: 5, cols: 5, seed: 21 });
  for (let col = 0; col < 5; col++) {
    board.tiles[0][col].piece!.type = 'red';
  }
  const matches = MatchResolver.findMatches(board);
  const creation = SpecialResolver.chooseCreation(matches, { row: 0, col: 2 });
  expect(creation?.special).assertEqual('rainbow');
  expect(creation?.position.col).assertEqual(2);
});
```

Add import:

```ts
import { SpecialResolver } from '../main/ets/game/core/SpecialResolver';
```

- [ ] **Step 4: Verification**

Run:

```powershell
$OutputEncoding = [Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()
Select-String -Path 'entry\src\main\ets\game\core\SpecialResolver.ts' -Pattern 'row_clear|col_clear|bomb|rainbow'
```

Expected: all four special names are present.

---

## Task 4: Level Configs And 100-Level Progression

**Files:**
- Create: `entry/src/main/ets/game/levels/levels.ts`

- [ ] **Step 1: Add level generation helpers**

Create `entry/src/main/ets/game/levels/levels.ts`:

```ts
import { LevelConfig, LevelGoal } from './LevelConfig';
import { PieceType } from '../core/Types';

const ALL_PIECES: PieceType[] = ['red', 'blue', 'yellow', 'green', 'purple', 'orange'];

function piecesForLevel(id: number): PieceType[] {
  if (id <= 5) {
    return ['red', 'blue', 'yellow', 'green'];
  }
  if (id < 40) {
    return ['red', 'blue', 'yellow', 'green', 'purple'];
  }
  return ALL_PIECES;
}

function baseGoal(id: number): LevelGoal[] {
  if (id < 20) {
    return [{ type: 'score', count: 500 + id * 120 }];
  }
  if (id < 40) {
    return [{ type: 'clear_ice', count: 4 + Math.floor(id / 5) }];
  }
  if (id < 60) {
    return [{ type: 'break_chain', count: 5 + Math.floor(id / 5) }];
  }
  if (id < 80) {
    return [{ type: 'clear_marshmallow', count: 6 + Math.floor(id / 4) }];
  }
  return [{ type: 'score', count: 2500 + id * 80 }];
}

function tutorialForLevel(id: number): string[] | undefined {
  const tutorials: Record<number, string[]> = {
    1: ['交换相邻果冻，让三个相同方块连成一线。'],
    2: ['消除后，上方果冻会落下并补齐棋盘。'],
    3: ['在步数用完前完成目标即可通关。'],
    4: ['四个相同方块可以形成横消或竖消特殊方块。'],
    5: ['特殊方块可以帮助你更快完成目标。']
  };
  return tutorials[id];
}

export const LEVELS: LevelConfig[] = Array.from({ length: 100 }, (_, index) => {
  const id = index + 1;
  return {
    id,
    title: `第 ${id} 关`,
    moves: Math.max(18, 32 - Math.floor(id / 8)),
    board: {
      rows: 8,
      cols: 8,
      pieceTypes: piecesForLevel(id)
    },
    goals: baseGoal(id),
    blockers: [],
    tutorial: tutorialForLevel(id)
  };
});
```

- [ ] **Step 2: Add hand-tuned milestone blockers**

Append after the `LEVELS` declaration:

```ts
LEVELS[19].blockers = [
  { row: 2, col: 2, type: 'ice', hp: 1 },
  { row: 2, col: 5, type: 'ice', hp: 1 },
  { row: 5, col: 2, type: 'ice', hp: 1 },
  { row: 5, col: 5, type: 'ice', hp: 1 }
];

LEVELS[39].blockers = [
  { row: 1, col: 1, type: 'chain', hp: 1 },
  { row: 1, col: 6, type: 'chain', hp: 1 },
  { row: 6, col: 1, type: 'chain', hp: 1 },
  { row: 6, col: 6, type: 'chain', hp: 1 }
];

LEVELS[59].blockers = [
  { row: 3, col: 3, type: 'marshmallow', hp: 2 },
  { row: 3, col: 4, type: 'marshmallow', hp: 2 },
  { row: 4, col: 3, type: 'marshmallow', hp: 2 },
  { row: 4, col: 4, type: 'marshmallow', hp: 2 }
];

LEVELS[79].blockers = [
  { row: 0, col: 3, type: 'portal', hp: 1, portalId: 'a_in', targetPortalId: 'a_out' },
  { row: 7, col: 3, type: 'portal', hp: 1, portalId: 'a_out' }
];

LEVELS[99].title = '第 100 关：糖果天空岛毕业挑战';
LEVELS[99].goals = [
  { type: 'score', count: 12000 },
  { type: 'clear_ice', count: 10 },
  { type: 'break_chain', count: 8 },
  { type: 'clear_marshmallow', count: 8 }
];
```

- [ ] **Step 3: Verify 100 levels**

Run:

```powershell
$OutputEncoding = [Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()
Select-String -Path 'entry\src\main\ets\game\levels\levels.ts' -Pattern 'length: 100|第 100 关'
```

Expected: both patterns are found.

---

## Task 5: Canvas Renderer With Soft Highlight Shapes

**Files:**
- Create: `entry/src/main/ets/game/render/CanvasRenderer.ts`
- Create: `entry/src/main/ets/game/render/AnimationQueue.ts`

- [ ] **Step 1: Add animation queue types**

Create `entry/src/main/ets/game/render/AnimationQueue.ts`:

```ts
import { Position } from '../core/Types';

export type AnimationType = 'swap' | 'clear' | 'fall' | 'pulse';

export interface BoardAnimation {
  type: AnimationType;
  from?: Position;
  to?: Position;
  positions?: Position[];
  startedAt: number;
  durationMs: number;
}

export class AnimationQueue {
  private items: BoardAnimation[] = [];

  push(animation: BoardAnimation): void {
    this.items.push(animation);
  }

  active(now: number): BoardAnimation[] {
    this.items = this.items.filter(item => now - item.startedAt <= item.durationMs);
    return this.items;
  }

  clear(): void {
    this.items = [];
  }
}
```

- [ ] **Step 2: Add renderer skeleton**

Create `entry/src/main/ets/game/render/CanvasRenderer.ts`:

```ts
import { Board, Piece, PieceType } from '../core/Types';
import { AnimationQueue } from './AnimationQueue';

export interface RenderOptions {
  width: number;
  height: number;
}

interface PiecePalette {
  base: string;
  dark: string;
  mark: string;
}

const PALETTE: Record<PieceType, PiecePalette> = {
  red: { base: '#F27A91', dark: '#D95370', mark: '♥' },
  blue: { base: '#69B8EA', dark: '#3D91D4', mark: '◆' },
  yellow: { base: '#EFC957', dark: '#D8A73B', mark: '★' },
  green: { base: '#76D37B', dark: '#4DB862', mark: '✿' },
  purple: { base: '#B487EF', dark: '#8663D8', mark: '☾' },
  orange: { base: '#F39967', dark: '#DF7048', mark: '●' }
};

export class CanvasRenderer {
  private animations = new AnimationQueue();

  draw(ctx: CanvasRenderingContext2D, board: Board, options: RenderOptions): void {
    const tileSize = Math.min(options.width / board.cols, options.height / board.rows);
    const boardWidth = tileSize * board.cols;
    const boardHeight = tileSize * board.rows;
    const offsetX = (options.width - boardWidth) / 2;
    const offsetY = (options.height - boardHeight) / 2;

    ctx.clearRect(0, 0, options.width, options.height);
    this.drawBoardBackground(ctx, offsetX, offsetY, boardWidth, boardHeight);

    for (let row = 0; row < board.rows; row++) {
      for (let col = 0; col < board.cols; col++) {
        const piece = board.tiles[row][col].piece;
        if (piece) {
          const centerX = offsetX + col * tileSize + tileSize / 2;
          const centerY = offsetY + row * tileSize + tileSize / 2;
          this.drawPiece(ctx, piece, centerX, centerY, tileSize * 0.72);
        }
      }
    }
  }

  private drawBoardBackground(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number): void {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.62)';
    ctx.roundRect(x, y, width, height, 20);
    ctx.fill();
  }

  private drawPiece(ctx: CanvasRenderingContext2D, piece: Piece, cx: number, cy: number, size: number): void {
    const palette = PALETTE[piece.type];
    ctx.save();
    this.drawPieceShape(ctx, piece.type, cx, cy, size, palette.base, palette.dark);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.50)';
    ctx.beginPath();
    ctx.arc(cx - size * 0.18, cy - size * 0.18, size * 0.09, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.72)';
    ctx.font = `${Math.floor(size * 0.38)}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(palette.mark, cx, cy + size * 0.02);
    ctx.restore();
  }

  private drawPieceShape(
    ctx: CanvasRenderingContext2D,
    type: PieceType,
    cx: number,
    cy: number,
    size: number,
    base: string,
    dark: string
  ): void {
    ctx.fillStyle = base;
    ctx.strokeStyle = dark;
    ctx.lineWidth = Math.max(2, size * 0.08);
    ctx.beginPath();
    if (type === 'blue') {
      ctx.moveTo(cx, cy - size / 2);
      ctx.lineTo(cx + size / 2, cy);
      ctx.lineTo(cx, cy + size / 2);
      ctx.lineTo(cx - size / 2, cy);
      ctx.closePath();
    } else if (type === 'green') {
      ctx.ellipse(cx, cy, size * 0.42, size * 0.55, Math.PI / 4, 0, Math.PI * 2);
    } else if (type === 'orange') {
      ctx.ellipse(cx, cy, size * 0.45, size * 0.55, -Math.PI / 5, 0, Math.PI * 2);
    } else {
      ctx.arc(cx, cy, size / 2, 0, Math.PI * 2);
    }
    ctx.fill();
    ctx.stroke();
  }
}
```

- [ ] **Step 3: Verify renderer file contains soft palette**

Run:

```powershell
$OutputEncoding = [Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()
Select-String -Path 'entry\src\main\ets\game\render\CanvasRenderer.ts' -Pattern 'F27A91|rgba\\(255, 255, 255, 0.50\\)'
```

Expected: soft red palette and semi-transparent highlight are found.

---

## Task 5A: Board Layout And Input Mapping

**Files:**
- Create: `entry/src/main/ets/game/render/BoardLayout.ts`
- Create: `entry/src/main/ets/game/input/BoardInputMapper.ts`
- Modify: `entry/src/main/ets/game/render/CanvasRenderer.ts`

- [ ] **Step 1: Add shared board layout**

Create `entry/src/main/ets/game/render/BoardLayout.ts`:

```ts
import { Board, Position } from '../core/Types';

export interface BoardLayoutResult {
  tileSize: number;
  boardWidth: number;
  boardHeight: number;
  offsetX: number;
  offsetY: number;
}

export class BoardLayout {
  static compute(board: Board, width: number, height: number): BoardLayoutResult {
    const tileSize = Math.floor(Math.min(width / board.cols, height / board.rows));
    const boardWidth = tileSize * board.cols;
    const boardHeight = tileSize * board.rows;
    return {
      tileSize,
      boardWidth,
      boardHeight,
      offsetX: Math.floor((width - boardWidth) / 2),
      offsetY: Math.floor((height - boardHeight) / 2)
    };
  }

  static centerOf(layout: BoardLayoutResult, position: Position): { x: number; y: number } {
    return {
      x: layout.offsetX + position.col * layout.tileSize + layout.tileSize / 2,
      y: layout.offsetY + position.row * layout.tileSize + layout.tileSize / 2
    };
  }

  static hitTest(board: Board, layout: BoardLayoutResult, x: number, y: number): Position | undefined {
    const col = Math.floor((x - layout.offsetX) / layout.tileSize);
    const row = Math.floor((y - layout.offsetY) / layout.tileSize);
    if (row < 0 || row >= board.rows || col < 0 || col >= board.cols) {
      return undefined;
    }
    return { row, col };
  }
}
```

- [ ] **Step 2: Add input mapper**

Create `entry/src/main/ets/game/input/BoardInputMapper.ts`:

```ts
import { Board, Position } from '../core/Types';
import { BoardLayout, BoardLayoutResult } from '../render/BoardLayout';

export interface DragSelection {
  from: Position;
  to: Position;
}

export class BoardInputMapper {
  private start?: Position;

  begin(board: Board, layout: BoardLayoutResult, x: number, y: number): void {
    this.start = BoardLayout.hitTest(board, layout, x, y);
  }

  end(board: Board, layout: BoardLayoutResult, x: number, y: number): DragSelection | undefined {
    if (!this.start) {
      return undefined;
    }
    const end = BoardLayout.hitTest(board, layout, x, y);
    const start = this.start;
    this.start = undefined;
    if (!end || Math.abs(start.row - end.row) + Math.abs(start.col - end.col) !== 1) {
      return undefined;
    }
    return { from: start, to: end };
  }
}
```

- [ ] **Step 3: Use shared layout in renderer**

Replace the local tile-size math in `CanvasRenderer.draw` with:

```ts
const layout = BoardLayout.compute(board, options.width, options.height);
this.drawBoardBackground(ctx, layout.offsetX, layout.offsetY, layout.boardWidth, layout.boardHeight);
```

For each piece, compute the center with:

```ts
const center = BoardLayout.centerOf(layout, { row, col });
this.drawPiece(ctx, piece, center.x, center.y, layout.tileSize * 0.72);
```

Add import:

```ts
import { BoardLayout } from './BoardLayout';
```

- [ ] **Step 4: Verification**

Run:

```powershell
$OutputEncoding = [Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()
Select-String -Path 'entry\src\main\ets\game\render\CanvasRenderer.ts','entry\src\main\ets\game\input\BoardInputMapper.ts' -Pattern 'BoardLayout'
```

Expected: renderer and input mapper both reference `BoardLayout`.

---

## Task 6: Game Page Integration

**Files:**
- Create: `entry/src/main/ets/pages/GamePage.ets`
- Modify: `entry/src/main/resources/base/profile/main_pages.json`

- [ ] **Step 1: Add GamePage**

Create `entry/src/main/ets/pages/GamePage.ets`:

```ts
import { GameSession } from '../game/core/GameSession';
import { CanvasRenderer } from '../game/render/CanvasRenderer';
import { LEVELS } from '../game/levels/levels';

@Entry
@Component
struct GamePage {
  private settings: RenderingContextSettings = new RenderingContextSettings(true);
  private context: CanvasRenderingContext2D = new CanvasRenderingContext2D(this.settings);
  private renderer: CanvasRenderer = new CanvasRenderer();
  @State private levelId: number = 1;
  @State private movesLeft: number = 0;
  @State private score: number = 0;
  private session?: GameSession;

  aboutToAppear(): void {
    this.startLevel(1);
  }

  build() {
    Column() {
      Row() {
        Text(`第 ${this.levelId} 关`)
          .fontSize(18)
          .fontWeight(FontWeight.Bold)
        Blank()
        Text(`步数 ${this.movesLeft}`)
          .fontSize(16)
        Text(`分数 ${this.score}`)
          .fontSize(16)
          .margin({ left: 12 })
      }
      .width('100%')
      .padding(16)

      Canvas(this.context)
        .width('100%')
        .height('70%')
        .backgroundColor('#FFF3C7')
        .onReady(() => {
          this.draw();
        })

      Button('重新开始')
        .margin({ top: 12 })
        .onClick(() => {
          this.startLevel(this.levelId);
        })
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#FFF8E4')
  }

  private startLevel(levelId: number): void {
    const level = LEVELS[levelId - 1];
    this.levelId = level.id;
    this.session = new GameSession(level, 20260523 + level.id);
    this.movesLeft = this.session.state.movesLeft;
    this.score = this.session.state.score;
    this.draw();
  }

  private draw(): void {
    if (!this.session) {
      return;
    }
    this.renderer.draw(this.context, this.session.state.board, { width: 360, height: 520 });
  }
}
```

- [ ] **Step 1A: Refine GamePage before compiling**

Adjust the `GamePage` skeleton before implementation:

```ts
import { router } from '@kit.ArkUI';
import { BoardInputMapper } from '../game/input/BoardInputMapper';
import { BoardLayout, BoardLayoutResult } from '../game/render/BoardLayout';
```

Add these fields:

```ts
private inputMapper: BoardInputMapper = new BoardInputMapper();
private canvasWidth: number = 0;
private canvasHeight: number = 0;
private boardLayout?: BoardLayoutResult;
```

In `aboutToAppear`, read the level parameter:

```ts
const params = router.getParams() as Record<string, number>;
const nextLevelId = params && params.levelId ? Number(params.levelId) : 1;
this.startLevel(nextLevelId);
```

When drawing, use the measured canvas size instead of fixed `360 x 520`:

```ts
this.boardLayout = BoardLayout.compute(this.session.state.board, this.canvasWidth, this.canvasHeight);
this.renderer.draw(this.context, this.session.state.board, {
  width: this.canvasWidth,
  height: this.canvasHeight
});
```

On Canvas touch, map drag start and end into a swap:

```ts
.onTouch((event: TouchEvent) => {
  if (!this.session || !this.boardLayout || event.touches.length === 0) {
    return;
  }
  const touch = event.touches[0];
  if (event.type === TouchType.Down) {
    this.inputMapper.begin(this.session.state.board, this.boardLayout, touch.x, touch.y);
  }
  if (event.type === TouchType.Up) {
    const selection = this.inputMapper.end(this.session.state.board, this.boardLayout, touch.x, touch.y);
    if (selection && this.session.trySwap(selection.from, selection.to)) {
      this.movesLeft = this.session.state.movesLeft;
      this.score = this.session.state.score;
      this.draw();
    }
  }
})
```

- [ ] **Step 2: Register page**

Update `entry/src/main/resources/base/profile/main_pages.json`:

```json
{
  "src": [
    "pages/Index",
    "pages/GamePage"
  ]
}
```

- [ ] **Step 3: Temporarily route Index to GamePage**

Update `entry/src/main/ets/pages/Index.ets`:

```ts
import { router } from '@kit.ArkUI';

@Entry
@Component
struct Index {
  build() {
    Column() {
      Text('开心消消乐')
        .fontSize(30)
        .fontWeight(FontWeight.Bold)
        .margin({ bottom: 24 })
      Button('开始游戏')
        .onClick(() => {
          router.pushUrl({ url: 'pages/GamePage', params: { levelId: 1 } });
        })
    }
    .width('100%')
    .height('100%')
    .justifyContent(FlexAlign.Center)
    .alignItems(HorizontalAlign.Center)
    .backgroundColor('#FFF8E4')
  }
}
```

- [ ] **Step 4: Verify page registration**

Run:

```powershell
$OutputEncoding = [Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()
Get-Content -LiteralPath 'entry\src\main\resources\base\profile\main_pages.json' -Encoding UTF8
```

Expected: `pages/GamePage` is listed.

---

## Task 7: Home, Level Select, And Progress

**Files:**
- Create: `entry/src/main/ets/pages/HomePage.ets`
- Create: `entry/src/main/ets/pages/LevelSelectPage.ets`
- Create: `entry/src/main/ets/game/storage/ProgressRepository.ts`
- Create: `entry/src/main/ets/game/storage/MemoryProgressRepository.ts`
- Modify: `entry/src/main/resources/base/profile/main_pages.json`

- [ ] **Step 1: Add progress interface**

Create `entry/src/main/ets/game/storage/ProgressRepository.ts`:

```ts
export interface LevelProgress {
  levelId: number;
  cleared: boolean;
  stars: number;
  bestScore: number;
  updatedAt: number;
}

export interface ProgressRepository {
  getAll(): Promise<LevelProgress[]>;
  save(progress: LevelProgress): Promise<void>;
  getUnlockedLevel(): Promise<number>;
}
```

- [ ] **Step 2: Add memory repository**

Create `entry/src/main/ets/game/storage/MemoryProgressRepository.ts`:

```ts
import { LevelProgress, ProgressRepository } from './ProgressRepository';

export class MemoryProgressRepository implements ProgressRepository {
  private items: LevelProgress[] = [{ levelId: 1, cleared: false, stars: 0, bestScore: 0, updatedAt: Date.now() }];

  async getAll(): Promise<LevelProgress[]> {
    return this.items.map(item => ({ ...item }));
  }

  async save(progress: LevelProgress): Promise<void> {
    const index = this.items.findIndex(item => item.levelId === progress.levelId);
    if (index >= 0) {
      this.items[index] = { ...progress };
    } else {
      this.items.push({ ...progress });
    }
  }

  async getUnlockedLevel(): Promise<number> {
    const cleared = this.items.filter(item => item.cleared).map(item => item.levelId);
    return Math.min(100, Math.max(1, cleared.length === 0 ? 1 : Math.max(...cleared) + 1));
  }
}
```

- [ ] **Step 3: Add HomePage and LevelSelectPage**

Create `HomePage.ets` and `LevelSelectPage.ets` with simple navigation. `HomePage` routes to `pages/LevelSelectPage`; `LevelSelectPage` displays `LEVELS` in a grid and routes to `pages/GamePage` with a `levelId` parameter.

Use this minimum `LevelSelectPage.ets`:

```ts
import { router } from '@kit.ArkUI';
import { LEVELS } from '../game/levels/levels';

@Entry
@Component
struct LevelSelectPage {
  build() {
    Column() {
      Text('选择关卡')
        .fontSize(26)
        .fontWeight(FontWeight.Bold)
        .margin({ top: 20, bottom: 16 })
      Grid() {
        ForEach(LEVELS, (level) => {
          GridItem() {
            Button(`${level.id}`)
              .width(56)
              .height(56)
              .onClick(() => {
                router.pushUrl({ url: 'pages/GamePage', params: { levelId: level.id } });
              })
          }
        })
      }
      .columnsTemplate('1fr 1fr 1fr 1fr 1fr')
      .rowsGap(10)
      .columnsGap(10)
      .padding(16)
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#FFF8E4')
  }
}
```

- [ ] **Step 4: Register pages**

Ensure `main_pages.json` includes:

```json
{
  "src": [
    "pages/Index",
    "pages/HomePage",
    "pages/LevelSelectPage",
    "pages/GamePage"
  ]
}
```

---

## Task 8: RDB Progress Storage

**Files:**
- Create: `entry/src/main/ets/game/storage/RdbProgressRepository.ts`

- [ ] **Step 1: Add RDB repository**

Create `entry/src/main/ets/game/storage/RdbProgressRepository.ts`:

```ts
import { relationalStore } from '@kit.ArkData';
import { common } from '@kit.AbilityKit';
import { LevelProgress, ProgressRepository } from './ProgressRepository';

const STORE_CONFIG: relationalStore.StoreConfig = {
  name: 'happy_match.db',
  securityLevel: relationalStore.SecurityLevel.S1
};

export class RdbProgressRepository implements ProgressRepository {
  private store?: relationalStore.RdbStore;

  constructor(private context: common.Context) {}

  async init(): Promise<void> {
    this.store = await relationalStore.getRdbStore(this.context, STORE_CONFIG);
    await this.store.executeSql(
      'CREATE TABLE IF NOT EXISTS level_progress(level_id INTEGER PRIMARY KEY, cleared INTEGER, stars INTEGER, best_score INTEGER, updated_at INTEGER)'
    );
  }

  async getAll(): Promise<LevelProgress[]> {
    if (!this.store) {
      await this.init();
    }
    const result = await this.store!.querySql('SELECT level_id, cleared, stars, best_score, updated_at FROM level_progress ORDER BY level_id ASC');
    const items: LevelProgress[] = [];
    while (result.goToNextRow()) {
      items.push({
        levelId: result.getLong(result.getColumnIndex('level_id')),
        cleared: result.getLong(result.getColumnIndex('cleared')) === 1,
        stars: result.getLong(result.getColumnIndex('stars')),
        bestScore: result.getLong(result.getColumnIndex('best_score')),
        updatedAt: result.getLong(result.getColumnIndex('updated_at'))
      });
    }
    result.close();
    return items;
  }

  async save(progress: LevelProgress): Promise<void> {
    if (!this.store) {
      await this.init();
    }
    await this.store!.executeSql(
      'INSERT OR REPLACE INTO level_progress(level_id, cleared, stars, best_score, updated_at) VALUES (?, ?, ?, ?, ?)',
      [progress.levelId, progress.cleared ? 1 : 0, progress.stars, progress.bestScore, progress.updatedAt]
    );
  }

  async getUnlockedLevel(): Promise<number> {
    const all = await this.getAll();
    const cleared = all.filter(item => item.cleared).map(item => item.levelId);
    return Math.min(100, Math.max(1, cleared.length === 0 ? 1 : Math.max(...cleared) + 1));
  }
}
```

- [ ] **Step 2: Verify ArkData import**

Run:

```powershell
$OutputEncoding = [Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()
Select-String -Path 'entry\src\main\ets\game\storage\RdbProgressRepository.ts' -Pattern '@kit.ArkData|happy_match.db'
```

Expected: import and database name are found.

---

## Task 9: Blocker Mechanics

**Files:**
- Create: `entry/src/main/ets/game/mechanics/BlockerResolver.ts`
- Modify: `entry/src/main/ets/game/core/GameSession.ts`

- [ ] **Step 1: Add blocker resolver**

Create `entry/src/main/ets/game/mechanics/BlockerResolver.ts`:

```ts
import { Board, Position } from '../core/Types';

export interface BlockerDamageResult {
  clearIce: number;
  breakChain: number;
  clearMarshmallow: number;
}

export class BlockerResolver {
  static damageAdjacent(board: Board, cleared: Position[]): BlockerDamageResult {
    const result: BlockerDamageResult = {
      clearIce: 0,
      breakChain: 0,
      clearMarshmallow: 0
    };
    const directions = [
      { row: -1, col: 0 },
      { row: 1, col: 0 },
      { row: 0, col: -1 },
      { row: 0, col: 1 }
    ];
    cleared.forEach(position => {
      directions.forEach(direction => {
        const row = position.row + direction.row;
        const col = position.col + direction.col;
        if (row < 0 || row >= board.rows || col < 0 || col >= board.cols) {
          return;
        }
        const blocker = board.tiles[row][col].blocker;
        if (blocker && blocker.type !== 'portal') {
          blocker.hp--;
          if (blocker.hp <= 0) {
            if (blocker.type === 'ice') {
              result.clearIce++;
            }
            if (blocker.type === 'chain') {
              result.breakChain++;
            }
            if (blocker.type === 'marshmallow') {
              result.clearMarshmallow++;
            }
            board.tiles[row][col].blocker = undefined;
          }
        }
      });
    });
    return result;
  }

  static canSwap(board: Board, first: Position, second: Position): boolean {
    const firstBlocker = board.tiles[first.row][first.col].blocker;
    const secondBlocker = board.tiles[second.row][second.col].blocker;
    return firstBlocker?.type !== 'chain' && secondBlocker?.type !== 'chain' &&
      firstBlocker?.type !== 'marshmallow' && secondBlocker?.type !== 'marshmallow';
  }
}
```

- [ ] **Step 2: Call blocker resolver from GameSession**

In `GameSession.resolveBoard`, after `const positions = ...`, call:

```ts
const blockerResult = BlockerResolver.damageAdjacent(this.state.board, positions);
this.updateBlockerGoals(blockerResult);
```

Add import:

```ts
import { BlockerResolver } from '../mechanics/BlockerResolver';
```

Before swapping in `GameSession.trySwap`, reject blocked tiles:

```ts
if (!BlockerResolver.canSwap(this.state.board, first, second)) {
  return false;
}
```

Add the goal update method:

```ts
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
```

Add import:

```ts
import { BlockerDamageResult } from '../mechanics/BlockerResolver';
```

- [ ] **Step 3: Add blocker tests**

Append inside `entry/src/test/GameCore.test.ets`:

```ts
it('chainBlocksSwap', 0, () => {
  const session = new GameSession({
    id: 40,
    title: 'Chain Test',
    moves: 5,
    board: { rows: 8, cols: 8, pieceTypes: ['red', 'blue', 'yellow', 'green'] },
    goals: [{ type: 'break_chain', count: 1 }],
    blockers: [{ row: 0, col: 0, type: 'chain', hp: 1 }]
  }, 40);
  const accepted = session.trySwap({ row: 0, col: 0 }, { row: 0, col: 1 });
  expect(accepted).assertFalse();
});
```

- [ ] **Step 4: Verification**

Run:

```powershell
$OutputEncoding = [Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()
Select-String -Path 'entry\src\main\ets\game\mechanics\BlockerResolver.ts' -Pattern 'clearIce|breakChain|clearMarshmallow|canSwap'
```

Expected: all result counters and `canSwap` are present.

---

## Task 9A: Portal Movement

**Files:**
- Create: `entry/src/main/ets/game/mechanics/PortalResolver.ts`
- Modify: `entry/src/main/ets/game/core/GravityResolver.ts`

- [ ] **Step 1: Add portal resolver**

Create `entry/src/main/ets/game/mechanics/PortalResolver.ts`:

```ts
import { Board, Position } from '../core/Types';

export interface PortalMove {
  from: Position;
  to: Position;
}

export class PortalResolver {
  static apply(board: Board): PortalMove[] {
    const moves: PortalMove[] = [];
    for (let row = 0; row < board.rows; row++) {
      for (let col = 0; col < board.cols; col++) {
        const tile = board.tiles[row][col];
        const blocker = tile.blocker;
        if (!tile.piece || blocker?.type !== 'portal' || !blocker.targetPortalId) {
          continue;
        }
        const target = PortalResolver.findTarget(board, blocker.targetPortalId);
        if (!target) {
          continue;
        }
        const targetTile = board.tiles[target.row][target.col];
        if (targetTile.piece) {
          continue;
        }
        targetTile.piece = tile.piece;
        tile.piece = undefined;
        moves.push({ from: { row, col }, to: target });
      }
    }
    return moves;
  }

  private static findTarget(board: Board, portalId: string): Position | undefined {
    for (let row = 0; row < board.rows; row++) {
      for (let col = 0; col < board.cols; col++) {
        if (board.tiles[row][col].blocker?.portalId === portalId) {
          return { row, col };
        }
      }
    }
    return undefined;
  }
}
```

- [ ] **Step 2: Invoke portal movement after refill**

In `GravityResolver.collapseAndRefill`, after each column has been refilled, call portal movement once:

```ts
const portalMoves = PortalResolver.apply(board);
moved += portalMoves.length;
```

Add import:

```ts
import { PortalResolver } from '../mechanics/PortalResolver';
```

- [ ] **Step 3: Verification**

Run:

```powershell
$OutputEncoding = [Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()
Select-String -Path 'entry\src\main\ets\game\mechanics\PortalResolver.ts' -Pattern 'targetPortalId|PortalMove'
```

Expected: portal target handling and move type are present.

---

## Task 10: Visual Polish And Generated Assets

**Files:**
- Create folder: `entry/src/main/resources/base/media/game/`
- Add generated assets after approval.
- Modify: `entry/src/main/ets/game/render/CanvasRenderer.ts`

- [ ] **Step 1: Keep programmatic pieces until gameplay is stable**

Use the Canvas shapes from Task 5 for the first playable build. Do not block core gameplay on generated images.

- [ ] **Step 2: Generate first asset batch after the board loop works**

Use the image generation prompt style:

```text
Create a soft-highlight glossy jelly game tile for a match-3 mobile game.
Theme: Candy Sky Island, cheerful but not overly bright.
Tile: <red heart circle | blue diamond | yellow star | green leaf flower | purple drop moon | orange citrus dot>.
Style: rounded translucent jelly candy, soft semi-transparent highlight, no harsh pure-white glare, readable at 64x64, centered subject, transparent-friendly flat background, no text, no watermark.
```

- [ ] **Step 3: Save final project assets**

Save approved images under:

```text
entry/src/main/resources/base/media/game/piece_red.png
entry/src/main/resources/base/media/game/piece_blue.png
entry/src/main/resources/base/media/game/piece_yellow.png
entry/src/main/resources/base/media/game/piece_green.png
entry/src/main/resources/base/media/game/piece_purple.png
entry/src/main/resources/base/media/game/piece_orange.png
entry/src/main/resources/base/media/game/bg_board_candy_sky.png
```

- [ ] **Step 4: Replace procedural drawing with image drawing**

In `CanvasRenderer`, keep the shape drawing fallback. Add image lookup only after assets are present so the game remains playable if an image fails to load.

---

## Self-Review

- Spec coverage: This plan covers the game body, 100 level entries, Canvas board, board input mapping, special pieces, soft-highlight piece style, local progress, and four blocker mechanisms. Friend and leaderboard work is intentionally excluded.
- Placeholder scan: The plan contains no unresolved placeholder tasks.
- Type consistency: `PieceType`, `SpecialType`, `BlockerType`, `LevelConfig`, `GameSession`, `BoardLayout`, `BoardInputMapper`, `CanvasRenderer`, and progress types are introduced before later tasks use them.

## Execution Notes

- This project is not currently a git repository, so commit steps are omitted until the GitHub repo exists.
- If `hvigor` is unavailable in the terminal, compile and run through DevEco Studio after each major task.
- Keep PowerShell commands UTF-8 configured:

```powershell
$OutputEncoding = [Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()
```
