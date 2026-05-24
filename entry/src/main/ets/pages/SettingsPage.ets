import { common } from '@kit.AbilityKit';
import { feedbackService } from '../game/feedback/FeedbackService';
import { gameSettingsService } from '../game/settings/GameSettings';

@Entry
@Component
struct SettingsPage {
  @State private soundEnabled: boolean = true;
  @State private vibrationEnabled: boolean = true;
  @State private reducedMotion: boolean = false;

  aboutToAppear(): void {
    const context = this.appContext();
    feedbackService.init(context);
    this.loadSettings(context);
  }

  build() {
    Stack() {
      Image($r('app.media.game_background'))
        .width('100%')
        .height('100%')
        .objectFit(ImageFit.Cover)

      Column() {
        Row() {
          Text('游戏设置')
            .fontSize(26)
            .fontWeight(FontWeight.Bold)
            .fontColor('#5C3A4A')
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
        .padding({ left: 20, right: 20, top: 24, bottom: 18 })

        Column() {
          this.SettingRow('音效反馈', '交换、消除、道具和通关时播放短音效', this.soundEnabled, () => {
            this.soundEnabled = !this.soundEnabled;
            gameSettingsService.setSoundEnabled(this.soundEnabled);
            feedbackService.play('tap');
          })
          this.SettingRow('震动反馈', '点击和特效触发时给一点触感提示', this.vibrationEnabled, () => {
            this.vibrationEnabled = !this.vibrationEnabled;
            gameSettingsService.setVibrationEnabled(this.vibrationEnabled);
            feedbackService.play('tap');
          })
          this.SettingRow('柔和动画', '降低部分特效强度，适合虚拟机或低性能设备', this.reducedMotion, () => {
            this.reducedMotion = !this.reducedMotion;
            gameSettingsService.setReducedMotion(this.reducedMotion);
            feedbackService.play('tap');
          })
        }
        .width('90%')
        .padding({ left: 18, right: 18, top: 14, bottom: 14 })
        .borderRadius(24)
        .backgroundColor('rgba(255, 253, 244, 0.78)')
        .shadow({ radius: 20, color: 'rgba(92, 58, 74, 0.13)', offsetX: 0, offsetY: 8 })

        Text('音效素材来自 Kenney Interface Sounds，许可证为 CC0。')
          .fontSize(12)
          .fontColor('#8A6250')
          .textAlign(TextAlign.Center)
          .width('82%')
          .margin({ top: 18 })
      }
      .width('100%')
      .height('100%')
      .alignItems(HorizontalAlign.Center)
      .backgroundColor('rgba(255, 248, 228, 0.24)')
    }
    .width('100%')
    .height('100%')
  }

  @Builder
  SettingRow(title: string, description: string, enabled: boolean, toggle: () => void) {
    Row() {
      Column() {
        Text(title)
          .fontSize(17)
          .fontWeight(FontWeight.Bold)
          .fontColor('#5C3A4A')
        Text(description)
          .fontSize(12)
          .fontColor('#8A6250')
          .margin({ top: 5 })
      }
      .alignItems(HorizontalAlign.Start)
      .layoutWeight(1)

      Button(enabled ? '开' : '关')
        .width(56)
        .height(34)
        .borderRadius(17)
        .fontColor(enabled ? '#FFFFFF' : '#8A6250')
        .backgroundColor(enabled ? '#76D37B' : 'rgba(228, 216, 200, 0.76)')
        .onClick(toggle)
    }
    .width('100%')
    .padding({ top: 14, bottom: 14 })
    .border({ width: { bottom: 1 }, color: 'rgba(92, 58, 74, 0.08)' })
  }

  private async loadSettings(context: common.Context): Promise<void> {
    await gameSettingsService.init(context);
    const state = gameSettingsService.getState();
    this.soundEnabled = state.soundEnabled;
    this.vibrationEnabled = state.vibrationEnabled;
    this.reducedMotion = state.reducedMotion;
  }

  private appContext(): common.Context {
    return this.getUIContext().getHostContext() as common.Context;
  }
}
