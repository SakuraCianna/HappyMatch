import { router } from '@kit.ArkUI';

@Entry
@Component
struct Index {
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
      Button('继续第 1 关')
        .width(190)
        .height(48)
        .margin({ top: 14 })
        .onClick(() => {
          router.pushUrl({ url: 'pages/GamePage', params: { levelId: 1 } });
        })
    }
      .width('100%')
      .height('100%')
      .justifyContent(FlexAlign.Center)
      .alignItems(HorizontalAlign.Center)
      .backgroundColor('#FFF8E4')
  }
}
