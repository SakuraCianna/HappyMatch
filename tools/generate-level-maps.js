const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const rawDir = path.join(root, 'entry', 'src', 'main', 'resources', 'rawfile', 'levels');
const nodePath = process.execPath;

const PIECES = ['red', 'blue', 'yellow', 'green', 'purple', 'orange'];
const EARLY_SHAPES = ['full', 'center_diamond', 'wide_lane', 'side_notches'];
const SHAPE_SEQUENCE = [
  'heart',
  'butterfly',
  'flower',
  'spiral',
  'hourglass',
  'crescent',
  'keyhole',
  'twin_islands',
  'crown',
  'wave',
  'clover',
  'arrow',
  'lantern',
  'checker_window',
  'center_diamond',
  'side_notches'
];

function key(row, col) {
  return `${row}_${col}`;
}

function add(set, rows, cols, row, col) {
  if (row >= 0 && row < rows && col >= 0 && col < cols) {
    set.add(key(row, col));
  }
}

function addScaled(set, rows, cols, points) {
  points.forEach(point => {
    const row = Math.round(point[0] * (rows - 1) / 8);
    const col = Math.round(point[1] * (cols - 1) / 8);
    add(set, rows, cols, row, col);
  });
}

function shapeForLevel(id) {
  if (id <= EARLY_SHAPES.length) {
    return EARLY_SHAPES[id - 1];
  }
  return SHAPE_SEQUENCE[(id - 5) % SHAPE_SEQUENCE.length];
}

function sizeForLevel(id, shape) {
  const sizes = [
    { rows: 6, cols: 6 },
    { rows: 7, cols: 7 },
    { rows: 8, cols: 8 },
    { rows: 6, cols: 8 },
    { rows: 8, cols: 6 },
    { rows: 7, cols: 8 },
    { rows: 8, cols: 7 },
    { rows: 7, cols: 9 },
    { rows: 9, cols: 7 },
    { rows: 8, cols: 9 },
    { rows: 9, cols: 8 }
  ];
  if (shape === 'heart' || shape === 'butterfly' || shape === 'spiral' || shape === 'flower' || shape === 'clover') {
    return id % 2 === 0 ? { rows: 9, cols: 9 } : { rows: 8, cols: 8 };
  }
  if (shape === 'crown' || shape === 'lantern') {
    return { rows: 8, cols: 9 };
  }
  return sizes[(id - 1) % sizes.length];
}

function holesForShape(shape, rows, cols) {
  const holes = new Set();
  const midRow = Math.floor(rows / 2);
  const midCol = Math.floor(cols / 2);
  if (shape === 'full') {
    return holes;
  }
  if (shape === 'side_notches') {
    add(holes, rows, cols, 1, 0);
    add(holes, rows, cols, rows - 2, 0);
    add(holes, rows, cols, 1, cols - 1);
    add(holes, rows, cols, rows - 2, cols - 1);
  } else if (shape === 'wide_lane') {
    add(holes, rows, cols, Math.max(1, midRow - 1), 0);
    add(holes, rows, cols, Math.min(rows - 2, midRow + 1), 0);
    add(holes, rows, cols, Math.max(1, midRow - 1), cols - 1);
    add(holes, rows, cols, Math.min(rows - 2, midRow + 1), cols - 1);
  } else if (shape === 'center_diamond') {
    add(holes, rows, cols, midRow - 1, midCol);
    add(holes, rows, cols, midRow, midCol - 1);
    add(holes, rows, cols, midRow, midCol + 1);
    add(holes, rows, cols, midRow + 1, midCol);
  } else if (shape === 'heart') {
    addScaled(holes, rows, cols, [
      [1, 2], [1, 3], [1, 5], [1, 6],
      [2, 1], [2, 4], [2, 7],
      [3, 1], [3, 7],
      [4, 2], [4, 6],
      [5, 3], [5, 5],
      [6, 4]
    ]);
  } else if (shape === 'butterfly') {
    addScaled(holes, rows, cols, [
      [1, 1], [1, 3], [1, 5], [1, 7],
      [2, 2], [2, 6],
      [3, 4],
      [4, 3], [4, 5],
      [5, 4],
      [6, 2], [6, 6],
      [7, 1], [7, 3], [7, 5], [7, 7]
    ]);
  } else if (shape === 'flower') {
    addScaled(holes, rows, cols, [
      [1, 4], [2, 2], [2, 6], [3, 4],
      [4, 1], [4, 3], [4, 5], [4, 7],
      [5, 4], [6, 2], [6, 6], [7, 4]
    ]);
  } else if (shape === 'spiral') {
    addScaled(holes, rows, cols, [
      [1, 1], [1, 2], [1, 3], [1, 4], [1, 5],
      [2, 5], [3, 5], [4, 5],
      [4, 4], [4, 3], [4, 2],
      [5, 2], [6, 2], [6, 3], [6, 4], [6, 5], [6, 6]
    ]);
  } else if (shape === 'hourglass') {
    for (let offset = 1; offset <= Math.min(midRow, midCol, 3); offset++) {
      add(holes, rows, cols, offset, offset);
      add(holes, rows, cols, offset, cols - 1 - offset);
      add(holes, rows, cols, rows - 1 - offset, offset);
      add(holes, rows, cols, rows - 1 - offset, cols - 1 - offset);
    }
    add(holes, rows, cols, midRow, midCol);
  } else if (shape === 'crescent') {
    addScaled(holes, rows, cols, [
      [1, 5], [2, 4], [2, 6], [3, 4], [3, 7],
      [4, 4], [4, 7], [5, 4], [5, 6], [6, 5]
    ]);
  } else if (shape === 'keyhole') {
    addScaled(holes, rows, cols, [
      [1, 3], [1, 4], [1, 5],
      [2, 2], [2, 6],
      [3, 3], [3, 4], [3, 5],
      [4, 4], [5, 4], [6, 4], [7, 4]
    ]);
  } else if (shape === 'twin_islands') {
    for (let row = 1; row < rows - 1; row++) {
      if (row !== midRow - 1 && row !== midRow + 1) {
        add(holes, rows, cols, row, midCol);
      }
    }
    add(holes, rows, cols, midRow, midCol - 1);
    add(holes, rows, cols, midRow, midCol + 1);
  } else if (shape === 'crown') {
    addScaled(holes, rows, cols, [
      [1, 1], [1, 4], [1, 7],
      [2, 2], [2, 4], [2, 6],
      [3, 3], [3, 5],
      [6, 1], [6, 7]
    ]);
  } else if (shape === 'wave') {
    for (let col = 1; col < cols - 1; col++) {
      const row = Math.round(midRow + Math.sin(col * 1.2) * 1.5);
      add(holes, rows, cols, row, col);
    }
  } else if (shape === 'clover') {
    addScaled(holes, rows, cols, [
      [2, 3], [2, 5], [3, 2], [3, 4], [3, 6],
      [4, 3], [4, 5],
      [5, 2], [5, 4], [5, 6],
      [6, 3], [6, 5]
    ]);
  } else if (shape === 'arrow') {
    addScaled(holes, rows, cols, [
      [1, 4], [2, 3], [2, 4], [2, 5],
      [3, 2], [3, 4], [3, 6],
      [4, 4], [5, 4], [6, 4], [7, 4]
    ]);
  } else if (shape === 'lantern') {
    addScaled(holes, rows, cols, [
      [1, 4], [2, 2], [2, 6], [3, 1], [3, 7],
      [4, 1], [4, 7], [5, 2], [5, 6], [6, 4], [7, 4]
    ]);
  } else if (shape === 'checker_window') {
    for (let row = 1; row < rows - 1; row++) {
      for (let col = 1; col < cols - 1; col++) {
        if ((row + col) % 3 === 0 && Math.abs(row - midRow) + Math.abs(col - midCol) <= 4) {
          add(holes, rows, cols, row, col);
        }
      }
    }
  }
  return holes;
}

function holeLimit(rows, cols) {
  return Math.floor(6 * rows * cols / 64);
}

function limitHoles(holes, rows, cols) {
  const limit = holeLimit(rows, cols);
  if (holes.size <= limit) {
    return holes;
  }
  const source = [...holes];
  const limited = new Set();
  if (limit <= 0) {
    return limited;
  }
  for (let index = 0; index < limit; index++) {
    const sourceIndex = limit === 1 ? Math.floor(source.length / 2) : Math.round(index * (source.length - 1) / (limit - 1));
    limited.add(source[sourceIndex]);
  }
  return limited;
}

function pieceTypesForLevel(id) {
  if (id <= 4) {
    return PIECES.slice(0, 4);
  }
  if (id < 40) {
    return PIECES.slice(0, 5);
  }
  return [...PIECES];
}

function availableCells(rows, cols, holes) {
  const cells = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (!holes.has(key(row, col))) {
        cells.push({ row, col });
      }
    }
  }
  return cells;
}

function pickCells(cells, count, used, seed, preferCenter) {
  const scored = cells
    .filter(cell => !used.has(key(cell.row, cell.col)))
    .map(cell => {
      const centerScore = Math.abs(cell.row - 4) + Math.abs(cell.col - 4);
      const spreadScore = (cell.row * 17 + cell.col * 31 + seed * 7) % 97;
      return {
        cell,
        score: preferCenter ? centerScore * 100 + spreadScore : spreadScore * 100 + centerScore
      };
    })
    .sort((first, second) => first.score - second.score);
  const result = [];
  for (let index = 0; index < scored.length && result.length < count; index++) {
    const cell = scored[index].cell;
    used.add(key(cell.row, cell.col));
    result.push(cell);
  }
  return result;
}

function buildBlockers(id, rows, cols, holes) {
  const cells = availableCells(rows, cols, holes);
  const used = new Set([...holes]);
  const blockers = [...[...holes].map(item => {
    const [row, col] = item.split('_').map(Number);
    return { row, col, type: 'hole', hp: 1 };
  })];

  function addTyped(type, hp, count, preferCenter) {
    pickCells(cells, count, used, id + count, preferCenter).forEach(cell => {
      blockers.push({ row: cell.row, col: cell.col, type, hp });
    });
  }

  if (id >= 20 && id < 40) {
    addTyped('ice', id >= 32 ? 2 : 1, Math.min(7, 3 + Math.floor((id - 20) / 5)), true);
  }
  if (id >= 40 && id < 60) {
    addTyped('chain', 1, Math.min(7, 3 + Math.floor((id - 40) / 5)), id % 2 === 0);
    addTyped('ice', id >= 52 ? 2 : 1, Math.min(4, 2 + Math.floor((id - 40) / 8)), true);
  }
  if (id >= 60 && id < 80) {
    addTyped('marshmallow', id >= 72 ? 2 : 1, Math.min(7, 3 + Math.floor((id - 60) / 5)), false);
    addTyped('chain', 1, Math.min(4, 2 + Math.floor((id - 60) / 8)), id % 2 === 0);
  }
  if (id >= 80) {
    addTyped('ice', id >= 92 ? 2 : 1, Math.min(5, 2 + Math.floor((id - 80) / 7)), true);
    const portalCells = pickCells(cells, 2, used, id + 80, false);
    if (portalCells.length >= 2) {
      blockers.push({
        row: portalCells[0].row,
        col: portalCells[0].col,
        type: 'portal',
        hp: 1,
        portalId: 'a_in',
        targetPortalId: 'a_out'
      });
      blockers.push({
        row: portalCells[1].row,
        col: portalCells[1].col,
        type: 'portal',
        hp: 1,
        portalId: 'a_out'
      });
    }
  }
  return blockers.sort((first, second) => first.row - second.row || first.col - second.col || first.type.localeCompare(second.type));
}

function moderateScoreGoal(baseScore) {
  let scale = 0.82;
  if (baseScore >= 8500) {
    scale = 0.66;
  } else if (baseScore >= 6000) {
    scale = 0.70;
  } else if (baseScore >= 3600) {
    scale = 0.74;
  }
  return Math.max(450, Math.round(baseScore * scale / 10) * 10);
}

function buildGoals(id, blockers, pieces) {
  if (id < 10) {
    const goals = [{ type: 'score', count: moderateScoreGoal(520 + id * 110) }];
    if (id >= 5) {
      goals.push({ type: 'collect_special', targetSpecial: 'row_clear', count: 1 });
    }
    if (id >= 8) {
      goals.push({ type: 'collect_special', targetSpecial: 'col_clear', count: 1 });
    }
    return goals;
  }
  if (id < 20) {
    const goals = [
      { type: 'score', count: moderateScoreGoal(680 + id * 110) },
      { type: 'collect_piece', target: pieces[id % pieces.length], count: 5 + Math.floor(id / 3) }
    ];
    if (id >= 15) {
      goals.push({ type: 'collect_special', targetSpecial: 'bomb', count: 1 });
    }
    return goals;
  }
  if (id < 40) {
    const goals = [
      { type: 'score', count: moderateScoreGoal(2600 + id * 85) },
      { type: 'clear_ice', count: blockers.filter(blocker => blocker.type === 'ice').length }
    ];
    if (id >= 30 && id % 5 === 0) {
      goals.push({ type: 'collect_special', targetSpecial: 'rainbow', count: 1 });
    }
    return goals;
  }
  if (id < 60) {
    const goals = [
      { type: 'score', count: moderateScoreGoal(2600 + id * 85) },
      { type: 'break_chain', count: blockers.filter(blocker => blocker.type === 'chain').length }
    ];
    if (id % 5 === 0) {
      goals.push({ type: 'collect_special', targetSpecial: id % 10 === 0 ? 'bomb' : 'row_clear', count: 2 });
    }
    return goals;
  }
  if (id < 80) {
    const goals = [
      { type: 'score', count: moderateScoreGoal(2600 + id * 85) },
      { type: 'clear_marshmallow', count: blockers.filter(blocker => blocker.type === 'marshmallow').length }
    ];
    if (id % 5 === 0) {
      goals.push({ type: 'collect_special', targetSpecial: id % 10 === 0 ? 'rainbow' : 'col_clear', count: 2 });
    }
    return goals;
  }
  return [
    { type: 'score', count: moderateScoreGoal(2600 + id * 85) },
    { type: 'clear_ice', count: Math.max(1, blockers.filter(blocker => blocker.type === 'ice').length) },
    { type: 'collect_special', targetSpecial: id % 2 === 0 ? 'bomb' : 'rainbow', count: id >= 95 ? 2 : 1 },
    { type: 'special_combo_goal', comboType: 'rainbow_functional', count: id >= 95 ? 2 : 1 }
  ];
}

function specialPresetsForLevel(id, pieces) {
  if (id < 5) {
    return [];
  }
  if (id < 8) {
    return [{ type: 'yellow', special: 'row_clear' }];
  }
  if (id < 15) {
    return [
      { type: 'yellow', special: 'row_clear' },
      { type: 'blue', special: 'col_clear' }
    ];
  }
  if (id < 20) {
    return [
      { type: 'yellow', special: 'row_clear' },
      { type: 'blue', special: 'col_clear' },
      { type: pieces.includes('purple') ? 'purple' : 'green', special: 'bomb' }
    ];
  }
  if (id < 30) {
    return [
      { type: 'yellow', special: 'row_clear' },
      { type: pieces.includes('purple') ? 'purple' : 'green', special: 'bomb' }
    ];
  }
  if (id < 40) {
    return [
      { type: 'yellow', special: 'row_clear' },
      { type: pieces.includes('orange') ? 'orange' : 'purple', special: 'rainbow' }
    ];
  }
  if (id < 60) {
    return [
      id % 10 === 0 ?
        { type: pieces.includes('purple') ? 'purple' : 'green', special: 'bomb' } :
        { type: 'yellow', special: 'row_clear' }
    ];
  }
  if (id < 80) {
    return [
      id % 10 === 0 ?
        { type: pieces.includes('orange') ? 'orange' : 'purple', special: 'rainbow' } :
        { type: 'blue', special: 'col_clear' }
    ];
  }
  return [
    id % 2 === 0 ?
      { type: pieces.includes('purple') ? 'purple' : 'green', special: 'bomb' } :
      { type: pieces.includes('orange') ? 'orange' : 'purple', special: 'rainbow' }
  ];
}

function buildSpecialPieces(id, rows, cols, holes, blockers, pieces) {
  const blocked = new Set(blockers.map(blocker => key(blocker.row, blocker.col)));
  const cells = availableCells(rows, cols, holes);
  const used = new Set(blocked);
  const specs = [];
  const presets = specialPresetsForLevel(id, pieces);
  const positions = pickCells(cells, presets.length, used, id + 120, true);
  presets.forEach((preset, index) => {
    const position = positions[index];
    if (position) {
      specs.push({ row: position.row, col: position.col, type: preset.type, special: preset.special });
    }
  });
  return specs;
}

function tutorialForLevel(id) {
  const tutorials = {
    1: ['Swap adjacent pieces to make a line of three.'],
    2: ['Different board sizes begin here.'],
    5: ['Special glowing pieces and shaped hollow cells begin here.'],
    8: ['Vertical and horizontal specials use different arrow marks.'],
    20: ['Ice appears: clear nearby pieces to break it.'],
    40: ['Chains appear and must be broken by clearing the locked piece.'],
    60: ['Marshmallows block cells until nearby clears remove them.'],
    80: ['Portals begin to bend falling paths.']
  };
  return tutorials[id];
}

function createLevel(id) {
  const shape = shapeForLevel(id);
  const size = sizeForLevel(id, shape);
  const holes = limitHoles(holesForShape(shape, size.rows, size.cols), size.rows, size.cols);
  const pieces = pieceTypesForLevel(id);
  const blockers = buildBlockers(id, size.rows, size.cols, holes);
  return {
    id,
    title: id === 100 ? 'Level 100: Candy Sky Island Final' : `Level ${id}`,
    rawfilePath: `levels/level_${String(id).padStart(3, '0')}.json`,
    rows: size.rows,
    cols: size.cols,
    shape,
    availableCells: size.rows * size.cols - holes.size,
    moves: Math.max(20, 32 - Math.floor(id / 12) + (size.rows * size.cols <= 42 ? 2 : 0)),
    pieceTypes: pieces,
    goals: buildGoals(id, blockers, pieces),
    blockers,
    specialPieces: buildSpecialPieces(id, size.rows, size.cols, holes, blockers, pieces),
    tutorial: tutorialForLevel(id)
  };
}

fs.mkdirSync(rawDir, { recursive: true });
for (let id = 1; id <= 100; id++) {
  const level = createLevel(id);
  const file = path.join(rawDir, `level_${String(id).padStart(3, '0')}.json`);
  fs.writeFileSync(file, `${JSON.stringify(level, null, 2)}\n`, 'utf8');
}

const sync = spawnSync(nodePath, [path.join(__dirname, 'sync-level-maps.js')], {
  cwd: root,
  stdio: 'inherit'
});
if (sync.status !== 0) {
  process.exit(sync.status ?? 1);
}
console.log('Generated 100 creative level maps.');
