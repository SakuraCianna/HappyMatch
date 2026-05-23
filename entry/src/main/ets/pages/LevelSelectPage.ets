import { router } from '@kit.ArkUI';
import { common } from '@kit.AbilityKit';
import { LevelConfig } from '../game/levels/LevelConfig';
import { LEVELS } from '../game/levels/levels';
import { LevelProgress } from '../game/storage/ProgressRepository';
import { bootstrapProgress } from '../game/storage/ProgressBootstrap';
import { progressService } from '../game/storage/ProgressService';

@Entry
@Component
struct LevelSelectPage {
  @State private unlockedLevel: number = 1;
  @State private progressItems: LevelProgress[] = [];

  aboutToAppear(): void {
    this.refreshProgress();
  }

  build() {
    Stack() {
      Image($r('app.media.game_background'))
        .width('100%')
        .height('100%')
        .objectFit(ImageFit.Cover)

      Column() {
        Row() {
          Text('选择关卡')
            .fontSize(26)
            .fontWeight(FontWeight.Bold)
            .fontColor('#5C3A4A')
          Blank()
          Button('返回')
            .height(36)
            .borderRadius(18)
            .backgroundColor('rgba(255, 255, 255, 0.72)')
            .fontColor('#5C3A4A')
            .onClick(() => {
              router.back();
            })
        }
        .width('100%')
        .padding({ left: 18, right: 18, top: 18, bottom: 8 })

        Scroll() {
          Grid() {
            ForEach(LEVELS, (level: LevelConfig) => {
              GridItem() {
                Column() {
                  Text(`${level.id}`)
                    .fontSize(16)
                    .fontWeight(FontWeight.Bold)
                    .fontColor(level.id <= this.unlockedLevel ? '#FFFFFF' : '#9A8F84')
                  Text(this.starsForLevel(level.id))
                    .fontSize(10)
                    .fontColor(level.id <= this.unlockedLevel ? '#FFF6D6' : '#AFA28F')
                    .margin({ top: 2 })
                }
                .width(56)
                .height(56)
                .justifyContent(FlexAlign.Center)
                .alignItems(HorizontalAlign.Center)
                .borderRadius(16)
                .backgroundColor(level.id <= this.unlockedLevel ? this.colorForLevel(level.id) : 'rgba(228, 216, 200, 0.76)')
                .opacity(level.id <= this.unlockedLevel ? 1 : 0.72)
                .shadow({ radius: 12, color: 'rgba(92, 58, 74, 0.16)', offsetX: 0, offsetY: 5 })
                .onClick(() => {
                  if (level.id <= this.unlockedLevel) {
                    router.pushUrl({ url: 'pages/GamePage', params: { levelId: level.id } });
                  }
                })
              }
            })
          }
          .columnsTemplate('1fr 1fr 1fr 1fr 1fr')
          .rowsGap(10)
          .columnsGap(10)
          .padding(16)
        }
        .layoutWeight(1)
      }
      .width('100%')
      .height('100%')
      .backgroundColor('rgba(255, 248, 228, 0.26)')
    }
    .width('100%')
    .height('100%')
  }

  private colorForLevel(levelId: number): string {
    if (levelId <= 19) {
      return '#F27A91';
    }
    if (levelId <= 39) {
      return '#69B8EA';
    }
    if (levelId <= 59) {
      return '#EFC957';
    }
    if (levelId <= 79) {
      return '#76D37B';
    }
    return '#B487EF';
  }

  private async refreshProgress(): Promise<void> {
    await bootstrapProgress(getContext(this) as common.Context);
    this.unlockedLevel = await progressService.getUnlockedLevel();
    this.progressItems = await progressService.getAll();
  }

  private starsForLevel(levelId: number): string {
    const progress = this.progressItems.find(item => item.levelId === levelId);
    if (!progress || progress.stars <= 0) {
      return levelId <= this.unlockedLevel ? '未通关' : '锁定';
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
