import { common } from '@kit.AbilityKit';
import { BoardInputMapper } from '../game/input/BoardInputMapper';
import { cloneBoard, swapPieces } from '../game/core/BoardSnapshot';
import { GameSession } from '../game/core/GameSession';
import { MatchResolver } from '../game/core/MatchResolver';
import { SpecialResolver } from '../game/core/SpecialResolver';
import { Board, PieceType, Position, SpecialType } from '../game/core/Types';
import { economyService } from '../game/economy/EconomyService';
import { feedbackService } from '../game/feedback/FeedbackService';
import { chapterProgressText, getLevelChapter } from '../game/levels/LevelChapters';
import { getLevelWorldTheme, LevelWorldTheme } from '../game/levels/LevelWorldThemes';
import { LEVELS } from '../game/levels/levels';
import { BlockerResolver } from '../game/mechanics/BlockerResolver';
import { BoardAnimationPlanner } from '../game/render/BoardAnimationPlanner';
import { BoardLayout, BoardLayoutResult } from '../game/render/BoardLayout';
import { BoardRenderState, CanvasRenderer, GameCanvasContext, PieceRenderEffect } from '../game/render/CanvasRenderer';
import { gameSettingsService } from '../game/settings/GameSettings';
import { bootstrapProgress } from '../game/storage/ProgressBootstrap';
import { progressService } from '../game/storage/ProgressService';
import { TutorialStep, tutorialStepsForLevel } from '../game/tutorial/TutorialGuide';
import { brushColorValue, describeGoals, formatStars } from '../game/ui/GameTextFormatter';

interface MovePreview {
  accepted: boolean;
  swappedBoard: Board;
  clearPositions: Position[];
  conversionBoard?: Board;
  convertedPositions?: Position[];
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
  private cachedLayout?: BoardLayoutResult;
  private cachedLayoutKey: string = '';
  private canvasWidth: number = 360;
  private canvasHeight: number = 388;
  private scoreTrackWidth: number = 178;
  private resultSaved: boolean = false;
  private isAnimating: boolean = false;
  private isBonusResolving: boolean = false;
  private animationToken: number = 0;
  @State private canvasReady: boolean = false;
  @State private levelId: number = 1;
  @State private movesLeft: number = 0;
  @State private score: number = 0;
  @State private chapterText: string = '';
  @State private chapterAccent: string = '#F27A91';
  @State private coinBalance: number = 0;
  @State private comboText: string = '';
  @State private statusText: string = '进行中';
  @State private goalText: string = '';
  @State private activeTool: string = '';
  @State private shuffleToolCount: number = 0;
  @State private hammerToolCount: number = 0;
  @State private brushToolCount: number = 0;
  @State private addMovesToolCount: number = 0;
  @State private undoToolCount: number = 0;
  @State private busyTool: string = '';
  @State private selectedBrushColor: PieceType = 'red';
  @State private showResult: boolean = false;
  @State private resultTitle: string = '';
  @State private resultStars: string = '';
  @State private resultMessage: string = '';
  @State private resultWon: boolean = false;
  @State private showContinueOffer: boolean = false;
  @State private showTutorial: boolean = false;
  @State private tutorialIndex: number = 0;
  @State private tutorialSteps: TutorialStep[] = [];

  aboutToAppear(): void {
    const context = this.appContext();
    bootstrapProgress(context);
    feedbackService.init(context);
    gameSettingsService.init(context);
    const params = this.getUIContext().getRouter().getParams() as Record<string, number>;
    const nextLevelId = params && params.levelId ? Number(params.levelId) : 1;
    this.startLevel(nextLevelId);
  }

  build() {
    Stack() {
      this.WorldBackdrop()

      Column() {
        Row() {
          Button('返回')
            .height(34)
            .borderRadius(17)
            .backgroundColor(this.worldTheme().buttonTint)
            .fontColor('#5C3A4A')
            .onClick(() => {
              this.getUIContext().getRouter().back();
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
            .backgroundColor(this.worldTheme().buttonTint)
            .fontColor('#5C3A4A')
            .onClick(() => {
              this.startLevel(this.levelId);
            })
        }
        .width('100%')
        .padding({ left: 12, right: 12, top: 12, bottom: 8 })

        Row() {
          Text(this.chapterText)
            .fontSize(12)
            .fontColor(this.chapterAccent)
            .padding({ left: 12, right: 12, top: 4, bottom: 4 })
            .borderRadius(12)
            .backgroundColor(this.worldTheme().buttonTint)
          Blank()
          Text(`金币 ${this.coinBalance}`)
            .fontSize(12)
            .fontColor('#7B5A4D')
            .padding({ left: 12, right: 12, top: 4, bottom: 4 })
            .borderRadius(12)
            .backgroundColor(this.worldTheme().buttonTint)
        }
        .width('100%')
        .padding({ left: 20, right: 20 })

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
          .backgroundColor(this.worldTheme().panelFill)
          .border({ width: 2, color: this.worldTheme().scoreMarkerFill })
          .shadow({ radius: 14, color: this.worldTheme().shadow, offsetX: 0, offsetY: 5 })

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
            .width(226)

            Row() {
              Stack() {
                Row()
                  .width(this.scoreTrackWidth + 12)
                  .height(26)
                  .borderRadius(13)
                  .backgroundColor('rgba(255, 255, 255, 0.86)')
                  .border({ width: 2, color: 'rgba(99, 181, 213, 0.58)' })
                  .margin({ top: 14 })
                Row()
                  .width(this.scorePipeFillWidth())
                  .height(18)
                  .borderRadius(9)
                  .backgroundColor(this.worldTheme().scoreFill)
                  .margin({ left: 5, top: 18 })
                Row()
                  .width(Math.max(0, this.scorePipeFillWidth() - 8))
                  .height(5)
                  .borderRadius(4)
                  .backgroundColor('rgba(255, 255, 255, 0.48)')
                  .margin({ left: 9, top: 21 })
                this.ScoreMarker(1)
                this.ScoreMarker(2)
                this.ScoreMarker(3)
              }
              .width(this.scoreTrackWidth + 20)
              .height(46)
              .alignContent(Alignment.Start)

              Stack() {
                Row()
                  .width(9)
                  .height(9)
                  .borderRadius(5)
                  .backgroundColor('rgba(255, 255, 255, 0.60)')
              }
              .width(22)
              .height(22)
              .borderRadius(11)
              .backgroundColor('#B9ECFF')
              .border({ width: 2, color: 'rgba(99, 181, 213, 0.52)' })
              .margin({ top: 14 })
            }
            .width(226)
            .height(46)
            .alignItems(VerticalAlign.Center)
          }
          .padding({ left: 14, right: 10, top: 8, bottom: 7 })
          .borderRadius(20)
          .backgroundColor(this.worldTheme().panelFill)
          .border({ width: 1, color: this.worldTheme().panelBorder })
          .shadow({ radius: 14, color: this.worldTheme().shadow, offsetX: 0, offsetY: 6 })
        }
        .width('100%')
        .padding({ left: 18, right: 18, bottom: 8 })
        .margin({ top: 18 })

        this.MessageSlot()

        Canvas(this.context)
          .width(this.canvasWidth)
          .height(this.canvasHeight)
          .backgroundColor(this.worldTheme().board.fill)
          .borderRadius(22)
          .shadow({ radius: 24, color: this.worldTheme().shadow, offsetX: 0, offsetY: 8 })
          .margin({ top: 10 })
          .onReady(() => {
            this.canvasReady = true;
            this.draw();
          })
          .onTouch((event: TouchEvent) => {
            this.handleTouch(event);
          })

        this.BrushPaletteSlot()

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
          .width(56)
          .height(56)
          .borderRadius(28)
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
          .width(56)
          .height(56)
          .borderRadius(28)
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
          .width(56)
          .height(56)
          .borderRadius(28)
          .backgroundColor(this.activeTool === 'brush' || this.busyTool === 'brush' ? brushColorValue(this.selectedBrushColor) : 'rgba(185, 243, 192, 0.78)')
          .border({ width: 2, color: this.activeTool === 'brush' || this.busyTool === 'brush' ? '#4DB862' : 'rgba(255, 255, 255, 0.82)' })
          .shadow({ radius: 12, color: 'rgba(92, 58, 74, 0.13)', offsetX: 0, offsetY: 5 })
          .opacity(this.hasToolCount(this.brushToolCount) || this.busyTool === 'brush' ? 1 : 0.42)
          .onClick(() => {
            this.selectTargetTool('brush');
          })

          Blank()

          Stack() {
            Column() {
              Text('+3步')
                .fontSize(14)
                .fontWeight(FontWeight.Bold)
                .fontColor('#5C3A4A')
              Text(this.toolCountLabel(this.addMovesToolCount))
                .fontSize(11)
                .fontColor('#8A6250')
                .margin({ top: 1 })
            }
            .alignItems(HorizontalAlign.Center)
          }
          .width(56)
          .height(56)
          .borderRadius(28)
          .backgroundColor(this.busyTool === 'addMoves' ? '#F7C36C' : 'rgba(255, 213, 129, 0.82)')
          .border({ width: 2, color: this.busyTool === 'addMoves' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.82)' })
          .shadow({ radius: 12, color: 'rgba(92, 58, 74, 0.13)', offsetX: 0, offsetY: 5 })
          .opacity(this.hasToolCount(this.addMovesToolCount) || this.busyTool === 'addMoves' ? 1 : 0.42)
          .onClick(() => {
            this.runAddMovesTool();
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
          .width(56)
          .height(56)
          .borderRadius(28)
          .backgroundColor(this.busyTool === 'undo' ? '#C4A6F4' : 'rgba(196, 166, 244, 0.78)')
          .border({ width: 2, color: this.busyTool === 'undo' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.82)' })
          .shadow({ radius: 12, color: 'rgba(92, 58, 74, 0.13)', offsetX: 0, offsetY: 5 })
          .opacity(this.hasToolCount(this.undoToolCount) || this.busyTool === 'undo' ? 1 : 0.42)
          .onClick(() => {
            this.runUndoTool();
          })
        }
        .width('92%')
        .height(64)
        .margin({ top: 2 })
        .alignItems(VerticalAlign.Center)
        .padding({ left: 8, right: 8 })
        .borderRadius(32)
        .backgroundColor(this.worldTheme().shelfFill)

      }
      .width('100%')
      .height('100%')
      .alignItems(HorizontalAlign.Center)
      .padding({ top: 48, bottom: 18 })
      .backgroundColor('rgba(255, 248, 228, 0.10)')

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
                this.getUIContext().getRouter().replaceUrl({ url: 'pages/LevelSelectPage' });
              })
            if (!this.resultWon && this.showContinueOffer) {
              Button('加 5 步')
                .height(40)
                .margin({ left: 10 })
                .onClick(() => {
                  this.buyExtraMoves();
                })
            }
            if (this.resultWon) {
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

      if (this.showTutorial && !this.showResult) {
        this.TutorialOverlay()
      }
    }
    .width('100%')
    .height('100%')
    .alignContent(Alignment.Center)
  }

  @Builder
  WorldBackdrop() {
    Stack() {
      Column() {
        Row()
          .layoutWeight(1)
          .backgroundColor(this.worldTheme().backgroundTop)
        Row()
          .layoutWeight(1)
          .backgroundColor(this.worldTheme().backgroundMiddle)
        Row()
          .layoutWeight(1)
          .backgroundColor(this.worldTheme().backgroundBottom)
      }
      .width('100%')
      .height('100%')

      Row()
        .width(220)
        .height(66)
        .borderRadius(33)
        .backgroundColor(this.worldTheme().cloud)
        .position({ x: '-12%', y: '13%' })
      Row()
        .width(190)
        .height(54)
        .borderRadius(27)
        .backgroundColor(this.worldTheme().cloud)
        .position({ x: '58%', y: '9%' })
      Row()
        .width(250)
        .height(82)
        .borderRadius(41)
        .backgroundColor(this.worldTheme().cloud)
        .position({ x: '8%', y: '73%' })
      Row()
        .width(34)
        .height(34)
        .borderRadius(17)
        .backgroundColor(this.worldTheme().orb)
        .position({ x: '7%', y: '29%' })
      Row()
        .width(48)
        .height(48)
        .borderRadius(24)
        .backgroundColor(this.worldTheme().orb)
        .position({ x: '84%', y: '22%' })
      Row()
        .width(28)
        .height(28)
        .borderRadius(14)
        .backgroundColor(this.worldTheme().orb)
        .position({ x: '63%', y: '14%' })
    }
    .width('100%')
    .height('100%')
  }

  @Builder
  MessageSlot() {
    Stack() {
      if (this.messageChipText().length > 0) {
        Text(this.messageChipText())
          .fontSize(this.comboText.length > 0 ? 14 : 13)
          .fontWeight(this.comboText.length > 0 ? FontWeight.Bold : FontWeight.Medium)
          .fontColor('#5C3A4A')
          .maxLines(1)
          .textOverflow({ overflow: TextOverflow.Ellipsis })
          .padding({ left: 16, right: 16, top: 6, bottom: 6 })
          .borderRadius(16)
          .backgroundColor(this.comboText.length > 0 ? 'rgba(255, 241, 166, 0.78)' : 'rgba(255, 255, 255, 0.54)')
          .border({ width: 1, color: this.comboText.length > 0 ? 'rgba(242, 184, 75, 0.32)' : 'rgba(255, 255, 255, 0.52)' })
          .shadow({ radius: 8, color: 'rgba(92, 58, 74, 0.08)', offsetX: 0, offsetY: 3 })
      }
    }
    .width('92%')
    .height(32)
    .alignContent(Alignment.Center)
    .margin({ top: 6 })
  }

  @Builder
  BrushPaletteSlot() {
    Stack() {
      if (this.activeTool === 'brush') {
        Row() {
          if (this.canUseBrushColor('red')) {
            this.BrushColorButton('red')
          }
          if (this.canUseBrushColor('blue')) {
            this.BrushColorButton('blue')
          }
          if (this.canUseBrushColor('yellow')) {
            this.BrushColorButton('yellow')
          }
          if (this.canUseBrushColor('green')) {
            this.BrushColorButton('green')
          }
          if (this.canUseBrushColor('purple')) {
            this.BrushColorButton('purple')
          }
          if (this.canUseBrushColor('orange')) {
            this.BrushColorButton('orange')
          }
        }
        .width('82%')
        .height(38)
        .justifyContent(FlexAlign.SpaceBetween)
        .alignItems(VerticalAlign.Center)
      }
    }
    .width('100%')
    .height(this.activeTool === 'brush' ? 40 : 0)
    .alignContent(Alignment.Center)
    .margin({ top: this.activeTool === 'brush' ? 6 : 0 })
  }

  @Builder
  BrushColorButton(type: PieceType) {
    Stack() {
      if (this.selectedBrushColor === type) {
        Row()
          .width(12)
          .height(12)
          .borderRadius(6)
          .backgroundColor('#FFFFFF')
          .border({ width: 1, color: 'rgba(92, 58, 74, 0.30)' })
      }
    }
    .width(34)
    .height(34)
    .borderRadius(17)
    .backgroundColor(brushColorValue(type))
    .border({
      width: this.selectedBrushColor === type ? 3 : 1,
      color: this.selectedBrushColor === type ? '#FFFFFF' : 'rgba(255, 255, 255, 0.76)'
    })
    .shadow({
      radius: this.selectedBrushColor === type ? 10 : 5,
      color: 'rgba(92, 58, 74, 0.13)',
      offsetX: 0,
      offsetY: 3
    })
    .onClick(() => {
      this.selectedBrushColor = type;
    })
  }

  @Builder
  ScoreMarker(stars: number) {
    Stack() {
      Row()
        .width(3)
        .height(12)
        .borderRadius(2)
        .backgroundColor(this.score >= this.scoreMilestoneValue(stars) ? this.worldTheme().scoreMarkerFill : 'rgba(215, 163, 78, 0.40)')
        .position({ x: 8, y: 15 })
      Text('★')
        .fontSize(10)
        .fontColor(this.score >= this.scoreMilestoneValue(stars) ? '#FFFFFF' : '#C78B36')
        .textAlign(TextAlign.Center)
    }
    .width(19)
    .height(30)
    .borderRadius(10)
    .backgroundColor(this.score >= this.scoreMilestoneValue(stars) ? this.worldTheme().scoreMarkerFill : 'rgba(255, 251, 228, 0.96)')
    .border({ width: 1, color: this.score >= this.scoreMilestoneValue(stars) ? '#FFFFFF' : 'rgba(215, 163, 78, 0.58)' })
    .shadow({ radius: 5, color: 'rgba(92, 58, 74, 0.10)', offsetX: 0, offsetY: 2 })
    .position({ x: this.scoreMarkerLeft(stars), y: 0 })
  }

  @Builder
  TutorialOverlay() {
    Column() {
      Text(this.currentTutorialTitle())
        .fontSize(22)
        .fontWeight(FontWeight.Bold)
        .fontColor('#5C3A4A')
      Text(this.currentTutorialMessage())
        .fontSize(14)
        .fontColor('#7B5A4D')
        .lineHeight(22)
        .textAlign(TextAlign.Center)
        .margin({ top: 10, bottom: 18 })
      Row() {
        Button(this.tutorialIndex >= this.tutorialSteps.length - 1 ? '开始闯关' : '下一条')
          .height(40)
          .borderRadius(20)
          .fontColor('#FFFFFF')
          .backgroundColor('#F27A91')
          .onClick(() => {
            feedbackService.play('tap');
            this.advanceTutorial();
          })
      }
      .justifyContent(FlexAlign.Center)
    }
    .width('84%')
    .padding(22)
    .borderRadius(24)
    .backgroundColor('rgba(255, 253, 244, 0.94)')
    .shadow({ radius: 28, color: 'rgba(92, 58, 74, 0.20)', offsetX: 0, offsetY: 10 })
  }

  private startLevel(levelId: number): void {
    const safeLevelId = Math.max(1, Math.min(100, levelId));
    const level = LEVELS[safeLevelId - 1];
    this.animationToken++;
    this.isAnimating = false;
    this.isBonusResolving = false;
    this.activeTool = '';
    this.busyTool = '';
    this.cachedLayout = undefined;
    this.cachedLayoutKey = '';
    this.levelId = level.id;
    this.selectedBrushColor = level.board.pieceTypes[0];
    this.session = new GameSession(level, 20260523 + level.id);
    const chapter = getLevelChapter(level.id);
    this.chapterText = chapterProgressText(level.id);
    this.chapterAccent = chapter.accent;
    this.coinBalance = economyService.getWallet().coins;
    this.movesLeft = this.session.state.movesLeft;
    this.score = this.session.state.score;
    this.comboText = '';
    this.statusText = '进行中';
    this.showResult = false;
    this.resultSaved = false;
    this.resultWon = false;
    this.showContinueOffer = false;
    this.resultTitle = '';
    this.resultStars = '';
    this.resultMessage = '';
    this.goalText = describeGoals(this.session.state.goals);
    this.tutorialSteps = tutorialStepsForLevel(level.id);
    this.tutorialIndex = 0;
    this.showTutorial = this.tutorialSteps.length > 0;
    this.syncToolCounts();
    this.draw();
  }

  private currentTutorialTitle(): string {
    if (this.tutorialSteps.length === 0) {
      return '';
    }
    return this.tutorialSteps[Math.min(this.tutorialIndex, this.tutorialSteps.length - 1)].title;
  }

  private currentTutorialMessage(): string {
    if (this.tutorialSteps.length === 0) {
      return '';
    }
    return this.tutorialSteps[Math.min(this.tutorialIndex, this.tutorialSteps.length - 1)].message;
  }

  private advanceTutorial(): void {
    if (this.tutorialIndex >= this.tutorialSteps.length - 1) {
      this.showTutorial = false;
      return;
    }
    this.tutorialIndex++;
  }

  private handleTouch(event: TouchEvent): void {
    if (!this.session || !this.boardLayout || event.touches.length === 0 || this.showResult || this.showTutorial || this.isAnimating) {
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

    if (SpecialResolver.isDirectSpecialSwap(beforeBoard, first, second)) {
      const conversion = SpecialResolver.rainbowFunctionalConversion(swappedBoard, first, second);
      return {
        accepted: true,
        swappedBoard,
        clearPositions: this.uniquePositions(SpecialResolver.swapActivatedPositions(swappedBoard, first, second)),
        conversionBoard: conversion ? this.createConvertedBoard(swappedBoard, conversion.positions, conversion.special) : undefined,
        convertedPositions: conversion ? conversion.positions : undefined
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
    this.goalText = describeGoals(this.session.state.goals);
    this.coinBalance = economyService.getWallet().coins;
    this.comboText = this.session.state.lastCascadeCount >= 2 ? `连击 x${this.session.state.lastCascadeCount}` : '';
    this.syncToolCounts();
    if (this.session.state.status === 'playing' && this.session.shouldAwardRemainingMovesBonus() && !this.isBonusResolving) {
      this.statusText = '奖励结算';
      this.playRemainingMoveBonus();
    } else if (this.session.state.status === 'won') {
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
    const expectedSession = this.session;
    this.isAnimating = true;
    feedbackService.play('swap');
    this.animateSwap(beforeBoard, first, second, 0, 1, 82, () => {
      const token = this.animationToken;
      setTimeout(() => {
        if (token !== this.animationToken || this.session !== expectedSession) {
          return;
        }
        this.commitAcceptedMove(preview, first, second);
      }, 0);
    });
  }

  private commitAcceptedMove(preview: MovePreview, first: Position, second: Position): void {
    if (!this.session) {
      this.isAnimating = false;
      return;
    }
    const clearSourceBoard = preview.conversionBoard ?? preview.swappedBoard;
    const clearedBoard = this.createClearedBoard(clearSourceBoard, preview.clearPositions);
    const accepted = this.session.trySwap(first, second);
    if (!accepted) {
      this.playRejectedMove(preview.swappedBoard, first, second);
      return;
    }
    const afterBoard = cloneBoard(this.session.state.board);
    if (preview.clearPositions.length > 0) {
      feedbackService.play(preview.conversionBoard ? 'special' : 'match');
      if (preview.conversionBoard && preview.convertedPositions) {
        this.animateConversion(preview.swappedBoard, preview.conversionBoard, preview.convertedPositions, () => {
          this.animateClear(preview.conversionBoard!, preview.clearPositions, () => {
            this.animateSettle(clearedBoard, afterBoard, () => {
              this.finishAnimatedMove();
            });
          });
        });
      } else {
        this.animateClear(preview.swappedBoard, preview.clearPositions, () => {
          this.animateSettle(clearedBoard, afterBoard, () => {
            this.finishAnimatedMove();
          });
        });
      }
    } else {
      this.animateSettle(clearedBoard, afterBoard, () => {
        this.finishAnimatedMove();
      });
    }
  }

  private createConvertedBoard(board: Board, positions: Position[], special: SpecialType): Board {
    const result = cloneBoard(board);
    positions.forEach(position => {
      const piece = result.tiles[position.row][position.col].piece;
      if (piece && piece.special !== 'rainbow') {
        piece.special = special;
      }
    });
    return result;
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
    feedbackService.play('error');
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

  private playRemainingMoveBonus(): void {
    if (!this.session) {
      return;
    }
    const expectedSession = this.session;
    const beforeBoard = cloneBoard(expectedSession.state.board);
    const bonus = expectedSession.awardRemainingMovesAsSpecials();
    if (!bonus) {
      this.syncState();
      this.draw();
      return;
    }
    const afterBoard = cloneBoard(expectedSession.state.board);
    const clearedBoard = this.createClearedBoard(bonus.convertedBoard, bonus.clearPositions);
    this.isBonusResolving = true;
    this.isAnimating = true;
    this.busyTool = 'bonus';
    feedbackService.play('special');
    this.comboText = `剩余 ${bonus.convertedPositions.length} 步奖励`;
    if (bonus.convertedPositions.length === 0 || bonus.clearPositions.length === 0) {
      this.finishBonusAnimation(expectedSession);
      return;
    }
    this.animateBonusConversionSequence(expectedSession, beforeBoard, bonus.convertedBoard, bonus.convertedPositions, () => {
      if (this.session !== expectedSession) {
        return;
      }
      this.comboText = '奖励果冻集体触发';
      this.drawBoardSnapshot(bonus.convertedBoard);
      const token = this.animationToken;
      setTimeout(() => {
        if (token !== this.animationToken || this.session !== expectedSession) {
          return;
        }
        this.animateClear(bonus.convertedBoard, bonus.clearPositions, () => {
          if (this.session !== expectedSession) {
            return;
          }
          this.animateSettle(clearedBoard, afterBoard, () => {
            this.finishBonusAnimation(expectedSession);
          }, 360);
        }, 420);
      }, 360);
    });
  }

  private animateBonusConversionSequence(
    expectedSession: GameSession,
    baseBoard: Board,
    convertedBoard: Board,
    positions: Position[],
    done: () => void,
    index: number = 0
  ): void {
    if (this.session !== expectedSession) {
      return;
    }
    if (index >= positions.length) {
      this.comboText = `奖励转换完成 x${positions.length}`;
      this.drawBoardSnapshot(convertedBoard);
      const token = this.animationToken;
      setTimeout(() => {
        if (token === this.animationToken && this.session === expectedSession) {
          done();
        }
      }, 320);
      return;
    }
    this.comboText = `奖励转换 ${index + 1}/${positions.length}`;
    const fromBoard = this.createPartialBonusBoard(baseBoard, convertedBoard, positions, index);
    const toBoard = this.createPartialBonusBoard(baseBoard, convertedBoard, positions, index + 1);
    this.animateConversion(fromBoard, toBoard, [positions[index]], () => {
      if (this.session !== expectedSession) {
        return;
      }
      const token = this.animationToken;
      setTimeout(() => {
        if (token === this.animationToken && this.session === expectedSession) {
          this.animateBonusConversionSequence(expectedSession, baseBoard, convertedBoard, positions, done, index + 1);
        }
      }, 55);
    }, this.bonusConversionDuration(positions.length), 0.48);
  }

  private createPartialBonusBoard(baseBoard: Board, convertedBoard: Board, positions: Position[], count: number): Board {
    const result = cloneBoard(baseBoard);
    const safeCount = Math.max(0, Math.min(count, positions.length));
    for (let index = 0; index < safeCount; index++) {
      const position = positions[index];
      const resultPiece = result.tiles[position.row][position.col].piece;
      const convertedPiece = convertedBoard.tiles[position.row][position.col].piece;
      if (resultPiece && convertedPiece) {
        resultPiece.special = convertedPiece.special;
      }
    }
    return result;
  }

  private bonusConversionDuration(count: number): number {
    if (count >= 24) {
      return 145;
    }
    if (count >= 14) {
      return 170;
    }
    return 220;
  }

  private finishBonusAnimation(expectedSession: GameSession): void {
    if (this.session !== expectedSession) {
      return;
    }
    this.isBonusResolving = false;
    this.busyTool = '';
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
    feedbackService.play('tool');
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
    if (!this.session || this.showResult || this.isAnimating || this.session.state.status !== 'playing' ||
      !this.hasToolCount(this.undoToolCount)) {
      return;
    }
    this.busyTool = 'undo';
    feedbackService.play('tool');
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

  private runAddMovesTool(): void {
    if (!this.session || this.showResult || this.isAnimating || !this.hasToolCount(this.addMovesToolCount)) {
      return;
    }
    this.activeTool = '';
    this.busyTool = 'addMoves';
    feedbackService.play('tool');
    if (this.session.useAddMovesTool(3)) {
      this.statusText = '已增加 3 步';
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
    feedbackService.play('tap');
    this.activeTool = this.activeTool === tool ? '' : tool;
  }

  private applyTargetTool(position: Position): void {
    if (!this.session) {
      return;
    }
    const expectedSession = this.session;
    const tool = this.activeTool;
    if (!this.canApplyTargetTool(tool, position)) {
      return;
    }
    const beforeBoard = cloneBoard(this.session.state.board);
    this.activeTool = '';
    this.busyTool = tool;
    this.isAnimating = true;
    feedbackService.play(tool === 'hammer' ? 'match' : 'tool');
    if (tool === 'hammer') {
      const clearPositions = SpecialResolver.expandedClearPositions(beforeBoard, [position]);
      this.animateClear(beforeBoard, clearPositions, () => {
        const token = this.animationToken;
        setTimeout(() => {
          if (token !== this.animationToken || this.session !== expectedSession) {
            return;
          }
          this.commitTargetTool(tool, position, beforeBoard, clearPositions);
        }, 0);
      });
      return;
    }
    this.animateToolPulse(beforeBoard, position, () => {
      const token = this.animationToken;
      setTimeout(() => {
        if (token !== this.animationToken || this.session !== expectedSession) {
          return;
        }
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
      return this.hasToolCount(this.brushToolCount) &&
        tile.piece.special === 'none' &&
        tile.piece.type !== this.selectedBrushColor;
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
      used = this.session.useBrushTool(position, this.selectedBrushColor);
    }
    if (!used) {
      this.finishToolAnimation();
      return;
    }
    feedbackService.play(tool === 'hammer' ? 'match' : 'tool');
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
      this.addMovesToolCount = 0;
      this.undoToolCount = 0;
      return;
    }
    this.shuffleToolCount = this.session.state.tools.shuffle;
    this.hammerToolCount = this.session.state.tools.hammer;
    this.brushToolCount = this.session.state.tools.brush;
    this.addMovesToolCount = this.session.state.tools.addMoves;
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

  private canUseBrushColor(type: PieceType): boolean {
    const level = LEVELS[this.levelId - 1];
    return level.board.pieceTypes.indexOf(type) >= 0;
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
    const layout = this.layoutForBoard(board);
    const moveX = deltaCol * layout.tileSize;
    const moveY = deltaRow * layout.tileSize;
    this.runAnimation(durationMs, (progress: number) => {
      const eased = this.easeInOut(progress);
      const amount = fromProgress + (toProgress - fromProgress) * eased;
      this.drawBoardSnapshot(board, {
        fastStaticMode: true,
        pieceEffects: [
          { row: first.row, col: first.col, offsetX: moveX * amount, offsetY: moveY * amount, scale: 1.05, opacity: 1 },
          { row: second.row, col: second.col, offsetX: -moveX * amount, offsetY: -moveY * amount, scale: 1.05, opacity: 1 }
        ]
      });
    }, done);
  }

  private animateClear(board: Board, positions: Position[], done: () => void, durationMs: number = 110): void {
    this.runAnimation(durationMs, (progress: number) => {
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
      this.drawBoardSnapshot(board, { pieceEffects: effects, fastStaticMode: true });
    }, done);
  }

  private animateConversion(
    fromBoard: Board,
    toBoard: Board,
    positions: Position[],
    done: () => void,
    durationMs: number = 170,
    switchAt: number = 0.18
  ): void {
    this.runAnimation(durationMs, (progress: number) => {
      const eased = this.easeInOut(progress);
      const pulse = progress < 0.5 ? eased : 1 - eased;
      const effects: PieceRenderEffect[] = [];
      positions.forEach(position => {
        effects.push({
          row: position.row,
          col: position.col,
          offsetX: 0,
          offsetY: 0,
          scale: 1 + pulse * 0.20,
          opacity: 1
        });
      });
      this.drawBoardSnapshot(progress < switchAt ? fromBoard : toBoard, { pieceEffects: effects, fastStaticMode: true });
    }, done);
  }

  private animateToolPulse(board: Board, position: Position, done: () => void): void {
    this.runAnimation(88, (progress: number) => {
      const eased = this.easeInOut(progress);
      const pulse = progress < 0.5 ? eased : 1 - eased;
      this.drawBoardSnapshot(board, {
        fastStaticMode: true,
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

  private animateSettle(fromBoard: Board, toBoard: Board, done: () => void, durationMs: number = 190): void {
    const layout = this.layoutForBoard(toBoard);
    const motions = BoardAnimationPlanner.planFallEffects(fromBoard, toBoard, layout.tileSize);
    this.runAnimation(durationMs, (progress: number) => {
      const eased = this.easeOut(progress);
      const effects = BoardAnimationPlanner.interpolateFallEffects(motions, eased);
      this.drawBoardSnapshot(toBoard, { pieceEffects: effects, fastMode: true });
    }, done);
  }

  private runAnimation(durationMs: number, frame: (progress: number) => void, done: () => void): void {
    const token = ++this.animationToken;
    const startedAt = Date.now();
    const duration = gameSettingsService.getState().reducedMotion ? Math.max(48, Math.floor(durationMs * 0.64)) : durationMs;
    const tick = (): void => {
      if (token !== this.animationToken) {
        return;
      }
      const elapsed = Date.now() - startedAt;
      const rawProgress = Math.min(1, elapsed / duration);
      frame(rawProgress);
      if (rawProgress < 1) {
        setTimeout(tick, 16);
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
    const layout = this.layoutForBoard(board);
    this.boardLayout = layout;
    this.renderer.draw(this.context as GameCanvasContext, board, {
      width: this.canvasWidth,
      height: this.canvasHeight,
      layout,
      animation,
      theme: this.worldTheme().board
    });
  }

  private worldTheme(): LevelWorldTheme {
    return getLevelWorldTheme(this.levelId);
  }

  private layoutForBoard(board: Board): BoardLayoutResult {
    const key = `${board.rows}x${board.cols}_${this.canvasWidth}x${this.canvasHeight}`;
    if (!this.cachedLayout || this.cachedLayoutKey !== key) {
      this.cachedLayout = BoardLayout.compute(board, this.canvasWidth, this.canvasHeight);
      this.cachedLayoutKey = key;
    }
    return this.cachedLayout;
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
      return `${this.score}/${this.scorePipeTargetValue()}`;
    }
    return `${this.score}`;
  }

  private scorePipeFillWidth(): number {
    const ratio = Math.min(1, this.score / this.scorePipeTargetValue());
    if (this.score <= 0) {
      return 0;
    }
    return Math.max(10, this.scoreTrackWidth * ratio);
  }

  private scoreGoalValue(): number {
    if (this.session) {
      return this.session.scoreGoalValue();
    }
    return Math.max(1, this.score);
  }

  private scorePipeTargetValue(): number {
    if (this.session) {
      return this.session.threeStarScoreValue();
    }
    return Math.max(1, this.score);
  }

  private scoreMilestoneValue(stars: number): number {
    if (!this.session) {
      return Math.max(1, this.score);
    }
    if (stars <= 1) {
      return this.session.scoreGoalValue();
    }
    if (stars === 2) {
      return this.session.twoStarScoreValue();
    }
    return this.session.threeStarScoreValue();
  }

  private scoreMarkerLeft(stars: number): number {
    const ratio = Math.min(1, this.scoreMilestoneValue(stars) / this.scorePipeTargetValue());
    return Math.max(0, Math.min(this.scoreTrackWidth - 2, 5 + this.scoreTrackWidth * ratio - 10));
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

  private messageChipText(): string {
    if (this.comboText.length > 0) {
      return this.comboText;
    }
    if (this.shouldShowGoalChip()) {
      return this.goalText;
    }
    return '';
  }

  private async finishLevel(): Promise<void> {
    if (!this.session || this.resultSaved) {
      return;
    }
    const finishedSession = this.session;
    const finishedLevelId = this.levelId;
    this.resultSaved = true;
    const won = finishedSession.state.status === 'won';
    const finalScore = this.score;
    const finalMovesLeft = this.movesLeft;
    const targetScore = this.scoreGoalValue();
    const showContinueOffer = !won && finalScore < targetScore;
    this.resultWon = won;
    this.showContinueOffer = showContinueOffer;
    if (won) {
      economyService.addCoins(60 + finalMovesLeft * 2);
      this.coinBalance = economyService.getWallet().coins;
    }
    const progress = await progressService.recordResult({
      levelId: finishedLevelId,
      won,
      score: finalScore,
      movesLeft: finalMovesLeft,
      targetScore
    });
    if (this.session !== finishedSession || this.levelId !== finishedLevelId) {
      return;
    }
    feedbackService.play(won ? 'win' : 'lose');
    this.resultTitle = won ? '通关成功' : '挑战失败';
    this.resultStars = won ? formatStars(progress.stars) : '☆☆☆';
    this.resultMessage = won
      ? `得分 ${finalScore}，剩余 ${finalMovesLeft} 步`
      : showContinueOffer
        ? `基础分未达标，是否花费 20 个游戏代币买一个“+5步”？`
        : `得分 ${finalScore}，再试一次就差不多了`;
    this.showResult = true;
  }

  private buyExtraMoves(): void {
    if (!this.session) {
      return;
    }
    const product = economyService.getProduct('extra_moves');
    feedbackService.play('tap');
    if (!economyService.purchase('extra_moves')) {
      this.coinBalance = economyService.getWallet().coins;
      this.resultMessage = `金币不足，还需要 ${product.price} 金币`;
      return;
    }
    if (this.session.reviveWithMoves(product.extraMoves)) {
      this.coinBalance = economyService.getWallet().coins;
      this.showResult = false;
      this.resultSaved = false;
      this.resultWon = false;
      this.showContinueOffer = false;
      this.statusText = '进行中';
      this.syncState();
      this.draw();
      return;
    }
    economyService.addCoins(product.price);
    this.coinBalance = economyService.getWallet().coins;
  }

  private draw(): void {
    if (!this.session || !this.canvasReady) {
      return;
    }
    this.drawBoardSnapshot(this.session.state.board);
  }

  private appContext(): common.Context {
    return this.getUIContext().getHostContext() as common.Context;
  }
}
