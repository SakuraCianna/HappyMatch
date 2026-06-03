import { common } from '@kit.AbilityKit';
import { feedbackService } from '../game/feedback/FeedbackService';
import { LEVEL_CHAPTERS, LevelChapter, getLevelChapter } from '../game/levels/LevelChapters';
import { LevelConfig } from '../game/levels/LevelConfig';
import { getWorldThemeById, LevelWorldTheme } from '../game/levels/LevelWorldThemes';
import { isLevelPlayable, isWorldEntryLevel } from '../game/levels/LevelUnlocks';
import { LEVELS } from '../game/levels/levels';
import { WorldPopulation } from '../game/remote/RemoteModels';
import { remoteGameService } from '../game/remote/RemoteGameService';
import { bootstrapProgress } from '../game/storage/ProgressBootstrap';
import { LevelProgress } from '../game/storage/ProgressRepository';
import { progressService } from '../game/storage/ProgressService';

@Entry
@Component
struct LevelSelectPage {
  @State private unlockedLevel: number = 1;
  @State private progressItems: LevelProgress[] = [];
  @State private worldPopulation: WorldPopulation[] = [];
  @State private canPlay: boolean = false;

  aboutToAppear(): void {
    feedbackService.init(this.appContext());
    this.refreshProgress();
  }

  onPageShow(): void {
    this.refreshProgress();
  }

  build() {
    Stack() {
      this.WorldBackdrop()

      Column() {
        Row() {
          Column() {
            Text('关卡地图')
              .fontSize(26)
              .fontWeight(FontWeight.Bold)
              .fontColor('#5C3A4A')
            Text(this.currentChapterText())
              .fontSize(12)
              .fontColor(this.colorForLevel(this.unlockedLevel))
              .margin({ top: 4 })
          }
          .alignItems(HorizontalAlign.Start)
          Blank()
          Button('返回')
            .height(36)
            .borderRadius(18)
            .fontColor('#5C3A4A')
            .backgroundColor('rgba(255, 255, 255, 0.72)')
            .onClick(() => {
              feedbackService.play('tap');
              this.getUIContext().getRouter().back();
            })
        }
        .width('100%')
        .padding({ left: 18, right: 18, top: 22, bottom: 10 })

        Scroll() {
          Column() {
            ForEach(LEVEL_CHAPTERS, (chapter: LevelChapter) => {
              this.ChapterSection(chapter)
            })
          }
          .width('100%')
          .padding({ left: 14, right: 14, bottom: 30 })
        }
        .layoutWeight(1)
      }
      .width('100%')
      .height('100%')
      .backgroundColor('rgba(255, 248, 228, 0.24)')
    }
    .width('100%')
    .height('100%')
  }

  @Builder
  WorldBackdrop() {
    Stack() {
      Column() {
        Row()
          .layoutWeight(1)
          .backgroundColor(getWorldThemeById(2).backgroundTop)
        Row()
          .layoutWeight(1)
          .backgroundColor(getWorldThemeById(1).backgroundMiddle)
        Row()
          .layoutWeight(1)
          .backgroundColor(getWorldThemeById(5).backgroundBottom)
      }
      .width('100%')
      .height('100%')

      Row()
        .width(240)
        .height(72)
        .borderRadius(36)
        .backgroundColor('rgba(255, 255, 255, 0.36)')
        .position({ x: '-14%', y: '12%' })
      Row()
        .width(180)
        .height(58)
        .borderRadius(29)
        .backgroundColor('rgba(255, 255, 255, 0.34)')
        .position({ x: '58%', y: '7%' })
      Row()
        .width(280)
        .height(88)
        .borderRadius(44)
        .backgroundColor('rgba(255, 255, 255, 0.26)')
        .position({ x: '10%', y: '82%' })
    }
    .width('100%')
    .height('100%')
  }

  @Builder
  ChapterSection(chapter: LevelChapter) {
    Column() {
      Row() {
        Column() {
          Text(chapter.name)
            .fontSize(18)
            .fontWeight(FontWeight.Bold)
            .fontColor('#5C3A4A')
          Text(chapter.subtitle)
            .fontSize(11)
            .fontColor('#8A6250')
            .maxLines(1)
            .textOverflow({ overflow: TextOverflow.Ellipsis })
            .margin({ top: 3 })
        }
        .alignItems(HorizontalAlign.Start)
        .layoutWeight(1)
        Row() {
          Text(this.chapterClearText(chapter))
            .fontSize(12)
            .fontColor(chapter.accent)
            .padding({ left: 10, right: 10, top: 4, bottom: 4 })
            .borderRadius(12)
            .backgroundColor('rgba(255, 255, 255, 0.60)')
          Text(this.chapterOnlineText(chapter))
            .fontSize(12)
            .fontColor('#5C3A4A')
            .padding({ left: 10, right: 10, top: 4, bottom: 4 })
            .borderRadius(12)
            .backgroundColor('rgba(255, 255, 255, 0.50)')
            .margin({ left: 6 })
        }
        .alignItems(VerticalAlign.Center)
      }
      .width('100%')
      .margin({ bottom: 12 })

      Grid() {
        ForEach(this.levelsInChapter(chapter), (level: LevelConfig) => {
          GridItem() {
            this.LevelNode(level)
          }
        })
      }
      .columnsTemplate('1fr 1fr 1fr 1fr 1fr')
      .rowsGap(12)
      .columnsGap(10)
    }
    .width('100%')
    .padding({ left: 14, right: 14, top: 15, bottom: 18 })
    .borderRadius(22)
    .backgroundColor(this.themeForChapter(chapter).panelFill)
    .border({ width: 1, color: this.themeForChapter(chapter).panelBorder })
    .shadow({ radius: 14, color: this.themeForChapter(chapter).shadow, offsetX: 0, offsetY: 6 })
    .margin({ top: 12 })
  }

  @Builder
  LevelNode(level: LevelConfig) {
    Column() {
      Stack() {
        Text(`${level.id}`)
          .fontSize(level.id < 100 ? 16 : 14)
          .fontWeight(FontWeight.Bold)
          .fontColor(this.isPlayableLevel(level.id) ? '#FFFFFF' : '#A6998C')
      }
      .width(this.nodeSize(level.id))
      .height(this.nodeSize(level.id))
      .borderRadius(this.nodeSize(level.id) / 2)
      .backgroundColor(this.isPlayableLevel(level.id) ? this.colorForLevel(level.id) : 'rgba(228, 216, 200, 0.78)')
      .border({ width: this.isMilestone(level.id) ? 3 : 1, color: this.isMilestone(level.id) ? '#FFF6D6' : 'rgba(255, 255, 255, 0.72)' })
      .shadow({ radius: this.isPlayableLevel(level.id) ? 10 : 4, color: 'rgba(92, 58, 74, 0.14)', offsetX: 0, offsetY: 5 })
      .onClick(() => {
        if (!this.canPlay) {
          feedbackService.play('error');
          this.getUIContext().getRouter().pushUrl({ url: 'pages/AuthPage' });
          return;
        }
        if (this.isPlayableLevel(level.id)) {
          feedbackService.play('tap');
          this.getUIContext().getRouter().pushUrl({ url: 'pages/GamePage', params: { levelId: level.id } });
        } else {
          feedbackService.play('error');
        }
      })

      Text(this.starsForLevel(level.id))
        .fontSize(10)
        .fontColor(this.isPlayableLevel(level.id) ? '#8A6250' : '#AFA28F')
        .maxLines(1)
        .margin({ top: 3 })
    }
    .width('100%')
    .alignItems(HorizontalAlign.Center)
  }

  private nodeSize(levelId: number): number {
    if (this.isMilestone(levelId)) {
      return 50;
    }
    return 43;
  }

  private isMilestone(levelId: number): boolean {
    return isWorldEntryLevel(levelId) || levelId === 5 || levelId % 20 === 0;
  }

  private isPlayableLevel(levelId: number): boolean {
    return isLevelPlayable(levelId, this.unlockedLevel);
  }

  private levelsInChapter(chapter: LevelChapter): LevelConfig[] {
    return LEVELS.filter(level => level.id >= chapter.startLevel && level.id <= chapter.endLevel);
  }

  private colorForLevel(levelId: number): string {
    return getLevelChapter(levelId).accent;
  }

  private themeForChapter(chapter: LevelChapter): LevelWorldTheme {
    return getWorldThemeById(chapter.id);
  }

  private currentChapterText(): string {
    if (!this.canPlay) {
      return '请先登录或注册玩家信息';
    }
    const chapter = getLevelChapter(this.unlockedLevel);
    return `${chapter.name} ${this.unlockedLevel - chapter.startLevel + 1}/20`;
  }

  private chapterClearText(chapter: LevelChapter): string {
    const cleared = this.progressItems.filter(item => {
      return item.cleared && item.levelId >= chapter.startLevel && item.levelId <= chapter.endLevel;
    }).length;
    return `${cleared}/20`;
  }

  private async refreshProgress(): Promise<void> {
    await bootstrapProgress(this.appContext());
    this.unlockedLevel = await progressService.getUnlockedLevel();
    this.progressItems = await progressService.getAll();
    try {
      const state = await remoteGameService.init(this.appContext());
      this.canPlay = state.authenticated && state.player !== undefined;
      if (!this.canPlay) {
        this.worldPopulation = [];
        return;
      }
      const chapter = getLevelChapter(this.unlockedLevel);
      await remoteGameService.updatePresence(chapter.id, this.unlockedLevel);
      this.worldPopulation = await remoteGameService.listWorldPopulation();
    } catch (_error) {
      this.canPlay = false;
      this.worldPopulation = [];
    }
  }

  private chapterOnlineText(chapter: LevelChapter): string {
    const population = this.worldPopulation.find(item => item.world_id === chapter.id);
    const count = population ? population.active_players : 0;
    return `在线 ${count}`;
  }

  private appContext(): common.Context {
    return this.getUIContext().getHostContext() as common.Context;
  }

  private starsForLevel(levelId: number): string {
    const progress = this.progressItems.find(item => item.levelId === levelId);
    if (!progress || progress.stars <= 0) {
      if (!this.canPlay) {
        return '需登录';
      }
      return this.isPlayableLevel(levelId) ? '未通关' : '锁定';
    }
    if (progress.stars === 1) {
      return '★☆☆';
    }
    if (progress.stars === 2) {
      return '★★☆';
    }
    return '★★★';
  }
}
