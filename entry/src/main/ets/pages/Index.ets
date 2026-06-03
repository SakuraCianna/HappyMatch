import { common } from '@kit.AbilityKit';
import { economyService } from '../game/economy/EconomyService';
import { feedbackService } from '../game/feedback/FeedbackService';
import { remoteGameService } from '../game/remote/RemoteGameService';
import { gameSettingsService } from '../game/settings/GameSettings';
import { bootstrapProgress } from '../game/storage/ProgressBootstrap';
import { progressService } from '../game/storage/ProgressService';

@Entry
@Component
struct Index {
  @State private continueLevel: number = 1;
  @State private coins: number = 0;
  @State private homeMotion: boolean = false;
  @State private cloudText: string = '账号未登录';
  @State private nearbyText: string = '登录后同步';

  aboutToAppear(): void {
    const context = this.appContext();
    feedbackService.init(context);
    gameSettingsService.init(context);
    this.homeMotion = false;
    setTimeout(() => {
      this.homeMotion = true;
    }, 80);
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

      this.DecorationJelly('#F27A91', 54, 54, 34, '72%', 8, -10, 2600, -7)
      this.DecorationJelly('#69B8EA', 46, 46, '40%', '60%', -7, 8, 3100, 8)
      this.DecorationJelly('#EFC957', 64, 64, '58%', '60%', 10, -6, 3400, -5)
      this.DecorationJelly('#76D37B', 52, 52, '31%', '69%', -6, -8, 2900, 6)
      this.DecorationJelly('#B487EF', 56, 56, '70%', '70%', 7, 9, 3300, -8)
      this.DecorationJelly('#F39967', 30, 30, '78%', '52%', -5, 6, 2500, 10)

      Column() {
        Column() {
          Row() {
            this.NavButton('成就', 'pages/AchievementsPage')
            this.NavButton('图鉴', 'pages/GuidePage')
            this.NavButton('社交', 'pages/SocialPage')
            Blank()
            this.NavButton('账号', 'pages/AuthPage')
            this.NavButton('设置', 'pages/SettingsPage')
          }
          .width('100%')
        }
        .width('100%')
        .padding({ left: 16, right: 16, top: 22 })

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

          Row() {
            this.StatusChip(`金币 ${this.coins}`, '#F2B84B')
            this.StatusChip(this.cloudText, '#F27A91')
          }
          .margin({ top: 16 })

          Text(this.nearbyText)
            .fontSize(12)
            .fontColor('#8C6A3D')
            .padding({ left: 16, right: 16, top: 6, bottom: 6 })
            .borderRadius(15)
            .backgroundColor('rgba(255, 255, 255, 0.60)')
            .margin({ top: 8, bottom: 28 })

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
              this.getUIContext().getRouter().pushUrl({ url: 'pages/LevelSelectPage' });
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
              this.getUIContext().getRouter().pushUrl({ url: 'pages/GamePage', params: { levelId: this.continueLevel } });
            })
        }
        .width('100%')
        .alignItems(HorizontalAlign.Center)
        .margin({ bottom: 118 })
        .translate({ y: this.homeMotion ? -4 : 4 })
        .animation({ duration: 3300, curve: Curve.EaseInOut, iterations: -1, playMode: PlayMode.Alternate })

        Blank()
      }
      .width('100%')
      .height('100%')
    }
    .width('100%')
    .height('100%')
  }

  @Builder
  NavButton(label: string, url: string) {
    Button(label)
      .height(34)
      .borderRadius(17)
      .fontSize(12)
      .fontColor('#5C3A4A')
      .backgroundColor('rgba(255, 255, 255, 0.70)')
      .margin({ right: 7 })
      .onClick(() => {
        feedbackService.play('tap');
        this.getUIContext().getRouter().pushUrl({ url });
      })
  }

  @Builder
  StatusChip(text: string, color: string) {
    Text(text)
      .fontSize(12)
      .fontColor('#8C6A3D')
      .padding({ left: 13, right: 13, top: 6, bottom: 6 })
      .borderRadius(15)
      .backgroundColor('rgba(255, 255, 255, 0.62)')
      .border({ width: 1, color })
      .margin({ right: 8 })
  }

  @Builder
  DecorationJelly(
    color: string,
    width: number,
    height: number,
    x: string | number,
    y: string | number,
    driftX: number,
    driftY: number,
    duration: number,
    rotateAngle: number
  ) {
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
    .translate({ x: this.homeMotion ? driftX : -driftX, y: this.homeMotion ? driftY : -driftY })
    .scale({ x: this.homeMotion ? 1.05 : 0.96, y: this.homeMotion ? 0.97 : 1.04 })
    .rotate({ angle: this.homeMotion ? rotateAngle : -rotateAngle })
    .animation({ duration, curve: Curve.EaseInOut, iterations: -1, playMode: PlayMode.Alternate })
  }

  private async refreshProgress(): Promise<void> {
    const context = this.appContext();
    await bootstrapProgress(context);
    await economyService.init(context);
    this.continueLevel = await progressService.getUnlockedLevel();
    const state = await remoteGameService.init(context);
    if (state.player) {
      economyService.syncFromRemote(state.player.coin);
    }
    this.coins = economyService.getWallet().coins;
    await remoteGameService.syncPlayerProgress(this.continueLevel, this.coins);
    const nearby = await remoteGameService.updatePresence(1, this.continueLevel);
    const latest = remoteGameService.getState();
    this.cloudText = latest.player ? `好友码 ${latest.player.friend_code}` : '账号未登录';
    this.nearbyText = latest.player && nearby ? `附近 ${nearby.active_players} 人在线` : '登录账号后同步好友, 排行榜和附近人数';
  }

  private appContext(): common.Context {
    return this.getUIContext().getHostContext() as common.Context;
  }
}
