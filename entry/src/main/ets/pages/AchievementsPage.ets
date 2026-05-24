import { common } from '@kit.AbilityKit';
import { AchievementItem, deriveAchievements } from '../game/achievements/AchievementService';
import { economyService } from '../game/economy/EconomyService';
import { feedbackService } from '../game/feedback/FeedbackService';
import { bootstrapProgress } from '../game/storage/ProgressBootstrap';
import { progressService } from '../game/storage/ProgressService';

@Entry
@Component
struct AchievementsPage {
  @State private achievements: AchievementItem[] = [];
  @State private unlockedCount: number = 0;
  @State private totalCount: number = 0;

  aboutToAppear(): void {
    feedbackService.init(this.appContext());
    this.refreshAchievements();
  }

  onPageShow(): void {
    this.refreshAchievements();
  }

  build() {
    Stack() {
      Image($r('app.media.game_background'))
        .width('100%')
        .height('100%')
        .objectFit(ImageFit.Cover)

      Column() {
        Row() {
          Column() {
            Text('成就馆')
              .fontSize(26)
              .fontWeight(FontWeight.Bold)
              .fontColor('#5C3A4A')
            Text(`${this.unlockedCount}/${this.totalCount} 已解锁`)
              .fontSize(12)
              .fontColor('#8A6250')
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
        .padding({ left: 20, right: 20, top: 24, bottom: 14 })

        Scroll() {
          Column() {
            ForEach(this.achievements, (item: AchievementItem) => {
              this.AchievementCard(item)
            })
          }
          .width('100%')
          .padding({ left: 18, right: 18, bottom: 28 })
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
  AchievementCard(item: AchievementItem) {
    Column() {
      Row() {
        Stack() {
          Text(item.unlocked ? '★' : '☆')
            .fontSize(22)
            .fontColor(item.unlocked ? '#FFFFFF' : '#B98A3E')
            .textAlign(TextAlign.Center)
        }
        .width(42)
        .height(42)
        .borderRadius(21)
        .backgroundColor(item.unlocked ? '#F2B84B' : 'rgba(255, 241, 166, 0.72)')
        .margin({ right: 12 })

        Column() {
          Text(item.title)
            .fontSize(17)
            .fontWeight(FontWeight.Bold)
            .fontColor('#5C3A4A')
          Text(item.description)
            .fontSize(12)
            .fontColor('#8A6250')
            .margin({ top: 4 })
        }
        .layoutWeight(1)
        .alignItems(HorizontalAlign.Start)

        Text(`${item.progress}/${item.target}`)
          .fontSize(13)
          .fontWeight(FontWeight.Medium)
          .fontColor(item.unlocked ? '#4DB862' : '#8A6250')
      }
      .width('100%')
      .alignItems(VerticalAlign.Center)

      this.AchievementProgressBar(item)
    }
    .width('100%')
    .padding(16)
    .borderRadius(20)
    .backgroundColor('rgba(255, 253, 244, 0.80)')
    .shadow({ radius: 14, color: 'rgba(92, 58, 74, 0.11)', offsetX: 0, offsetY: 6 })
    .margin({ bottom: 12 })
  }

  @Builder
  AchievementProgressBar(item: AchievementItem) {
    Stack() {
      Row()
        .height(10)
        .width('100%')
        .borderRadius(5)
        .backgroundColor('rgba(99, 181, 213, 0.13)')
        .border({ width: 1, color: 'rgba(255, 255, 255, 0.46)' })
        .position({ x: 0, y: 0 })

      if (item.progress > 0) {
        Row() {
          Blank()
          Row()
            .width(6)
            .height(6)
            .borderRadius(3)
            .backgroundColor('rgba(255, 255, 255, 0.72)')
            .margin({ right: 2 })
        }
        .height(10)
        .width(this.progressPercentText(item))
        .borderRadius(5)
        .backgroundColor(item.unlocked ? '#76D37B' : '#69B8EA')
        .shadow({
          radius: item.unlocked ? 5 : 4,
          color: item.unlocked ? 'rgba(118, 211, 123, 0.24)' : 'rgba(105, 184, 234, 0.24)',
          offsetX: 0,
          offsetY: 2
        })
        .position({ x: 0, y: 0 })
      }
    }
    .width('100%')
    .height(10)
    .alignContent(Alignment.Start)
    .margin({ top: 12 })
  }

  private async refreshAchievements(): Promise<void> {
    await bootstrapProgress(this.appContext());
    const summary = deriveAchievements(await progressService.getAll(), economyService.getWallet());
    this.achievements = summary.items;
    this.unlockedCount = summary.unlockedCount;
    this.totalCount = summary.totalCount;
  }

  private appContext(): common.Context {
    return this.getUIContext().getHostContext() as common.Context;
  }

  private progressPercentText(item: AchievementItem): string {
    const ratio = Math.min(1, Math.max(0, item.progress / Math.max(1, item.target)));
    return `${Math.round(ratio * 100)}%`;
  }
}
