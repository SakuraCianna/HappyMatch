export type MechanicGuideCategory = 'special' | 'blocker' | 'tool' | 'score';

export interface MechanicGuideItem {
  id: string;
  name: string;
  category: MechanicGuideCategory;
  unlockLevel: number;
  symbol: string;
  accent: string;
  summary: string;
  detail: string;
}

export const MECHANIC_GUIDE_ITEMS: MechanicGuideItem[] = [
  {
    id: 'row_clear',
    name: '左右消除果冻',
    category: 'special',
    unlockLevel: 5,
    symbol: '<->',
    accent: '#FF6798',
    summary: '横向 4 连生成，触发后清理整行。',
    detail: '外圈是粉金色，中心有左右箭头。它需要被三消卷入，或与其他功能果冻交换后才会触发。'
  },
  {
    id: 'col_clear',
    name: '上下消除果冻',
    category: 'special',
    unlockLevel: 8,
    symbol: '^v',
    accent: '#B35EFF',
    summary: '纵向 4 连生成，触发后清理整列。',
    detail: '中心是上下箭头，适合处理纵向目标、冰层或锁链。'
  },
  {
    id: 'bomb',
    name: '爆炸果冻',
    category: 'special',
    unlockLevel: 15,
    symbol: 'BOOM',
    accent: '#FF8940',
    summary: 'T 形或 L 形匹配生成，触发后炸开周围区域。',
    detail: '图案是带引线的圆形爆炸核心。两个爆炸果冻交换会产生更大范围爆炸。'
  },
  {
    id: 'rainbow',
    name: '彩虹果冻',
    category: 'special',
    unlockLevel: 30,
    symbol: 'RAIN',
    accent: '#FF70CD',
    summary: '五连生成，可以直接和任意果冻交换。',
    detail: '彩虹与普通果冻交换会清理同色果冻；与功能果冻交换会先把同色果冻转成功能果冻，再集体触发。'
  },
  {
    id: 'ice',
    name: '冰层',
    category: 'blocker',
    unlockLevel: 20,
    symbol: 'ICE',
    accent: '#4EB8F0',
    summary: '覆盖在格子上，需要在附近消除来破冰。',
    detail: '冰层使用蓝色晶体和雪花裂纹，与功能果冻的暖色光圈区分开。'
  },
  {
    id: 'chain',
    name: '锁链',
    category: 'blocker',
    unlockLevel: 40,
    symbol: 'LOCK',
    accent: '#B97A36',
    summary: '锁住格子里的果冻，需要消除该果冻或用特效打到它。',
    detail: '图案是金属链节和锁扣，不是背景装饰。'
  },
  {
    id: 'marshmallow',
    name: '棉花糖',
    category: 'blocker',
    unlockLevel: 60,
    symbol: 'SUGAR',
    accent: '#D36E91',
    summary: '占据格子，需要附近消除逐步清掉。',
    detail: '粉色糖霜条纹表示它会挡住落子路线。'
  },
  {
    id: 'portal',
    name: '传送门',
    category: 'blocker',
    unlockLevel: 80,
    symbol: 'PORT',
    accent: '#7C6BFF',
    summary: '改变果冻下落路径，让入口和出口互相联动。',
    detail: '紫蓝旋涡和方向箭头表示果冻会被传送。'
  },
  {
    id: 'shuffle',
    name: '重组道具',
    category: 'tool',
    unlockLevel: 1,
    symbol: 'MIX',
    accent: '#78D7F3',
    summary: '重新洗盘，适合无明显好走法时使用。',
    detail: '当前版本道具无限，主要用于本地体验和调试。'
  },
  {
    id: 'hammer',
    name: '锤子道具',
    category: 'tool',
    unlockLevel: 1,
    symbol: 'HAM',
    accent: '#F2B84B',
    summary: '指定一个格子进行清理。',
    detail: '可以用来处理关键位置的障碍或打开连锁空间。'
  },
  {
    id: 'brush',
    name: '刷子道具',
    category: 'tool',
    unlockLevel: 1,
    symbol: 'CLR',
    accent: '#76D37B',
    summary: '给普通果冻换色。',
    detail: '刷子不能作用在功能果冻上，避免破坏特殊规则。'
  },
  {
    id: 'add_moves',
    name: '+3 步道具',
    category: 'tool',
    unlockLevel: 1,
    symbol: '+3',
    accent: '#F7C36C',
    summary: '立刻增加 3 步。',
    detail: '适合目标快完成但步数紧张时使用。'
  }
];

export function guideItemsByCategory(category: MechanicGuideCategory): MechanicGuideItem[] {
  return MECHANIC_GUIDE_ITEMS.filter(item => item.category === category).map(item => ({ ...item }));
}
