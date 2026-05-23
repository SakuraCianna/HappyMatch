import { describe, it, expect } from '@ohos/hypium';
import { BoardFactory } from '../main/ets/game/core/BoardFactory';
import { GameSession } from '../main/ets/game/core/GameSession';
import { MatchResolver } from '../main/ets/game/core/MatchResolver';
import { SpecialResolver } from '../main/ets/game/core/SpecialResolver';
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
