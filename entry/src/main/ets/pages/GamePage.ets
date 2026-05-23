import { router } from '@kit.ArkUI';
import { common } from '@kit.AbilityKit';
import { BoardInputMapper } from '../game/input/BoardInputMapper';
import { cloneBoard, swapPieces } from '../game/core/BoardSnapshot';
import { GameSession } from '../game/core/GameSession';
import { MatchResolver } from '../game/core/MatchResolver';
import { SpecialResolver } from '../game/core/SpecialResolver';
import { Board, Position } from '../game/core/Types';
import { LEVELS } from '../game/levels/levels';
import { BlockerResolver } from '../game/mechanics/BlockerResolver';
import { BoardAnimationPlanner } from '../game/render/BoardAnimationPlanner';
import { BoardLayout, BoardLayoutResult } from '../game/render/BoardLayout';
import { BoardRenderState, CanvasRenderer, GameCanvasContext, PieceRenderEffect } from '../game/render/CanvasRenderer';
import { bootstrapProgress } from '../game/storage/ProgressBootstrap';
import { progressService } from '../game/storage/ProgressService';

interface MovePreview {
  accepted: boolean;
  swappedBoard: Board;
  clearPositions: Position[];
}

@Entry
@Component
struct GamePage {
  private settings: RenderingContextSettings = new RenderingContextSettings(true);
  private context: CanvasRenderingContext2D = new CanvasRenderingContext2D(this.settings);
  private renderer: CanvasRenderer = new CanvasRenderer();
  private inputMapper: BoardInputMapper = new BoardInputMapper();
  private session?: GameSession;
  private boardLayout?: BoardLayoutResult;
  private canvasWidth: number = 360;
  private canvasHeight: number = 420;
  private resultSaved: boolean = false;
  private isAnimating: boolean = false;
  private animationToken: number = 0;
  @State private canvasReady: boolean = false;
  @State private levelId: number = 1;
  @State private movesLeft: number = 0;
  @State private score: number = 0;
  @State private statusText: string = '进行中';
  @State private goalText: string = '';
  @State private activeTool: string = '';
  @State private shuffleToolCount: number = 0;
  @State private hammerToolCount: number = 0;
  @State private brushToolCount: number = 0;
  @State private undoToolCount: number = 0;
  @State private busyTool: string = '';
  @State private showResult: boolean = false;
  @State private resultTitle: string = '';
  @State private resultStars: string = '';
  @State private resultMessage: string = '';

  aboutToAppear(): void {
    bootstrapProgress(getContext(this) as common.Context);
    const params = router.getParams() as Record<string, number>;
    const nextLevelId = params && params.levelId ? Number(params.levelId) : 1;
    this.startLevel(nextLevelId);
  }

  build() {
    Stack() {
      Image($r('app.media.game_background'))
        .width('100%')
        .height('100%')
        .objectFit(ImageFit.Cover)

      Column() {
        Row() {
          Button('返回')
            .height(34)
            .borderRadius(17)
            .backgroundColor('rgba(255, 255, 255, 0.72)')
            .fontColor('#5C3A4A')
            .onClick(() => {
              router.back();
            })
          Blank()
          Text(`第 ${this.levelId} 关`)
            .fontSize(18)
            .fontWeight(FontWeight.Bold)
            .fontColor('#5C3A4A')
          Blank()
          Button('重玩')
            .height(34)
            .borderRadius(17)
            .backgroundColor('rgba(255, 255, 255, 0.72)')
            .fontColor('#5C3A4A')
            .onClick(() => {
              this.startLevel(this.levelId);
            })
        }
        .width('100%')
        .padding({ left: 12, right: 12, top: 12, bottom: 8 })

        Row() {
          Stack() {
            Column() {
              Text(`${this.movesLeft}`)
                .fontSize(24)
                .fontWeight(FontWeight.Bold)
                .fontColor('#5C3A4A')
              Text('步数')
                .fontSize(11)
                .fontColor('#8A6250')
                .margin({ top: 1 })
            }
            .alignItems(HorizontalAlign.Center)
          }
          .width(70)
          .height(58)
          .borderRadius(29)
          .backgroundColor('rgba(255, 255, 255, 0.76)')
          .border({ width: 2, color: 'rgba(255, 213, 129, 0.78)' })
          .shadow({ radius: 14, color: 'rgba(92, 58, 74, 0.13)', offsetX: 0, offsetY: 5 })

          Blank()

          Column() {
            Row() {
              Text('分数')
                .fontSize(13)
                .fontColor('#7B5A4D')
              Blank()
              Text(this.scorePipeLabel())
                .fontSize(13)
                .fontWeight(FontWeight.Medium)
                .fontColor('#5C3A4A')
            }
            .width(198)

            Row() {
              Stack() {
                Row()
                  .width(168)
                  .height(22)
                  .borderRadius(11)
                  .backgroundColor('rgba(255, 255, 255, 0.72)')
                  .border({ width: 2, color: 'rgba(99, 181, 213, 0.50)' })
                Row()
                  .width(this.scorePipeFillWidth())
                  .height(14)
                  .borderRadius(7)
                  .backgroundColor('#78D7F3')
                  .margin({ left: 4 })
              }
              .width(172)
              .height(26)
              .alignContent(Alignment.Start)

              Row()
                .width(20)
                .height(18)
                .borderRadius(9)
                .backgroundColor('#B9ECFF')
                .border({ width: 2, color: 'rgba(99, 181, 213, 0.50)' })
            }
            .width(198)
            .height(28)
            .alignItems(VerticalAlign.Center)
          }
          .padding({ left: 12, right: 10, top: 8, bottom: 8 })
          .borderRadius(18)
          .backgroundColor('rgba(255, 255, 255, 0.52)')
          .shadow({ radius: 12, color: 'rgba(92, 58, 74, 0.10)', offsetX: 0, offsetY: 5 })
        }
        .width('100%')
        .padding({ left: 18, right: 18, bottom: 8 })

        if (this.shouldShowGoalChip()) {
          Text(this.goalText)
            .fontSize(13)
            .fontColor('#7B5A4D')
            .width('90%')
            .padding({ left: 14, right: 14, top: 7, bottom: 7 })
            .borderRadius(16)
            .backgroundColor('rgba(255, 255, 255, 0.50)')
            .textAlign(TextAlign.Center)
            .margin({ bottom: 6 })
        }

        Canvas(this.context)
          .width(this.canvasWidth)
          .height(this.canvasHeight)
          .backgroundColor('rgba(255, 243, 199, 0.78)')
          .borderRadius(22)
          .shadow({ radius: 24, color: 'rgba(92, 58, 74, 0.18)', offsetX: 0, offsetY: 8 })
          .margin({ top: 54 })
          .onReady(() => {
            this.canvasReady = true;
            this.draw();
          })
          .onTouch((event: TouchEvent) => {
            this.handleTouch(event);
          })

        Row() {
          Stack() {
            Column() {
              Text('重组')
                .fontSize(14)
                .fontWeight(FontWeight.Bold)
                .fontColor('#5C3A4A')
              Text(this.toolCountLabel(this.shuffleToolCount))
                .fontSize(11)
                .fontColor('#8A6250')
                .margin({ top: 1 })
            }
            .alignItems(HorizontalAlign.Center)
          }
          .width(62)
          .height(62)
          .borderRadius(31)
          .backgroundColor(this.busyTool === 'shuffle' ? '#78D7F3' : 'rgba(120, 215, 243, 0.78)')
          .border({ width: 2, color: this.busyTool === 'shuffle' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.82)' })
          .shadow({ radius: 12, color: 'rgba(92, 58, 74, 0.13)', offsetX: 0, offsetY: 5 })
          .opacity(this.hasToolCount(this.shuffleToolCount) || this.busyTool === 'shuffle' ? 1 : 0.42)
          .onClick(() => {
            this.runShuffleTool();
          })

          Blank()

          Stack() {
            Column() {
              Text('锤子')
                .fontSize(14)
                .fontWeight(FontWeight.Bold)
                .fontColor('#5C3A4A')
              Text(this.toolCountLabel(this.hammerToolCount))
                .fontSize(11)
                .fontColor('#8A6250')
                .margin({ top: 1 })
            }
            .alignItems(HorizontalAlign.Center)
          }
          .width(62)
          .height(62)
          .borderRadius(31)
          .backgroundColor(this.activeTool === 'hammer' || this.busyTool === 'hammer' ? '#FFF1A6' : 'rgba(255, 241, 166, 0.78)')
          .border({ width: 2, color: this.activeTool === 'hammer' || this.busyTool === 'hammer' ? '#F2B84B' : 'rgba(255, 255, 255, 0.82)' })
          .shadow({ radius: 12, color: 'rgba(92, 58, 74, 0.13)', offsetX: 0, offsetY: 5 })
          .opacity(this.hasToolCount(this.hammerToolCount) || this.busyTool === 'hammer' ? 1 : 0.42)
          .onClick(() => {
            this.selectTargetTool('hammer');
          })

          Blank()

          Stack() {
            Column() {
              Text('刷子')
                .fontSize(14)
                .fontWeight(FontWeight.Bold)
                .fontColor('#5C3A4A')
              Text(this.toolCountLabel(this.brushToolCount))
                .fontSize(11)
                .fontColor('#8A6250')
                .margin({ top: 1 })
            }
            .alignItems(HorizontalAlign.Center)
          }
          .width(62)
          .height(62)
          .borderRadius(31)
          .backgroundColor(this.activeTool === 'brush' || this.busyTool === 'brush' ? '#B9F3C0' : 'rgba(185, 243, 192, 0.78)')
          .border({ width: 2, color: this.activeTool === 'brush' || this.busyTool === 'brush' ? '#4DB862' : 'rgba(255, 255, 255, 0.82)' })
          .shadow({ radius: 12, color: 'rgba(92, 58, 74, 0.13)', offsetX: 0, offsetY: 5 })
          .opacity(this.hasToolCount(this.brushToolCount) || this.busyTool === 'brush' ? 1 : 0.42)
          .onClick(() => {
            this.selectTargetTool('brush');
          })

          Blank()

          Stack() {
            Column() {
              Text('回退')
                .fontSize(14)
                .fontWeight(FontWeight.Bold)
                .fontColor('#5C3A4A')
              Text(this.toolCountLabel(this.undoToolCount))
                .fontSize(11)
                .fontColor('#8A6250')
                .margin({ top: 1 })
            }
            .alignItems(HorizontalAlign.Center)
          }
          .width(62)
          .height(62)
          .borderRadius(31)
          .backgroundColor(this.busyTool === 'undo' ? '#C4A6F4' : 'rgba(196, 166, 244, 0.78)')
          .border({ width: 2, color: this.busyTool === 'undo' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.82)' })
          .shadow({ radius: 12, color: 'rgba(92, 58, 74, 0.13)', offsetX: 0, offsetY: 5 })
          .opacity(this.hasToolCount(this.undoToolCount) || this.busyTool === 'undo' ? 1 : 0.42)
          .onClick(() => {
            this.runUndoTool();
          })
        }
        .width('92%')
        .height(76)
        .margin({ top: 10 })
        .alignItems(VerticalAlign.Center)

      }
      .width('100%')
      .height('100%')
      .alignItems(HorizontalAlign.Center)
      .padding({ top: 52, bottom: 24 })
      .backgroundColor('rgba(255, 248, 228, 0.26)')

      if (this.showResult) {
        Column() {
          Text(this.resultTitle)
            .fontSize(28)
            .fontWeight(FontWeight.Bold)
            .fontColor('#5C3A4A')
          Text(this.resultStars)
            .fontSize(30)
            .fontColor('#EFC957')
            .margin({ top: 10 })
          Text(this.resultMessage)
            .fontSize(15)
            .fontColor('#7B5A4D')
            .textAlign(TextAlign.Center)
            .margin({ top: 12, bottom: 20 })
          Row() {
            Button('重玩')
              .height(40)
              .onClick(() => {
                this.startLevel(this.levelId);
              })
            Button('选关')
              .height(40)
              .margin({ left: 10 })
              .onClick(() => {
                router.replaceUrl({ url: 'pages/LevelSelectPage' });
              })
            if (this.resultTitle === '通关成功') {
              Button('下一关')
                .height(40)
                .margin({ left: 10 })
                .onClick(() => {
                  this.startLevel(Math.min(100, this.levelId + 1));
                })
            }
          }
          .justifyContent(FlexAlign.Center)
        }
        .width('86%')
        .padding(24)
        .borderRadius(24)
        .backgroundColor('#FFFDF4')
        .shadow({ radius: 30, color: 'rgba(92, 58, 74, 0.22)', offsetX: 0, offsetY: 10 })
      }
    }
    .width('100%')
    .height('100%')
    .alignContent(Alignment.Center)
  }

  private startLevel(levelId: number): void {
    const safeLevelId = Math.max(1, Math.min(100, levelId));
    const level = LEVELS[safeLevelId - 1];
    this.animationToken++;
    this.isAnimating = false;
    this.activeTool = '';
    this.busyTool = '';
    this.levelId = level.id;
    this.session = new GameSession(level, 20260523 + level.id);
    this.movesLeft = this.session.state.movesLeft;
    this.score = this.session.state.score;
    this.statusText = '进行中';
    this.showResult = false;
    this.resultSaved = false;
    this.resultTitle = '';
    this.resultStars = '';
    this.resultMessage = '';
    this.goalText = this.describeGoals();
    this.syncToolCounts();
    this.draw();
  }

  private handleTouch(event: TouchEvent): void {
    if (!this.session || !this.boardLayout || event.touches.length === 0 || this.showResult || this.isAnimating) {
      return;
    }
    const touch = event.touches[0];
    if (this.activeTool.length > 0) {
      if (event.type === TouchType.Up) {
        const position = BoardLayout.hitTest(this.session.state.board, this.boardLayout, touch.x, touch.y);
        if (position) {
          this.applyTargetTool(position);
        }
      }
      return;
    }
    if (event.type === TouchType.Down) {
      this.inputMapper.begin(this.session.state.board, this.boardLayout, touch.x, touch.y);
    }
    if (event.type === TouchType.Up) {
      const selection = this.inputMapper.end(this.session.state.board, this.boardLayout, touch.x, touch.y);
      if (!selection) {
        return;
      }
      const beforeBoard = cloneBoard(this.session.state.board);
      const preview = this.previewMove(beforeBoard, selection.from, selection.to);
      if (preview.accepted) {
        this.playAcceptedMove(beforeBoard, preview, selection.from, selection.to);
      } else {
        this.playRejectedMove(beforeBoard, selection.from, selection.to);
      }
    }
  }

  private previewMove(beforeBoard: Board, first: Position, second: Position): MovePreview {
    if (!BlockerResolver.canSwap(beforeBoard, first, second)) {
      return {
        accepted: false,
        swappedBoard: cloneBoard(beforeBoard),
        clearPositions: []
      };
    }

    const swappedBoard = cloneBoard(beforeBoard);
    if (!swapPieces(swappedBoard, first, second)) {
      return {
        accepted: false,
        swappedBoard,
        clearPositions: []
      };
    }

    const firstPiece = beforeBoard.tiles[first.row][first.col].piece;
    const secondPiece = beforeBoard.tiles[second.row][second.col].piece;
    if (firstPiece && secondPiece && (firstPiece.special !== 'none' || secondPiece.special !== 'none')) {
      return {
        accepted: true,
        swappedBoard,
        clearPositions: this.uniquePositions(SpecialResolver.swapActivatedPositions(swappedBoard, first, second))
      };
    }

    const matches = MatchResolver.findMatches(swappedBoard);
    if (matches.length === 0) {
      return {
        accepted: false,
        swappedBoard,
        clearPositions: []
      };
    }

    const creations = SpecialResolver.chooseCreations(matches, second);
    let clearPositions = MatchResolver.uniqueMatchedPositions(matches);
    creations.forEach(creation => {
      const piece = swappedBoard.tiles[creation.position.row][creation.position.col].piece;
      if (piece) {
        piece.special = creation.special;
      }
      clearPositions = clearPositions.filter(position => {
        return position.row !== creation.position.row || position.col !== creation.position.col;
      });
    });
    clearPositions = SpecialResolver.expandedClearPositions(swappedBoard, clearPositions);

    return {
      accepted: true,
      swappedBoard,
      clearPositions: this.uniquePositions(clearPositions)
    };
  }

  private syncState(): void {
    if (!this.session) {
      return;
    }
    this.movesLeft = this.session.state.movesLeft;
    this.score = this.session.state.score;
    this.goalText = this.describeGoals();
    this.syncToolCounts();
    if (this.session.state.status === 'won') {
      this.statusText = '胜利';
      this.finishLevel();
    } else if (this.session.state.status === 'lost') {
      this.statusText = '失败';
      this.finishLevel();
    } else {
      this.statusText = '进行中';
    }
  }

  private playAcceptedMove(
    beforeBoard: Board,
    preview: MovePreview,
    first: Position,
    second: Position
  ): void {
    this.isAnimating = true;
    this.animateSwap(beforeBoard, first, second, 0, 1, 82, () => {
      setTimeout(() => {
        this.commitAcceptedMove(preview, first, second);
      }, 0);
    });
  }

  private commitAcceptedMove(preview: MovePreview, first: Position, second: Position): void {
    if (!this.session) {
      this.isAnimating = false;
      return;
    }
    const clearedBoard = this.createClearedBoard(preview.swappedBoard, preview.clearPositions);
    const accepted = this.session.trySwap(first, second);
    if (!accepted) {
      this.playRejectedMove(preview.swappedBoard, first, second);
      return;
    }
    const afterBoard = cloneBoard(this.session.state.board);
    if (preview.clearPositions.length > 0) {
      this.animateClear(preview.swappedBoard, preview.clearPositions, () => {
        this.animateSettle(clearedBoard, afterBoard, () => {
          this.finishAnimatedMove();
        });
      });
    } else {
      this.animateSettle(clearedBoard, afterBoard, () => {
        this.finishAnimatedMove();
      });
    }
  }

  private createClearedBoard(board: Board, positions: Position[]): Board {
    const result = cloneBoard(board);
    positions.forEach(position => {
      result.tiles[position.row][position.col].piece = undefined;
    });
    return result;
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

  private playRejectedMove(board: Board, first: Position, second: Position): void {
    this.isAnimating = true;
    this.animateSwap(board, first, second, 0, 0.35, 70, () => {
      this.animateSwap(board, first, second, 0.35, 0, 90, () => {
        this.isAnimating = false;
        this.draw();
      });
    });
  }

  private finishAnimatedMove(): void {
    this.isAnimating = false;
    this.syncState();
    this.draw();
  }

  private runShuffleTool(): void {
    if (!this.session || this.showResult || this.isAnimating || !this.hasToolCount(this.shuffleToolCount)) {
      return;
    }
    const token = ++this.animationToken;
    this.activeTool = '';
    this.busyTool = 'shuffle';
    this.isAnimating = true;
    setTimeout(() => {
      if (token !== this.animationToken || !this.session) {
        return;
      }
      if (this.session.useShuffleTool()) {
        this.statusText = '已重组';
        this.syncState();
      }
      this.busyTool = '';
      this.isAnimating = false;
      this.draw();
    }, 0);
  }

  private runUndoTool(): void {
    if (!this.session || this.isAnimating || !this.hasToolCount(this.undoToolCount)) {
      return;
    }
    this.busyTool = 'undo';
    if (this.session.useUndoTool()) {
      this.activeTool = '';
      this.showResult = false;
      this.resultSaved = false;
      this.statusText = '已回退';
      this.syncState();
      this.draw();
    }
    this.busyTool = '';
  }

  private selectTargetTool(tool: string): void {
    if (this.showResult || this.isAnimating || this.busyTool.length > 0) {
      return;
    }
    if (tool === 'hammer' && !this.hasToolCount(this.hammerToolCount)) {
      return;
    }
    if (tool === 'brush' && !this.hasToolCount(this.brushToolCount)) {
      return;
    }
    this.activeTool = this.activeTool === tool ? '' : tool;
  }

  private applyTargetTool(position: Position): void {
    if (!this.session) {
      return;
    }
    const tool = this.activeTool;
    if (!this.canApplyTargetTool(tool, position)) {
      return;
    }
    const beforeBoard = cloneBoard(this.session.state.board);
    this.activeTool = '';
    this.busyTool = tool;
    this.isAnimating = true;
    if (tool === 'hammer') {
      const clearPositions = SpecialResolver.expandedClearPositions(beforeBoard, [position]);
      this.animateClear(beforeBoard, clearPositions, () => {
        setTimeout(() => {
          this.commitTargetTool(tool, position, beforeBoard, clearPositions);
        }, 0);
      });
      return;
    }
    this.animateToolPulse(beforeBoard, position, () => {
      setTimeout(() => {
        this.commitTargetTool(tool, position, beforeBoard, []);
      }, 0);
    });
  }

  private canApplyTargetTool(tool: string, position: Position): boolean {
    if (!this.session) {
      return false;
    }
    const tile = this.session.state.board.tiles[position.row][position.col];
    if (!tile.piece || tile.blocker?.type === 'hole' || tile.blocker?.type === 'marshmallow') {
      return false;
    }
    if (tool === 'hammer') {
      return this.hasToolCount(this.hammerToolCount);
    }
    if (tool === 'brush') {
      return this.hasToolCount(this.brushToolCount) && tile.piece.special === 'none';
    }
    return false;
  }

  private commitTargetTool(tool: string, position: Position, beforeBoard: Board, clearPositions: Position[]): void {
    if (!this.session) {
      this.finishToolAnimation();
      return;
    }
    let used = false;
    if (tool === 'hammer') {
      used = this.session.useHammerTool(position);
    } else if (tool === 'brush') {
      used = this.session.useBrushTool(position);
    }
    if (!used) {
      this.finishToolAnimation();
      return;
    }
    const afterBoard = cloneBoard(this.session.state.board);
    if (tool === 'hammer') {
      const clearedBoard = this.createClearedBoard(beforeBoard, clearPositions);
      this.animateSettle(clearedBoard, afterBoard, () => {
        this.finishToolAnimation();
      });
      return;
    }
    this.finishToolAnimation();
    this.draw();
  }

  private finishToolAnimation(): void {
    this.busyTool = '';
    this.isAnimating = false;
    this.syncState();
  }

  private syncToolCounts(): void {
    if (!this.session) {
      this.shuffleToolCount = 0;
      this.hammerToolCount = 0;
      this.brushToolCount = 0;
      this.undoToolCount = 0;
      return;
    }
    this.shuffleToolCount = this.session.state.tools.shuffle;
    this.hammerToolCount = this.session.state.tools.hammer;
    this.brushToolCount = this.session.state.tools.brush;
    this.undoToolCount = this.session.state.tools.undo;
  }

  private hasToolCount(count: number): boolean {
    return count !== 0;
  }

  private toolCountLabel(count: number): string {
    if (count < 0) {
      return '∞';
    }
    return `x${count}`;
  }

  private animateSwap(
    board: Board,
    first: Position,
    second: Position,
    fromProgress: number,
    toProgress: number,
    durationMs: number,
    done: () => void
  ): void {
    const deltaCol = second.col - first.col;
    const deltaRow = second.row - first.row;
    const layout = BoardLayout.compute(board, this.canvasWidth, this.canvasHeight);
    const moveX = deltaCol * layout.tileSize;
    const moveY = deltaRow * layout.tileSize;
    this.runAnimation(durationMs, (progress: number) => {
      const eased = this.easeInOut(progress);
      const amount = fromProgress + (toProgress - fromProgress) * eased;
      this.drawBoardSnapshot(board, {
        pieceEffects: [
          { row: first.row, col: first.col, offsetX: moveX * amount, offsetY: moveY * amount, scale: 1.05, opacity: 1 },
          { row: second.row, col: second.col, offsetX: -moveX * amount, offsetY: -moveY * amount, scale: 1.05, opacity: 1 }
        ]
      });
    }, done);
  }

  private animateClear(board: Board, positions: Position[], done: () => void): void {
    this.runAnimation(110, (progress: number) => {
      const eased = this.easeOut(progress);
      const effects: PieceRenderEffect[] = [];
      positions.forEach(position => {
        effects.push({
          row: position.row,
          col: position.col,
          offsetX: 0,
          offsetY: 0,
          scale: 1 + eased * 0.24,
          opacity: 1 - eased
        });
      });
      this.drawBoardSnapshot(board, { pieceEffects: effects });
    }, done);
  }

  private animateToolPulse(board: Board, position: Position, done: () => void): void {
    this.runAnimation(88, (progress: number) => {
      const eased = this.easeInOut(progress);
      const pulse = progress < 0.5 ? eased : 1 - eased;
      this.drawBoardSnapshot(board, {
        pieceEffects: [
          {
            row: position.row,
            col: position.col,
            offsetX: 0,
            offsetY: 0,
            scale: 1 + pulse * 0.16,
            opacity: 1
          }
        ]
      });
    }, done);
  }

  private animateSettle(fromBoard: Board, toBoard: Board, done: () => void): void {
    const layout = BoardLayout.compute(toBoard, this.canvasWidth, this.canvasHeight);
    const motions = BoardAnimationPlanner.planFallEffects(fromBoard, toBoard, layout.tileSize);
    this.runAnimation(190, (progress: number) => {
      const eased = this.easeOut(progress);
      const effects = BoardAnimationPlanner.interpolateFallEffects(motions, eased);
      this.drawBoardSnapshot(toBoard, { pieceEffects: effects });
    }, done);
  }

  private runAnimation(durationMs: number, frame: (progress: number) => void, done: () => void): void {
    const token = ++this.animationToken;
    const startedAt = Date.now();
    const tick = (): void => {
      if (token !== this.animationToken) {
        return;
      }
      const frameStartedAt = Date.now();
      const elapsed = Date.now() - startedAt;
      const rawProgress = Math.min(1, elapsed / durationMs);
      frame(rawProgress);
      if (rawProgress < 1) {
        const frameCost = Date.now() - frameStartedAt;
        setTimeout(tick, Math.max(8, 16 - frameCost));
        return;
      }
      done();
    };
    tick();
  }

  private drawBoardSnapshot(board: Board, animation?: BoardRenderState): void {
    if (!this.canvasReady) {
      return;
    }
    const layout = BoardLayout.compute(board, this.canvasWidth, this.canvasHeight);
    this.boardLayout = layout;
    this.renderer.draw(this.context as GameCanvasContext, board, {
      width: this.canvasWidth,
      height: this.canvasHeight,
      layout,
      animation
    });
  }

  private easeOut(progress: number): number {
    const value = Math.max(0, Math.min(1, progress));
    const inverse = 1 - value;
    return 1 - inverse * inverse * inverse;
  }

  private easeInOut(progress: number): number {
    const value = Math.max(0, Math.min(1, progress));
    if (value < 0.5) {
      return 4 * value * value * value;
    }
    const shifted = -2 * value + 2;
    return 1 - shifted * shifted * shifted / 2;
  }

  private scorePipeLabel(): string {
    if (this.hasScoreGoal()) {
      return `${this.score}/${this.scoreGoalValue()}`;
    }
    return `${this.score}`;
  }

  private scorePipeFillWidth(): number {
    const trackWidth = 160;
    const ratio = Math.min(1, this.score / this.scoreGoalValue());
    if (this.score <= 0) {
      return 0;
    }
    return Math.max(10, trackWidth * ratio);
  }

  private scoreGoalValue(): number {
    if (!this.session) {
      return Math.max(1, this.score);
    }
    for (let index = 0; index < this.session.state.goals.length; index++) {
      const goal = this.session.state.goals[index];
      if (goal.type === 'score') {
        return Math.max(1, goal.count);
      }
    }
    return Math.max(1000, this.score + 600);
  }

  private hasScoreGoal(): boolean {
    if (!this.session) {
      return false;
    }
    for (let index = 0; index < this.session.state.goals.length; index++) {
      if (this.session.state.goals[index].type === 'score') {
        return true;
      }
    }
    return false;
  }

  private shouldShowGoalChip(): boolean {
    if (this.goalText.length === 0 || !this.session) {
      return false;
    }
    return !this.hasScoreGoal() || this.session.state.goals.length > 1;
  }

  private async finishLevel(): Promise<void> {
    if (!this.session || this.resultSaved) {
      return;
    }
    this.resultSaved = true;
    const won = this.session.state.status === 'won';
    const progress = await progressService.recordResult({
      levelId: this.levelId,
      won,
      score: this.score,
      movesLeft: this.movesLeft
    });
    this.resultTitle = won ? '通关成功' : '挑战失败';
    this.resultStars = won ? this.formatStars(progress.stars) : '☆☆☆';
    this.resultMessage = won
      ? `得分 ${this.score}，剩余 ${this.movesLeft} 步`
      : `得分 ${this.score}，再试一次就差不多了`;
    this.showResult = true;
  }

  private draw(): void {
    if (!this.session || !this.canvasReady) {
      return;
    }
    this.drawBoardSnapshot(this.session.state.board);
  }

  private describeGoals(): string {
    if (!this.session) {
      return '';
    }
    return this.session.state.goals.map(goal => {
      if (goal.type === 'score') {
        return `目标分 ${goal.count}`;
      }
      if (goal.type === 'clear_ice') {
        return `清除冰层 ${Math.max(0, goal.count)}`;
      }
      if (goal.type === 'break_chain') {
        return `破除锁链 ${Math.max(0, goal.count)}`;
      }
      if (goal.type === 'clear_marshmallow') {
        return `清除棉花糖 ${Math.max(0, goal.count)}`;
      }
      return `收集 ${goal.target} ${Math.max(0, goal.count)}`;
    }).join(' / ');
  }

  private formatStars(stars: number): string {
    if (stars <= 1) {
      return '★☆☆';
    }
    if (stars === 2) {
      return '★★☆';
    }
    return '★★★';
  }
}
