import { describe, it, expect } from '@ohos/hypium';
import { BoardFactory, SeededRandom } from '../main/ets/game/core/BoardFactory';
import { cloneBoard, swapPieces } from '../main/ets/game/core/BoardSnapshot';
import { GameSession, UNLIMITED_TOOL_COUNT } from '../main/ets/game/core/GameSession';
import { BoardMoveAnalyzer } from '../main/ets/game/core/BoardMoveAnalyzer';
import { GravityResolver } from '../main/ets/game/core/GravityResolver';
import { MatchResolver } from '../main/ets/game/core/MatchResolver';
import { SpecialResolver } from '../main/ets/game/core/SpecialResolver';
import { PieceType } from '../main/ets/game/core/Types';
import { EconomyService } from '../main/ets/game/economy/EconomyService';
import { deriveAchievements } from '../main/ets/game/achievements/AchievementService';
import { chapterProgressText, getLevelChapter } from '../main/ets/game/levels/LevelChapters';
import { getLevelWorldTheme } from '../main/ets/game/levels/LevelWorldThemes';
import { isLevelPlayable, isWorldEntryLevel } from '../main/ets/game/levels/LevelUnlocks';
import { LEVEL_MAPS, LEVEL_MAP_RAWFILE_PATHS } from '../main/ets/game/levels/LevelMaps';
import { LEVELS } from '../main/ets/game/levels/levels';
import { BoardAnimationPlanner } from '../main/ets/game/render/BoardAnimationPlanner';
import { BoardLayout } from '../main/ets/game/render/BoardLayout';
import { CanvasRenderer, GameCanvasContext } from '../main/ets/game/render/CanvasRenderer';
import { GameSettingsService } from '../main/ets/game/settings/GameSettings';
import { PortalResolver } from '../main/ets/game/mechanics/PortalResolver';
import { MemoryProgressRepository } from '../main/ets/game/storage/MemoryProgressRepository';
import { ProgressService } from '../main/ets/game/storage/ProgressService';
import { hasTutorial, tutorialStepsForLevel } from '../main/ets/game/tutorial/TutorialGuide';

class CountingCanvasContext implements GameCanvasContext {
  fillStyle: string = '';
  strokeStyle: string = '';
  lineWidth: number = 1;
  font: string = '';
  textAlign: string = '';
  textBaseline: string = '';
  globalAlpha: number = 1;
  operations: number = 0;

  clearRect(x: number, y: number, width: number, height: number): void {
    this.operations++;
  }

  save(): void {
    this.operations++;
  }

  restore(): void {
    this.operations++;
  }

  fill(): void {
    this.operations++;
  }

  stroke(): void {
    this.operations++;
  }

  beginPath(): void {
    this.operations++;
  }

  closePath(): void {
    this.operations++;
  }

  arc(x: number, y: number, radius: number, startAngle: number, endAngle: number): void {
    this.operations++;
  }

  arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): void {
    this.operations++;
  }

  ellipse(
    x: number,
    y: number,
    radiusX: number,
    radiusY: number,
    rotation: number,
    startAngle: number,
    endAngle: number
  ): void {
    this.operations++;
  }

  moveTo(x: number, y: number): void {
    this.operations++;
  }

  lineTo(x: number, y: number): void {
    this.operations++;
  }

  fillText(text: string, x: number, y: number): void {
    this.operations++;
  }
}

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

    it('createBoardsWithoutInitialMatchesAcrossManySeeds', 0, () => {
      for (let seed = 1; seed <= 120; seed++) {
        const board = BoardFactory.create({ rows: 9, cols: 9, seed, pieceTypes: ['red', 'blue', 'yellow'] });
        expect(MatchResolver.findMatches(board).length).assertEqual(0);
      }
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

    it('moveAnalyzerRejectsOutOfBoundsCoordinates', 0, () => {
      const board = BoardFactory.create({ rows: 5, cols: 5, seed: 2026, pieceTypes: ['red', 'blue', 'yellow'] });
      expect(BoardMoveAnalyzer.isValidMove(board, { row: -1, col: 0 }, { row: 0, col: 0 })).assertFalse();
      expect(BoardMoveAnalyzer.isValidMove(board, { row: 0, col: 0 }, { row: 5, col: 0 })).assertFalse();
    });

    it('levelFiveIntroducesPresetSpecialPieces', 0, () => {
      expect((LEVELS[4].specialPieces?.length ?? 0)).assertLarger(0);
      expect(LEVELS[4].goals.some(goal => goal.type === 'collect_special' && goal.targetSpecial === 'row_clear')).assertTrue();
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

    it('tutorialGuideCoversFirstFiveLevelsOnly', 0, () => {
      for (let levelId = 1; levelId <= 5; levelId++) {
        expect(hasTutorial(levelId)).assertTrue();
        expect(tutorialStepsForLevel(levelId).length).assertLarger(0);
      }
      expect(hasTutorial(6)).assertFalse();
      expect(tutorialStepsForLevel(6).length).assertEqual(0);
    });

    it('settingsServiceTogglesFeedbackFlags', 0, () => {
      const service = new GameSettingsService();
      service.setSoundEnabled(false);
      service.setVibrationEnabled(false);
      service.setReducedMotion(true);
      expect(service.getState().soundEnabled).assertFalse();
      expect(service.getState().vibrationEnabled).assertFalse();
      expect(service.getState().reducedMotion).assertTrue();
      service.resetForTest();
      expect(service.getState().soundEnabled).assertTrue();
      expect(service.getState().vibrationEnabled).assertTrue();
      expect(service.getState().reducedMotion).assertFalse();
    });

    it('achievementServiceDerivesProgressMilestones', 0, () => {
      const progress: LevelProgress[] = [];
      for (let levelId = 1; levelId <= 20; levelId++) {
        progress.push({
          levelId,
          cleared: true,
          stars: levelId <= 10 ? 3 : 1,
          bestScore: 1000 + levelId,
          updatedAt: levelId
        });
      }
      const summary = deriveAchievements(progress, { coins: 900, purchases: 0 });
      expect(summary.unlockedCount).assertLarger(3);
      expect(summary.items.find(item => item.id === 'chapter_one_clear')?.unlocked).assertTrue();
      expect(summary.items.find(item => item.id === 'ten_three_stars')?.unlocked).assertTrue();
      expect(summary.items.find(item => item.id === 'coin_saver')?.unlocked).assertTrue();
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

    it('usesOneHundredJsonBackedLevelMaps', 0, () => {
      expect(LEVEL_MAPS.length).assertEqual(100);
      expect(LEVEL_MAP_RAWFILE_PATHS.length).assertEqual(100);
      expect(LEVEL_MAP_RAWFILE_PATHS[0]).assertEqual('levels/level_001.json');
      expect(LEVEL_MAP_RAWFILE_PATHS[99]).assertEqual('levels/level_100.json');
    });

    it('mapsLevelsIntoFiveChapters', 0, () => {
      expect(getLevelChapter(1).name).assertEqual('糖果天空岛');
      expect(getLevelChapter(21).name).assertEqual('冰霜云层');
      expect(getLevelChapter(41).name).assertEqual('糖果工厂');
      expect(getLevelChapter(61).name).assertEqual('云洞传送站');
      expect(getLevelChapter(100).name).assertEqual('彩虹终章');
      expect(chapterProgressText(45)).assertEqual('糖果工厂 5/20');
    });

    it('worldEntryLevelsStayPlayableForDemo', 0, () => {
      const entryLevels: number[] = [1, 21, 41, 61, 81];
      entryLevels.forEach(levelId => {
        expect(isWorldEntryLevel(levelId)).assertTrue();
        expect(isLevelPlayable(levelId, 1)).assertTrue();
      });
      expect(isLevelPlayable(22, 1)).assertFalse();
      expect(isLevelPlayable(82, 60)).assertFalse();
    });

    it('fiveWorldsUseDistinctVisualThemes', 0, () => {
      const patternKeys = new Set<string>();
      const boardFills = new Set<string>();
      [1, 21, 41, 61, 81].forEach(levelId => {
        const theme = getLevelWorldTheme(levelId);
        patternKeys.add(theme.board.pattern);
        boardFills.add(theme.board.fill);
      });
      expect(patternKeys.size).assertEqual(5);
      expect(boardFills.size).assertEqual(5);
    });

    it('earlyLevelsUseVariedBoardSizesAndHoles', 0, () => {
      const sizeKeys = new Set<string>();
      let earlyHoleLevels = 0;
      for (let index = 0; index < 20; index++) {
        const level = LEVELS[index];
        sizeKeys.add(`${level.board.rows}x${level.board.cols}`);
        const holes = level.blockers?.filter(blocker => blocker.type === 'hole') ?? [];
        if (holes.length > 0) {
          earlyHoleLevels++;
        }
      }
      expect(sizeKeys.size).assertLarger(2);
      expect(earlyHoleLevels).assertLarger(4);
    });

    it('levelConfigsFollowJsonMapDimensions', 0, () => {
      for (let index = 0; index < LEVELS.length; index++) {
        expect(LEVELS[index].board.rows).assertEqual(LEVEL_MAPS[index].rows);
        expect(LEVELS[index].board.cols).assertEqual(LEVEL_MAPS[index].cols);
      }
    });

    it('allLevelConfigsKeepBlockersAndSpecialsInsidePlayableCells', 0, () => {
      LEVELS.forEach(level => {
        const unavailableCells = new Set<string>();
        level.blockers?.forEach(blocker => {
          expect(blocker.row >= 0 && blocker.row < level.board.rows).assertTrue();
          expect(blocker.col >= 0 && blocker.col < level.board.cols).assertTrue();
          expect(blocker.hp >= 1).assertTrue();
          if (blocker.type === 'hole' || blocker.type === 'marshmallow') {
            unavailableCells.add(`${blocker.row}_${blocker.col}`);
          }
        });
        level.specialPieces?.forEach(piece => {
          expect(piece.row >= 0 && piece.row < level.board.rows).assertTrue();
          expect(piece.col >= 0 && piece.col < level.board.cols).assertTrue();
          expect(unavailableCells.has(`${piece.row}_${piece.col}`)).assertFalse();
        });
      });
    });

    it('allLevelsBootIntoStablePlayableBoards', 0, () => {
      LEVELS.forEach(level => {
        const session = new GameSession(level, 20260523 + level.id);
        const initialMatches = MatchResolver.findMatches(session.state.board);
        expect(session.state.board.rows).assertEqual(level.board.rows);
        expect(session.state.board.cols).assertEqual(level.board.cols);
        if (initialMatches.length > 0) {
          throw new Error(`Level ${level.id} boots with ${initialMatches.length} initial matches.`);
        }
        expect(session.hasAvailableMove()).assertTrue();
        level.blockers?.forEach(blocker => {
          if (blocker.type === 'hole' || blocker.type === 'marshmallow') {
            expect(Boolean(session.state.board.tiles[blocker.row][blocker.col].piece)).assertFalse();
          }
        });
      });
    });

    it('levelsIncludeDecorativeMapShapes', 0, () => {
      const shapes = new Set<string>();
      LEVEL_MAPS.forEach(map => {
        shapes.add(map.shape);
      });
      expect(shapes.has('heart')).assertTrue();
      expect(shapes.has('butterfly')).assertTrue();
      expect(shapes.has('spiral')).assertTrue();
      expect(shapes.size).assertLarger(11);
    });

    it('interiorHolesAreUsedBeforeLevelTwenty', 0, () => {
      let interiorHoleLevels = 0;
      for (let index = 0; index < 20; index++) {
        const map = LEVEL_MAPS[index];
        const holes = map.blockers.filter(blocker => blocker.type === 'hole');
        const hasInteriorHole = holes.some(hole => {
          return hole.row > 0 && hole.row < map.rows - 1 && hole.col > 0 && hole.col < map.cols - 1;
        });
        if (hasInteriorHole) {
          interiorHoleLevels++;
        }
      }
      expect(interiorHoleLevels).assertLarger(7);
    });

    it('levelHolesStayUnderScaledLimit', 0, () => {
      LEVEL_MAPS.forEach(map => {
        const holes = map.blockers.filter(blocker => blocker.type === 'hole');
        const limit = Math.floor(6 * map.rows * map.cols / 64);
        expect(holes.length <= limit).assertTrue();
      });
    });

    it('scoreGoalsUseOriginalBaselineAndExistOnEveryLevel', 0, () => {
      LEVEL_MAPS.forEach(map => {
        const scoreGoal = map.goals.find(goal => goal.type === 'score');
        expect(Boolean(scoreGoal)).assertTrue();
        let expectedScore = 0;
        if (map.id < 10) {
          expectedScore = 520 + map.id * 110;
        } else if (map.id < 20) {
          expectedScore = 680 + map.id * 110;
        } else {
          expectedScore = 2600 + map.id * 85;
        }
        expect(scoreGoal?.count).assertEqual(expectedScore);
      });
    });

    it('someLaterLevelsAskForSpecialCollectionGoals', 0, () => {
      const specialGoalLevels = LEVELS.filter(level => {
        return level.goals.some(goal => goal.type === 'collect_special');
      });
      expect(specialGoalLevels.length).assertLarger(5);
      specialGoalLevels.forEach(level => {
        const specials = level.specialPieces ?? [];
        expect(specials.length).assertLarger(0);
      });
    });

    it('levelMissionsAddCollectionComboAndSpecialComboVariants', 0, () => {
      const earlyMissionLevels = LEVELS.slice(5, 20).filter(level => {
        return level.goals.some(goal => goal.type === 'collect_piece');
      });
      const comboMissionLevels = LEVELS.slice(20, 60).filter(level => {
        return level.goals.some(goal => goal.type === 'combo_goal');
      });
      const specialComboMissionLevels = LEVELS.slice(60).filter(level => {
        return level.goals.some(goal => goal.type === 'special_combo_goal');
      });
      const rainbowComboMissionLevels = LEVELS.slice(80).filter(level => {
        return level.goals.some(goal => goal.type === 'special_combo_goal' && goal.comboType === 'rainbow_functional');
      });

      expect(earlyMissionLevels.length).assertLarger(6);
      expect(comboMissionLevels.length).assertLarger(5);
      expect(specialComboMissionLevels.length).assertLarger(5);
      expect(rainbowComboMissionLevels.length).assertLarger(8);
    });

    it('holeTilesStayEmptyAfterGravity', 0, () => {
      const board = BoardFactory.create({ rows: 5, cols: 5, seed: 777, pieceTypes: ['red', 'blue', 'yellow', 'green'] });
      board.tiles[2][2].blocker = { type: 'hole', hp: 1 };
      board.tiles[2][2].piece = undefined;
      GravityResolver.collapseAndRefill(board, ['red', 'blue', 'yellow', 'green'], new SeededRandom(7), 'hole_test');
      expect(Boolean(board.tiles[2][2].piece)).assertFalse();
    });

    it('portalResolverSwapsEntryAndExitPieces', 0, () => {
      const board = BoardFactory.create({ rows: 3, cols: 3, seed: 778, pieceTypes: ['red', 'blue', 'yellow'] });
      board.tiles[0][0].blocker = { type: 'portal', hp: 1, portalId: 'entry', targetPortalId: 'exit' };
      board.tiles[2][2].blocker = { type: 'portal', hp: 1, portalId: 'exit' };
      const entryId = board.tiles[0][0].piece!.id;
      const exitId = board.tiles[2][2].piece!.id;

      const moves = PortalResolver.apply(board);

      expect(moves.length).assertEqual(1);
      expect(board.tiles[0][0].piece!.id).assertEqual(exitId);
      expect(board.tiles[2][2].piece!.id).assertEqual(entryId);
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
      expect(session.state.tools.addMoves).assertEqual(UNLIMITED_TOOL_COUNT);
      expect(session.state.tools.undo).assertEqual(UNLIMITED_TOOL_COUNT);

      expect(session.useHammerTool({ row: 1, col: 1 })).assertTrue();
      expect(session.useUndoTool()).assertTrue();
      expect(session.useShuffleTool()).assertTrue();
      expect(session.useAddMovesTool(3)).assertTrue();

      expect(session.state.tools.shuffle).assertEqual(UNLIMITED_TOOL_COUNT);
      expect(session.state.tools.hammer).assertEqual(UNLIMITED_TOOL_COUNT);
      expect(session.state.tools.brush).assertEqual(UNLIMITED_TOOL_COUNT);
      expect(session.state.tools.addMoves).assertEqual(UNLIMITED_TOOL_COUNT);
      expect(session.state.tools.undo).assertEqual(UNLIMITED_TOOL_COUNT);
    });

    it('addMovesToolAddsThreeMovesAndCanBeUndone', 0, () => {
      const session = new GameSession({
        id: 1,
        title: 'Add Moves Tool Test',
        moves: 5,
        board: { rows: 5, cols: 5, pieceTypes: ['red', 'blue', 'yellow', 'green'] },
        goals: [{ type: 'score', count: 5000 }]
      }, 6005);

      expect(session.useAddMovesTool(3)).assertTrue();
      expect(session.state.movesLeft).assertEqual(8);
      expect(session.useUndoTool()).assertTrue();
      expect(session.state.movesLeft).assertEqual(5);
    });

    it('continuesPlayingAfterBaseScoreWhenMovesRemain', 0, () => {
      const session = new GameSession({
        id: 1,
        title: 'Base Score Continue Test',
        moves: 5,
        board: { rows: 5, cols: 5, pieceTypes: ['red', 'blue', 'yellow', 'green'] },
        goals: [{ type: 'score', count: 10 }]
      }, 6011);

      expect(session.useHammerTool({ row: 0, col: 0 })).assertTrue();

      expect(session.state.score >= 10).assertTrue();
      expect(session.state.movesLeft).assertLarger(0);
      expect(session.state.status).assertEqual('playing');
    });

    it('remainingMoveBonusConvertsMovesIntoFunctionalSpecialsBeforeWinning', 0, () => {
      const session = new GameSession({
        id: 1,
        title: 'Remaining Move Bonus Test',
        moves: 4,
        board: { rows: 5, cols: 5, pieceTypes: ['red', 'blue', 'yellow', 'green'] },
        goals: [{ type: 'score', count: 10 }]
      }, 6012);
      session.state.score = 15;

      expect(session.shouldAwardRemainingMovesBonus()).assertTrue();
      const movesBeforeBonus = session.state.movesLeft;
      const bonus = session.awardRemainingMovesAsSpecials();

      expect(Boolean(bonus)).assertTrue();
      expect(bonus!.convertedPositions.length).assertEqual(movesBeforeBonus);
      bonus!.convertedPositions.forEach(position => {
        const piece = bonus!.convertedBoard.tiles[position.row][position.col].piece;
        expect(Boolean(piece)).assertTrue();
        expect(piece!.special === 'row_clear' || piece!.special === 'col_clear' || piece!.special === 'bomb').assertTrue();
      });
      expect(session.state.movesLeft).assertEqual(0);
      expect(session.state.status).assertEqual('won');
      expect(session.state.score).assertLarger(15);
    });

    it('economyPurchaseCanReviveALostLevelWithExtraMoves', 0, () => {
      const economy = new EconomyService();
      economy.resetForTest(150);
      const product = economy.getProduct('extra_moves');
      const session = new GameSession({
        id: 1,
        title: 'Revive Test',
        moves: 1,
        board: { rows: 5, cols: 5, pieceTypes: ['red', 'blue', 'yellow', 'green'] },
        goals: [{ type: 'score', count: 9999 }]
      }, 6004);
      session.state.movesLeft = 0;
      session.state.status = 'lost';

      expect(economy.purchase('extra_moves')).assertTrue();
      expect(session.reviveWithMoves(product.extraMoves)).assertTrue();

      expect(economy.getWallet().coins).assertEqual(130);
      expect(session.state.status).assertEqual('playing');
      expect(session.state.movesLeft).assertEqual(5);
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

    it('nonRainbowSpecialSwapRequiresAMatch', 0, () => {
      const session = new GameSession({
        id: 1,
        title: 'Special Rule Test',
        moves: 5,
        board: { rows: 4, cols: 4, pieceTypes: ['red', 'blue', 'yellow', 'green'] },
        goals: [{ type: 'score', count: 5000 }]
      }, 6201);
      const types: PieceType[][] = [
        ['red', 'blue', 'yellow', 'green'],
        ['green', 'yellow', 'blue', 'red'],
        ['blue', 'red', 'green', 'yellow'],
        ['yellow', 'green', 'red', 'blue']
      ];
      for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
          session.state.board.tiles[row][col].piece!.type = types[row][col];
          session.state.board.tiles[row][col].piece!.special = 'none';
        }
      }
      session.state.board.tiles[1][1].piece!.special = 'row_clear';

      expect(session.trySwap({ row: 1, col: 1 }, { row: 1, col: 2 })).assertFalse();
      expect(session.state.movesLeft).assertEqual(5);
    });

    it('nonRainbowSpecialNormalSwapIsNotAvailableMoveWithoutMatch', 0, () => {
      const board = BoardFactory.create({ rows: 4, cols: 4, seed: 6204, pieceTypes: ['red', 'blue', 'yellow', 'green'] });
      const types: PieceType[][] = [
        ['red', 'blue', 'yellow', 'green'],
        ['green', 'yellow', 'blue', 'red'],
        ['blue', 'red', 'green', 'yellow'],
        ['yellow', 'green', 'red', 'blue']
      ];
      for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
          board.tiles[row][col].piece!.type = types[row][col];
          board.tiles[row][col].piece!.special = 'none';
        }
      }
      board.tiles[1][1].piece!.special = 'row_clear';

      expect(BoardMoveAnalyzer.isValidMove(board, { row: 1, col: 1 }, { row: 1, col: 2 })).assertFalse();
    });

    it('functionalSpecialsCanSwapDirectly', 0, () => {
      const session = new GameSession({
        id: 1,
        title: 'Functional Combo Test',
        moves: 5,
        board: { rows: 5, cols: 5, pieceTypes: ['red', 'blue', 'yellow', 'green'] },
        goals: [{ type: 'score', count: 5000 }]
      }, 6205);
      const types: PieceType[][] = [
        ['red', 'blue', 'yellow', 'green', 'red'],
        ['green', 'yellow', 'blue', 'red', 'green'],
        ['blue', 'red', 'green', 'yellow', 'blue'],
        ['yellow', 'green', 'red', 'blue', 'yellow'],
        ['red', 'blue', 'yellow', 'green', 'red']
      ];
      for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 5; col++) {
          session.state.board.tiles[row][col].piece!.type = types[row][col];
          session.state.board.tiles[row][col].piece!.special = 'none';
        }
      }
      session.state.board.tiles[2][2].piece!.special = 'row_clear';
      session.state.board.tiles[2][3].piece!.special = 'col_clear';

      expect(session.trySwap({ row: 2, col: 2 }, { row: 2, col: 3 })).assertTrue();
      expect(session.state.movesLeft).assertEqual(4);
      expect(session.state.score).assertLarger(80);
    });

    it('bombBombSwapCreatesLargerExplosion', 0, () => {
      const board = BoardFactory.create({ rows: 7, cols: 7, seed: 6206, pieceTypes: ['red', 'blue', 'yellow', 'green'] });
      board.tiles[3][3].piece!.special = 'bomb';
      board.tiles[3][4].piece!.special = 'bomb';

      const positions = SpecialResolver.swapActivatedPositions(board, { row: 3, col: 3 }, { row: 3, col: 4 });
      const keys = new Set<string>();
      positions.forEach(position => {
        keys.add(`${position.row}_${position.col}`);
      });

      expect(keys.has('1_1')).assertTrue();
      expect(keys.has('5_6')).assertTrue();
      expect(positions.length).assertLarger(24);
    });

    it('refillIdsStayUniqueAcrossMultipleMoves', 0, () => {
      const session = new GameSession({
        id: 1,
        title: 'Unique Refill Id Test',
        moves: 8,
        board: { rows: 4, cols: 4, pieceTypes: ['red', 'blue', 'yellow', 'green'] },
        goals: [{ type: 'score', count: 5000 }]
      }, 6202);
      const types: PieceType[][] = [
        ['blue', 'green', 'yellow', 'red'],
        ['red', 'blue', 'green', 'yellow'],
        ['yellow', 'red', 'blue', 'green'],
        ['green', 'yellow', 'red', 'blue']
      ];
      for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
          const piece = session.state.board.tiles[row][col].piece!;
          piece.id = `fixed_${row}_${col}`;
          piece.type = types[row][col];
          piece.special = 'none';
        }
      }
      session.state.board.tiles[0][0].piece!.id = 's_0_0_0_0';

      expect(session.useHammerTool({ row: 1, col: 0 })).assertTrue();

      const ids = new Set<string>();
      let pieceCount = 0;
      for (let row = 0; row < session.state.board.rows; row++) {
        for (let col = 0; col < session.state.board.cols; col++) {
          const piece = session.state.board.tiles[row][col].piece;
          if (piece) {
            pieceCount++;
            ids.add(piece.id);
          }
        }
      }
      expect(ids.size).assertEqual(pieceCount);
    });

    it('rainbowLineSpecialSwapActivatesEveryTargetRow', 0, () => {
      const session = new GameSession({
        id: 1,
        title: 'Rainbow Line Combo Test',
        moves: 5,
        board: { rows: 5, cols: 5, pieceTypes: ['red', 'blue', 'yellow', 'green'] },
        goals: [{ type: 'score', count: 5000 }]
      }, 6203);
      const types: PieceType[][] = [
        ['yellow', 'red', 'blue', 'green', 'yellow'],
        ['green', 'blue', 'yellow', 'green', 'blue'],
        ['blue', 'yellow', 'red', 'green', 'blue'],
        ['yellow', 'green', 'blue', 'yellow', 'green'],
        ['green', 'blue', 'yellow', 'green', 'red']
      ];
      for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 5; col++) {
          session.state.board.tiles[row][col].piece!.type = types[row][col];
          session.state.board.tiles[row][col].piece!.special = 'none';
        }
      }
      session.state.board.tiles[0][0].piece!.special = 'rainbow';
      session.state.board.tiles[0][1].piece!.special = 'row_clear';

      const positions = SpecialResolver.swapActivatedPositions(session.state.board, { row: 0, col: 0 }, { row: 0, col: 1 });
      const keys = new Set<string>();
      positions.forEach(position => {
        keys.add(`${position.row}_${position.col}`);
      });

      for (let col = 0; col < 5; col++) {
        expect(keys.has(`2_${col}`)).assertTrue();
        expect(keys.has(`4_${col}`)).assertTrue();
      }
    });

    it('rainbowFunctionalSwapCountsConvertedSpecialsForGoals', 0, () => {
      const session = new GameSession({
        id: 1,
        title: 'Rainbow Converted Goal Test',
        moves: 5,
        board: { rows: 5, cols: 5, pieceTypes: ['red', 'blue', 'yellow', 'green'] },
        goals: [
          { type: 'score', count: 5000 },
          { type: 'collect_special', targetSpecial: 'row_clear', count: 3 }
        ]
      }, 6301);
      const types: PieceType[][] = [
        ['yellow', 'red', 'blue', 'green', 'yellow'],
        ['green', 'blue', 'yellow', 'green', 'blue'],
        ['blue', 'yellow', 'red', 'green', 'blue'],
        ['yellow', 'green', 'blue', 'yellow', 'green'],
        ['green', 'blue', 'yellow', 'green', 'red']
      ];
      for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 5; col++) {
          session.state.board.tiles[row][col].piece!.type = types[row][col];
          session.state.board.tiles[row][col].piece!.special = 'none';
        }
      }
      session.state.board.tiles[0][0].piece!.special = 'rainbow';
      session.state.board.tiles[0][1].piece!.special = 'row_clear';

      expect(session.trySwap({ row: 0, col: 0 }, { row: 0, col: 1 })).assertTrue();
      const specialGoal = session.state.goals.find(goal => goal.type === 'collect_special');
      expect((specialGoal?.count ?? 99) <= 0).assertTrue();
    });

    it('rainbowFunctionalSwapCountsSpecialComboGoals', 0, () => {
      const session = new GameSession({
        id: 1,
        title: 'Rainbow Combo Goal Test',
        moves: 5,
        board: { rows: 5, cols: 5, pieceTypes: ['red', 'blue', 'yellow', 'green'] },
        goals: [
          { type: 'score', count: 5000 },
          { type: 'special_combo_goal', comboType: 'rainbow_functional', count: 1 }
        ]
      }, 6302);
      const types: PieceType[][] = [
        ['yellow', 'red', 'blue', 'green', 'yellow'],
        ['green', 'blue', 'yellow', 'green', 'blue'],
        ['blue', 'yellow', 'red', 'green', 'blue'],
        ['yellow', 'green', 'blue', 'yellow', 'green'],
        ['green', 'blue', 'yellow', 'green', 'red']
      ];
      for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 5; col++) {
          session.state.board.tiles[row][col].piece!.type = types[row][col];
          session.state.board.tiles[row][col].piece!.special = 'none';
        }
      }
      session.state.board.tiles[0][0].piece!.special = 'rainbow';
      session.state.board.tiles[0][1].piece!.special = 'row_clear';

      expect(session.trySwap({ row: 0, col: 0 }, { row: 0, col: 1 })).assertTrue();
      const comboGoal = session.state.goals.find(goal => goal.type === 'special_combo_goal');
      expect(comboGoal?.count).assertEqual(0);
    });

    it('comboGoalCompletesWhenActionCreatesCascade', 0, () => {
      const session = new GameSession({
        id: 1,
        title: 'Cascade Goal Test',
        moves: 5,
        board: { rows: 4, cols: 3, pieceTypes: ['red', 'blue', 'yellow', 'green'] },
        goals: [
          { type: 'score', count: 5000 },
          { type: 'combo_goal', comboLength: 2, count: 1 }
        ]
      }, 6303);
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
      const comboGoal = session.state.goals.find(goal => goal.type === 'combo_goal');
      expect(session.state.lastCascadeCount).assertLarger(1);
      expect(comboGoal?.count).assertEqual(0);
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

    it('brushToolChangesNormalPieceToSelectedColor', 0, () => {
      const session = new GameSession({
        id: 1,
        title: 'Brush Selected Color Test',
        moves: 5,
        board: { rows: 5, cols: 5, pieceTypes: ['red', 'blue', 'yellow', 'green', 'purple', 'orange'] },
        goals: [{ type: 'score', count: 1000 }]
      }, 62);
      session.state.board.tiles[0][0].piece!.type = 'red';
      session.state.board.tiles[0][0].piece!.special = 'none';

      expect(session.useBrushTool({ row: 0, col: 0 }, 'purple')).assertTrue();
      expect(session.state.board.tiles[0][0].piece!.type).assertEqual('purple');
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

    it('settlePlannerSkipsStillPieces', 0, () => {
      const before = BoardFactory.create({ rows: 3, cols: 2, seed: 302, pieceTypes: ['red', 'blue', 'yellow'] });
      const after = cloneBoard(before);
      after.tiles[2][0].piece = after.tiles[1][0].piece;
      after.tiles[1][0].piece = after.tiles[0][0].piece;
      after.tiles[0][0].piece = {
        id: 'spawned_piece_for_sparse_motion',
        type: 'yellow',
        special: 'none'
      };

      const effects = BoardAnimationPlanner.planFallEffects(before, after, 40);

      expect(effects.length).assertEqual(3);
      expect(Boolean(effects.find(effect => effect.row === 0 && effect.col === 1))).assertFalse();
      expect(Boolean(effects.find(effect => effect.row === 1 && effect.col === 1))).assertFalse();
      expect(Boolean(effects.find(effect => effect.row === 2 && effect.col === 1))).assertFalse();
    });

    it('animatedCanvasRenderingKeepsFullMaterialUnlessFastModeIsExplicit', 0, () => {
      const board = BoardFactory.create({ rows: 8, cols: 8, seed: 303, pieceTypes: ['red', 'blue', 'yellow', 'green', 'purple', 'orange'] });
      const renderer = new CanvasRenderer();
      const staticContext = new CountingCanvasContext();
      const animatedFullContext = new CountingCanvasContext();
      const animatedFastStaticContext = new CountingCanvasContext();
      const animatedFastContext = new CountingCanvasContext();
      renderer.draw(staticContext, board, { width: 360, height: 420 });
      renderer.draw(animatedFullContext, board, {
        width: 360,
        height: 420,
        animation: {
          pieceEffects: [{ row: 0, col: 0, offsetX: 24, offsetY: 0, scale: 1.04, opacity: 1 }]
        }
      });
      renderer.draw(animatedFastContext, board, {
        width: 360,
        height: 420,
        animation: {
          pieceEffects: [{ row: 0, col: 0, offsetX: 0, offsetY: 24, scale: 1, opacity: 1 }],
          fastMode: true
        }
      });
      renderer.draw(animatedFastStaticContext, board, {
        width: 360,
        height: 420,
        animation: {
          pieceEffects: [{ row: 0, col: 0, offsetX: 24, offsetY: 0, scale: 1.04, opacity: 1 }],
          fastStaticMode: true
        }
      });

      expect(animatedFullContext.operations).assertEqual(staticContext.operations);
      expect(animatedFastStaticContext.operations < staticContext.operations).assertTrue();
      expect(animatedFastContext.operations < staticContext.operations).assertTrue();
    });

    it('recordsWinningProgressAndUnlocksNextLevel', 0, async () => {
      const service = new ProgressService(new MemoryProgressRepository());
      const saved = await service.recordResult({ levelId: 1, won: true, score: 1200, movesLeft: 8, targetScore: 1000 });
      const unlocked = await service.getUnlockedLevel();
      expect(saved.cleared).assertTrue();
      expect(saved.stars).assertEqual(2);
      expect(unlocked).assertEqual(2);
    });

    it('keepsBestStarsWhenReplayingLevel', 0, async () => {
      const service = new ProgressService(new MemoryProgressRepository());
      await service.recordResult({ levelId: 1, won: true, score: 1500, movesLeft: 1, targetScore: 1000 });
      const replay = await service.recordResult({ levelId: 1, won: true, score: 1000, movesLeft: 12, targetScore: 1000 });
      expect(replay.stars).assertEqual(3);
      expect(replay.bestScore).assertEqual(1500);
    });

    it('calculatesStarsFromScoreMilestones', 0, () => {
      const service = new ProgressService(new MemoryProgressRepository());
      expect(service.calculateStars(true, 1000, 1000)).assertEqual(1);
      expect(service.calculateStars(true, 1200, 1000)).assertEqual(2);
      expect(service.calculateStars(true, 1500, 1000)).assertEqual(3);
      expect(service.calculateStars(false, 2000, 1000)).assertEqual(0);
    });

    it('doesNotUnlockNextLevelAfterFailure', 0, async () => {
      const service = new ProgressService(new MemoryProgressRepository());
      await service.recordResult({ levelId: 1, won: false, score: 300, movesLeft: 0, targetScore: 1000 });
      const unlocked = await service.getUnlockedLevel();
      expect(unlocked).assertEqual(1);
    });
  });
}
