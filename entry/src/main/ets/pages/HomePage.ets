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

  build() {
    Column() {
      Text('开心消消乐')
        .fontSize(34)
        .fontWeight(FontWeight.Bold)
        .fontColor('#5C3A4A')
        .margin({ bottom: 12 })
      Text('糖果天空岛')
        .fontSize(18)
        .fontColor('#8C6A3D')
        .margin({ bottom: 36 })
      Button('开始游戏')
        .width(190)
        .height(48)
        .onClick(() => {
          router.pushUrl({ url: 'pages/LevelSelectPage' });
        })
      Button(`继续第 ${this.continueLevel} 关`)
        .width(190)
        .height(48)
        .margin({ top: 14 })
        .onClick(() => {
          router.pushUrl({ url: 'pages/GamePage', params: { levelId: this.continueLevel } });
        })
    }
    .width('100%')
    .height('100%')
    .justifyContent(FlexAlign.Center)
    .alignItems(HorizontalAlign.Center)
      .backgroundColor('#FFF8E4')
  }

  private async refreshProgress(): Promise<void> {
    await bootstrapProgress(getContext(this) as common.Context);
    this.continueLevel = await progressService.getUnlockedLevel();
  }
}
