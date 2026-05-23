import { describe, it, expect } from '@ohos/hypium';
import { BoardFactory, SeededRandom } from '../main/ets/game/core/BoardFactory';
import { cloneBoard, swapPieces } from '../main/ets/game/core/BoardSnapshot';
import { GameSession, UNLIMITED_TOOL_COUNT } from '../main/ets/game/core/GameSession';
import { GravityResolver } from '../main/ets/game/core/GravityResolver';
import { MatchResolver } from '../main/ets/game/core/MatchResolver';
import { SpecialResolver } from '../main/ets/game/core/SpecialResolver';
import { PieceType } from '../main/ets/game/core/Types';
import { LEVELS } from '../main/ets/game/levels/levels';
import { BoardAnimationPlanner } from '../main/ets/game/render/BoardAnimationPlanner';
import { BoardLayout } from '../main/ets/game/render/BoardLayout';
import { MemoryProgressRepository } from '../main/ets/game/storage/MemoryProgressRepository';
import { ProgressService } from '../main/ets/game/storage/ProgressService';

export default function gameCoreTest() {
  describe('GameCore', () => {
    it('createBoardWithoutInitialMatches', 0, () => {
      const board = BoardFactory.create({ rows: 8, cols: 8, seed: 20260523 });
      let foundMatch = false;
      for (let row = 0; row < board.rows; row++) {
        for (let col = 0; col < board.cols; col++) {
          const current = board.tiles[row][col].piece?.type;
          if (col >= 2 && current === board.tiles[row][col - 1].piece?.type &&
            current === board.tiles[row][col - 2].piece?.type) {
            foundMatch = true;
          }
          if (row >= 2 && current === board.tiles[row - 1][col].piece?.type &&
            current === board.tiles[row - 2][col].piece?.type) {
            foundMatch = true;
          }
        }
      }
      expect(foundMatch).assertFalse();
    });

    it('findHorizontalMatch', 0, () => {
      const board = BoardFactory.create({ rows: 3, cols: 3, seed: 7 });
      board.tiles[0][0].piece!.type = 'red';
      board.tiles[0][1].piece!.type = 'red';
      board.tiles[0][2].piece!.type = 'red';
      const matches = MatchResolver.findMatches(board);
      expect(matches.length).assertLarger(0);
    });

    it('clonesBoardBeforeAnimationWithoutSharingPieces', 0, () => {
      const board = BoardFactory.create({ rows: 3, cols: 3, seed: 17 });
      const copy = cloneBoard(board);
      const originalId = board.tiles[0][0].piece!.id;
      const copyId = copy.tiles[0][0].piece!.id;
      copy.tiles[0][0].piece!.type = 'red';
      swapPieces(copy, { row: 0, col: 0 }, { row: 0, col: 1 });
      expect(copyId).assertEqual(originalId);
      expect(board.tiles[0][0].piece!.id).assertEqual(originalId);
    });

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

    it('levelFiveIntroducesPresetSpecialPieces', 0, () => {
      expect((LEVELS[4].specialPieces?.length ?? 0)).assertLarger(0);
      const session = new GameSession(LEVELS[4], 20260528);
      let specialCount = 0;
      for (let row = 0; row < session.state.board.rows; row++) {
        for (let col = 0; col < session.state.board.cols; col++) {
          if (session.state.board.tiles[row][col].piece?.special !== 'none') {
            specialCount++;
          }
        }
      }
      expect(specialCount).assertLarger(0);
    });

    it('laterLevelsMixTwoToFourSpecialTypes', 0, () => {
      const specials = LEVELS[29].specialPieces ?? [];
      const types = new Set<string>();
      specials.forEach(piece => {
        types.add(piece.special);
      });
      expect(types.size).assertLarger(1);
      expect(types.size <= 4).assertTrue();
    });

    it('holeTilesStayEmptyAfterGravity', 0, () => {
      const board = BoardFactory.create({ rows: 5, cols: 5, seed: 777, pieceTypes: ['red', 'blue', 'yellow', 'green'] });
      board.tiles[2][2].blocker = { type: 'hole', hp: 1 };
      board.tiles[2][2].piece = undefined;
      GravityResolver.collapseAndRefill(board, ['red', 'blue', 'yellow', 'green'], new SeededRandom(7), 'hole_test');
      expect(Boolean(board.tiles[2][2].piece)).assertFalse();
    });

    it('laterLevelsUseShapedBoards', 0, () => {
      const holes = LEVELS[9].blockers?.filter(blocker => blocker.type === 'hole') ?? [];
      expect(holes.length).assertLarger(0);
    });

    it('shuffleToolKeepsHolesEmptyAndPlayable', 0, () => {
      const session = new GameSession({
        id: 1,
        title: 'Shuffle Tool Test',
        moves: 5,
        board: { rows: 5, cols: 5, pieceTypes: ['red', 'blue', 'yellow', 'green'] },
        goals: [{ type: 'score', count: 1000 }],
        blockers: [{ row: 2, col: 2, type: 'hole', hp: 1 }]
      }, 58);
      const used = session.useShuffleTool();
      expect(used).assertTrue();
      expect(Boolean(session.state.board.tiles[2][2].piece)).assertFalse();
      expect(session.hasAvailableMove()).assertTrue();
    });

    it('hammerToolClearsSelectedPiece', 0, () => {
      const session = new GameSession({
        id: 1,
        title: 'Hammer Tool Test',
        moves: 5,
        board: { rows: 5, cols: 5, pieceTypes: ['red', 'blue', 'yellow', 'green'] },
        goals: [{ type: 'score', count: 1000 }]
      }, 59);
      const beforeScore = session.state.score;
      expect(session.useHammerTool({ row: 1, col: 1 })).assertTrue();
      expect(session.state.score).assertLarger(beforeScore);
    });

    it('toolCountsStayUnlimitedAfterUse', 0, () => {
      const session = new GameSession({
        id: 1,
        title: 'Unlimited Tool Test',
        moves: 5,
        board: { rows: 5, cols: 5, pieceTypes: ['red', 'blue', 'yellow', 'green'] },
        goals: [{ type: 'score', count: 5000 }]
      }, 6001);

      expect(session.state.tools.shuffle).assertEqual(UNLIMITED_TOOL_COUNT);
      expect(session.state.tools.hammer).assertEqual(UNLIMITED_TOOL_COUNT);
      expect(session.state.tools.brush).assertEqual(UNLIMITED_TOOL_COUNT);
      expect(session.state.tools.undo).assertEqual(UNLIMITED_TOOL_COUNT);

      expect(session.useHammerTool({ row: 1, col: 1 })).assertTrue();
      expect(session.useUndoTool()).assertTrue();
      expect(session.useShuffleTool()).assertTrue();

      expect(session.state.tools.shuffle).assertEqual(UNLIMITED_TOOL_COUNT);
      expect(session.state.tools.hammer).assertEqual(UNLIMITED_TOOL_COUNT);
      expect(session.state.tools.brush).assertEqual(UNLIMITED_TOOL_COUNT);
      expect(session.state.tools.undo).assertEqual(UNLIMITED_TOOL_COUNT);
    });

    it('hammerToolResolvesMatchCreatedByFallingPieces', 0, () => {
      const session = new GameSession({
        id: 1,
        title: 'Hammer Cascade Test',
        moves: 5,
        board: { rows: 4, cols: 3, pieceTypes: ['red', 'blue', 'yellow', 'green'] },
        goals: [{ type: 'score', count: 5000 }]
      }, 6002);
      const types: PieceType[][] = [
        ['blue', 'green', 'yellow'],
        ['yellow', 'red', 'green'],
        ['red', 'blue', 'red'],
        ['green', 'yellow', 'blue']
      ];
      for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 3; col++) {
          session.state.board.tiles[row][col].piece!.type = types[row][col];
          session.state.board.tiles[row][col].piece!.special = 'none';
        }
      }

      expect(session.useHammerTool({ row: 2, col: 1 })).assertTrue();
      expect(MatchResolver.findMatches(session.state.board).length).assertEqual(0);
      expect(session.state.score).assertLarger(10);
    });

    it('specialSwapResolvesExistingCascadeMatches', 0, () => {
      const session = new GameSession({
        id: 1,
        title: 'Special Cascade Test',
        moves: 5,
        board: { rows: 5, cols: 5, pieceTypes: ['red', 'blue', 'yellow', 'green'] },
        goals: [{ type: 'score', count: 5000 }]
      }, 6003);
      const types: PieceType[][] = [
        ['blue', 'yellow', 'green', 'blue', 'yellow'],
        ['green', 'blue', 'yellow', 'green', 'blue'],
        ['red', 'red', 'red', 'yellow', 'green'],
        ['yellow', 'green', 'blue', 'yellow', 'red'],
        ['green', 'blue', 'yellow', 'green', 'blue']
      ];
      for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 5; col++) {
          session.state.board.tiles[row][col].piece!.type = types[row][col];
          session.state.board.tiles[row][col].piece!.special = 'none';
        }
      }
      session.state.board.tiles[4][0].piece!.special = 'row_clear';

      expect(session.trySwap({ row: 4, col: 0 }, { row: 4, col: 1 })).assertTrue();
      expect(MatchResolver.findMatches(session.state.board).length).assertEqual(0);
    });

    it('brushToolChangesNormalPieceButRejectsSpecialPiece', 0, () => {
      const session = new GameSession({
        id: 1,
        title: 'Brush Tool Test',
        moves: 5,
        board: { rows: 5, cols: 5, pieceTypes: ['red', 'blue', 'yellow', 'green'] },
        goals: [{ type: 'score', count: 1000 }],
        specialPieces: [{ row: 1, col: 1, type: 'red', special: 'row_clear' }]
      }, 60);
      expect(session.useBrushTool({ row: 1, col: 1 })).assertFalse();
      const oldType = session.state.board.tiles[0][0].piece!.type;
      expect(session.useBrushTool({ row: 0, col: 0 })).assertTrue();
      expect(session.state.board.tiles[0][0].piece!.type === oldType).assertFalse();
    });

    it('undoToolRestoresPreviousState', 0, () => {
      const session = new GameSession({
        id: 1,
        title: 'Undo Tool Test',
        moves: 5,
        board: { rows: 5, cols: 5, pieceTypes: ['red', 'blue', 'yellow', 'green'] },
        goals: [{ type: 'score', count: 1000 }]
      }, 61);
      const beforeScore = session.state.score;
      const beforeHammer = session.state.tools.hammer;
      expect(session.useHammerTool({ row: 1, col: 1 })).assertTrue();
      expect(session.useUndoTool()).assertTrue();
      expect(session.state.score).assertEqual(beforeScore);
      expect(session.state.tools.hammer).assertEqual(beforeHammer);
    });

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

    it('sessionTurnsFiveInLineIntoRainbowAndLeavesNoStraightMatches', 0, () => {
      const session = new GameSession({
        id: 1,
        title: 'Five Line Rule Test',
        moves: 5,
        board: { rows: 6, cols: 6, pieceTypes: ['red', 'blue', 'yellow', 'green'] },
        goals: [{ type: 'score', count: 5000 }]
      }, 5023);
      const types: PieceType[][] = [
        ['red', 'red', 'red', 'red', 'red', 'blue'],
        ['blue', 'yellow', 'green', 'blue', 'yellow', 'green'],
        ['yellow', 'green', 'blue', 'yellow', 'green', 'blue'],
        ['green', 'blue', 'yellow', 'green', 'blue', 'yellow'],
        ['blue', 'yellow', 'green', 'blue', 'yellow', 'green'],
        ['yellow', 'green', 'blue', 'yellow', 'green', 'blue']
      ];
      for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 6; col++) {
          session.state.board.tiles[row][col].piece!.type = types[row][col];
          session.state.board.tiles[row][col].piece!.special = 'none';
        }
      }

      session.resolveBoard({ row: 0, col: 2 });

      let rainbowCount = 0;
      for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 6; col++) {
          if (session.state.board.tiles[row][col].piece?.special === 'rainbow') {
            rainbowCount++;
          }
        }
      }
      expect(rainbowCount).assertEqual(1);
      expect(MatchResolver.findMatches(session.state.board).length).assertEqual(0);
    });

    it('sessionCreatesSpecialsForSeparateFiveAndFourMatchesInSameResolution', 0, () => {
      const session = new GameSession({
        id: 1,
        title: 'Multiple Special Rule Test',
        moves: 5,
        board: { rows: 6, cols: 6, pieceTypes: ['red', 'blue', 'yellow', 'green'] },
        goals: [{ type: 'score', count: 5000 }]
      }, 5024);
      const types: PieceType[][] = [
        ['red', 'red', 'red', 'red', 'red', 'blue'],
        ['blue', 'yellow', 'green', 'blue', 'yellow', 'green'],
        ['yellow', 'green', 'blue', 'yellow', 'green', 'blue'],
        ['green', 'blue', 'yellow', 'green', 'blue', 'yellow'],
        ['yellow', 'yellow', 'yellow', 'yellow', 'green', 'blue'],
        ['blue', 'green', 'blue', 'yellow', 'green', 'red']
      ];
      for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 6; col++) {
          session.state.board.tiles[row][col].piece!.type = types[row][col];
          session.state.board.tiles[row][col].piece!.special = 'none';
        }
      }

      session.resolveBoard({ row: 0, col: 2 });

      let rainbowCount = 0;
      let rowClearCount = 0;
      for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 6; col++) {
          const special = session.state.board.tiles[row][col].piece?.special;
          if (special === 'rainbow') {
            rainbowCount++;
          }
          if (special === 'row_clear') {
            rowClearCount++;
          }
        }
      }
      expect(rainbowCount).assertEqual(1);
      expect(rowClearCount).assertEqual(1);
      expect(MatchResolver.findMatches(session.state.board).length).assertEqual(0);
    });

    it('createsRowClearForFourHorizontalMatch', 0, () => {
      const board = BoardFactory.create({ rows: 5, cols: 5, seed: 25 });
      for (let col = 0; col < 4; col++) {
        board.tiles[1][col].piece!.type = 'blue';
      }
      const matches = MatchResolver.findMatches(board);
      const creation = SpecialResolver.chooseCreation(matches, { row: 1, col: 2 });
      expect(creation?.special).assertEqual('row_clear');
      if (board.tiles[1][2].piece) {
        board.tiles[1][2].piece!.special = 'row_clear';
      }
      const activated = SpecialResolver.activatedPositions(board, { row: 1, col: 2 });
      expect(activated.length).assertEqual(board.cols);
    });

    it('createsBombForTShapeMatch', 0, () => {
      const board = BoardFactory.create({ rows: 5, cols: 5, seed: 91 });
      const types: PieceType[][] = [
        ['blue', 'yellow', 'red', 'green', 'blue'],
        ['yellow', 'green', 'red', 'blue', 'yellow'],
        ['green', 'red', 'red', 'red', 'green'],
        ['blue', 'yellow', 'red', 'green', 'blue'],
        ['red', 'blue', 'green', 'yellow', 'red']
      ];
      for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 5; col++) {
          board.tiles[row][col].piece!.type = types[row][col];
          board.tiles[row][col].piece!.special = 'none';
        }
      }
      const creation = SpecialResolver.chooseCreation(MatchResolver.findMatches(board), { row: 2, col: 2 });
      expect(creation?.special).assertEqual('bomb');
    });

    it('matchingExistingRowClearActivatesWholeRow', 0, () => {
      const session = new GameSession({
        id: 1,
        title: 'Special Match Test',
        moves: 5,
        board: { rows: 5, cols: 5, pieceTypes: ['red', 'blue', 'yellow', 'green'] },
        goals: [{ type: 'score', count: 2000 }]
      }, 314);
      const types: PieceType[][] = [
        ['red', 'blue', 'yellow', 'green', 'red'],
        ['blue', 'red', 'red', 'red', 'yellow'],
        ['yellow', 'green', 'blue', 'yellow', 'green'],
        ['green', 'yellow', 'green', 'blue', 'red'],
        ['red', 'blue', 'yellow', 'green', 'blue']
      ];
      for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 5; col++) {
          session.state.board.tiles[row][col].piece!.type = types[row][col];
          session.state.board.tiles[row][col].piece!.special = 'none';
        }
      }
      session.state.board.tiles[1][1].piece!.special = 'row_clear';
      session.resolveBoard();
      expect(session.state.score).assertLarger(40);
    });

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

    it('clearingPieceOnIceCountsTowardIceGoal', 0, () => {
      const session = new GameSession({
        id: 20,
        title: 'Ice Test',
        moves: 5,
        board: { rows: 8, cols: 8, pieceTypes: ['red', 'blue', 'yellow', 'green'] },
        goals: [{ type: 'clear_ice', count: 1 }],
        blockers: [{ row: 0, col: 0, type: 'ice', hp: 1 }]
      }, 20);
      session.state.board.tiles[0][0].piece!.type = 'red';
      session.state.board.tiles[0][1].piece!.type = 'red';
      session.state.board.tiles[0][2].piece!.type = 'red';
      session.resolveBoard();
      expect(session.state.goals[0].count).assertEqual(0);
    });

    it('mapsCanvasPointToBoardPosition', 0, () => {
      const board = BoardFactory.create({ rows: 8, cols: 8, seed: 5 });
      const layout = BoardLayout.compute(board, 400, 520);
      const position = BoardLayout.hitTest(board, layout, layout.offsetX + 10, layout.offsetY + 10);
      expect(position?.row).assertEqual(0);
      expect(position?.col).assertEqual(0);
    });

    it('plansFallAnimationFromPreviousPieceLocations', 0, () => {
      const before = BoardFactory.create({ rows: 3, cols: 1, seed: 301, pieceTypes: ['red', 'blue', 'yellow'] });
      before.tiles[0][0].piece = undefined;
      before.tiles[1][0].piece = {
        id: 'falling_piece',
        type: 'blue',
        special: 'none'
      };
      before.tiles[2][0].piece = {
        id: 'bottom_piece',
        type: 'red',
        special: 'none'
      };
      const after = cloneBoard(before);
      after.tiles[0][0].piece = {
        id: 'spawned_piece',
        type: 'yellow',
        special: 'none'
      };
      after.tiles[1][0].piece = after.tiles[2][0].piece;
      after.tiles[2][0].piece = before.tiles[1][0].piece;

      const effects = BoardAnimationPlanner.buildFallEffects(before, after, 40, 0);
      const falling = effects.find(effect => effect.row === 2 && effect.col === 0);
      const spawned = effects.find(effect => effect.row === 0 && effect.col === 0);

      expect(falling?.offsetY).assertEqual(-40);
      expect(spawned?.offsetY).assertEqual(-40);
      expect((spawned?.opacity ?? 1) < 1).assertTrue();
    });

    it('recordsWinningProgressAndUnlocksNextLevel', 0, async () => {
      const service = new ProgressService(new MemoryProgressRepository());
      const saved = await service.recordResult({ levelId: 1, won: true, score: 1200, movesLeft: 8 });
      const unlocked = await service.getUnlockedLevel();
      expect(saved.cleared).assertTrue();
      expect(saved.stars).assertEqual(2);
      expect(unlocked).assertEqual(2);
    });

    it('keepsBestStarsWhenReplayingLevel', 0, async () => {
      const service = new ProgressService(new MemoryProgressRepository());
      await service.recordResult({ levelId: 1, won: true, score: 1000, movesLeft: 12 });
      const replay = await service.recordResult({ levelId: 1, won: true, score: 900, movesLeft: 2 });
      expect(replay.stars).assertEqual(3);
      expect(replay.bestScore).assertEqual(1000);
    });

    it('doesNotUnlockNextLevelAfterFailure', 0, async () => {
      const service = new ProgressService(new MemoryProgressRepository());
      await service.recordResult({ levelId: 1, won: false, score: 300, movesLeft: 0 });
      const unlocked = await service.getUnlockedLevel();
      expect(unlocked).assertEqual(1);
    });
  });
}
