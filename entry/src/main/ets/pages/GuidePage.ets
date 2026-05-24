import { common } from '@kit.AbilityKit';
import { feedbackService } from '../game/feedback/FeedbackService';
import { MechanicGuideCategory, MechanicGuideItem, guideItemsByCategory } from '../game/mechanics/MechanicGuide';

@Entry
@Component
struct GuidePage {
  private specialItems: MechanicGuideItem[] = guideItemsByCategory('special');
  private blockerItems: MechanicGuideItem[] = guideItemsByCategory('blocker');
  private toolItems: MechanicGuideItem[] = guideItemsByCategory('tool');

  aboutToAppear(): void {
    feedbackService.init(this.appContext());
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
            Text('机制图鉴')
              .fontSize(28)
              .fontWeight(FontWeight.Bold)
              .fontColor('#5C3A4A')
            Text('先认图案，再规划连锁。')
              .fontSize(13)
              .fontColor('#8A6250')
              .margin({ top: 4 })
          }
          .alignItems(HorizontalAlign.Start)
          Blank()
          Button('返回')
            .height(36)
            .borderRadius(18)
            .fontColor('#5C3A4A')
            .backgroundColor('rgba(255, 255, 255, 0.74)')
            .onClick(() => {
              feedbackService.play('tap');
              this.getUIContext().getRouter().back();
            })
        }
        .width('100%')
        .padding({ left: 20, right: 20, top: 24, bottom: 12 })

        Scroll() {
          Column() {
            this.GuideSection('功能果冻', '由 4 连、5 连或特殊形状生成，是连锁消除的核心。', this.specialItems, 'special')
            this.GuideSection('关卡机制', '它们会改变棋盘结构或清理目标，需要优先识别。', this.blockerItems, 'blocker')
            this.GuideSection('道具', '用于调整棋盘和降低卡关压力。', this.toolItems, 'tool')
          }
          .width('100%')
          .padding({ left: 16, right: 16, bottom: 28 })
        }
        .layoutWeight(1)
      }
      .width('100%')
      .height('100%')
      .backgroundColor('rgba(255, 248, 228, 0.22)')
    }
    .width('100%')
    .height('100%')
  }

  @Builder
  GuideSection(title: string, subtitle: string, items: MechanicGuideItem[], category: MechanicGuideCategory) {
    Column() {
      Text(title)
        .fontSize(20)
        .fontWeight(FontWeight.Bold)
        .fontColor('#5C3A4A')
        .width('100%')
      Text(subtitle)
        .fontSize(12)
        .fontColor('#8A6250')
        .lineHeight(18)
        .width('100%')
        .margin({ top: 4, bottom: 10 })

      ForEach(items, (item: MechanicGuideItem) => {
        this.GuideCard(item)
      }, (item: MechanicGuideItem) => `${category}_${item.id}`)
    }
    .width('100%')
    .padding({ left: 16, right: 16, top: 16, bottom: 14 })
    .borderRadius(22)
    .backgroundColor('rgba(255, 253, 244, 0.78)')
    .border({ width: 1, color: 'rgba(255, 255, 255, 0.70)' })
    .shadow({ radius: 18, color: 'rgba(92, 58, 74, 0.12)', offsetX: 0, offsetY: 8 })
    .margin({ bottom: 16 })
  }

  @Builder
  GuideCard(item: MechanicGuideItem) {
    Row() {
      Stack() {
        Text(item.symbol)
          .fontSize(item.symbol.length > 3 ? 10 : 13)
          .fontWeight(FontWeight.Bold)
          .fontColor('#FFFFFF')
          .textAlign(TextAlign.Center)
      }
      .width(48)
      .height(48)
      .borderRadius(24)
      .backgroundColor(item.accent)
      .border({ width: 2, color: 'rgba(255, 255, 255, 0.86)' })
      .shadow({ radius: 10, color: 'rgba(92, 58, 74, 0.14)', offsetX: 0, offsetY: 4 })

      Column() {
        Row() {
          Text(item.name)
            .fontSize(16)
            .fontWeight(FontWeight.Bold)
            .fontColor('#5C3A4A')
          Blank()
          Text(`第 ${item.unlockLevel} 关`)
            .fontSize(11)
            .fontColor(item.accent)
            .padding({ left: 9, right: 9, top: 3, bottom: 3 })
            .borderRadius(11)
            .backgroundColor('rgba(255, 255, 255, 0.62)')
        }
        .width('100%')

        Text(item.summary)
          .fontSize(12)
          .fontColor('#7B5A4D')
          .lineHeight(18)
          .margin({ top: 4 })
        Text(item.detail)
          .fontSize(11)
          .fontColor('#8A6250')
          .lineHeight(17)
          .margin({ top: 3 })
      }
      .layoutWeight(1)
      .margin({ left: 12 })
    }
    .width('100%')
    .padding({ top: 10, bottom: 10 })
    .border({ width: { bottom: 1 }, color: 'rgba(92, 58, 74, 0.07)' })
  }

  private appContext(): common.Context {
    return this.getUIContext().getHostContext() as common.Context;
  }
}
