import { common } from '@kit.AbilityKit';
import { feedbackService } from '../game/feedback/FeedbackService';
import { RemoteState } from '../game/remote/RemoteModels';
import { remoteGameService } from '../game/remote/RemoteGameService';

@Entry
@Component
struct AuthPage {
  @State private isRegisterMode: boolean = false;
  @State private username: string = '';
  @State private password: string = '';
  @State private nickname: string = '';
  @State private tipText: string = '';
  @State private loading: boolean = false;
  @State private remoteState: RemoteState = {
    connected: false,
    authenticated: false,
    nearbyPlayers: 0,
    regionKey: '',
    message: '请登录账号'
  };

  aboutToAppear(): void {
    feedbackService.init(this.appContext());
    this.refreshAccount();
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
            Text('玩家账号')
              .fontSize(28)
              .fontWeight(FontWeight.Bold)
              .fontColor('#5C3A4A')
            Text(this.statusLine())
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

        Blank()

        Column() {
          Row() {
            Column() {
              Text(this.remoteState.authenticated ? '已连接云端' : '账号未登录')
                .fontSize(18)
                .fontWeight(FontWeight.Bold)
                .fontColor('#5C3A4A')
              Text(this.accountHint())
                .fontSize(12)
                .fontColor('#8A6250')
                .margin({ top: 4 })
            }
            .alignItems(HorizontalAlign.Start)
            .layoutWeight(1)

            Text(this.remoteState.authenticated ? 'ONLINE' : 'LOCAL')
              .fontSize(11)
              .fontColor(this.remoteState.authenticated ? '#FFFFFF' : '#7B5A4D')
              .fontWeight(FontWeight.Bold)
              .padding({ left: 12, right: 12, top: 6, bottom: 6 })
              .borderRadius(14)
              .backgroundColor(this.remoteState.authenticated ? '#76D37B' : 'rgba(255, 255, 255, 0.70)')
          }
          .width('100%')

          Row() {
            Button('登录')
              .height(38)
              .layoutWeight(1)
              .borderRadius(19)
              .fontColor(this.isRegisterMode ? '#7B5A4D' : '#FFFFFF')
              .backgroundColor(this.isRegisterMode ? 'rgba(255, 255, 255, 0.68)' : '#F27A91')
              .onClick(() => {
                this.isRegisterMode = false;
                this.tipText = '';
              })
            Button('注册')
              .height(38)
              .layoutWeight(1)
              .borderRadius(19)
              .fontColor(this.isRegisterMode ? '#FFFFFF' : '#7B5A4D')
              .backgroundColor(this.isRegisterMode ? '#69B8EA' : 'rgba(255, 255, 255, 0.68)')
              .margin({ left: 10 })
              .onClick(() => {
                this.isRegisterMode = true;
                this.tipText = '';
              })
          }
          .width('100%')
          .margin({ top: 18 })

          if (this.isRegisterMode) {
            TextInput({ placeholder: '昵称', text: this.nickname })
              .height(46)
              .fontSize(15)
              .borderRadius(23)
              .backgroundColor('rgba(255, 255, 255, 0.78)')
              .padding({ left: 16, right: 16 })
              .margin({ top: 16 })
              .onChange((value: string) => {
                this.nickname = value;
              })
          }

          TextInput({ placeholder: '账号, 3-32 位', text: this.username })
            .height(46)
            .fontSize(15)
            .borderRadius(23)
            .backgroundColor('rgba(255, 255, 255, 0.78)')
            .padding({ left: 16, right: 16 })
            .margin({ top: 14 })
            .onChange((value: string) => {
              this.username = value;
            })

          TextInput({ placeholder: '密码, 至少 6 位', text: this.password })
            .height(46)
            .fontSize(15)
            .type(InputType.Password)
            .borderRadius(23)
            .backgroundColor('rgba(255, 255, 255, 0.78)')
            .padding({ left: 16, right: 16 })
            .margin({ top: 14 })
            .onChange((value: string) => {
              this.password = value;
            })

          Button(this.primaryButtonText())
            .width('100%')
            .height(50)
            .fontSize(17)
            .fontWeight(FontWeight.Medium)
            .fontColor('#FFFFFF')
            .borderRadius(25)
            .backgroundColor(this.loading ? '#BFAFB5' : '#F27A91')
            .shadow({ radius: 16, color: 'rgba(242, 122, 145, 0.26)', offsetX: 0, offsetY: 7 })
            .margin({ top: 18 })
            .enabled(!this.loading)
            .onClick(() => {
              this.submit();
            })

          if (this.remoteState.authenticated) {
            Button('退出当前账号')
              .width('100%')
              .height(42)
              .fontColor('#7B5A4D')
              .borderRadius(21)
              .backgroundColor('rgba(255, 255, 255, 0.64)')
              .margin({ top: 12 })
              .onClick(() => {
                this.logout();
              })
          }

          Text(this.helpLine())
            .fontSize(12)
            .fontColor('#8A6250')
            .textAlign(TextAlign.Center)
            .width('100%')
            .margin({ top: 14 })

          if (this.tipText.length > 0) {
            Text(this.tipText)
              .fontSize(12)
              .fontColor('#F27A91')
              .textAlign(TextAlign.Center)
              .width('100%')
              .margin({ top: 10 })
          }
        }
        .width('88%')
        .padding(20)
        .borderRadius(26)
        .backgroundColor('rgba(255, 253, 244, 0.84)')
        .shadow({ radius: 20, color: 'rgba(92, 58, 74, 0.14)', offsetX: 0, offsetY: 8 })

        Blank()
      }
      .width('100%')
      .height('100%')
      .alignItems(HorizontalAlign.Center)
      .backgroundColor('rgba(255, 248, 228, 0.22)')
    }
    .width('100%')
    .height('100%')
  }

  private async refreshAccount(): Promise<void> {
    this.remoteState = await remoteGameService.init(this.appContext());
  }

  private async submit(): Promise<void> {
    if (this.loading) {
      return;
    }
    feedbackService.play('tap');
    const name = this.username.trim();
    if (name.length < 3 || this.password.length < 6) {
      this.tipText = '账号至少 3 位, 密码至少 6 位';
      return;
    }
    this.loading = true;
    const ok = this.isRegisterMode
      ? await remoteGameService.registerAccount(name, this.password, this.nickname)
      : await remoteGameService.loginAccount(name, this.password);
    this.loading = false;
    this.remoteState = remoteGameService.getState();
    if (ok) {
      this.password = '';
      this.tipText = this.isRegisterMode ? '注册成功, 已创建云端账号' : '登录成功, 已切换到账号进度';
      return;
    }
    this.tipText = this.isRegisterMode ? '注册失败, 账号可能已存在' : '登录失败, 请检查账号或密码';
  }

  private async logout(): Promise<void> {
    feedbackService.play('tap');
    await remoteGameService.logoutAccount();
    this.remoteState = remoteGameService.getState();
    this.tipText = '已退出账号, 登录后才能同步云端数据';
  }

  private primaryButtonText(): string {
    if (this.loading) {
      return '处理中...';
    }
    return this.isRegisterMode ? '注册账号' : '登录';
  }

  private helpLine(): string {
    return this.isRegisterMode
      ? '注册后会创建好友码, 金币和云端闯关进度'
      : '登录后会读取该账号的云端进度';
  }

  private statusLine(): string {
    const player = this.remoteState.player;
    if (player && this.remoteState.authenticated) {
      return `${player.nickname} · 账号 ${player.username}`;
    }
    return '请先登录或注册账号';
  }

  private accountHint(): string {
    const player = this.remoteState.player;
    if (player && this.remoteState.authenticated) {
      return `好友码 ${player.friend_code} · 第 ${player.current_level} 关`;
    }
    return '注册后即可同步进度, 好友和排行榜';
  }

  private appContext(): common.Context {
    return this.getUIContext().getHostContext() as common.Context;
  }
}
