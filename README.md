# 开心消消乐 HappyMatch

HappyMatch 是一个基于 HarmonyOS 6.0.2 SDK 开发的三消闯关游戏项目。项目目标是完成一个完整的游戏闭环：从首页、选关、关卡游玩、道具、结算、成就到本地进度保存，形成可运行、可演示、可继续扩展的鸿蒙应用。

## 项目特点

- 100 个 JSON 关卡，覆盖前期教学、中期机制引入和后期综合挑战。
- 5 个世界章节，每个世界有独立的背景、棋盘主题和展示入口。
- 支持 6x6 到 9x9 等多种棋盘尺寸，并包含爱心、蝴蝶、花朵、螺旋、皇冠、双岛等造型地图。
- 支持普通三消、四连、五连、T/L 形等特殊生成规则。
- 支持横向消除、纵向消除、炸弹、彩虹块等功能型果冻。
- 支持冰层、锁链、棉花糖、传送门、空心格等关卡机制。
- 支持重组、锤子、刷子、加 3 步、回退等道具。
- 支持无可行移动时自动洗盘，避免棋盘死局。
- 支持一星、二星、三星结算，以及三星后的剩余步数奖励动画。
- 支持本地进度、金币、成就、设置、音效和震动反馈。
- 支持 FastAPI 后端、好友码、排行榜、云端成绩和附近人数统计。
- 支持机制图鉴和首次机制提示，降低新机制理解成本。

## 技术栈

- 系统平台：HarmonyOS
- SDK 版本：HarmonyOS 6.0.2
- 开发语言：ArkTS / ArkUI
- 构建工具：Hvigor
- 测试框架：Hypium
- 后端框架：FastAPI / SQLite / SQLModel
- 资源形式：JSON 关卡、rawfile 音效、Canvas 绘制棋盘与果冻纹理

## 页面结构

项目主要页面位于 `entry/src/main/ets/pages`：

```text
Index.ets             首页与世界入口
LevelSelectPage.ets   选关页
GamePage.ets          游戏主界面
AchievementsPage.ets  成就馆
SettingsPage.ets      设置页
GuidePage.ets         机制图鉴
SocialPage.ets        社交与排行榜
```

路由配置位于：

```text
entry/src/main/resources/base/profile/main_pages.json
```

## 核心目录

```text
entry/src/main/ets/game/core        棋盘、交换、匹配、重力、特殊规则、洗盘
entry/src/main/ets/game/render      棋盘布局、动画规划、Canvas 渲染
entry/src/main/ets/game/levels      关卡配置、章节、主题、解锁规则
entry/src/main/ets/game/mechanics   阻碍物与传送门机制
entry/src/main/ets/game/storage     本地进度仓库
entry/src/main/ets/game/economy     金币与模拟购买
entry/src/main/ets/game/achievements 成就系统
entry/src/main/ets/game/feedback    音效与震动反馈
entry/src/main/ets/game/remote      后端请求、玩家同步、好友与排行榜
entry/src/main/resources/rawfile/levels 100 个关卡 JSON 文件
entry/src/main/resources/rawfile/sfx    游戏音效资源
Backend                            FastAPI 后端服务与 SQLite 数据库
tools                              关卡生成与同步脚本
```

## 关卡设计

关卡源文件位于：

```text
entry/src/main/resources/rawfile/levels
```

当前项目包含：

- 100 个关卡文件：`level_001.json` 到 `level_100.json`
- 12 种棋盘尺寸：如 `6x6`、`7x8`、`8x9`、`9x9`
- 18 种地图造型：如 `heart`、`butterfly`、`flower`、`spiral`、`crown`、`twin_islands`
- 5 类阻碍机制：`ice`、`chain`、`marshmallow`、`portal`、`hole`
- 4 类功能型果冻：`row_clear`、`col_clear`、`bomb`、`rainbow`

前 5 关用于教学，第 5 关开始引入功能型果冻。后续世界逐步加入冰层、锁链、棉花糖、传送门、多目标任务和特殊组合任务。

## 游戏规则概览

- 三个及以上同色果冻连成一线即可消除。
- 横向四连生成横向消除果冻。
- 纵向四连生成纵向消除果冻。
- T 形或 L 形匹配生成炸弹果冻。
- 五连生成彩虹果冻。
- 功能型果冻可以与普通果冻或其他功能型果冻组合触发更大范围效果。
- 彩虹块与功能型果冻交换时，会先转换同色果冻，再自动触发连锁效果。
- 棋盘没有可行交换时，系统会自动重组棋盘。

## 道具系统

游戏底部提供 5 个演示道具：

- 重组：重新洗盘。
- 锤子：消除指定位置。
- 刷子：把普通果冻换成指定颜色。
- 加 3 步：立即增加 3 步。
- 回退：撤回上一步。

目前道具数量设置为无限，方便功能演示和调试。后续可以接入模拟商店或支付流程。

## 结算与成就

游戏使用三星评分：

- 达到基础目标分：一星
- 达到目标分的 1.2 倍：二星
- 达到目标分的 1.5 倍：三星

三星后会把剩余步数逐步转换为功能型果冻，并触发奖励动画。成就系统会根据通关数量、三星数量、金币数量等指标计算进度。

## 本地运行

推荐使用 DevEco Studio 打开项目根目录：

```text
E:\CodeHome\Experiment\HappyMatch
```

确认本地环境：

- DevEco Studio 已安装
- HarmonyOS SDK 6.0.2 已安装
- 项目使用默认 `entry` 模块运行到 phone 模拟器或真机

也可以使用 Hvigor 命令构建 HAP：

```powershell
& 'E:\DevEco Studio\tools\node\node.exe' 'E:\DevEco Studio\tools\hvigor\bin\hvigorw.js' --mode module -p module=entry@default -p product=default -p requiredDeviceType=phone assembleHap --analyze=normal --parallel --incremental --daemon
```

构建测试包：

```powershell
& 'E:\DevEco Studio\tools\node\node.exe' 'E:\DevEco Studio\tools\hvigor\bin\hvigorw.js' --mode module -p module=entry@ohosTest -p product=default -p requiredDeviceType=phone assembleHap --analyze=normal --parallel --incremental --daemon
```

如果没有配置签名，构建日志会出现跳过签名的警告。这不影响调试构建，但发布安装包前需要在 `build-profile.json5` 中配置签名。

启动后端：

```powershell
cd E:\CodeHome\Experiment\HappyMatch\Backend
py -3.12 -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
Copy-Item .env.example .env
python -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

HarmonyOS 模拟器默认通过 `http://10.0.2.2:8000/api` 访问宿主机后端。真机联调时需要把 `entry/src/main/ets/game/remote/RemoteConfig.ts` 中的地址改为电脑局域网 IP 或部署后的 HTTPS 地址。

## 关卡生成

项目提供了关卡生成和同步脚本：

```powershell
node tools/generate-level-maps.js
node tools/sync-level-maps.js
node tools/analyze-level-difficulty.js
```

生成后的关卡 JSON 会进入 `entry/src/main/resources/rawfile/levels`，并同步到 ArkTS 侧的关卡映射文件。
难度分析脚本会检查关卡目标分、机制密度和后期难度，当前每关可见机制纹理控制在 3 类以内。

## 测试

核心测试位于：

```text
entry/src/test/GameCore.test.ets
```

测试覆盖内容包括：

- 初始棋盘无自动匹配
- 合法交换判断
- 特殊果冻生成规则
- 功能型果冻组合规则
- 自动洗盘
- 关卡数量与地图配置
- 五世界入口解锁
- 成就进度
- Canvas 渲染性能路径

## 体验路线

体验项目时可以按以下顺序查看主要内容：

1. 首页动态背景、继续关卡、世界入口。
2. 选关页展示 5 个世界和不同章节主题。
3. 第 1 关展示基础三消与教学。
4. 第 5 关展示功能型果冻。
5. 第 21 关展示冰层与蓝色世界主题。
6. 第 41 关展示棉花糖和复杂棋盘。
7. 第 61 关展示传送门、锁链和空心格。
8. 第 81 关展示后期混合机制。
9. 使用底部道具展示重组、锤子、刷子、加步、回退。
10. 通关后展示三星结算、剩余步数奖励动画和成就馆。

## 后续可扩展方向

- 增加每日挑战、限时关卡或随机挑战模式。
- 增加更多机制方块，例如钥匙、宝箱、传送带、染色桶。
- 给不同世界增加更完整的剧情和关卡目标文案。
- 增加账号登录或云数据库，实现多设备同步。
- 将无限道具改为金币购买或模拟支付流程。

## 说明

本项目目前以本地运行和功能演示为主要目标，已经提供轻量 FastAPI 后端用于好友、排行榜和附近人数统计，但没有接入真实支付、登录或云数据库。核心玩法与关卡配置仍保留在 HarmonyOS 端，便于开发、调试和本地体验。
