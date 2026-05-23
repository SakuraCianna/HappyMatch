const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const rawDir = path.join(root, 'entry', 'src', 'main', 'resources', 'rawfile', 'levels');
const outputFile = path.join(root, 'entry', 'src', 'main', 'ets', 'game', 'levels', 'LevelMaps.ts');

function readMaps() {
  return fs.readdirSync(rawDir)
    .filter(file => /^level_\d{3}\.json$/.test(file))
    .sort()
    .map(file => {
      const map = JSON.parse(fs.readFileSync(path.join(rawDir, file), 'utf8'));
      if (!Number.isInteger(map.id)) {
        throw new Error(`${file} is missing a numeric id`);
      }
      if (!Number.isInteger(map.rows) || !Number.isInteger(map.cols)) {
        throw new Error(`${file} is missing board dimensions`);
      }
      if (!Array.isArray(map.pieceTypes) || map.pieceTypes.length < 3) {
        throw new Error(`${file} needs at least three piece types`);
      }
      return map;
    });
}

function createSource(maps) {
  const paths = maps.map(map => map.rawfilePath);
  return `import { PieceType } from '../core/Types';
import { LevelBlockerConfig, LevelGoal, LevelSpecialPieceConfig } from './LevelConfig';

export interface LevelMapConfig {
  id: number;
  title: string;
  rawfilePath: string;
  rows: number;
  cols: number;
  shape: string;
  availableCells: number;
  moves: number;
  pieceTypes: PieceType[];
  goals: LevelGoal[];
  blockers: LevelBlockerConfig[];
  specialPieces: LevelSpecialPieceConfig[];
  tutorial?: string[];
}

export const LEVEL_MAP_RAWFILE_PATHS: string[] = ${JSON.stringify(paths, null, 2)};

export const LEVEL_MAPS: LevelMapConfig[] = ${JSON.stringify(maps, null, 2)};
`;
}

const maps = readMaps();
if (maps.length !== 100) {
  throw new Error(`Expected 100 level maps, found ${maps.length}`);
}

fs.writeFileSync(outputFile, createSource(maps), 'utf8');
console.log(`Synced ${maps.length} level maps to ${path.relative(root, outputFile)}`);
