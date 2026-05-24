import { router } from '@kit.ArkUI';
import { common } from '@kit.AbilityKit';
import { economyService } from '../game/economy/EconomyService';
import { feedbackService } from '../game/feedback/FeedbackService';
import { gameSettingsService } from '../game/settings/GameSettings';
import { bootstrapProgress } from '../game/storage/ProgressBootstrap';
import { progressService } from '../game/storage/ProgressService';

@Entry
@Component
struct HomePage {
  @State private continueLevel: number = 1;
  @State private coins: number = 0;

  aboutToAppear(): void {
    const context = getContext(this) as common.Context;
    feedbackService.init(context);
    gameSettingsService.init(context);
    this.refreshProgress();
  }

  onPageShow(): void {
    this.refreshProgress();
  }

  build() {
    Stack() {
      Image($r('app.media.game_background'))
        .width('100%')
        .height('100%')
        .objectFit(ImageFit.Cover)

      this.DecorationJelly('#F27A91', 54, 54, 34, '72%')
      this.DecorationJelly('#69B8EA', 46, 46, '39%', '61%')
      this.DecorationJelly('#EFC957', 64, 64, '58%', '60%')
      this.DecorationJelly('#76D37B', 52, 52, '31%', '68%')
      this.DecorationJelly('#B487EF', 56, 56, '70%', '69%')
      this.DecorationJelly('#F39967', 30, 30, '78%', '52%')

      Column() {
        Row() {
          Button('成就')
            .height(34)
            .borderRadius(17)
            .fontColor('#5C3A4A')
            .backgroundColor('rgba(255, 255, 255, 0.70)')
            .onClick(() => {
              feedbackService.play('tap');
              router.pushUrl({ url: 'pages/AchievementsPage' });
            })
          Blank()
          Button('设置')
            .height(34)
            .borderRadius(17)
            .fontColor('#5C3A4A')
            .backgroundColor('rgba(255, 255, 255, 0.70)')
            .onClick(() => {
              feedbackService.play('tap');
              router.pushUrl({ url: 'pages/SettingsPage' });
            })
        }
        .width('100%')
        .padding({ left: 22, right: 22, top: 22 })

        Blank()

        Column() {
          Text('开心消消乐')
            .fontSize(39)
            .fontWeight(FontWeight.Bold)
            .fontColor('#5C3A4A')
            .textAlign(TextAlign.Center)
          Text('糖果天空岛')
            .fontSize(19)
            .fontColor('#8C6A3D')
            .margin({ top: 10 })
          Text(`金币 ${this.coins}`)
            .fontSize(12)
            .fontColor('#8C6A3D')
            .padding({ left: 14, right: 14, top: 5, bottom: 5 })
            .borderRadius(14)
            .backgroundColor('rgba(255, 255, 255, 0.58)')
            .margin({ top: 16, bottom: 38 })

          Button('开始游戏')
            .width(230)
            .height(52)
            .fontSize(18)
            .fontColor('#FFFFFF')
            .fontWeight(FontWeight.Medium)
            .borderRadius(26)
            .backgroundColor('#F27A91')
            .shadow({ radius: 18, color: 'rgba(242, 122, 145, 0.32)', offsetX: 0, offsetY: 8 })
            .onClick(() => {
              feedbackService.play('tap');
              router.pushUrl({ url: 'pages/LevelSelectPage' });
            })
          Button(`继续第 ${this.continueLevel} 关`)
            .width(230)
            .height(52)
            .fontSize(18)
            .fontColor('#FFFFFF')
            .fontWeight(FontWeight.Medium)
            .borderRadius(26)
            .backgroundColor('#69B8EA')
            .shadow({ radius: 18, color: 'rgba(105, 184, 234, 0.28)', offsetX: 0, offsetY: 8 })
            .margin({ top: 16 })
            .onClick(() => {
              feedbackService.play('tap');
              router.pushUrl({ url: 'pages/GamePage', params: { levelId: this.continueLevel } });
            })
        }
        .width('100%')
        .alignItems(HorizontalAlign.Center)
        .margin({ bottom: 120 })

        Blank()
      }
      .width('100%')
      .height('100%')
    }
    .width('100%')
    .height('100%')
  }

  @Builder
  DecorationJelly(color: string, width: number, height: number, x: string | number, y: string | number) {
    Stack() {
      Row()
        .width(Math.max(10, width * 0.30))
        .height(Math.max(8, height * 0.22))
        .borderRadius(Math.max(4, height * 0.12))
        .backgroundColor('rgba(255, 255, 255, 0.48)')
        .position({ x: width * 0.22, y: height * 0.16 })
    }
    .width(width)
    .height(height)
    .borderRadius(Math.max(width, height) / 2)
    .backgroundColor(color)
    .opacity(0.82)
    .shadow({ radius: 12, color: 'rgba(92, 58, 74, 0.16)', offsetX: 0, offsetY: 6 })
    .position({ x, y })
  }

  private async refreshProgress(): Promise<void> {
    await bootstrapProgress(getContext(this) as common.Context);
    this.continueLevel = await progressService.getUnlockedLevel();
    this.coins = economyService.getWallet().coins;
  }
}
