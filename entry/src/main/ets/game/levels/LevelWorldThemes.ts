import { BoardRenderTheme } from '../render/CanvasRenderer';
import { getLevelChapter } from './LevelChapters';

export interface LevelWorldTheme {
  id: number;
  name: string;
  backgroundTop: string;
  backgroundMiddle: string;
  backgroundBottom: string;
  cloud: string;
  orb: string;
  panelFill: string;
  panelBorder: string;
  buttonTint: string;
  scoreFill: string;
  scoreMarkerFill: string;
  shelfFill: string;
  shadow: string;
  board: BoardRenderTheme;
}

const WORLD_THEMES: LevelWorldTheme[] = [
  {
    id: 1,
    name: 'candy_sky',
    backgroundTop: '#BFE7F5',
    backgroundMiddle: '#FFF3B8',
    backgroundBottom: '#FFD8C7',
    cloud: 'rgba(255, 255, 255, 0.48)',
    orb: 'rgba(242, 122, 145, 0.22)',
    panelFill: 'rgba(255, 253, 242, 0.68)',
    panelBorder: 'rgba(255, 210, 128, 0.54)',
    buttonTint: 'rgba(255, 255, 255, 0.72)',
    scoreFill: '#64D3F1',
    scoreMarkerFill: '#F2B84B',
    shelfFill: 'rgba(255, 246, 210, 0.46)',
    shadow: 'rgba(92, 58, 74, 0.14)',
    board: {
      canvasFill: '#FFF4DC',
      fill: 'rgba(255, 252, 238, 0.78)',
      innerFill: 'rgba(255, 246, 212, 0.52)',
      stroke: 'rgba(255, 210, 128, 0.82)',
      motif: 'rgba(242, 122, 145, 0.14)',
      pattern: 'candy'
    }
  },
  {
    id: 2,
    name: 'frost_cloud',
    backgroundTop: '#C9F0FF',
    backgroundMiddle: '#EAF7FF',
    backgroundBottom: '#D8E8FF',
    cloud: 'rgba(255, 255, 255, 0.56)',
    orb: 'rgba(105, 184, 234, 0.24)',
    panelFill: 'rgba(246, 253, 255, 0.72)',
    panelBorder: 'rgba(105, 184, 234, 0.44)',
    buttonTint: 'rgba(255, 255, 255, 0.76)',
    scoreFill: '#7FDBFF',
    scoreMarkerFill: '#69B8EA',
    shelfFill: 'rgba(229, 247, 255, 0.52)',
    shadow: 'rgba(51, 105, 148, 0.14)',
    board: {
      canvasFill: '#EEF9FF',
      fill: 'rgba(247, 253, 255, 0.84)',
      innerFill: 'rgba(223, 245, 255, 0.48)',
      stroke: 'rgba(105, 184, 234, 0.78)',
      motif: 'rgba(105, 184, 234, 0.18)',
      pattern: 'frost'
    }
  },
  {
    id: 3,
    name: 'candy_factory',
    backgroundTop: '#FFE8A4',
    backgroundMiddle: '#FFDCA8',
    backgroundBottom: '#F7C5B8',
    cloud: 'rgba(255, 255, 255, 0.40)',
    orb: 'rgba(239, 201, 87, 0.28)',
    panelFill: 'rgba(255, 248, 221, 0.74)',
    panelBorder: 'rgba(239, 201, 87, 0.50)',
    buttonTint: 'rgba(255, 255, 255, 0.72)',
    scoreFill: '#F7C36C',
    scoreMarkerFill: '#DFA742',
    shelfFill: 'rgba(255, 236, 178, 0.52)',
    shadow: 'rgba(131, 88, 42, 0.16)',
    board: {
      canvasFill: '#FFF1CE',
      fill: 'rgba(255, 249, 229, 0.82)',
      innerFill: 'rgba(255, 234, 184, 0.52)',
      stroke: 'rgba(223, 167, 66, 0.78)',
      motif: 'rgba(223, 167, 66, 0.16)',
      pattern: 'factory'
    }
  },
  {
    id: 4,
    name: 'portal_grove',
    backgroundTop: '#C9F3DA',
    backgroundMiddle: '#E6F4BE',
    backgroundBottom: '#D6E7C8',
    cloud: 'rgba(255, 255, 255, 0.38)',
    orb: 'rgba(118, 211, 123, 0.24)',
    panelFill: 'rgba(247, 255, 239, 0.72)',
    panelBorder: 'rgba(118, 211, 123, 0.48)',
    buttonTint: 'rgba(255, 255, 255, 0.72)',
    scoreFill: '#76D37B',
    scoreMarkerFill: '#54B96B',
    shelfFill: 'rgba(225, 249, 218, 0.52)',
    shadow: 'rgba(58, 112, 74, 0.15)',
    board: {
      canvasFill: '#F2F9DF',
      fill: 'rgba(248, 255, 239, 0.82)',
      innerFill: 'rgba(226, 247, 207, 0.52)',
      stroke: 'rgba(118, 211, 123, 0.78)',
      motif: 'rgba(118, 211, 123, 0.18)',
      pattern: 'portal'
    }
  },
  {
    id: 5,
    name: 'rainbow_finale',
    backgroundTop: '#D8C7FF',
    backgroundMiddle: '#F8D5FF',
    backgroundBottom: '#FFD7E1',
    cloud: 'rgba(255, 255, 255, 0.44)',
    orb: 'rgba(180, 135, 239, 0.25)',
    panelFill: 'rgba(255, 247, 255, 0.72)',
    panelBorder: 'rgba(180, 135, 239, 0.48)',
    buttonTint: 'rgba(255, 255, 255, 0.74)',
    scoreFill: '#B487EF',
    scoreMarkerFill: '#9D73E6',
    shelfFill: 'rgba(243, 225, 255, 0.50)',
    shadow: 'rgba(92, 58, 112, 0.16)',
    board: {
      canvasFill: '#FFF0FA',
      fill: 'rgba(255, 248, 255, 0.82)',
      innerFill: 'rgba(239, 224, 255, 0.52)',
      stroke: 'rgba(180, 135, 239, 0.80)',
      motif: 'rgba(180, 135, 239, 0.20)',
      pattern: 'rainbow'
    }
  }
];

export function getLevelWorldTheme(levelId: number): LevelWorldTheme {
  const chapter = getLevelChapter(levelId);
  return WORLD_THEMES[Math.max(0, Math.min(WORLD_THEMES.length - 1, chapter.id - 1))];
}

export function getWorldThemeById(worldId: number): LevelWorldTheme {
  return WORLD_THEMES[Math.max(0, Math.min(WORLD_THEMES.length - 1, worldId - 1))];
}
