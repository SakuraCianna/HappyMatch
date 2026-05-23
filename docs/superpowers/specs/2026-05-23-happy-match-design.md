# HappyMatch 开心消消乐项目规划

## 项目定位

HappyMatch 是一个面向期末大作业展示的 HarmonyOS 休闲三消游戏。目标是在本地运行的 HarmonyOS App 中完成完整游戏本体：可玩的三消核心、100 个关卡、教学流程、特殊方块、关卡机制、本地进度保存，以及统一的高光果冻风格美术资源。

好友和排行榜暂不进入当前开发范围。后续如有时间，可以在现有数据层上扩展本地模拟好友或云端排行榜。

## 技术路线

采用 ArkTS + ArkUI 页面壳 + Canvas 棋盘的方式实现。

- ArkUI 负责首页、关卡选择、顶部状态栏、按钮、弹窗、教学提示和结算界面。
- Canvas 负责棋盘绘制、方块贴图、交换动画、掉落动画、消除反馈、粒子效果和棋盘背景。
- 游戏规则层和渲染层分离。规则层只处理棋盘状态和玩法判定；渲染层只根据状态和动画队列绘制画面。

这个路线比纯 ArkUI 组件棋盘更适合做消除动效，也比 XComponent 或游戏引擎方案更适合当前作业周期。

## 页面流程

应用包含以下页面和弹层：

- 首页：开始游戏、继续游戏、设置入口。
- 关卡选择：展示 100 个关卡，显示通关星级和锁定状态。
- 游戏页：顶部目标、步数、分数；中间 Canvas 棋盘；底部道具和操作按钮。
- 结算弹层：胜利、失败、星级、得分、重玩、下一关。
- 教学弹层：前 5 关逐步解释交换、三消、目标、特殊块和关卡胜负。

## 玩法范围

游戏主体包含 100 个关卡。

- 1-5 关：教学关，讲清楚交换、三消、掉落、目标和胜负。
- 6-19 关：巩固基础三消，并逐步加入横消、竖消、炸弹、彩虹块。
- 20-39 关：引入奶油冰层。玩家需要通过附近消除削减冰层。
- 40-59 关：引入糖果锁链。锁住的方块不能交换，需要通过匹配或特殊块破坏。
- 60-79 关：引入棉花糖障碍。障碍占据格子，邻近消除或特殊块可破坏。
- 80-100 关：引入传送云洞。方块从入口掉落到出口，改变棋盘掉落路径。第 100 关做综合展示。

特殊方块属于核心玩法，不单独作为每 20 关的新机制。

## 核心规则

基础规则：

- 玩家交换相邻两个方块。
- 交换后如果形成三连或以上，则消除；否则交换回退。
- 消除后计算得分、目标进度和障碍受击。
- 方块下落填补空位。
- 顶部生成新方块补齐棋盘。
- 连锁消除继续结算，直到棋盘稳定。
- 根据关卡目标和剩余步数判断胜利或失败。

特殊方块：

- 横消方块：消除整行。
- 竖消方块：消除整列。
- 炸弹方块：消除周围范围。
- 彩虹方块：消除指定颜色，后续支持和其他特殊方块组合。

## 数据结构

棋盘状态建议使用规则数据，不直接绑定 Canvas 绘制对象。

```ts
type PieceType = 'red' | 'blue' | 'yellow' | 'green' | 'purple' | 'orange';
type SpecialType = 'none' | 'row_clear' | 'col_clear' | 'bomb' | 'rainbow';

interface Piece {
  id: string;
  type: PieceType;
  special: SpecialType;
}

interface Blocker {
  type: 'ice' | 'chain' | 'marshmallow' | 'portal';
  hp: number;
  portalId?: string;
  targetPortalId?: string;
}

interface Tile {
  row: number;
  col: number;
  piece?: Piece;
  blocker?: Blocker;
}
```

关卡配置建议统一格式：

```ts
interface LevelConfig {
  id: number;
  title: string;
  moves: number;
  board: {
    rows: number;
    cols: number;
    pieceTypes: PieceType[];
  };
  goals: Array<{
    type: 'score' | 'clear_ice' | 'break_chain' | 'clear_marshmallow' | 'collect_piece';
    target?: PieceType;
    count: number;
  }>;
  blockers?: Array<{
    row: number;
    col: number;
    type: 'ice' | 'chain' | 'marshmallow' | 'portal';
    hp: number;
    portalId?: string;
    targetPortalId?: string;
  }>;
  tutorial?: string[];
}
```

100 个关卡不需要全部手工硬写。教学关、机制引入关、整十关和第 100 关手工调校；其他关卡通过模板配置生成，再调整步数、目标数量、障碍密度和颜色数量。

## 模块划分

建议目录结构：

```text
entry/src/main/ets/
  pages/
    HomePage.ets
    LevelSelectPage.ets
    GamePage.ets
  game/
    core/
      Board.ts
      MatchResolver.ts
      GravityResolver.ts
      ScoreResolver.ts
      GameSession.ts
    mechanics/
      IceMechanic.ts
      ChainMechanic.ts
      MarshmallowMechanic.ts
      PortalMechanic.ts
    levels/
      LevelConfig.ts
      LevelRepository.ts
      levels.ts
    render/
      CanvasRenderer.ts
      AnimationQueue.ts
      ParticleSystem.ts
      AssetLoader.ts
    storage/
      ProgressRepository.ts
```

## 本地进度

当前只保存游戏本体进度，不做好友功能。

使用 HarmonyOS RDB/SQLite 保存：

- 已解锁关卡。
- 每关是否通关。
- 每关最高分。
- 每关星级。
- 设置项，例如音效、震动、音乐。

示例数据：

```ts
interface LevelProgress {
  levelId: number;
  cleared: boolean;
  stars: number;
  bestScore: number;
  updatedAt: number;
}
```

## 图片资源计划

整体美术方向为柔和高光果冻感，第一世界主题为糖果天空岛。方块需要保留弹润的果冻质感，但避免大面积纯白高光和过高饱和度；默认棋盘观看应舒适，消除、连击和特殊块触发时再临时增强亮度。

资源按“先能玩、再好看、最后丰富”的顺序完成：

- 先用 Canvas 程序化圆形果冻块把游戏跑起来。
- 核心规则稳定后，生成正式方块贴图和棋盘背景。
- 再补首页背景、关卡地图背景、胜利插画、失败插画。

首批图片资源：

- 6 个普通果冻方块：红、蓝、黄、绿、紫、橙。普通方块不仅靠颜色区分，还要使用不同轮廓和轻微浮雕标记，例如红心、蓝钻、黄星、绿花、紫月、橙圆点。高光采用柔和半透明亮斑，不使用刺眼的纯白强高光。
- 4 类特殊方块：横消、竖消、炸弹、彩虹。
- 4 类机制元素：奶油冰层、糖果锁链、棉花糖障碍、传送云洞。
- 3 张背景：首页背景、游戏棋盘背景、关卡选择地图背景。
- 2 张结算插画：胜利、失败。

资源要求：

- 风格统一，光源一致。
- 方块轮廓清晰，小尺寸下可辨认，不能只依赖颜色差异。
- 方块默认亮度要克制，适合长时间看棋盘；动画反馈时可以短暂提亮。
- 普通方块和特殊方块不能只靠颜色区分，特殊方块需要图案或形状标识。
- 背景不能干扰棋盘识别。
- 项目中使用的最终图片需要保存到工程资源目录，不依赖临时生成路径。

## 测试和验收

规则层应优先验证：

- 初始棋盘不会自动出现已匹配组合，除非关卡明确需要。
- 合法交换可以触发消除。
- 非法交换会回退。
- 多轮连锁后棋盘能稳定。
- 特殊方块效果正确。
- 冰层、锁链、棉花糖和传送云洞行为正确。
- 胜利、失败、星级结算正确。

展示验收标准：

- 能从首页进入关卡选择。
- 能选择并游玩关卡。
- 前 5 关有教学提示。
- 至少能完整展示 100 关的关卡列表。
- 20、40、60、80、100 关能体现机制变化。
- Canvas 棋盘有交换、消除、掉落和基础粒子反馈。
- 本地进度能保存并再次进入时恢复。

## 当前不做的内容

- 真实好友系统。
- 云数据库排行榜。
- 商店、付费、广告。
- 复杂角色养成。
- 联机对战。
- 多世界大型剧情。

这些内容不影响当前游戏本体完成，后续可作为扩展。

## 参考资料

- HarmonyOS NEXT Develop: https://developer.huawei.com/consumer/en/harmonyos/develop/
- ArkUI: https://developer.huawei.com/consumer/cn/arkui/
- Canvas component reference: https://developer.huawei.com/consumer/en/doc/harmonyos-references-V5/ts-components-canvas-canvas-V5
- RDB data persistence: https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/data-persistence-by-rdb-store
- HiSmartPerf: https://developer.huawei.com/consumer/cn/agconnect/huawei-smartperf/
