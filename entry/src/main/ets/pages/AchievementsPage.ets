import { router } from '@kit.ArkUI';
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
    feedbackService.init(getContext(this) as common.Context);
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
              router.back();
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

      Stack() {
        Row()
          .height(8)
          .width('100%')
          .borderRadius(4)
          .backgroundColor('rgba(99, 181, 213, 0.16)')
        Row()
          .height(8)
          .width(`${Math.round(100 * item.progress / Math.max(1, item.target))}%`)
          .borderRadius(4)
          .backgroundColor(item.unlocked ? '#76D37B' : '#69B8EA')
      }
      .height(8)
      .margin({ top: 12 })
    }
    .width('100%')
    .padding(16)
    .borderRadius(20)
    .backgroundColor('rgba(255, 253, 244, 0.80)')
    .shadow({ radius: 14, color: 'rgba(92, 58, 74, 0.11)', offsetX: 0, offsetY: 6 })
    .margin({ bottom: 12 })
  }

  private async refreshAchievements(): Promise<void> {
    await bootstrapProgress(getContext(this) as common.Context);
    const summary = deriveAchievements(await progressService.getAll(), economyService.getWallet());
    this.achievements = summary.items;
    this.unlockedCount = summary.unlockedCount;
    this.totalCount = summary.totalCount;
  }
}
