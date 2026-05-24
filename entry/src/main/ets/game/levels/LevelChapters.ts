export interface LevelChapter {
  id: number;
  name: string;
  subtitle: string;
  startLevel: number;
  endLevel: number;
  accent: string;
  softAccent: string;
}

export const LEVEL_CHAPTERS: LevelChapter[] = [
  {
    id: 1,
    name: '糖果天空岛',
    subtitle: '教学、基础消除与第一批特殊果冻',
    startLevel: 1,
    endLevel: 20,
    accent: '#F27A91',
    softAccent: 'rgba(242, 122, 145, 0.22)'
  },
  {
    id: 2,
    name: '冰霜云层',
    subtitle: '冰层、锁链与更紧的步数压力',
    startLevel: 21,
    endLevel: 40,
    accent: '#69B8EA',
    softAccent: 'rgba(105, 184, 234, 0.24)'
  },
  {
    id: 3,
    name: '糖果工厂',
    subtitle: '棉花糖、组合特效与形状棋盘',
    startLevel: 41,
    endLevel: 60,
    accent: '#EFC957',
    softAccent: 'rgba(239, 201, 87, 0.24)'
  },
  {
    id: 4,
    name: '云洞传送站',
    subtitle: '传送门、空心地图与多目标关卡',
    startLevel: 61,
    endLevel: 80,
    accent: '#76D37B',
    softAccent: 'rgba(118, 211, 123, 0.24)'
  },
  {
    id: 5,
    name: '彩虹终章',
    subtitle: '多机制混合与毕业挑战',
    startLevel: 81,
    endLevel: 100,
    accent: '#B487EF',
    softAccent: 'rgba(180, 135, 239, 0.24)'
  }
];

export function getLevelChapter(levelId: number): LevelChapter {
  for (let index = 0; index < LEVEL_CHAPTERS.length; index++) {
    const chapter = LEVEL_CHAPTERS[index];
    if (levelId >= chapter.startLevel && levelId <= chapter.endLevel) {
      return chapter;
    }
  }
  return LEVEL_CHAPTERS[LEVEL_CHAPTERS.length - 1];
}

export function chapterProgressText(levelId: number): string {
  const chapter = getLevelChapter(levelId);
  const current = Math.max(1, Math.min(chapter.endLevel, levelId)) - chapter.startLevel + 1;
  const total = chapter.endLevel - chapter.startLevel + 1;
  return `${chapter.name} ${current}/${total}`;
}
