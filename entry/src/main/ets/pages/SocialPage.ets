import { common } from '@kit.AbilityKit';
import { feedbackService } from '../game/feedback/FeedbackService';
import { getLevelChapter } from '../game/levels/LevelChapters';
import { LeaderboardEntry, LocationSummary, NearbyPlayer, RemoteFriend, RemoteState } from '../game/remote/RemoteModels';
import { remoteGameService } from '../game/remote/RemoteGameService';

@Entry
@Component
struct SocialPage {
  @State private remoteState: RemoteState = {
    connected: false,
    authenticated: false,
    nearbyPlayers: 0,
    regionKey: '',
    message: '请登录玩家'
  };
  @State private friends: RemoteFriend[] = [];
  @State private leaderboard: LeaderboardEntry[] = [];
  @State private nearbyPlayers: NearbyPlayer[] = [];
  @State private location?: LocationSummary = undefined;
  @State private mapImageUrl: string = '';
  @State private friendCodeInput: string = '';
  @State private tipText: string = '';
  @State private canShowSocial: boolean = false;

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
            .backgroundColor('rgba(255, 255, 255, 0.76)')
            .onClick(() => {
              feedbackService.play('tap');
              this.getUIContext().getRouter().back();
            })
        }
        .width('100%')
        .padding({ left: 20, right: 20, top: 24, bottom: 12 })

        if (this.canShowSocial) {
          Scroll() {
            Column() {
              this.MapCard()
              this.PlayerCard()
              this.FriendAddCard()
              this.FriendListCard()
              this.LeaderboardCard()
            }
            .width('100%')
            .padding({ left: 16, right: 16, bottom: 30 })
          }
          .layoutWeight(1)
        } else {
          this.LoginRequiredPanel()
        }
      }
      .width('100%')
      .height('100%')
      .backgroundColor('rgba(255, 248, 228, 0.22)')
    }
    .width('100%')
    .height('100%')
  }

  @Builder
  LoginRequiredPanel() {
    Column() {
      Text('登录后查看社交地图')
        .fontSize(20)
        .fontWeight(FontWeight.Bold)
        .fontColor('#5C3A4A')
      Text('好友, 排行榜和附近玩家需要玩家身份。')
        .fontSize(12)
        .fontColor('#8A6250')
        .margin({ top: 8, bottom: 18 })
      Button('去登录')
        .height(42)
        .borderRadius(21)
        .fontColor('#FFFFFF')
        .backgroundColor('#F27A91')
        .onClick(() => {
          this.redirectToAuth();
        })
    }
    .width('86%')
    .padding(22)
    .borderRadius(24)
    .backgroundColor('rgba(255, 253, 244, 0.86)')
    .shadow({ radius: 16, color: 'rgba(92, 58, 74, 0.12)', offsetX: 0, offsetY: 7 })
    .margin({ top: 96 })
  }

  @Builder
  MapCard() {
    Column() {
      Row() {
        Column() {
          Text('附近地图')
            .fontSize(18)
            .fontWeight(FontWeight.Bold)
            .fontColor('#5C3A4A')
          Text(this.locationLine())
            .fontSize(12)
            .fontColor('#8A6250')
            .margin({ top: 4 })
        }
        .alignItems(HorizontalAlign.Start)
        .layoutWeight(1)
        Text(this.canShowSocial ? `${this.otherNearbyCount()} 人在附近` : '需登录')
          .fontSize(12)
          .fontColor('#F27A91')
          .padding({ left: 10, right: 10, top: 5, bottom: 5 })
          .borderRadius(13)
          .backgroundColor('rgba(255, 255, 255, 0.70)')
      }
      .width('100%')

      Stack() {
        if (this.mapImageUrl.length > 0) {
          Image(this.mapImageUrl)
            .width('100%')
            .height(178)
            .objectFit(ImageFit.Cover)
            .borderRadius(18)
        } else {
          Column() {
            Text('地图加载中')
              .fontSize(17)
              .fontWeight(FontWeight.Bold)
              .fontColor('#5C3A4A')
            Text('登录后会显示高德静态地图和附近玩家')
              .fontSize(12)
              .fontColor('#8A6250')
              .margin({ top: 6 })
          }
          .width('100%')
          .height(178)
          .justifyContent(FlexAlign.Center)
          .alignItems(HorizontalAlign.Center)
          .borderRadius(18)
          .backgroundColor('rgba(255, 255, 255, 0.54)')
        }
      }
      .width('100%')
      .height(178)
      .margin({ top: 12 })
      .borderRadius(18)
      .border({ width: 2, color: 'rgba(255, 255, 255, 0.70)' })
      .shadow({ radius: 14, color: 'rgba(92, 58, 74, 0.12)', offsetX: 0, offsetY: 6 })

      if (this.nearbyPlayers.length > 0) {
        Column() {
          ForEach(this.nearbyPlayers.slice(0, 5), (player: NearbyPlayer) => {
            this.NearbyPlayerRow(player)
          }, (player: NearbyPlayer) => player.player_id)
        }
        .width('100%')
        .margin({ top: 12 })
      } else {
        Text(this.canShowSocial ? '附近暂时没有其他在线玩家。' : '登录后查看附近玩家。')
          .fontSize(12)
          .fontColor('#8A6250')
          .margin({ top: 12 })
          .width('100%')
      }
    }
    .width('100%')
    .padding(18)
    .borderRadius(22)
    .backgroundColor('rgba(255, 253, 244, 0.86)')
    .shadow({ radius: 16, color: 'rgba(92, 58, 74, 0.12)', offsetX: 0, offsetY: 7 })
    .margin({ bottom: 14 })
  }

  @Builder
  PlayerCard() {
    Column() {
      Row() {
        Column() {
          Text(this.remoteState.authenticated ? '云端玩家' : '未登录')
            .fontSize(18)
            .fontWeight(FontWeight.Bold)
            .fontColor('#5C3A4A')
          Text(this.playerLine())
            .fontSize(12)
            .fontColor('#7B5A4D')
            .margin({ top: 5 })
        }
        .alignItems(HorizontalAlign.Start)
        .layoutWeight(1)
        Text(`附近 ${this.remoteState.nearbyPlayers} 人`)
          .fontSize(12)
          .fontColor('#F27A91')
          .padding({ left: 10, right: 10, top: 5, bottom: 5 })
          .borderRadius(13)
          .backgroundColor('rgba(255, 255, 255, 0.66)')
      }
      .width('100%')

      Row() {
        this.SocialStat('好友', `${this.friends.length}`)
        this.SocialStat('排行', `${this.leaderboard.length}`)
        this.SocialStat('区域', this.regionShortText())
      }
      .width('100%')
      .margin({ top: 14 })
    }
    .width('100%')
    .padding(18)
    .borderRadius(22)
    .backgroundColor('rgba(255, 253, 244, 0.84)')
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
          .height(42)
          .fontSize(14)
          .borderRadius(21)
          .backgroundColor('rgba(255, 255, 255, 0.74)')
          .padding({ left: 14, right: 14 })
          .onChange((value: string) => {
            this.friendCodeInput = value;
          })
          .layoutWeight(1)
        Button('添加')
          .height(42)
          .borderRadius(21)
          .fontColor('#FFFFFF')
          .backgroundColor(this.remoteState.authenticated ? '#F27A91' : '#BFAFB5')
          .margin({ left: 10 })
          .enabled(this.remoteState.authenticated)
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
    .backgroundColor('rgba(255, 253, 244, 0.84)')
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
        Text(this.remoteState.authenticated ? '还没有好友, 用好友码添加一个。' : '登录后可以查看好友所在关卡。')
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
    .backgroundColor('rgba(255, 253, 244, 0.84)')
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
      if (this.leaderboard.length === 0) {
        Text('暂无排行数据。')
          .fontSize(12)
          .fontColor('#8A6250')
          .margin({ top: 10 })
      } else {
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
    }
    .width('100%')
    .padding(18)
    .borderRadius(22)
    .backgroundColor('rgba(255, 253, 244, 0.84)')
    .shadow({ radius: 16, color: 'rgba(92, 58, 74, 0.12)', offsetX: 0, offsetY: 7 })
  }

  @Builder
  NearbyPlayerRow(player: NearbyPlayer) {
    Row() {
      Text(player.is_self ? '我' : player.nickname.substring(0, 1))
        .fontSize(12)
        .fontWeight(FontWeight.Bold)
        .fontColor('#FFFFFF')
        .textAlign(TextAlign.Center)
        .width(28)
        .height(28)
        .borderRadius(14)
        .backgroundColor(player.is_self ? '#76D37B' : '#F27A91')
      Column() {
        Text(player.is_self ? `${player.nickname} · 我的位置` : player.nickname)
          .fontSize(13)
          .fontWeight(FontWeight.Bold)
          .fontColor('#5C3A4A')
        Text(`第 ${player.current_level} 关 · ${player.total_stars} 星 · ${this.playerWorldText(player)}`)
          .fontSize(11)
          .fontColor('#8A6250')
          .margin({ top: 2 })
      }
      .alignItems(HorizontalAlign.Start)
      .layoutWeight(1)
      Text(player.longitude !== undefined && player.latitude !== undefined ? '已定位' : '区域')
        .fontSize(11)
        .fontColor(player.longitude !== undefined && player.latitude !== undefined ? '#4DB862' : '#8A6250')
    }
    .width('100%')
    .padding({ top: 7, bottom: 7 })
    .border({ width: { bottom: 1 }, color: 'rgba(92, 58, 74, 0.07)' })
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

  @Builder
  SocialStat(label: string, value: string) {
    Column() {
      Text(value)
        .fontSize(15)
        .fontWeight(FontWeight.Bold)
        .fontColor('#5C3A4A')
      Text(label)
        .fontSize(10)
        .fontColor('#8A6250')
        .margin({ top: 2 })
    }
    .height(48)
    .layoutWeight(1)
    .alignItems(HorizontalAlign.Center)
    .justifyContent(FlexAlign.Center)
    .borderRadius(16)
    .backgroundColor('rgba(255, 255, 255, 0.56)')
    .margin({ right: 8 })
  }

  private async refreshSocial(): Promise<void> {
    this.remoteState = await remoteGameService.init(this.appContext());
    this.canShowSocial = this.remoteState.authenticated && this.remoteState.player !== undefined;
    if (!this.canShowSocial || !this.remoteState.player) {
      this.friends = [];
      this.leaderboard = [];
      this.nearbyPlayers = [];
      this.mapImageUrl = '';
      this.redirectToAuth();
      return;
    }
    this.leaderboard = await remoteGameService.listLeaderboard('stars');
    this.location = await remoteGameService.refreshLocation();
    const worldId = getLevelChapter(this.remoteState.player.current_level).id;
    const nearby = await remoteGameService.updatePresence(worldId, this.remoteState.player.current_level);
    if (nearby) {
      this.remoteState = remoteGameService.getState();
    }
    this.location = remoteGameService.getLocation();
    this.nearbyPlayers = await remoteGameService.listNearbyPlayers(worldId);
    this.mapImageUrl = remoteGameService.mapSnapshotUrl(worldId, Date.now());
    this.friends = await remoteGameService.listFriends();
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
    this.tipText = '添加失败, 请检查好友码或后端连接。';
  }

  private playerLine(): string {
    const player = this.remoteState.player;
    if (!player) {
      return '请先在玩家信息页登录或注册。';
    }
    return `${player.nickname} · 好友码 ${player.friend_code} · 第 ${player.current_level} 关`;
  }

  private locationLine(): string {
    if (!this.canShowSocial) {
      return '登录后同步附近玩家。';
    }
    if (!this.location) {
      return '正在获取地图位置。';
    }
    const city = this.location.city ?? this.location.province ?? this.location.region_key;
    if (this.location.longitude !== undefined && this.location.latitude !== undefined) {
      return `${city} · ${this.location.longitude.toFixed(3)}, ${this.location.latitude.toFixed(3)}`;
    }
    return `${city} · 区域定位`;
  }

  private otherNearbyCount(): number {
    return this.nearbyPlayers.filter(player => !player.is_self).length;
  }

  private playerWorldText(player: NearbyPlayer): string {
    return getLevelChapter(player.current_level).name;
  }

  private redirectToAuth(): void {
    try {
      this.getUIContext().getRouter().replaceUrl({ url: 'pages/AuthPage' });
    } catch (_error) {
    }
  }

  private regionShortText(): string {
    if (this.remoteState.regionKey.length === 0) {
      return '等待';
    }
    if (this.remoteState.regionKey.length > 8) {
      return this.remoteState.regionKey.substring(0, 8);
    }
    return this.remoteState.regionKey;
  }

  private appContext(): common.Context {
    return this.getUIContext().getHostContext() as common.Context;
  }
}
