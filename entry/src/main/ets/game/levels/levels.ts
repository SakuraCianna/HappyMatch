import { LevelConfig } from './LevelConfig';
import { LEVEL_MAPS } from './LevelMaps';

function cloneLevel(level: LevelConfig): LevelConfig {
  return {
    id: level.id,
    title: level.title,
    mapPath: level.mapPath,
    shape: level.shape,
    availableCells: level.availableCells,
    moves: level.moves,
    board: {
      rows: level.board.rows,
      cols: level.board.cols,
      pieceTypes: [...level.board.pieceTypes]
    },
    goals: level.goals.map(goal => ({ ...goal })),
    blockers: level.blockers?.map(blocker => ({ ...blocker })),
    specialPieces: level.specialPieces?.map(piece => ({ ...piece })),
    tutorial: level.tutorial?.map(item => item)
  };
}

export const LEVELS: LevelConfig[] = LEVEL_MAPS.map(map => cloneLevel({
  id: map.id,
  title: map.title,
  mapPath: map.rawfilePath,
  shape: map.shape,
  availableCells: map.availableCells,
  moves: map.moves,
  board: {
    rows: map.rows,
    cols: map.cols,
    pieceTypes: map.pieceTypes
  },
  goals: map.goals,
  blockers: map.blockers,
  specialPieces: map.specialPieces,
  tutorial: map.tutorial
}));
