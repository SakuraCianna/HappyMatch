export type TutorialFocus =
  'swap' |
  'score' |
  'special' |
  'blocker' |
  'tool' |
  'bonus';

export interface TutorialStep {
  title: string;
  message: string;
  focus: TutorialFocus;
}

const TUTORIALS: TutorialStep[][] = [
  [
    {
      title: '交换相邻果冻',
      message: '拖动相邻的两个果冻，组成横向或纵向 3 个以上相同果冻就能消除。',
      focus: 'swap'
    },
    {
      title: '看懂分数管道',
      message: '分数达到第一颗星就算过关，继续冲到第二、第三颗星会有更高奖励。',
      focus: 'score'
    }
  ],
  [
    {
      title: '四连会生成方向果冻',
      message: '横向 4 连生成左右箭头果冻，纵向 4 连生成上下箭头果冻。',
      focus: 'special'
    },
    {
      title: '方向果冻要被消除才会爆发',
      message: '把它凑进 3 连，或与其他规则果冻交换，就会触发行列清除。',
      focus: 'special'
    }
  ],
  [
    {
      title: 'T/L 形会生成爆炸果冻',
      message: '十字、拐角形状会制造周身发光的爆炸果冻，适合清理密集区域。',
      focus: 'special'
    },
    {
      title: '五连生成彩虹果冻',
      message: '彩虹果冻可以直接和任意普通或功能果冻交换，触发更大的连锁。',
      focus: 'special'
    }
  ],
  [
    {
      title: '道具是练习期无限用',
      message: '重组、锤子、刷子、+3 步和回退都能帮助你理解规则。',
      focus: 'tool'
    },
    {
      title: '刷子可以选择颜色',
      message: '点刷子后先选颜色，再点一个普通果冻换色，特殊果冻不能被刷。',
      focus: 'tool'
    }
  ],
  [
    {
      title: '特殊纹理关卡开始',
      message: '第 5 关会出现预置特殊果冻，后续关卡会逐步加入冰层、锁链、棉花糖和传送门。',
      focus: 'blocker'
    },
    {
      title: '三星后的奖励结算',
      message: '达到三星后，剩余步数会逐个转成果冻特效，最后一起触发。',
      focus: 'bonus'
    }
  ]
];

export function hasTutorial(levelId: number): boolean {
  return levelId >= 1 && levelId <= TUTORIALS.length;
}

export function tutorialStepsForLevel(levelId: number): TutorialStep[] {
  if (!hasTutorial(levelId)) {
    return [];
  }
  return TUTORIALS[levelId - 1].map(step => ({ ...step }));
}
