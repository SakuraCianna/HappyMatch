import { common } from '@kit.AbilityKit';
import { feedbackService } from '../game/feedback/FeedbackService';
import { LeaderboardEntry, RemoteFriend, RemoteState } from '../game/remote/RemoteModels';
import { remoteGameService } from '../game/remote/RemoteGameService';

@Entry
@Component
struct SocialPage {
  @State private remoteState: RemoteState = {
    connected: false,
    nearbyPlayers: 0,
    regionKey: '',
    message: '云端未连接'
  };
  @State private friends: RemoteFriend[] = [];
  @State private leaderboard: LeaderboardEntry[] = [];
  @State private friendCodeInput: string = '';
  @State private tipText: string = '';

  aboutToAppear(): void {
    feedbackService.init(this.appContext());
    this.refreshSocial();
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
            Text('社交地图')
              .fontSize(28)
              .fontWeight(FontWeight.Bold)
              .fontColor('#5C3A4A')
            Text(this.remoteState.message)
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
            this.PlayerCard()
            this.FriendAddCard()
            this.FriendListCard()
            this.LeaderboardCard()
          }
          .width('100%')
          .padding({ left: 16, right: 16, bottom: 30 })
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
  PlayerCard() {
    Column() {
      Row() {
        Text(this.remoteState.connected ? '云端玩家' : '离线模式')
          .fontSize(18)
          .fontWeight(FontWeight.Bold)
          .fontColor('#5C3A4A')
        Blank()
        Text(`附近 ${this.remoteState.nearbyPlayers} 人`)
          .fontSize(12)
          .fontColor('#F27A91')
          .padding({ left: 10, right: 10, top: 4, bottom: 4 })
          .borderRadius(12)
          .backgroundColor('rgba(255, 255, 255, 0.64)')
      }
      .width('100%')
      Text(this.playerLine())
        .fontSize(13)
        .fontColor('#7B5A4D')
        .margin({ top: 8 })
      Text(this.regionLine())
        .fontSize(12)
        .fontColor('#8A6250')
        .margin({ top: 5 })
    }
    .width('100%')
    .padding(18)
    .borderRadius(22)
    .backgroundColor('rgba(255, 253, 244, 0.80)')
    .shadow({ radius: 16, color: 'rgba(92, 58, 74, 0.12)', offsetX: 0, offsetY: 7 })
    .margin({ bottom: 14 })
  }

  @Builder
  FriendAddCard() {
    Column() {
      Text('添加好友')
        .fontSize(18)
        .fontWeight(FontWeight.Bold)
        .fontColor('#5C3A4A')
        .width('100%')
      Row() {
        TextInput({ placeholder: '输入好友码', text: this.friendCodeInput })
          .height(40)
          .fontSize(14)
          .borderRadius(20)
          .backgroundColor('rgba(255, 255, 255, 0.72)')
          .onChange((value: string) => {
            this.friendCodeInput = value;
          })
          .layoutWeight(1)
        Button('添加')
          .height(40)
          .borderRadius(20)
          .fontColor('#FFFFFF')
          .backgroundColor('#F27A91')
          .margin({ left: 10 })
          .onClick(() => {
            this.addFriend();
          })
      }
      .width('100%')
      .margin({ top: 10 })
      if (this.tipText.length > 0) {
        Text(this.tipText)
          .fontSize(12)
          .fontColor('#8A6250')
          .margin({ top: 8 })
          .width('100%')
      }
    }
    .width('100%')
    .padding(18)
    .borderRadius(22)
    .backgroundColor('rgba(255, 253, 244, 0.80)')
    .shadow({ radius: 16, color: 'rgba(92, 58, 74, 0.12)', offsetX: 0, offsetY: 7 })
    .margin({ bottom: 14 })
  }

  @Builder
  FriendListCard() {
    Column() {
      Text('好友进度')
        .fontSize(18)
        .fontWeight(FontWeight.Bold)
        .fontColor('#5C3A4A')
        .width('100%')
      if (this.friends.length === 0) {
        Text('还没有好友，先用好友码添加一个。')
          .fontSize(12)
          .fontColor('#8A6250')
          .margin({ top: 10 })
      } else {
        ForEach(this.friends, (friend: RemoteFriend) => {
          this.FriendRow(friend)
        }, (friend: RemoteFriend) => friend.id)
      }
    }
    .width('100%')
    .padding(18)
    .borderRadius(22)
    .backgroundColor('rgba(255, 253, 244, 0.80)')
    .shadow({ radius: 16, color: 'rgba(92, 58, 74, 0.12)', offsetX: 0, offsetY: 7 })
    .margin({ bottom: 14 })
  }

  @Builder
  LeaderboardCard() {
    Column() {
      Text('排行榜')
        .fontSize(18)
        .fontWeight(FontWeight.Bold)
        .fontColor('#5C3A4A')
        .width('100%')
      ForEach(this.leaderboard.slice(0, 8), (entry: LeaderboardEntry) => {
        Row() {
          Text(`${entry.rank}`)
            .fontSize(13)
            .fontWeight(FontWeight.Bold)
            .fontColor('#FFFFFF')
            .textAlign(TextAlign.Center)
            .width(28)
            .height(28)
            .borderRadius(14)
            .backgroundColor(entry.rank <= 3 ? '#F2B84B' : '#69B8EA')
          Text(entry.nickname)
            .fontSize(14)
            .fontColor('#5C3A4A')
            .margin({ left: 10 })
            .layoutWeight(1)
          Text(`${entry.total_stars} 星`)
            .fontSize(12)
            .fontColor('#8A6250')
        }
        .width('100%')
        .padding({ top: 8, bottom: 8 })
      }, (entry: LeaderboardEntry) => entry.player_id)
    }
    .width('100%')
    .padding(18)
    .borderRadius(22)
    .backgroundColor('rgba(255, 253, 244, 0.80)')
    .shadow({ radius: 16, color: 'rgba(92, 58, 74, 0.12)', offsetX: 0, offsetY: 7 })
  }

  @Builder
  FriendRow(friend: RemoteFriend) {
    Row() {
      Column() {
        Text(friend.nickname)
          .fontSize(14)
          .fontWeight(FontWeight.Bold)
          .fontColor('#5C3A4A')
        Text(`第 ${friend.current_level} 关 · ${friend.total_stars} 星`)
          .fontSize(11)
          .fontColor('#8A6250')
          .margin({ top: 2 })
      }
      .alignItems(HorizontalAlign.Start)
      .layoutWeight(1)
      Text(friend.friend_code)
        .fontSize(11)
        .fontColor('#F27A91')
    }
    .width('100%')
    .padding({ top: 10, bottom: 10 })
    .border({ width: { bottom: 1 }, color: 'rgba(92, 58, 74, 0.07)' })
  }

  private async refreshSocial(): Promise<void> {
    this.remoteState = await remoteGameService.init(this.appContext());
    await remoteGameService.refreshLocation();
    const nearby = await remoteGameService.updatePresence(1, this.remoteState.player?.current_level ?? 1);
    if (nearby) {
      this.remoteState = remoteGameService.getState();
    }
    this.friends = await remoteGameService.listFriends();
    this.leaderboard = await remoteGameService.listLeaderboard('stars');
  }

  private async addFriend(): Promise<void> {
    feedbackService.play('tap');
    const friend = await remoteGameService.addFriend(this.friendCodeInput);
    if (friend) {
      this.tipText = `已添加 ${friend.nickname}`;
      this.friendCodeInput = '';
      this.friends = await remoteGameService.listFriends();
      return;
    }
    this.tipText = '添加失败，请检查好友码或后端连接。';
  }

  private playerLine(): string {
    const player = this.remoteState.player;
    if (!player) {
      return '启动 Backend 后会自动创建云端游客玩家。';
    }
    return `${player.nickname} · 好友码 ${player.friend_code} · 第 ${player.current_level} 关`;
  }

  private regionLine(): string {
    if (this.remoteState.regionKey.length === 0) {
      return '地图区域：等待高德定位';
    }
    return `地图区域：${this.remoteState.regionKey}`;
  }

  private appContext(): common.Context {
    return this.getUIContext().getHostContext() as common.Context;
  }
}
