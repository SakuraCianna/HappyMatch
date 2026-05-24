const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const rawDir = path.join(root, 'entry', 'src', 'main', 'resources', 'rawfile', 'levels');

function scoreGoal(level) {
  const goal = level.goals.find(item => item.type === 'score');
  return goal ? goal.count : 0;
}

function uniqueVisibleMechanics(level) {
  const names = new Set();
  level.blockers.forEach(blocker => {
    if (blocker.type !== 'hole') {
      names.add(`blocker:${blocker.type}`);
    }
  });
  level.specialPieces.forEach(piece => {
    names.add(`special:${piece.special}`);
  });
  return names;
}

function difficultyScore(level) {
  const visibleMechanics = uniqueVisibleMechanics(level).size;
  const blockerCount = level.blockers.filter(blocker => blocker.type !== 'hole').length;
  const goalCount = level.goals.length;
  const boardArea = level.rows * level.cols;
  const scorePressure = scoreGoal(level) / Math.max(1, level.moves);
  return Math.round(scorePressure / 18 + visibleMechanics * 8 + blockerCount * 0.9 + goalCount * 3 + boardArea / 18);
}

function readLevels() {
  return fs.readdirSync(rawDir)
    .filter(file => /^level_\d{3}\.json$/.test(file))
    .sort()
    .map(file => JSON.parse(fs.readFileSync(path.join(rawDir, file), 'utf8')));
}

const levels = readLevels();
const problems = [];
const rows = levels.map(level => {
  const visibleMechanics = uniqueVisibleMechanics(level);
  if (visibleMechanics.size > 3) {
    problems.push(`Level ${level.id} has ${visibleMechanics.size} visible mechanic types.`);
  }
  const score = scoreGoal(level);
  if (score > 7800) {
    problems.push(`Level ${level.id} score goal ${score} may be too high.`);
  }
  return {
    id: level.id,
    size: `${level.rows}x${level.cols}`,
    moves: level.moves,
    score,
    mechanics: visibleMechanics.size,
    difficulty: difficultyScore(level)
  };
});

const hardest = [...rows].sort((first, second) => second.difficulty - first.difficulty).slice(0, 12);
const summary = {
  levels: levels.length,
  maxScore: Math.max(...rows.map(row => row.score)),
  maxMechanics: Math.max(...rows.map(row => row.mechanics)),
  averageDifficulty: Math.round(rows.reduce((sum, row) => sum + row.difficulty, 0) / rows.length),
  hardest,
  problems
};

console.log(JSON.stringify(summary, null, 2));
if (problems.length > 0) {
  process.exitCode = 1;
}
