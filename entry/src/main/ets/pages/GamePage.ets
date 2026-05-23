import { router } from '@kit.ArkUI';
import { common } from '@kit.AbilityKit';
import { BoardInputMapper } from '../game/input/BoardInputMapper';
import { GameSession } from '../game/core/GameSession';
import { LEVELS } from '../game/levels/levels';
import { BoardLayout, BoardLayoutResult } from '../game/render/BoardLayout';
import { CanvasRenderer } from '../game/render/CanvasRenderer';
import { bootstrapProgress } from '../game/storage/ProgressBootstrap';
import { progressService } from '../game/storage/ProgressService';

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
  private canvasHeight: number = 520;
  private resultSaved: boolean = false;
  @State private levelId: number = 1;
  @State private movesLeft: number = 0;
  @State private score: number = 0;
  @State private statusText: string = '进行中';
  @State private goalText: string = '';
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
      Column() {
        Row() {
          Button('返回')
            .height(34)
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
            .onClick(() => {
              this.startLevel(this.levelId);
            })
        }
        .width('100%')
        .padding({ left: 12, right: 12, top: 12, bottom: 8 })

        Row() {
          Text(`步数 ${this.movesLeft}`)
            .fontSize(16)
            .fontColor('#5C3A4A')
          Blank()
          Text(`分数 ${this.score}`)
            .fontSize(16)
            .fontColor('#5C3A4A')
          Blank()
          Text(this.statusText)
            .fontSize(16)
            .fontColor('#5C3A4A')
        }
        .width('100%')
        .padding({ left: 18, right: 18, bottom: 8 })

        Text(this.goalText)
          .fontSize(14)
          .fontColor('#7B5A4D')
          .width('100%')
          .padding({ left: 18, right: 18, bottom: 8 })

        Canvas(this.context)
          .width(this.canvasWidth)
          .height(this.canvasHeight)
          .backgroundColor('#FFF3C7')
          .onReady(() => {
            this.draw();
          })
          .onTouch((event: TouchEvent) => {
            this.handleTouch(event);
          })

        Text(this.showResult ? '本关已结束' : '拖动相邻果冻进行交换')
          .fontSize(14)
          .fontColor('#8C6A3D')
          .margin({ top: 12 })
      }
      .width('100%')
      .height('100%')
      .alignItems(HorizontalAlign.Center)
      .backgroundColor('#FFF8E4')

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
    this.draw();
  }

  private handleTouch(event: TouchEvent): void {
    if (!this.session || !this.boardLayout || event.touches.length === 0 || this.showResult) {
      return;
    }
    const touch = event.touches[0];
    if (event.type === TouchType.Down) {
      this.inputMapper.begin(this.session.state.board, this.boardLayout, touch.x, touch.y);
    }
    if (event.type === TouchType.Up) {
      const selection = this.inputMapper.end(this.session.state.board, this.boardLayout, touch.x, touch.y);
      if (selection && this.session.trySwap(selection.from, selection.to)) {
        this.syncState();
        this.draw();
      }
    }
  }

  private syncState(): void {
    if (!this.session) {
      return;
    }
    this.movesLeft = this.session.state.movesLeft;
    this.score = this.session.state.score;
    this.goalText = this.describeGoals();
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
    if (!this.session) {
      return;
    }
    this.boardLayout = BoardLayout.compute(this.session.state.board, this.canvasWidth, this.canvasHeight);
    this.renderer.draw(this.context, this.session.state.board, {
      width: this.canvasWidth,
      height: this.canvasHeight
    });
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
