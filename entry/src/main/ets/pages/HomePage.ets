import { router } from '@kit.ArkUI';
import { common } from '@kit.AbilityKit';
import { bootstrapProgress } from '../game/storage/ProgressBootstrap';
import { progressService } from '../game/storage/ProgressService';

@Entry
@Component
struct HomePage {
  @State private continueLevel: number = 1;

  aboutToAppear(): void {
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

      Column() {
        Text('开心消消乐')
          .fontSize(38)
          .fontWeight(FontWeight.Bold)
          .fontColor('#5C3A4A')
          .margin({ bottom: 10 })
        Text('糖果天空岛')
          .fontSize(19)
          .fontColor('#8C6A3D')
          .margin({ bottom: 42 })
        Button('开始游戏')
          .width(210)
          .height(50)
          .fontSize(17)
          .fontColor('#FFFFFF')
          .borderRadius(25)
          .backgroundColor('#F27A91')
          .shadow({ radius: 18, color: 'rgba(242, 122, 145, 0.30)', offsetX: 0, offsetY: 8 })
          .onClick(() => {
            router.pushUrl({ url: 'pages/LevelSelectPage' });
          })
        Button(`继续第 ${this.continueLevel} 关`)
          .width(210)
          .height(50)
          .fontSize(17)
          .fontColor('#FFFFFF')
          .borderRadius(25)
          .backgroundColor('#69B8EA')
          .shadow({ radius: 18, color: 'rgba(105, 184, 234, 0.28)', offsetX: 0, offsetY: 8 })
          .margin({ top: 14 })
          .onClick(() => {
            router.pushUrl({ url: 'pages/GamePage', params: { levelId: this.continueLevel } });
          })
      }
      .width('100%')
      .height('100%')
      .justifyContent(FlexAlign.Center)
      .alignItems(HorizontalAlign.Center)
    }
    .width('100%')
    .height('100%')
  }

  private async refreshProgress(): Promise<void> {
    await bootstrapProgress(getContext(this) as common.Context);
    this.continueLevel = await progressService.getUnlockedLevel();
  }
}
