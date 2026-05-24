import { PieceType } from '../core/Types';
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

export const LEVEL_MAP_RAWFILE_PATHS: string[] = [
  "levels/level_001.json",
  "levels/level_002.json",
  "levels/level_003.json",
  "levels/level_004.json",
  "levels/level_005.json",
  "levels/level_006.json",
  "levels/level_007.json",
  "levels/level_008.json",
  "levels/level_009.json",
  "levels/level_010.json",
  "levels/level_011.json",
  "levels/level_012.json",
  "levels/level_013.json",
  "levels/level_014.json",
  "levels/level_015.json",
  "levels/level_016.json",
  "levels/level_017.json",
  "levels/level_018.json",
  "levels/level_019.json",
  "levels/level_020.json",
  "levels/level_021.json",
  "levels/level_022.json",
  "levels/level_023.json",
  "levels/level_024.json",
  "levels/level_025.json",
  "levels/level_026.json",
  "levels/level_027.json",
  "levels/level_028.json",
  "levels/level_029.json",
  "levels/level_030.json",
  "levels/level_031.json",
  "levels/level_032.json",
  "levels/level_033.json",
  "levels/level_034.json",
  "levels/level_035.json",
  "levels/level_036.json",
  "levels/level_037.json",
  "levels/level_038.json",
  "levels/level_039.json",
  "levels/level_040.json",
  "levels/level_041.json",
  "levels/level_042.json",
  "levels/level_043.json",
  "levels/level_044.json",
  "levels/level_045.json",
  "levels/level_046.json",
  "levels/level_047.json",
  "levels/level_048.json",
  "levels/level_049.json",
  "levels/level_050.json",
  "levels/level_051.json",
  "levels/level_052.json",
  "levels/level_053.json",
  "levels/level_054.json",
  "levels/level_055.json",
  "levels/level_056.json",
  "levels/level_057.json",
  "levels/level_058.json",
  "levels/level_059.json",
  "levels/level_060.json",
  "levels/level_061.json",
  "levels/level_062.json",
  "levels/level_063.json",
  "levels/level_064.json",
  "levels/level_065.json",
  "levels/level_066.json",
  "levels/level_067.json",
  "levels/level_068.json",
  "levels/level_069.json",
  "levels/level_070.json",
  "levels/level_071.json",
  "levels/level_072.json",
  "levels/level_073.json",
  "levels/level_074.json",
  "levels/level_075.json",
  "levels/level_076.json",
  "levels/level_077.json",
  "levels/level_078.json",
  "levels/level_079.json",
  "levels/level_080.json",
  "levels/level_081.json",
  "levels/level_082.json",
  "levels/level_083.json",
  "levels/level_084.json",
  "levels/level_085.json",
  "levels/level_086.json",
  "levels/level_087.json",
  "levels/level_088.json",
  "levels/level_089.json",
  "levels/level_090.json",
  "levels/level_091.json",
  "levels/level_092.json",
  "levels/level_093.json",
  "levels/level_094.json",
  "levels/level_095.json",
  "levels/level_096.json",
  "levels/level_097.json",
  "levels/level_098.json",
  "levels/level_099.json",
  "levels/level_100.json"
];

export const LEVEL_MAPS: LevelMapConfig[] = [
  {
    "id": 1,
    "title": "Level 1",
    "rawfilePath": "levels/level_001.json",
    "rows": 6,
    "cols": 6,
    "shape": "full",
    "availableCells": 36,
    "moves": 34,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green"
    ],
    "goals": [
      {
        "type": "score",
        "count": 630
      }
    ],
    "blockers": [],
    "specialPieces": [],
    "tutorial": [
      "Swap adjacent pieces to make a line of three."
    ]
  },
  {
    "id": 2,
    "title": "Level 2",
    "rawfilePath": "levels/level_002.json",
    "rows": 7,
    "cols": 7,
    "shape": "center_diamond",
    "availableCells": 45,
    "moves": 32,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green"
    ],
    "goals": [
      {
        "type": "score",
        "count": 740
      }
    ],
    "blockers": [
      {
        "row": 2,
        "col": 3,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 2,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 3,
        "type": "hole",
        "hp": 1
      }
    ],
    "specialPieces": [],
    "tutorial": [
      "Different board sizes begin here."
    ]
  },
  {
    "id": 3,
    "title": "Level 3",
    "rawfilePath": "levels/level_003.json",
    "rows": 8,
    "cols": 8,
    "shape": "wide_lane",
    "availableCells": 60,
    "moves": 32,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green"
    ],
    "goals": [
      {
        "type": "score",
        "count": 850
      }
    ],
    "blockers": [
      {
        "row": 3,
        "col": 0,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 7,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 5,
        "col": 0,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 5,
        "col": 7,
        "type": "hole",
        "hp": 1
      }
    ],
    "specialPieces": []
  },
  {
    "id": 4,
    "title": "Level 4",
    "rawfilePath": "levels/level_004.json",
    "rows": 6,
    "cols": 8,
    "shape": "side_notches",
    "availableCells": 44,
    "moves": 32,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green"
    ],
    "goals": [
      {
        "type": "score",
        "count": 960
      }
    ],
    "blockers": [
      {
        "row": 1,
        "col": 0,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 1,
        "col": 7,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 0,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 7,
        "type": "hole",
        "hp": 1
      }
    ],
    "specialPieces": []
  },
  {
    "id": 5,
    "title": "Level 5",
    "rawfilePath": "levels/level_005.json",
    "rows": 8,
    "cols": 8,
    "shape": "heart",
    "availableCells": 58,
    "moves": 32,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple"
    ],
    "goals": [
      {
        "type": "score",
        "count": 1070
      },
      {
        "type": "collect_special",
        "targetSpecial": "row_clear",
        "count": 1
      }
    ],
    "blockers": [
      {
        "row": 1,
        "col": 2,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 1,
        "col": 5,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 6,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 5,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 5,
        "col": 4,
        "type": "hole",
        "hp": 1
      }
    ],
    "specialPieces": [
      {
        "row": 4,
        "col": 4,
        "type": "yellow",
        "special": "row_clear"
      }
    ],
    "tutorial": [
      "Special glowing pieces and shaped hollow cells begin here."
    ]
  },
  {
    "id": 6,
    "title": "Level 6",
    "rawfilePath": "levels/level_006.json",
    "rows": 9,
    "cols": 9,
    "shape": "butterfly",
    "availableCells": 74,
    "moves": 32,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple"
    ],
    "goals": [
      {
        "type": "score",
        "count": 1180
      },
      {
        "type": "collect_special",
        "targetSpecial": "row_clear",
        "count": 1
      }
    ],
    "blockers": [
      {
        "row": 1,
        "col": 1,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 1,
        "col": 7,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 6,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 5,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 6,
        "col": 2,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 7,
        "col": 3,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 7,
        "col": 7,
        "type": "hole",
        "hp": 1
      }
    ],
    "specialPieces": [
      {
        "row": 4,
        "col": 4,
        "type": "yellow",
        "special": "row_clear"
      }
    ]
  },
  {
    "id": 7,
    "title": "Level 7",
    "rawfilePath": "levels/level_007.json",
    "rows": 8,
    "cols": 8,
    "shape": "flower",
    "availableCells": 58,
    "moves": 32,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple"
    ],
    "goals": [
      {
        "type": "score",
        "count": 1290
      },
      {
        "type": "collect_special",
        "targetSpecial": "row_clear",
        "count": 1
      }
    ],
    "blockers": [
      {
        "row": 1,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 5,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 1,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 5,
        "col": 2,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 6,
        "col": 4,
        "type": "hole",
        "hp": 1
      }
    ],
    "specialPieces": [
      {
        "row": 5,
        "col": 4,
        "type": "yellow",
        "special": "row_clear"
      }
    ]
  },
  {
    "id": 8,
    "title": "Level 8",
    "rawfilePath": "levels/level_008.json",
    "rows": 9,
    "cols": 9,
    "shape": "spiral",
    "availableCells": 74,
    "moves": 32,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple"
    ],
    "goals": [
      {
        "type": "score",
        "count": 1400
      },
      {
        "type": "collect_special",
        "targetSpecial": "row_clear",
        "count": 1
      },
      {
        "type": "collect_special",
        "targetSpecial": "col_clear",
        "count": 1
      }
    ],
    "blockers": [
      {
        "row": 1,
        "col": 1,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 1,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 5,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 5,
        "col": 2,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 6,
        "col": 3,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 6,
        "col": 6,
        "type": "hole",
        "hp": 1
      }
    ],
    "specialPieces": [
      {
        "row": 3,
        "col": 4,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 5,
        "col": 4,
        "type": "blue",
        "special": "col_clear"
      }
    ],
    "tutorial": [
      "Vertical and horizontal specials use different arrow marks."
    ]
  },
  {
    "id": 9,
    "title": "Level 9",
    "rawfilePath": "levels/level_009.json",
    "rows": 9,
    "cols": 7,
    "shape": "hourglass",
    "availableCells": 58,
    "moves": 32,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple"
    ],
    "goals": [
      {
        "type": "score",
        "count": 1510
      },
      {
        "type": "collect_special",
        "targetSpecial": "row_clear",
        "count": 1
      },
      {
        "type": "collect_special",
        "targetSpecial": "col_clear",
        "count": 1
      }
    ],
    "blockers": [
      {
        "row": 1,
        "col": 1,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 3,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 3,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 7,
        "col": 5,
        "type": "hole",
        "hp": 1
      }
    ],
    "specialPieces": [
      {
        "row": 4,
        "col": 4,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 3,
        "col": 4,
        "type": "blue",
        "special": "col_clear"
      }
    ]
  },
  {
    "id": 10,
    "title": "Level 10",
    "rawfilePath": "levels/level_010.json",
    "rows": 8,
    "cols": 9,
    "shape": "crescent",
    "availableCells": 66,
    "moves": 32,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple"
    ],
    "goals": [
      {
        "type": "score",
        "count": 1780
      },
      {
        "type": "collect_piece",
        "target": "red",
        "count": 8
      }
    ],
    "blockers": [
      {
        "row": 1,
        "col": 5,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 6,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 7,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 5,
        "col": 5,
        "type": "hole",
        "hp": 1
      }
    ],
    "specialPieces": [
      {
        "row": 4,
        "col": 3,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 5,
        "col": 4,
        "type": "blue",
        "special": "col_clear"
      }
    ]
  },
  {
    "id": 11,
    "title": "Level 11",
    "rawfilePath": "levels/level_011.json",
    "rows": 9,
    "cols": 8,
    "shape": "keyhole",
    "availableCells": 66,
    "moves": 32,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple"
    ],
    "goals": [
      {
        "type": "score",
        "count": 1890
      },
      {
        "type": "collect_piece",
        "target": "blue",
        "count": 8
      }
    ],
    "blockers": [
      {
        "row": 1,
        "col": 3,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 2,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 3,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 5,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 7,
        "col": 4,
        "type": "hole",
        "hp": 1
      }
    ],
    "specialPieces": [
      {
        "row": 4,
        "col": 4,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 4,
        "col": 3,
        "type": "blue",
        "special": "col_clear"
      }
    ]
  },
  {
    "id": 12,
    "title": "Level 12",
    "rawfilePath": "levels/level_012.json",
    "rows": 6,
    "cols": 6,
    "shape": "twin_islands",
    "availableCells": 33,
    "moves": 33,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple"
    ],
    "goals": [
      {
        "type": "score",
        "count": 2000
      },
      {
        "type": "collect_piece",
        "target": "yellow",
        "count": 9
      }
    ],
    "blockers": [
      {
        "row": 1,
        "col": 3,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 2,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 4,
        "type": "hole",
        "hp": 1
      }
    ],
    "specialPieces": [
      {
        "row": 4,
        "col": 4,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 4,
        "col": 3,
        "type": "blue",
        "special": "col_clear"
      }
    ]
  },
  {
    "id": 13,
    "title": "Level 13",
    "rawfilePath": "levels/level_013.json",
    "rows": 8,
    "cols": 9,
    "shape": "crown",
    "availableCells": 66,
    "moves": 31,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple"
    ],
    "goals": [
      {
        "type": "score",
        "count": 2110
      },
      {
        "type": "collect_piece",
        "target": "green",
        "count": 9
      }
    ],
    "blockers": [
      {
        "row": 1,
        "col": 1,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 1,
        "col": 7,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 6,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 5,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 5,
        "col": 7,
        "type": "hole",
        "hp": 1
      }
    ],
    "specialPieces": [
      {
        "row": 4,
        "col": 4,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 4,
        "col": 3,
        "type": "blue",
        "special": "col_clear"
      }
    ]
  },
  {
    "id": 14,
    "title": "Level 14",
    "rawfilePath": "levels/level_014.json",
    "rows": 8,
    "cols": 8,
    "shape": "wave",
    "availableCells": 58,
    "moves": 31,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple"
    ],
    "goals": [
      {
        "type": "score",
        "count": 2220
      },
      {
        "type": "collect_piece",
        "target": "purple",
        "count": 9
      }
    ],
    "blockers": [
      {
        "row": 3,
        "col": 3,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 5,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 5,
        "col": 1,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 5,
        "col": 2,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 5,
        "col": 6,
        "type": "hole",
        "hp": 1
      }
    ],
    "specialPieces": [
      {
        "row": 4,
        "col": 4,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 4,
        "col": 3,
        "type": "blue",
        "special": "col_clear"
      }
    ]
  },
  {
    "id": 15,
    "title": "Level 15",
    "rawfilePath": "levels/level_015.json",
    "rows": 8,
    "cols": 8,
    "shape": "clover",
    "availableCells": 58,
    "moves": 31,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple"
    ],
    "goals": [
      {
        "type": "score",
        "count": 2330
      },
      {
        "type": "collect_piece",
        "target": "red",
        "count": 10
      },
      {
        "type": "collect_special",
        "targetSpecial": "bomb",
        "count": 1
      }
    ],
    "blockers": [
      {
        "row": 2,
        "col": 3,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 2,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 5,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 5,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 5,
        "col": 4,
        "type": "hole",
        "hp": 1
      }
    ],
    "specialPieces": [
      {
        "row": 4,
        "col": 3,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 3,
        "col": 4,
        "type": "blue",
        "special": "col_clear"
      },
      {
        "row": 6,
        "col": 4,
        "type": "purple",
        "special": "bomb"
      }
    ]
  },
  {
    "id": 16,
    "title": "Level 16",
    "rawfilePath": "levels/level_016.json",
    "rows": 8,
    "cols": 6,
    "shape": "arrow",
    "availableCells": 44,
    "moves": 31,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple"
    ],
    "goals": [
      {
        "type": "score",
        "count": 2440
      },
      {
        "type": "collect_piece",
        "target": "blue",
        "count": 10
      },
      {
        "type": "collect_special",
        "targetSpecial": "bomb",
        "count": 1
      }
    ],
    "blockers": [
      {
        "row": 1,
        "col": 3,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 1,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 6,
        "col": 3,
        "type": "hole",
        "hp": 1
      }
    ],
    "specialPieces": [
      {
        "row": 4,
        "col": 4,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 4,
        "col": 5,
        "type": "blue",
        "special": "col_clear"
      },
      {
        "row": 4,
        "col": 3,
        "type": "purple",
        "special": "bomb"
      }
    ]
  },
  {
    "id": 17,
    "title": "Level 17",
    "rawfilePath": "levels/level_017.json",
    "rows": 8,
    "cols": 9,
    "shape": "lantern",
    "availableCells": 66,
    "moves": 31,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple"
    ],
    "goals": [
      {
        "type": "score",
        "count": 2550
      },
      {
        "type": "collect_piece",
        "target": "yellow",
        "count": 10
      },
      {
        "type": "collect_special",
        "targetSpecial": "bomb",
        "count": 1
      }
    ],
    "blockers": [
      {
        "row": 1,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 6,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 7,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 6,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 7,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 6,
        "col": 4,
        "type": "hole",
        "hp": 1
      }
    ],
    "specialPieces": [
      {
        "row": 4,
        "col": 4,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 5,
        "col": 4,
        "type": "blue",
        "special": "col_clear"
      },
      {
        "row": 4,
        "col": 5,
        "type": "purple",
        "special": "bomb"
      }
    ]
  },
  {
    "id": 18,
    "title": "Level 18",
    "rawfilePath": "levels/level_018.json",
    "rows": 8,
    "cols": 7,
    "shape": "checker_window",
    "availableCells": 51,
    "moves": 31,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple"
    ],
    "goals": [
      {
        "type": "score",
        "count": 2660
      },
      {
        "type": "collect_piece",
        "target": "green",
        "count": 11
      },
      {
        "type": "collect_special",
        "targetSpecial": "bomb",
        "count": 1
      }
    ],
    "blockers": [
      {
        "row": 1,
        "col": 2,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 2,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 5,
        "col": 1,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 6,
        "col": 3,
        "type": "hole",
        "hp": 1
      }
    ],
    "specialPieces": [
      {
        "row": 4,
        "col": 4,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 5,
        "col": 4,
        "type": "blue",
        "special": "col_clear"
      },
      {
        "row": 4,
        "col": 5,
        "type": "purple",
        "special": "bomb"
      }
    ]
  },
  {
    "id": 19,
    "title": "Level 19",
    "rawfilePath": "levels/level_019.json",
    "rows": 7,
    "cols": 9,
    "shape": "center_diamond",
    "availableCells": 59,
    "moves": 31,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple"
    ],
    "goals": [
      {
        "type": "score",
        "count": 2770
      },
      {
        "type": "collect_piece",
        "target": "purple",
        "count": 11
      },
      {
        "type": "collect_special",
        "targetSpecial": "bomb",
        "count": 1
      }
    ],
    "blockers": [
      {
        "row": 2,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 3,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 5,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 4,
        "type": "hole",
        "hp": 1
      }
    ],
    "specialPieces": [
      {
        "row": 5,
        "col": 4,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 4,
        "col": 5,
        "type": "blue",
        "special": "col_clear"
      },
      {
        "row": 4,
        "col": 3,
        "type": "purple",
        "special": "bomb"
      }
    ]
  },
  {
    "id": 20,
    "title": "Level 20",
    "rawfilePath": "levels/level_020.json",
    "rows": 9,
    "cols": 7,
    "shape": "side_notches",
    "availableCells": 59,
    "moves": 31,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple"
    ],
    "goals": [
      {
        "type": "score",
        "count": 4300
      },
      {
        "type": "clear_ice",
        "count": 3
      }
    ],
    "blockers": [
      {
        "row": 1,
        "col": 0,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 1,
        "col": 6,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 4,
        "type": "ice",
        "hp": 1
      },
      {
        "row": 4,
        "col": 3,
        "type": "ice",
        "hp": 1
      },
      {
        "row": 4,
        "col": 4,
        "type": "ice",
        "hp": 1
      },
      {
        "row": 7,
        "col": 0,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 7,
        "col": 6,
        "type": "hole",
        "hp": 1
      }
    ],
    "specialPieces": [
      {
        "row": 5,
        "col": 4,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 4,
        "col": 5,
        "type": "blue",
        "special": "col_clear"
      },
      {
        "row": 3,
        "col": 5,
        "type": "purple",
        "special": "bomb"
      }
    ],
    "tutorial": [
      "Ice appears: clear nearby pieces to break it."
    ]
  },
  {
    "id": 21,
    "title": "Level 21",
    "rawfilePath": "levels/level_021.json",
    "rows": 8,
    "cols": 8,
    "shape": "heart",
    "availableCells": 58,
    "moves": 31,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple"
    ],
    "goals": [
      {
        "type": "score",
        "count": 4385
      },
      {
        "type": "clear_ice",
        "count": 3
      }
    ],
    "blockers": [
      {
        "row": 1,
        "col": 2,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 1,
        "col": 5,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 4,
        "type": "ice",
        "hp": 1
      },
      {
        "row": 3,
        "col": 6,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 3,
        "type": "ice",
        "hp": 1
      },
      {
        "row": 4,
        "col": 4,
        "type": "ice",
        "hp": 1
      },
      {
        "row": 4,
        "col": 5,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 5,
        "col": 4,
        "type": "hole",
        "hp": 1
      }
    ],
    "specialPieces": [
      {
        "row": 5,
        "col": 3,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 3,
        "col": 5,
        "type": "blue",
        "special": "col_clear"
      },
      {
        "row": 6,
        "col": 4,
        "type": "purple",
        "special": "bomb"
      }
    ]
  },
  {
    "id": 22,
    "title": "Level 22",
    "rawfilePath": "levels/level_022.json",
    "rows": 9,
    "cols": 9,
    "shape": "butterfly",
    "availableCells": 74,
    "moves": 31,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple"
    ],
    "goals": [
      {
        "type": "score",
        "count": 4470
      },
      {
        "type": "clear_ice",
        "count": 3
      }
    ],
    "blockers": [
      {
        "row": 1,
        "col": 1,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 1,
        "col": 7,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 6,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 4,
        "type": "ice",
        "hp": 1
      },
      {
        "row": 4,
        "col": 3,
        "type": "ice",
        "hp": 1
      },
      {
        "row": 4,
        "col": 4,
        "type": "ice",
        "hp": 1
      },
      {
        "row": 4,
        "col": 5,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 6,
        "col": 2,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 7,
        "col": 3,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 7,
        "col": 7,
        "type": "hole",
        "hp": 1
      }
    ],
    "specialPieces": [
      {
        "row": 5,
        "col": 4,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 5,
        "col": 3,
        "type": "blue",
        "special": "col_clear"
      },
      {
        "row": 3,
        "col": 5,
        "type": "purple",
        "special": "bomb"
      }
    ]
  },
  {
    "id": 23,
    "title": "Level 23",
    "rawfilePath": "levels/level_023.json",
    "rows": 8,
    "cols": 8,
    "shape": "flower",
    "availableCells": 58,
    "moves": 31,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple"
    ],
    "goals": [
      {
        "type": "score",
        "count": 4555
      },
      {
        "type": "clear_ice",
        "count": 3
      }
    ],
    "blockers": [
      {
        "row": 1,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 5,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 1,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 3,
        "type": "ice",
        "hp": 1
      },
      {
        "row": 4,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 5,
        "type": "ice",
        "hp": 1
      },
      {
        "row": 5,
        "col": 2,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 5,
        "col": 4,
        "type": "ice",
        "hp": 1
      },
      {
        "row": 6,
        "col": 4,
        "type": "hole",
        "hp": 1
      }
    ],
    "specialPieces": [
      {
        "row": 3,
        "col": 4,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 5,
        "col": 3,
        "type": "blue",
        "special": "col_clear"
      },
      {
        "row": 3,
        "col": 5,
        "type": "purple",
        "special": "bomb"
      }
    ]
  },
  {
    "id": 24,
    "title": "Level 24",
    "rawfilePath": "levels/level_024.json",
    "rows": 9,
    "cols": 9,
    "shape": "spiral",
    "availableCells": 74,
    "moves": 30,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple"
    ],
    "goals": [
      {
        "type": "score",
        "count": 4640
      },
      {
        "type": "clear_ice",
        "count": 4
      }
    ],
    "blockers": [
      {
        "row": 1,
        "col": 1,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 1,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 5,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 4,
        "type": "ice",
        "hp": 1
      },
      {
        "row": 4,
        "col": 3,
        "type": "ice",
        "hp": 1
      },
      {
        "row": 4,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 5,
        "type": "ice",
        "hp": 1
      },
      {
        "row": 5,
        "col": 2,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 5,
        "col": 4,
        "type": "ice",
        "hp": 1
      },
      {
        "row": 6,
        "col": 3,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 6,
        "col": 6,
        "type": "hole",
        "hp": 1
      }
    ],
    "specialPieces": [
      {
        "row": 4,
        "col": 6,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 2,
        "col": 4,
        "type": "blue",
        "special": "col_clear"
      },
      {
        "row": 5,
        "col": 3,
        "type": "purple",
        "special": "bomb"
      }
    ]
  },
  {
    "id": 25,
    "title": "Level 25",
    "rawfilePath": "levels/level_025.json",
    "rows": 8,
    "cols": 8,
    "shape": "hourglass",
    "availableCells": 58,
    "moves": 30,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple"
    ],
    "goals": [
      {
        "type": "score",
        "count": 4725
      },
      {
        "type": "clear_ice",
        "count": 4
      }
    ],
    "blockers": [
      {
        "row": 1,
        "col": 1,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 2,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 5,
        "type": "ice",
        "hp": 1
      },
      {
        "row": 4,
        "col": 3,
        "type": "ice",
        "hp": 1
      },
      {
        "row": 4,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 5,
        "type": "ice",
        "hp": 1
      },
      {
        "row": 5,
        "col": 4,
        "type": "ice",
        "hp": 1
      },
      {
        "row": 5,
        "col": 5,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 6,
        "col": 1,
        "type": "hole",
        "hp": 1
      }
    ],
    "specialPieces": [
      {
        "row": 4,
        "col": 6,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 2,
        "col": 4,
        "type": "blue",
        "special": "col_clear"
      },
      {
        "row": 5,
        "col": 3,
        "type": "purple",
        "special": "bomb"
      }
    ]
  },
  {
    "id": 26,
    "title": "Level 26",
    "rawfilePath": "levels/level_026.json",
    "rows": 6,
    "cols": 8,
    "shape": "crescent",
    "availableCells": 44,
    "moves": 30,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple"
    ],
    "goals": [
      {
        "type": "score",
        "count": 4810
      },
      {
        "type": "clear_ice",
        "count": 4
      }
    ],
    "blockers": [
      {
        "row": 1,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 4,
        "type": "ice",
        "hp": 1
      },
      {
        "row": 3,
        "col": 6,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 3,
        "type": "ice",
        "hp": 1
      },
      {
        "row": 4,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 5,
        "type": "ice",
        "hp": 1
      },
      {
        "row": 5,
        "col": 4,
        "type": "ice",
        "hp": 1
      }
    ],
    "specialPieces": [
      {
        "row": 5,
        "col": 5,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 3,
        "col": 3,
        "type": "blue",
        "special": "col_clear"
      },
      {
        "row": 4,
        "col": 6,
        "type": "purple",
        "special": "bomb"
      }
    ]
  },
  {
    "id": 27,
    "title": "Level 27",
    "rawfilePath": "levels/level_027.json",
    "rows": 8,
    "cols": 6,
    "shape": "keyhole",
    "availableCells": 44,
    "moves": 30,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple"
    ],
    "goals": [
      {
        "type": "score",
        "count": 4895
      },
      {
        "type": "clear_ice",
        "count": 4
      }
    ],
    "blockers": [
      {
        "row": 1,
        "col": 2,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 3,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 4,
        "type": "ice",
        "hp": 1
      },
      {
        "row": 4,
        "col": 4,
        "type": "ice",
        "hp": 1
      },
      {
        "row": 4,
        "col": 5,
        "type": "ice",
        "hp": 1
      },
      {
        "row": 5,
        "col": 4,
        "type": "ice",
        "hp": 1
      },
      {
        "row": 6,
        "col": 3,
        "type": "hole",
        "hp": 1
      }
    ],
    "specialPieces": [
      {
        "row": 4,
        "col": 3,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 5,
        "col": 5,
        "type": "blue",
        "special": "col_clear"
      },
      {
        "row": 5,
        "col": 3,
        "type": "purple",
        "special": "bomb"
      }
    ]
  },
  {
    "id": 28,
    "title": "Level 28",
    "rawfilePath": "levels/level_028.json",
    "rows": 7,
    "cols": 8,
    "shape": "twin_islands",
    "availableCells": 51,
    "moves": 30,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple"
    ],
    "goals": [
      {
        "type": "score",
        "count": 4980
      },
      {
        "type": "clear_ice",
        "count": 5
      }
    ],
    "blockers": [
      {
        "row": 1,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 4,
        "type": "ice",
        "hp": 1
      },
      {
        "row": 3,
        "col": 3,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 5,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 3,
        "type": "ice",
        "hp": 1
      },
      {
        "row": 4,
        "col": 4,
        "type": "ice",
        "hp": 1
      },
      {
        "row": 4,
        "col": 5,
        "type": "ice",
        "hp": 1
      },
      {
        "row": 4,
        "col": 6,
        "type": "ice",
        "hp": 1
      },
      {
        "row": 5,
        "col": 4,
        "type": "hole",
        "hp": 1
      }
    ],
    "specialPieces": [
      {
        "row": 6,
        "col": 4,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 4,
        "col": 2,
        "type": "blue",
        "special": "col_clear"
      },
      {
        "row": 5,
        "col": 5,
        "type": "purple",
        "special": "bomb"
      }
    ]
  },
  {
    "id": 29,
    "title": "Level 29",
    "rawfilePath": "levels/level_029.json",
    "rows": 8,
    "cols": 9,
    "shape": "crown",
    "availableCells": 66,
    "moves": 30,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple"
    ],
    "goals": [
      {
        "type": "score",
        "count": 5065
      },
      {
        "type": "clear_ice",
        "count": 5
      }
    ],
    "blockers": [
      {
        "row": 1,
        "col": 1,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 1,
        "col": 7,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 6,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 4,
        "type": "ice",
        "hp": 1
      },
      {
        "row": 3,
        "col": 5,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 3,
        "type": "ice",
        "hp": 1
      },
      {
        "row": 4,
        "col": 4,
        "type": "ice",
        "hp": 1
      },
      {
        "row": 4,
        "col": 5,
        "type": "ice",
        "hp": 1
      },
      {
        "row": 5,
        "col": 4,
        "type": "ice",
        "hp": 1
      },
      {
        "row": 5,
        "col": 7,
        "type": "hole",
        "hp": 1
      }
    ],
    "specialPieces": [
      {
        "row": 6,
        "col": 4,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 4,
        "col": 2,
        "type": "blue",
        "special": "col_clear"
      },
      {
        "row": 5,
        "col": 5,
        "type": "purple",
        "special": "bomb"
      }
    ]
  },
  {
    "id": 30,
    "title": "Level 30",
    "rawfilePath": "levels/level_030.json",
    "rows": 7,
    "cols": 9,
    "shape": "wave",
    "availableCells": 58,
    "moves": 30,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple"
    ],
    "goals": [
      {
        "type": "score",
        "count": 5150
      },
      {
        "type": "clear_ice",
        "count": 5
      },
      {
        "type": "collect_special",
        "targetSpecial": "rainbow",
        "count": 1
      }
    ],
    "blockers": [
      {
        "row": 2,
        "col": 3,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 4,
        "type": "ice",
        "hp": 1
      },
      {
        "row": 4,
        "col": 1,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 3,
        "type": "ice",
        "hp": 1
      },
      {
        "row": 4,
        "col": 4,
        "type": "ice",
        "hp": 1
      },
      {
        "row": 4,
        "col": 5,
        "type": "ice",
        "hp": 1
      },
      {
        "row": 4,
        "col": 6,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 7,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 5,
        "col": 4,
        "type": "ice",
        "hp": 1
      }
    ],
    "specialPieces": [
      {
        "row": 6,
        "col": 4,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 4,
        "col": 2,
        "type": "blue",
        "special": "col_clear"
      },
      {
        "row": 5,
        "col": 5,
        "type": "purple",
        "special": "bomb"
      },
      {
        "row": 3,
        "col": 3,
        "type": "purple",
        "special": "rainbow"
      }
    ]
  },
  {
    "id": 31,
    "title": "Level 31",
    "rawfilePath": "levels/level_031.json",
    "rows": 8,
    "cols": 8,
    "shape": "clover",
    "availableCells": 58,
    "moves": 30,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple"
    ],
    "goals": [
      {
        "type": "score",
        "count": 5235
      },
      {
        "type": "clear_ice",
        "count": 5
      }
    ],
    "blockers": [
      {
        "row": 2,
        "col": 3,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 2,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 3,
        "type": "ice",
        "hp": 1
      },
      {
        "row": 3,
        "col": 4,
        "type": "ice",
        "hp": 1
      },
      {
        "row": 3,
        "col": 5,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 3,
        "type": "ice",
        "hp": 1
      },
      {
        "row": 4,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 5,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 6,
        "type": "ice",
        "hp": 1
      },
      {
        "row": 5,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 5,
        "col": 5,
        "type": "ice",
        "hp": 1
      }
    ],
    "specialPieces": [
      {
        "row": 6,
        "col": 4,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 4,
        "col": 2,
        "type": "blue",
        "special": "col_clear"
      },
      {
        "row": 2,
        "col": 4,
        "type": "purple",
        "special": "bomb"
      },
      {
        "row": 5,
        "col": 3,
        "type": "purple",
        "special": "rainbow"
      }
    ]
  },
  {
    "id": 32,
    "title": "Level 32",
    "rawfilePath": "levels/level_032.json",
    "rows": 8,
    "cols": 9,
    "shape": "arrow",
    "availableCells": 66,
    "moves": 30,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple"
    ],
    "goals": [
      {
        "type": "score",
        "count": 5320
      },
      {
        "type": "clear_ice",
        "count": 6
      }
    ],
    "blockers": [
      {
        "row": 1,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 2,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 2,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 6,
        "col": 4,
        "type": "hole",
        "hp": 1
      }
    ],
    "specialPieces": [
      {
        "row": 3,
        "col": 5,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 4,
        "col": 6,
        "type": "blue",
        "special": "col_clear"
      },
      {
        "row": 5,
        "col": 3,
        "type": "purple",
        "special": "bomb"
      },
      {
        "row": 2,
        "col": 3,
        "type": "purple",
        "special": "rainbow"
      }
    ]
  },
  {
    "id": 33,
    "title": "Level 33",
    "rawfilePath": "levels/level_033.json",
    "rows": 8,
    "cols": 9,
    "shape": "lantern",
    "availableCells": 66,
    "moves": 30,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple"
    ],
    "goals": [
      {
        "type": "score",
        "count": 5405
      },
      {
        "type": "clear_ice",
        "count": 6
      }
    ],
    "blockers": [
      {
        "row": 1,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 6,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 7,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 2,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 6,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 7,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 5,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 6,
        "col": 4,
        "type": "hole",
        "hp": 1
      }
    ],
    "specialPieces": [
      {
        "row": 3,
        "col": 5,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 5,
        "col": 5,
        "type": "blue",
        "special": "col_clear"
      },
      {
        "row": 3,
        "col": 3,
        "type": "purple",
        "special": "bomb"
      },
      {
        "row": 2,
        "col": 4,
        "type": "purple",
        "special": "rainbow"
      }
    ]
  },
  {
    "id": 34,
    "title": "Level 34",
    "rawfilePath": "levels/level_034.json",
    "rows": 6,
    "cols": 6,
    "shape": "checker_window",
    "availableCells": 33,
    "moves": 32,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple"
    ],
    "goals": [
      {
        "type": "score",
        "count": 5490
      },
      {
        "type": "clear_ice",
        "count": 6
      }
    ],
    "blockers": [
      {
        "row": 1,
        "col": 2,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 2,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 4,
        "type": "ice",
        "hp": 2
      }
    ],
    "specialPieces": [
      {
        "row": 5,
        "col": 5,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 3,
        "col": 3,
        "type": "blue",
        "special": "col_clear"
      },
      {
        "row": 5,
        "col": 3,
        "type": "purple",
        "special": "bomb"
      },
      {
        "row": 2,
        "col": 5,
        "type": "purple",
        "special": "rainbow"
      }
    ]
  },
  {
    "id": 35,
    "title": "Level 35",
    "rawfilePath": "levels/level_035.json",
    "rows": 7,
    "cols": 7,
    "shape": "center_diamond",
    "availableCells": 45,
    "moves": 30,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple"
    ],
    "goals": [
      {
        "type": "score",
        "count": 5575
      },
      {
        "type": "clear_ice",
        "count": 6
      },
      {
        "type": "collect_special",
        "targetSpecial": "rainbow",
        "count": 1
      }
    ],
    "blockers": [
      {
        "row": 2,
        "col": 3,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 2,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 2,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 3,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 6,
        "col": 4,
        "type": "ice",
        "hp": 2
      }
    ],
    "specialPieces": [
      {
        "row": 5,
        "col": 3,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 5,
        "col": 5,
        "type": "blue",
        "special": "col_clear"
      },
      {
        "row": 3,
        "col": 3,
        "type": "purple",
        "special": "bomb"
      },
      {
        "row": 4,
        "col": 6,
        "type": "purple",
        "special": "rainbow"
      }
    ]
  },
  {
    "id": 36,
    "title": "Level 36",
    "rawfilePath": "levels/level_036.json",
    "rows": 8,
    "cols": 8,
    "shape": "side_notches",
    "availableCells": 60,
    "moves": 29,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple"
    ],
    "goals": [
      {
        "type": "score",
        "count": 5660
      },
      {
        "type": "clear_ice",
        "count": 7
      }
    ],
    "blockers": [
      {
        "row": 1,
        "col": 0,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 1,
        "col": 7,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 6,
        "col": 0,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 6,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 6,
        "col": 7,
        "type": "hole",
        "hp": 1
      }
    ],
    "specialPieces": [
      {
        "row": 5,
        "col": 3,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 4,
        "col": 2,
        "type": "blue",
        "special": "col_clear"
      },
      {
        "row": 5,
        "col": 5,
        "type": "purple",
        "special": "bomb"
      },
      {
        "row": 3,
        "col": 3,
        "type": "purple",
        "special": "rainbow"
      }
    ]
  },
  {
    "id": 37,
    "title": "Level 37",
    "rawfilePath": "levels/level_037.json",
    "rows": 8,
    "cols": 8,
    "shape": "heart",
    "availableCells": 58,
    "moves": 29,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple"
    ],
    "goals": [
      {
        "type": "score",
        "count": 5745
      },
      {
        "type": "clear_ice",
        "count": 7
      }
    ],
    "blockers": [
      {
        "row": 1,
        "col": 2,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 1,
        "col": 5,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 6,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 2,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 5,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 5,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 6,
        "col": 4,
        "type": "ice",
        "hp": 2
      }
    ],
    "specialPieces": [
      {
        "row": 5,
        "col": 5,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 3,
        "col": 3,
        "type": "blue",
        "special": "col_clear"
      },
      {
        "row": 4,
        "col": 6,
        "type": "purple",
        "special": "bomb"
      },
      {
        "row": 5,
        "col": 6,
        "type": "purple",
        "special": "rainbow"
      }
    ]
  },
  {
    "id": 38,
    "title": "Level 38",
    "rawfilePath": "levels/level_038.json",
    "rows": 9,
    "cols": 9,
    "shape": "butterfly",
    "availableCells": 74,
    "moves": 29,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple"
    ],
    "goals": [
      {
        "type": "score",
        "count": 5830
      },
      {
        "type": "clear_ice",
        "count": 7
      }
    ],
    "blockers": [
      {
        "row": 1,
        "col": 1,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 1,
        "col": 7,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 6,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 5,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 5,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 6,
        "col": 2,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 6,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 7,
        "col": 3,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 7,
        "col": 7,
        "type": "hole",
        "hp": 1
      }
    ],
    "specialPieces": [
      {
        "row": 4,
        "col": 6,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 2,
        "col": 4,
        "type": "blue",
        "special": "col_clear"
      },
      {
        "row": 4,
        "col": 2,
        "type": "purple",
        "special": "bomb"
      },
      {
        "row": 5,
        "col": 5,
        "type": "purple",
        "special": "rainbow"
      }
    ]
  },
  {
    "id": 39,
    "title": "Level 39",
    "rawfilePath": "levels/level_039.json",
    "rows": 8,
    "cols": 8,
    "shape": "flower",
    "availableCells": 58,
    "moves": 29,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple"
    ],
    "goals": [
      {
        "type": "score",
        "count": 5915
      },
      {
        "type": "clear_ice",
        "count": 7
      }
    ],
    "blockers": [
      {
        "row": 1,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 5,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 1,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 2,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 2,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 5,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 6,
        "col": 4,
        "type": "hole",
        "hp": 1
      }
    ],
    "specialPieces": [
      {
        "row": 4,
        "col": 6,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 2,
        "col": 4,
        "type": "blue",
        "special": "col_clear"
      },
      {
        "row": 5,
        "col": 5,
        "type": "purple",
        "special": "bomb"
      },
      {
        "row": 3,
        "col": 3,
        "type": "purple",
        "special": "rainbow"
      }
    ]
  },
  {
    "id": 40,
    "title": "Level 40",
    "rawfilePath": "levels/level_040.json",
    "rows": 9,
    "cols": 9,
    "shape": "spiral",
    "availableCells": 74,
    "moves": 29,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple",
      "orange"
    ],
    "goals": [
      {
        "type": "score",
        "count": 6000
      },
      {
        "type": "break_chain",
        "count": 3
      },
      {
        "type": "collect_special",
        "targetSpecial": "bomb",
        "count": 2
      }
    ],
    "blockers": [
      {
        "row": 1,
        "col": 1,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 1,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 2,
        "col": 5,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 2,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 4,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 6,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 2,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 5,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 5,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 6,
        "col": 3,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 6,
        "col": 4,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 6,
        "col": 6,
        "type": "hole",
        "hp": 1
      }
    ],
    "specialPieces": [
      {
        "row": 3,
        "col": 3,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 7,
        "col": 4,
        "type": "blue",
        "special": "col_clear"
      },
      {
        "row": 6,
        "col": 5,
        "type": "purple",
        "special": "bomb"
      },
      {
        "row": 5,
        "col": 6,
        "type": "orange",
        "special": "rainbow"
      }
    ],
    "tutorial": [
      "Chains appear and must be broken by clearing the locked piece."
    ]
  },
  {
    "id": 41,
    "title": "Level 41",
    "rawfilePath": "levels/level_041.json",
    "rows": 7,
    "cols": 9,
    "shape": "hourglass",
    "availableCells": 58,
    "moves": 29,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple",
      "orange"
    ],
    "goals": [
      {
        "type": "score",
        "count": 6085
      },
      {
        "type": "break_chain",
        "count": 3
      }
    ],
    "blockers": [
      {
        "row": 1,
        "col": 1,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 2,
        "col": 6,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 8,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 3,
        "col": 1,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 3,
        "col": 3,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 6,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 0,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 5,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 7,
        "type": "hole",
        "hp": 1
      }
    ],
    "specialPieces": [
      {
        "row": 3,
        "col": 5,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 6,
        "col": 4,
        "type": "blue",
        "special": "col_clear"
      },
      {
        "row": 4,
        "col": 2,
        "type": "purple",
        "special": "bomb"
      },
      {
        "row": 3,
        "col": 6,
        "type": "orange",
        "special": "rainbow"
      }
    ]
  },
  {
    "id": 42,
    "title": "Level 42",
    "rawfilePath": "levels/level_042.json",
    "rows": 9,
    "cols": 7,
    "shape": "crescent",
    "availableCells": 58,
    "moves": 29,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple",
      "orange"
    ],
    "goals": [
      {
        "type": "score",
        "count": 6170
      },
      {
        "type": "break_chain",
        "count": 3
      }
    ],
    "blockers": [
      {
        "row": 1,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 2,
        "col": 5,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 5,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 4,
        "col": 2,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 4,
        "col": 3,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 6,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 3,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 5,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 6,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 6,
        "col": 4,
        "type": "hole",
        "hp": 1
      }
    ],
    "specialPieces": [
      {
        "row": 2,
        "col": 3,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 3,
        "col": 6,
        "type": "blue",
        "special": "col_clear"
      },
      {
        "row": 7,
        "col": 4,
        "type": "purple",
        "special": "bomb"
      },
      {
        "row": 5,
        "col": 2,
        "type": "orange",
        "special": "rainbow"
      }
    ]
  },
  {
    "id": 43,
    "title": "Level 43",
    "rawfilePath": "levels/level_043.json",
    "rows": 8,
    "cols": 9,
    "shape": "keyhole",
    "availableCells": 66,
    "moves": 29,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple",
      "orange"
    ],
    "goals": [
      {
        "type": "score",
        "count": 6255
      },
      {
        "type": "break_chain",
        "count": 3
      }
    ],
    "blockers": [
      {
        "row": 1,
        "col": 3,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 1,
        "col": 5,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 1,
        "col": 8,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 2,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 2,
        "col": 6,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 0,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 4,
        "col": 2,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 6,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 6,
        "col": 2,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 6,
        "col": 4,
        "type": "hole",
        "hp": 1
      }
    ],
    "specialPieces": [
      {
        "row": 5,
        "col": 3,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 3,
        "col": 5,
        "type": "blue",
        "special": "col_clear"
      },
      {
        "row": 2,
        "col": 3,
        "type": "purple",
        "special": "bomb"
      },
      {
        "row": 3,
        "col": 6,
        "type": "orange",
        "special": "rainbow"
      }
    ]
  },
  {
    "id": 44,
    "title": "Level 44",
    "rawfilePath": "levels/level_044.json",
    "rows": 9,
    "cols": 8,
    "shape": "twin_islands",
    "availableCells": 66,
    "moves": 29,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple",
      "orange"
    ],
    "goals": [
      {
        "type": "score",
        "count": 6340
      },
      {
        "type": "break_chain",
        "count": 3
      }
    ],
    "blockers": [
      {
        "row": 1,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 2,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 3,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 5,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 6,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 7,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 5,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 6,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 6,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 6,
        "col": 5,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 7,
        "col": 4,
        "type": "hole",
        "hp": 1
      }
    ],
    "specialPieces": [
      {
        "row": 3,
        "col": 2,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 2,
        "col": 3,
        "type": "blue",
        "special": "col_clear"
      },
      {
        "row": 3,
        "col": 6,
        "type": "purple",
        "special": "bomb"
      },
      {
        "row": 5,
        "col": 2,
        "type": "orange",
        "special": "rainbow"
      }
    ]
  },
  {
    "id": 45,
    "title": "Level 45",
    "rawfilePath": "levels/level_045.json",
    "rows": 8,
    "cols": 9,
    "shape": "crown",
    "availableCells": 66,
    "moves": 29,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple",
      "orange"
    ],
    "goals": [
      {
        "type": "score",
        "count": 6425
      },
      {
        "type": "break_chain",
        "count": 4
      },
      {
        "type": "collect_special",
        "targetSpecial": "row_clear",
        "count": 2
      }
    ],
    "blockers": [
      {
        "row": 1,
        "col": 1,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 1,
        "col": 7,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 6,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 0,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 3,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 5,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 2,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 2,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 5,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 7,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 6,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 7,
        "col": 4,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 7,
        "col": 7,
        "type": "chain",
        "hp": 1
      }
    ],
    "specialPieces": [
      {
        "row": 4,
        "col": 6,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 5,
        "col": 3,
        "type": "blue",
        "special": "col_clear"
      },
      {
        "row": 3,
        "col": 2,
        "type": "purple",
        "special": "bomb"
      },
      {
        "row": 2,
        "col": 3,
        "type": "orange",
        "special": "rainbow"
      }
    ]
  },
  {
    "id": 46,
    "title": "Level 46",
    "rawfilePath": "levels/level_046.json",
    "rows": 7,
    "cols": 7,
    "shape": "wave",
    "availableCells": 45,
    "moves": 29,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple",
      "orange"
    ],
    "goals": [
      {
        "type": "score",
        "count": 6510
      },
      {
        "type": "break_chain",
        "count": 4
      }
    ],
    "blockers": [
      {
        "row": 1,
        "col": 4,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 2,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 5,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 6,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 4,
        "col": 1,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 2,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 6,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 2,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 5,
        "col": 3,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 5,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 6,
        "col": 4,
        "type": "ice",
        "hp": 2
      }
    ],
    "specialPieces": [
      {
        "row": 3,
        "col": 2,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 2,
        "col": 3,
        "type": "blue",
        "special": "col_clear"
      },
      {
        "row": 6,
        "col": 5,
        "type": "purple",
        "special": "bomb"
      },
      {
        "row": 5,
        "col": 6,
        "type": "orange",
        "special": "rainbow"
      }
    ]
  },
  {
    "id": 47,
    "title": "Level 47",
    "rawfilePath": "levels/level_047.json",
    "rows": 8,
    "cols": 8,
    "shape": "clover",
    "availableCells": 58,
    "moves": 29,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple",
      "orange"
    ],
    "goals": [
      {
        "type": "score",
        "count": 6595
      },
      {
        "type": "break_chain",
        "count": 4
      }
    ],
    "blockers": [
      {
        "row": 0,
        "col": 1,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 1,
        "col": 7,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 2,
        "col": 0,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 2,
        "col": 3,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 2,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 5,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 2,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 5,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 6,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 5,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 6,
        "col": 1,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 6,
        "col": 4,
        "type": "ice",
        "hp": 2
      }
    ],
    "specialPieces": [
      {
        "row": 2,
        "col": 5,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 6,
        "col": 3,
        "type": "blue",
        "special": "col_clear"
      },
      {
        "row": 4,
        "col": 1,
        "type": "purple",
        "special": "bomb"
      },
      {
        "row": 3,
        "col": 6,
        "type": "orange",
        "special": "rainbow"
      }
    ]
  },
  {
    "id": 48,
    "title": "Level 48",
    "rawfilePath": "levels/level_048.json",
    "rows": 6,
    "cols": 8,
    "shape": "arrow",
    "availableCells": 44,
    "moves": 28,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple",
      "orange"
    ],
    "goals": [
      {
        "type": "score",
        "count": 6680
      },
      {
        "type": "break_chain",
        "count": 4
      }
    ],
    "blockers": [
      {
        "row": 1,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 2,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 3,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 2,
        "col": 4,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 2,
        "col": 5,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 6,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 4,
        "col": 2,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 6,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 3,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 5,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 5,
        "type": "ice",
        "hp": 2
      }
    ],
    "specialPieces": [
      {
        "row": 4,
        "col": 7,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 4,
        "col": 1,
        "type": "blue",
        "special": "col_clear"
      },
      {
        "row": 3,
        "col": 2,
        "type": "purple",
        "special": "bomb"
      },
      {
        "row": 5,
        "col": 2,
        "type": "orange",
        "special": "rainbow"
      }
    ]
  },
  {
    "id": 49,
    "title": "Level 49",
    "rawfilePath": "levels/level_049.json",
    "rows": 8,
    "cols": 9,
    "shape": "lantern",
    "availableCells": 66,
    "moves": 28,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple",
      "orange"
    ],
    "goals": [
      {
        "type": "score",
        "count": 6765
      },
      {
        "type": "break_chain",
        "count": 4
      }
    ],
    "blockers": [
      {
        "row": 1,
        "col": 0,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 1,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 6,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 7,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 2,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 6,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 7,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 5,
        "col": 1,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 5,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 6,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 7,
        "col": 0,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 7,
        "col": 3,
        "type": "chain",
        "hp": 1
      }
    ],
    "specialPieces": [
      {
        "row": 3,
        "col": 3,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 2,
        "col": 4,
        "type": "blue",
        "special": "col_clear"
      },
      {
        "row": 2,
        "col": 5,
        "type": "purple",
        "special": "bomb"
      },
      {
        "row": 6,
        "col": 3,
        "type": "orange",
        "special": "rainbow"
      }
    ]
  },
  {
    "id": 50,
    "title": "Level 50",
    "rawfilePath": "levels/level_050.json",
    "rows": 7,
    "cols": 8,
    "shape": "checker_window",
    "availableCells": 51,
    "moves": 28,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple",
      "orange"
    ],
    "goals": [
      {
        "type": "score",
        "count": 6850
      },
      {
        "type": "break_chain",
        "count": 5
      },
      {
        "type": "collect_special",
        "targetSpecial": "bomb",
        "count": 2
      }
    ],
    "blockers": [
      {
        "row": 1,
        "col": 2,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 1,
        "col": 4,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 2,
        "col": 1,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 3,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 2,
        "col": 4,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 3,
        "col": 2,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 3,
        "col": 3,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 6,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 4,
        "col": 2,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 6,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 5,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 6,
        "col": 4,
        "type": "ice",
        "hp": 2
      }
    ],
    "specialPieces": [
      {
        "row": 5,
        "col": 6,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 4,
        "col": 7,
        "type": "blue",
        "special": "col_clear"
      },
      {
        "row": 2,
        "col": 5,
        "type": "purple",
        "special": "bomb"
      },
      {
        "row": 6,
        "col": 3,
        "type": "orange",
        "special": "rainbow"
      }
    ]
  },
  {
    "id": 51,
    "title": "Level 51",
    "rawfilePath": "levels/level_051.json",
    "rows": 8,
    "cols": 7,
    "shape": "center_diamond",
    "availableCells": 52,
    "moves": 28,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple",
      "orange"
    ],
    "goals": [
      {
        "type": "score",
        "count": 6935
      },
      {
        "type": "break_chain",
        "count": 5
      }
    ],
    "blockers": [
      {
        "row": 0,
        "col": 0,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 0,
        "col": 3,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 2,
        "col": 2,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 2,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 3,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 2,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 6,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 3,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 5,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 6,
        "col": 3,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 6,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 6,
        "col": 6,
        "type": "chain",
        "hp": 1
      }
    ],
    "specialPieces": [
      {
        "row": 5,
        "col": 6,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 2,
        "col": 5,
        "type": "blue",
        "special": "col_clear"
      },
      {
        "row": 4,
        "col": 1,
        "type": "purple",
        "special": "bomb"
      },
      {
        "row": 3,
        "col": 2,
        "type": "orange",
        "special": "rainbow"
      }
    ]
  },
  {
    "id": 52,
    "title": "Level 52",
    "rawfilePath": "levels/level_052.json",
    "rows": 7,
    "cols": 9,
    "shape": "side_notches",
    "availableCells": 59,
    "moves": 28,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple",
      "orange"
    ],
    "goals": [
      {
        "type": "score",
        "count": 7020
      },
      {
        "type": "break_chain",
        "count": 5
      }
    ],
    "blockers": [
      {
        "row": 1,
        "col": 0,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 1,
        "col": 8,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 3,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 3,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 2,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 4,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 6,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 7,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 5,
        "col": 0,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 5,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 5,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 5,
        "col": 8,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 6,
        "col": 4,
        "type": "chain",
        "hp": 1
      }
    ],
    "specialPieces": [
      {
        "row": 6,
        "col": 5,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 5,
        "col": 6,
        "type": "blue",
        "special": "col_clear"
      },
      {
        "row": 2,
        "col": 5,
        "type": "purple",
        "special": "bomb"
      },
      {
        "row": 6,
        "col": 3,
        "type": "orange",
        "special": "rainbow"
      }
    ]
  },
  {
    "id": 53,
    "title": "Level 53",
    "rawfilePath": "levels/level_053.json",
    "rows": 8,
    "cols": 8,
    "shape": "heart",
    "availableCells": 58,
    "moves": 28,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple",
      "orange"
    ],
    "goals": [
      {
        "type": "score",
        "count": 7105
      },
      {
        "type": "break_chain",
        "count": 5
      }
    ],
    "blockers": [
      {
        "row": 0,
        "col": 6,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 1,
        "col": 2,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 1,
        "col": 5,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 1,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 3,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 6,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 2,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 5,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 6,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 0,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 5,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 5,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 6,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 7,
        "col": 2,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 7,
        "col": 5,
        "type": "chain",
        "hp": 1
      }
    ],
    "specialPieces": [
      {
        "row": 3,
        "col": 3,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 5,
        "col": 2,
        "type": "blue",
        "special": "col_clear"
      },
      {
        "row": 6,
        "col": 5,
        "type": "purple",
        "special": "bomb"
      },
      {
        "row": 5,
        "col": 6,
        "type": "orange",
        "special": "rainbow"
      }
    ]
  },
  {
    "id": 54,
    "title": "Level 54",
    "rawfilePath": "levels/level_054.json",
    "rows": 9,
    "cols": 9,
    "shape": "butterfly",
    "availableCells": 74,
    "moves": 28,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple",
      "orange"
    ],
    "goals": [
      {
        "type": "score",
        "count": 7190
      },
      {
        "type": "break_chain",
        "count": 5
      }
    ],
    "blockers": [
      {
        "row": 1,
        "col": 1,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 1,
        "col": 7,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 2,
        "col": 6,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 5,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 4,
        "col": 2,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 4,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 5,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 6,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 7,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 5,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 6,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 6,
        "col": 2,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 6,
        "col": 4,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 7,
        "col": 3,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 7,
        "col": 7,
        "type": "hole",
        "hp": 1
      }
    ],
    "specialPieces": [
      {
        "row": 3,
        "col": 6,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 1,
        "col": 4,
        "type": "blue",
        "special": "col_clear"
      },
      {
        "row": 7,
        "col": 4,
        "type": "purple",
        "special": "bomb"
      },
      {
        "row": 5,
        "col": 2,
        "type": "orange",
        "special": "rainbow"
      }
    ]
  },
  {
    "id": 55,
    "title": "Level 55",
    "rawfilePath": "levels/level_055.json",
    "rows": 8,
    "cols": 8,
    "shape": "flower",
    "availableCells": 58,
    "moves": 28,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple",
      "orange"
    ],
    "goals": [
      {
        "type": "score",
        "count": 7275
      },
      {
        "type": "break_chain",
        "count": 6
      },
      {
        "type": "collect_special",
        "targetSpecial": "row_clear",
        "count": 2
      }
    ],
    "blockers": [
      {
        "row": 0,
        "col": 2,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 0,
        "col": 5,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 1,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 1,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 2,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 2,
        "col": 5,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 0,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 4,
        "col": 1,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 6,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 2,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 5,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 6,
        "col": 2,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 6,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 6,
        "col": 5,
        "type": "chain",
        "hp": 1
      }
    ],
    "specialPieces": [
      {
        "row": 3,
        "col": 5,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 4,
        "col": 2,
        "type": "blue",
        "special": "col_clear"
      },
      {
        "row": 3,
        "col": 6,
        "type": "purple",
        "special": "bomb"
      },
      {
        "row": 7,
        "col": 4,
        "type": "orange",
        "special": "rainbow"
      }
    ]
  },
  {
    "id": 56,
    "title": "Level 56",
    "rawfilePath": "levels/level_056.json",
    "rows": 9,
    "cols": 9,
    "shape": "spiral",
    "availableCells": 74,
    "moves": 28,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple",
      "orange"
    ],
    "goals": [
      {
        "type": "score",
        "count": 7360
      },
      {
        "type": "break_chain",
        "count": 6
      }
    ],
    "blockers": [
      {
        "row": 1,
        "col": 1,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 1,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 4,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 2,
        "col": 5,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 5,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 4,
        "col": 2,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 6,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 7,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 5,
        "col": 2,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 5,
        "col": 3,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 5,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 6,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 6,
        "col": 3,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 6,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 6,
        "col": 5,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 6,
        "col": 6,
        "type": "hole",
        "hp": 1
      }
    ],
    "specialPieces": [
      {
        "row": 2,
        "col": 3,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 3,
        "col": 6,
        "type": "blue",
        "special": "col_clear"
      },
      {
        "row": 7,
        "col": 4,
        "type": "purple",
        "special": "bomb"
      },
      {
        "row": 4,
        "col": 1,
        "type": "orange",
        "special": "rainbow"
      }
    ]
  },
  {
    "id": 57,
    "title": "Level 57",
    "rawfilePath": "levels/level_057.json",
    "rows": 7,
    "cols": 7,
    "shape": "hourglass",
    "availableCells": 45,
    "moves": 28,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple",
      "orange"
    ],
    "goals": [
      {
        "type": "score",
        "count": 7445
      },
      {
        "type": "break_chain",
        "count": 6
      }
    ],
    "blockers": [
      {
        "row": 0,
        "col": 2,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 0,
        "col": 5,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 1,
        "col": 1,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 1,
        "col": 4,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 2,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 0,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 3,
        "col": 3,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 2,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 6,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 2,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 5,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 5,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 6,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 6,
        "col": 5,
        "type": "chain",
        "hp": 1
      }
    ],
    "specialPieces": [
      {
        "row": 3,
        "col": 5,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 2,
        "col": 3,
        "type": "blue",
        "special": "col_clear"
      },
      {
        "row": 3,
        "col": 6,
        "type": "purple",
        "special": "bomb"
      },
      {
        "row": 5,
        "col": 6,
        "type": "orange",
        "special": "rainbow"
      }
    ]
  },
  {
    "id": 58,
    "title": "Level 58",
    "rawfilePath": "levels/level_058.json",
    "rows": 8,
    "cols": 8,
    "shape": "crescent",
    "availableCells": 58,
    "moves": 28,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple",
      "orange"
    ],
    "goals": [
      {
        "type": "score",
        "count": 7530
      },
      {
        "type": "break_chain",
        "count": 6
      }
    ],
    "blockers": [
      {
        "row": 1,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 2,
        "col": 5,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 6,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 4,
        "col": 2,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 6,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 7,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 5,
        "col": 2,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 5,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 5,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 6,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 6,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 6,
        "col": 5,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 7,
        "col": 4,
        "type": "chain",
        "hp": 1
      }
    ],
    "specialPieces": [
      {
        "row": 3,
        "col": 2,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 2,
        "col": 3,
        "type": "blue",
        "special": "col_clear"
      },
      {
        "row": 6,
        "col": 3,
        "type": "purple",
        "special": "bomb"
      },
      {
        "row": 4,
        "col": 1,
        "type": "orange",
        "special": "rainbow"
      }
    ]
  },
  {
    "id": 59,
    "title": "Level 59",
    "rawfilePath": "levels/level_059.json",
    "rows": 6,
    "cols": 8,
    "shape": "keyhole",
    "availableCells": 44,
    "moves": 28,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple",
      "orange"
    ],
    "goals": [
      {
        "type": "score",
        "count": 7615
      },
      {
        "type": "break_chain",
        "count": 6
      }
    ],
    "blockers": [
      {
        "row": 0,
        "col": 1,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 1,
        "col": 2,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 1,
        "col": 3,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 1,
        "col": 4,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 1,
        "col": 7,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 2,
        "col": 0,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 2,
        "col": 3,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 2,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 6,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 4,
        "col": 2,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 6,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 5,
        "type": "ice",
        "hp": 2
      }
    ],
    "specialPieces": [
      {
        "row": 5,
        "col": 3,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 3,
        "col": 2,
        "type": "blue",
        "special": "col_clear"
      },
      {
        "row": 5,
        "col": 2,
        "type": "purple",
        "special": "bomb"
      },
      {
        "row": 5,
        "col": 6,
        "type": "orange",
        "special": "rainbow"
      }
    ]
  },
  {
    "id": 60,
    "title": "Level 60",
    "rawfilePath": "levels/level_060.json",
    "rows": 8,
    "cols": 6,
    "shape": "twin_islands",
    "availableCells": 44,
    "moves": 27,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple",
      "orange"
    ],
    "goals": [
      {
        "type": "score",
        "count": 7700
      },
      {
        "type": "clear_marshmallow",
        "count": 3
      },
      {
        "type": "collect_special",
        "targetSpecial": "rainbow",
        "count": 2
      }
    ],
    "blockers": [
      {
        "row": 1,
        "col": 1,
        "type": "marshmallow",
        "hp": 1
      },
      {
        "row": 1,
        "col": 3,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 1,
        "col": 4,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 2,
        "col": 3,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 2,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 0,
        "type": "marshmallow",
        "hp": 1
      },
      {
        "row": 3,
        "col": 2,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 3,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 2,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 3,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 2,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 5,
        "col": 3,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 5,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 6,
        "col": 3,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 6,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 6,
        "col": 5,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 7,
        "col": 1,
        "type": "marshmallow",
        "hp": 1
      },
      {
        "row": 7,
        "col": 4,
        "type": "chain",
        "hp": 1
      }
    ],
    "specialPieces": [
      {
        "row": 4,
        "col": 1,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 2,
        "col": 5,
        "type": "blue",
        "special": "col_clear"
      },
      {
        "row": 7,
        "col": 3,
        "type": "purple",
        "special": "bomb"
      },
      {
        "row": 5,
        "col": 1,
        "type": "orange",
        "special": "rainbow"
      }
    ],
    "tutorial": [
      "Marshmallows block cells until nearby clears remove them."
    ]
  },
  {
    "id": 61,
    "title": "Level 61",
    "rawfilePath": "levels/level_061.json",
    "rows": 8,
    "cols": 9,
    "shape": "crown",
    "availableCells": 66,
    "moves": 27,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple",
      "orange"
    ],
    "goals": [
      {
        "type": "score",
        "count": 7785
      },
      {
        "type": "clear_marshmallow",
        "count": 3
      }
    ],
    "blockers": [
      {
        "row": 1,
        "col": 0,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 1,
        "col": 1,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 1,
        "col": 3,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 1,
        "col": 4,
        "type": "marshmallow",
        "hp": 1
      },
      {
        "row": 1,
        "col": 6,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 1,
        "col": 7,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 6,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 2,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 3,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 5,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 6,
        "type": "marshmallow",
        "hp": 1
      },
      {
        "row": 4,
        "col": 2,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 1,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 5,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 7,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 5,
        "col": 8,
        "type": "marshmallow",
        "hp": 1
      },
      {
        "row": 6,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 7,
        "col": 3,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 7,
        "col": 6,
        "type": "chain",
        "hp": 1
      }
    ],
    "specialPieces": [
      {
        "row": 4,
        "col": 6,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 5,
        "col": 3,
        "type": "blue",
        "special": "col_clear"
      },
      {
        "row": 4,
        "col": 7,
        "type": "purple",
        "special": "bomb"
      },
      {
        "row": 2,
        "col": 5,
        "type": "orange",
        "special": "rainbow"
      }
    ]
  },
  {
    "id": 62,
    "title": "Level 62",
    "rawfilePath": "levels/level_062.json",
    "rows": 8,
    "cols": 7,
    "shape": "wave",
    "availableCells": 51,
    "moves": 27,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple",
      "orange"
    ],
    "goals": [
      {
        "type": "score",
        "count": 7870
      },
      {
        "type": "clear_marshmallow",
        "count": 3
      }
    ],
    "blockers": [
      {
        "row": 0,
        "col": 1,
        "type": "marshmallow",
        "hp": 1
      },
      {
        "row": 1,
        "col": 4,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 2,
        "col": 0,
        "type": "marshmallow",
        "hp": 1
      },
      {
        "row": 2,
        "col": 3,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 2,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 2,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 3,
        "col": 3,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 6,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 4,
        "col": 1,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 4,
        "col": 2,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 5,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 6,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 1,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 5,
        "col": 2,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 5,
        "col": 3,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 5,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 6,
        "col": 1,
        "type": "marshmallow",
        "hp": 1
      },
      {
        "row": 6,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 7,
        "col": 4,
        "type": "chain",
        "hp": 1
      }
    ],
    "specialPieces": [
      {
        "row": 2,
        "col": 5,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 6,
        "col": 3,
        "type": "blue",
        "special": "col_clear"
      },
      {
        "row": 6,
        "col": 5,
        "type": "purple",
        "special": "bomb"
      },
      {
        "row": 5,
        "col": 6,
        "type": "orange",
        "special": "rainbow"
      }
    ]
  },
  {
    "id": 63,
    "title": "Level 63",
    "rawfilePath": "levels/level_063.json",
    "rows": 8,
    "cols": 8,
    "shape": "clover",
    "availableCells": 58,
    "moves": 27,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple",
      "orange"
    ],
    "goals": [
      {
        "type": "score",
        "count": 7955
      },
      {
        "type": "clear_marshmallow",
        "count": 3
      }
    ],
    "blockers": [
      {
        "row": 0,
        "col": 0,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 0,
        "col": 3,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 0,
        "col": 4,
        "type": "marshmallow",
        "hp": 1
      },
      {
        "row": 0,
        "col": 7,
        "type": "marshmallow",
        "hp": 1
      },
      {
        "row": 2,
        "col": 2,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 2,
        "col": 3,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 2,
        "col": 5,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 2,
        "col": 6,
        "type": "marshmallow",
        "hp": 1
      },
      {
        "row": 3,
        "col": 2,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 5,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 1,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 4,
        "col": 2,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 5,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 6,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 5,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 6,
        "col": 3,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 6,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 6,
        "col": 6,
        "type": "chain",
        "hp": 1
      }
    ],
    "specialPieces": [
      {
        "row": 5,
        "col": 6,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 4,
        "col": 7,
        "type": "blue",
        "special": "col_clear"
      },
      {
        "row": 3,
        "col": 6,
        "type": "purple",
        "special": "bomb"
      },
      {
        "row": 1,
        "col": 4,
        "type": "orange",
        "special": "rainbow"
      }
    ]
  },
  {
    "id": 64,
    "title": "Level 64",
    "rawfilePath": "levels/level_064.json",
    "rows": 9,
    "cols": 7,
    "shape": "arrow",
    "availableCells": 58,
    "moves": 27,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple",
      "orange"
    ],
    "goals": [
      {
        "type": "score",
        "count": 8040
      },
      {
        "type": "clear_marshmallow",
        "count": 3
      }
    ],
    "blockers": [
      {
        "row": 1,
        "col": 0,
        "type": "marshmallow",
        "hp": 1
      },
      {
        "row": 1,
        "col": 3,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 3,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 2,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 5,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 3,
        "col": 2,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 3,
        "col": 3,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 6,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 4,
        "col": 1,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 4,
        "col": 2,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 6,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 5,
        "col": 1,
        "type": "marshmallow",
        "hp": 1
      },
      {
        "row": 5,
        "col": 3,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 5,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 6,
        "col": 3,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 6,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 7,
        "col": 0,
        "type": "marshmallow",
        "hp": 1
      },
      {
        "row": 7,
        "col": 3,
        "type": "hole",
        "hp": 1
      }
    ],
    "specialPieces": [
      {
        "row": 5,
        "col": 6,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 1,
        "col": 4,
        "type": "blue",
        "special": "col_clear"
      },
      {
        "row": 7,
        "col": 4,
        "type": "purple",
        "special": "bomb"
      },
      {
        "row": 5,
        "col": 2,
        "type": "orange",
        "special": "rainbow"
      }
    ]
  },
  {
    "id": 65,
    "title": "Level 65",
    "rawfilePath": "levels/level_065.json",
    "rows": 8,
    "cols": 9,
    "shape": "lantern",
    "availableCells": 66,
    "moves": 27,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple",
      "orange"
    ],
    "goals": [
      {
        "type": "score",
        "count": 8125
      },
      {
        "type": "clear_marshmallow",
        "count": 4
      },
      {
        "type": "collect_special",
        "targetSpecial": "col_clear",
        "count": 2
      }
    ],
    "blockers": [
      {
        "row": 1,
        "col": 2,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 1,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 1,
        "col": 5,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 1,
        "col": 6,
        "type": "marshmallow",
        "hp": 1
      },
      {
        "row": 1,
        "col": 8,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 2,
        "col": 6,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 1,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 3,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 7,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 8,
        "type": "marshmallow",
        "hp": 1
      },
      {
        "row": 4,
        "col": 1,
        "type": "marshmallow",
        "hp": 1
      },
      {
        "row": 4,
        "col": 2,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 6,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 7,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 5,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 6,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 6,
        "col": 0,
        "type": "marshmallow",
        "hp": 1
      },
      {
        "row": 6,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 7,
        "col": 2,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 7,
        "col": 5,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 7,
        "col": 8,
        "type": "chain",
        "hp": 1
      }
    ],
    "specialPieces": [
      {
        "row": 3,
        "col": 3,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 2,
        "col": 4,
        "type": "blue",
        "special": "col_clear"
      },
      {
        "row": 6,
        "col": 5,
        "type": "purple",
        "special": "bomb"
      },
      {
        "row": 2,
        "col": 5,
        "type": "orange",
        "special": "rainbow"
      }
    ]
  },
  {
    "id": 66,
    "title": "Level 66",
    "rawfilePath": "levels/level_066.json",
    "rows": 9,
    "cols": 8,
    "shape": "checker_window",
    "availableCells": 66,
    "moves": 27,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple",
      "orange"
    ],
    "goals": [
      {
        "type": "score",
        "count": 8210
      },
      {
        "type": "clear_marshmallow",
        "count": 4
      }
    ],
    "blockers": [
      {
        "row": 0,
        "col": 3,
        "type": "marshmallow",
        "hp": 1
      },
      {
        "row": 1,
        "col": 5,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 2,
        "type": "marshmallow",
        "hp": 1
      },
      {
        "row": 2,
        "col": 3,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 2,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 2,
        "col": 5,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 3,
        "col": 2,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 3,
        "col": 3,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 1,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 4,
        "col": 2,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 6,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 7,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 5,
        "col": 1,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 5,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 5,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 5,
        "col": 6,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 6,
        "col": 3,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 6,
        "col": 4,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 6,
        "col": 6,
        "type": "marshmallow",
        "hp": 1
      },
      {
        "row": 7,
        "col": 5,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 8,
        "col": 5,
        "type": "marshmallow",
        "hp": 1
      }
    ],
    "specialPieces": [
      {
        "row": 6,
        "col": 5,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 3,
        "col": 6,
        "type": "blue",
        "special": "col_clear"
      },
      {
        "row": 1,
        "col": 4,
        "type": "purple",
        "special": "bomb"
      },
      {
        "row": 7,
        "col": 4,
        "type": "orange",
        "special": "rainbow"
      }
    ]
  },
  {
    "id": 67,
    "title": "Level 67",
    "rawfilePath": "levels/level_067.json",
    "rows": 6,
    "cols": 6,
    "shape": "center_diamond",
    "availableCells": 33,
    "moves": 29,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple",
      "orange"
    ],
    "goals": [
      {
        "type": "score",
        "count": 8295
      },
      {
        "type": "clear_marshmallow",
        "count": 4
      }
    ],
    "blockers": [
      {
        "row": 0,
        "col": 0,
        "type": "marshmallow",
        "hp": 1
      },
      {
        "row": 0,
        "col": 2,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 0,
        "col": 3,
        "type": "marshmallow",
        "hp": 1
      },
      {
        "row": 0,
        "col": 5,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 1,
        "col": 2,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 1,
        "col": 5,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 2,
        "col": 1,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 2,
        "col": 2,
        "type": "marshmallow",
        "hp": 1
      },
      {
        "row": 2,
        "col": 3,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 2,
        "col": 5,
        "type": "marshmallow",
        "hp": 1
      },
      {
        "row": 3,
        "col": 1,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 3,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 0,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 4,
        "col": 2,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 3,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 0,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 5,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 5,
        "type": "ice",
        "hp": 2
      }
    ],
    "specialPieces": [
      {
        "row": 5,
        "col": 2,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 4,
        "col": 1,
        "type": "blue",
        "special": "col_clear"
      },
      {
        "row": 3,
        "col": 2,
        "type": "purple",
        "special": "bomb"
      },
      {
        "row": 1,
        "col": 4,
        "type": "orange",
        "special": "rainbow"
      }
    ]
  },
  {
    "id": 68,
    "title": "Level 68",
    "rawfilePath": "levels/level_068.json",
    "rows": 7,
    "cols": 7,
    "shape": "side_notches",
    "availableCells": 45,
    "moves": 27,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple",
      "orange"
    ],
    "goals": [
      {
        "type": "score",
        "count": 8380
      },
      {
        "type": "clear_marshmallow",
        "count": 4
      }
    ],
    "blockers": [
      {
        "row": 0,
        "col": 3,
        "type": "marshmallow",
        "hp": 1
      },
      {
        "row": 0,
        "col": 6,
        "type": "marshmallow",
        "hp": 1
      },
      {
        "row": 1,
        "col": 0,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 1,
        "col": 2,
        "type": "marshmallow",
        "hp": 1
      },
      {
        "row": 1,
        "col": 6,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 2,
        "col": 5,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 3,
        "col": 1,
        "type": "marshmallow",
        "hp": 1
      },
      {
        "row": 3,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 5,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 4,
        "col": 2,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 4,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 6,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 0,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 5,
        "col": 2,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 5,
        "col": 3,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 5,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 6,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 6,
        "col": 3,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 6,
        "col": 4,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 6,
        "col": 5,
        "type": "chain",
        "hp": 1
      }
    ],
    "specialPieces": [
      {
        "row": 3,
        "col": 6,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 1,
        "col": 4,
        "type": "blue",
        "special": "col_clear"
      },
      {
        "row": 4,
        "col": 1,
        "type": "purple",
        "special": "bomb"
      },
      {
        "row": 3,
        "col": 2,
        "type": "orange",
        "special": "rainbow"
      }
    ]
  },
  {
    "id": 69,
    "title": "Level 69",
    "rawfilePath": "levels/level_069.json",
    "rows": 8,
    "cols": 8,
    "shape": "heart",
    "availableCells": 58,
    "moves": 27,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple",
      "orange"
    ],
    "goals": [
      {
        "type": "score",
        "count": 8465
      },
      {
        "type": "clear_marshmallow",
        "count": 4
      }
    ],
    "blockers": [
      {
        "row": 1,
        "col": 1,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 1,
        "col": 2,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 1,
        "col": 4,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 1,
        "col": 5,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 7,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 3,
        "col": 0,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 3,
        "col": 1,
        "type": "marshmallow",
        "hp": 1
      },
      {
        "row": 3,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 6,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 7,
        "type": "marshmallow",
        "hp": 1
      },
      {
        "row": 4,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 5,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 6,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 2,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 5,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 5,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 6,
        "type": "marshmallow",
        "hp": 1
      },
      {
        "row": 6,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 7,
        "col": 1,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 7,
        "col": 4,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 7,
        "col": 5,
        "type": "marshmallow",
        "hp": 1
      },
      {
        "row": 7,
        "col": 7,
        "type": "chain",
        "hp": 1
      }
    ],
    "specialPieces": [
      {
        "row": 4,
        "col": 2,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 6,
        "col": 5,
        "type": "blue",
        "special": "col_clear"
      },
      {
        "row": 4,
        "col": 7,
        "type": "purple",
        "special": "bomb"
      },
      {
        "row": 2,
        "col": 5,
        "type": "orange",
        "special": "rainbow"
      }
    ]
  },
  {
    "id": 70,
    "title": "Level 70",
    "rawfilePath": "levels/level_070.json",
    "rows": 9,
    "cols": 9,
    "shape": "butterfly",
    "availableCells": 74,
    "moves": 27,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple",
      "orange"
    ],
    "goals": [
      {
        "type": "score",
        "count": 8550
      },
      {
        "type": "clear_marshmallow",
        "count": 5
      },
      {
        "type": "collect_special",
        "targetSpecial": "rainbow",
        "count": 2
      }
    ],
    "blockers": [
      {
        "row": 0,
        "col": 2,
        "type": "marshmallow",
        "hp": 1
      },
      {
        "row": 0,
        "col": 5,
        "type": "marshmallow",
        "hp": 1
      },
      {
        "row": 1,
        "col": 1,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 1,
        "col": 4,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 1,
        "col": 7,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 4,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 2,
        "col": 6,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 7,
        "type": "marshmallow",
        "hp": 1
      },
      {
        "row": 3,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 5,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 3,
        "col": 6,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 4,
        "col": 2,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 5,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 6,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 2,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 5,
        "col": 3,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 5,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 6,
        "col": 2,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 6,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 6,
        "col": 5,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 6,
        "col": 8,
        "type": "marshmallow",
        "hp": 1
      },
      {
        "row": 7,
        "col": 3,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 7,
        "col": 4,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 7,
        "col": 7,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 8,
        "col": 7,
        "type": "marshmallow",
        "hp": 1
      }
    ],
    "specialPieces": [
      {
        "row": 2,
        "col": 3,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 5,
        "col": 6,
        "type": "blue",
        "special": "col_clear"
      },
      {
        "row": 4,
        "col": 7,
        "type": "purple",
        "special": "bomb"
      },
      {
        "row": 2,
        "col": 5,
        "type": "orange",
        "special": "rainbow"
      }
    ]
  },
  {
    "id": 71,
    "title": "Level 71",
    "rawfilePath": "levels/level_071.json",
    "rows": 8,
    "cols": 8,
    "shape": "flower",
    "availableCells": 58,
    "moves": 27,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple",
      "orange"
    ],
    "goals": [
      {
        "type": "score",
        "count": 8635
      },
      {
        "type": "clear_marshmallow",
        "count": 5
      }
    ],
    "blockers": [
      {
        "row": 0,
        "col": 1,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 0,
        "col": 2,
        "type": "marshmallow",
        "hp": 1
      },
      {
        "row": 0,
        "col": 5,
        "type": "marshmallow",
        "hp": 1
      },
      {
        "row": 1,
        "col": 1,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 1,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 1,
        "col": 7,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 2,
        "col": 0,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 2,
        "col": 3,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 2,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 2,
        "col": 5,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 7,
        "type": "marshmallow",
        "hp": 1
      },
      {
        "row": 3,
        "col": 0,
        "type": "marshmallow",
        "hp": 1
      },
      {
        "row": 3,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 6,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 4,
        "col": 1,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 2,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 6,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 2,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 5,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 6,
        "col": 1,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 6,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 7,
        "col": 1,
        "type": "marshmallow",
        "hp": 1
      },
      {
        "row": 7,
        "col": 7,
        "type": "chain",
        "hp": 1
      }
    ],
    "specialPieces": [
      {
        "row": 5,
        "col": 3,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 3,
        "col": 5,
        "type": "blue",
        "special": "col_clear"
      },
      {
        "row": 7,
        "col": 4,
        "type": "purple",
        "special": "bomb"
      },
      {
        "row": 6,
        "col": 5,
        "type": "orange",
        "special": "rainbow"
      }
    ]
  },
  {
    "id": 72,
    "title": "Level 72",
    "rawfilePath": "levels/level_072.json",
    "rows": 9,
    "cols": 9,
    "shape": "spiral",
    "availableCells": 74,
    "moves": 26,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple",
      "orange"
    ],
    "goals": [
      {
        "type": "score",
        "count": 8720
      },
      {
        "type": "clear_marshmallow",
        "count": 5
      }
    ],
    "blockers": [
      {
        "row": 0,
        "col": 8,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 1,
        "col": 1,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 1,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 3,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 2,
        "col": 4,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 2,
        "col": 5,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 7,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 3,
        "col": 0,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 3,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 5,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 3,
        "col": 6,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 4,
        "col": 2,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 6,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 2,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 5,
        "col": 3,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 5,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 6,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 6,
        "col": 3,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 6,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 6,
        "col": 5,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 6,
        "col": 6,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 7,
        "col": 1,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 7,
        "col": 4,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 7,
        "col": 7,
        "type": "marshmallow",
        "hp": 2
      }
    ],
    "specialPieces": [
      {
        "row": 3,
        "col": 2,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 4,
        "col": 7,
        "type": "blue",
        "special": "col_clear"
      },
      {
        "row": 4,
        "col": 1,
        "type": "purple",
        "special": "bomb"
      },
      {
        "row": 7,
        "col": 3,
        "type": "orange",
        "special": "rainbow"
      }
    ]
  },
  {
    "id": 73,
    "title": "Level 73",
    "rawfilePath": "levels/level_073.json",
    "rows": 8,
    "cols": 7,
    "shape": "hourglass",
    "availableCells": 51,
    "moves": 26,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple",
      "orange"
    ],
    "goals": [
      {
        "type": "score",
        "count": 8805
      },
      {
        "type": "clear_marshmallow",
        "count": 5
      }
    ],
    "blockers": [
      {
        "row": 0,
        "col": 4,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 1,
        "col": 0,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 1,
        "col": 1,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 1,
        "col": 4,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 2,
        "col": 3,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 2,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 6,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 3,
        "col": 0,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 3,
        "col": 2,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 3,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 6,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 4,
        "col": 2,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 3,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 6,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 1,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 5,
        "col": 2,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 5,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 5,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 6,
        "col": 1,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 6,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 7,
        "col": 0,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 7,
        "col": 3,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 7,
        "col": 4,
        "type": "marshmallow",
        "hp": 2
      }
    ],
    "specialPieces": [
      {
        "row": 5,
        "col": 3,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 6,
        "col": 5,
        "type": "blue",
        "special": "col_clear"
      },
      {
        "row": 5,
        "col": 6,
        "type": "purple",
        "special": "bomb"
      },
      {
        "row": 2,
        "col": 5,
        "type": "orange",
        "special": "rainbow"
      }
    ]
  },
  {
    "id": 74,
    "title": "Level 74",
    "rawfilePath": "levels/level_074.json",
    "rows": 7,
    "cols": 9,
    "shape": "crescent",
    "availableCells": 58,
    "moves": 26,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple",
      "orange"
    ],
    "goals": [
      {
        "type": "score",
        "count": 8890
      },
      {
        "type": "clear_marshmallow",
        "count": 5
      }
    ],
    "blockers": [
      {
        "row": 0,
        "col": 1,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 1,
        "col": 4,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 1,
        "col": 5,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 1,
        "col": 7,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 2,
        "col": 0,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 2,
        "col": 3,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 2,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 2,
        "col": 6,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 2,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 3,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 6,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 4,
        "col": 2,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 6,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 2,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 5,
        "col": 3,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 5,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 5,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 5,
        "col": 6,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 5,
        "col": 8,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 6,
        "col": 1,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 6,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 6,
        "col": 5,
        "type": "chain",
        "hp": 1
      }
    ],
    "specialPieces": [
      {
        "row": 6,
        "col": 3,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 4,
        "col": 1,
        "type": "blue",
        "special": "col_clear"
      },
      {
        "row": 4,
        "col": 7,
        "type": "purple",
        "special": "bomb"
      },
      {
        "row": 2,
        "col": 5,
        "type": "orange",
        "special": "rainbow"
      }
    ]
  },
  {
    "id": 75,
    "title": "Level 75",
    "rawfilePath": "levels/level_075.json",
    "rows": 9,
    "cols": 7,
    "shape": "keyhole",
    "availableCells": 58,
    "moves": 26,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple",
      "orange"
    ],
    "goals": [
      {
        "type": "score",
        "count": 8975
      },
      {
        "type": "clear_marshmallow",
        "count": 6
      },
      {
        "type": "collect_special",
        "targetSpecial": "col_clear",
        "count": 2
      }
    ],
    "blockers": [
      {
        "row": 0,
        "col": 4,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 1,
        "col": 0,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 1,
        "col": 2,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 1,
        "col": 3,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 1,
        "col": 6,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 2,
        "col": 2,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 3,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 2,
        "col": 6,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 3,
        "col": 2,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 3,
        "col": 3,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 1,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 4,
        "col": 2,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 3,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 6,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 1,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 5,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 6,
        "col": 0,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 6,
        "col": 3,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 6,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 7,
        "col": 0,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 7,
        "col": 3,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 7,
        "col": 6,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 8,
        "col": 2,
        "type": "chain",
        "hp": 1
      }
    ],
    "specialPieces": [
      {
        "row": 2,
        "col": 4,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 5,
        "col": 3,
        "type": "blue",
        "special": "col_clear"
      },
      {
        "row": 2,
        "col": 5,
        "type": "purple",
        "special": "bomb"
      },
      {
        "row": 3,
        "col": 6,
        "type": "orange",
        "special": "rainbow"
      }
    ]
  },
  {
    "id": 76,
    "title": "Level 76",
    "rawfilePath": "levels/level_076.json",
    "rows": 8,
    "cols": 9,
    "shape": "twin_islands",
    "availableCells": 66,
    "moves": 26,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple",
      "orange"
    ],
    "goals": [
      {
        "type": "score",
        "count": 9060
      },
      {
        "type": "clear_marshmallow",
        "count": 6
      }
    ],
    "blockers": [
      {
        "row": 1,
        "col": 0,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 1,
        "col": 3,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 1,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 1,
        "col": 6,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 2,
        "col": 3,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 2,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 5,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 3,
        "col": 2,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 3,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 6,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 3,
        "col": 8,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 4,
        "col": 1,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 4,
        "col": 2,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 3,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 5,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 6,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 7,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 2,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 5,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 7,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 6,
        "col": 3,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 6,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 7,
        "col": 4,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 7,
        "col": 6,
        "type": "marshmallow",
        "hp": 2
      }
    ],
    "specialPieces": [
      {
        "row": 6,
        "col": 5,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 5,
        "col": 6,
        "type": "blue",
        "special": "col_clear"
      },
      {
        "row": 6,
        "col": 6,
        "type": "purple",
        "special": "bomb"
      },
      {
        "row": 2,
        "col": 2,
        "type": "orange",
        "special": "rainbow"
      }
    ]
  },
  {
    "id": 77,
    "title": "Level 77",
    "rawfilePath": "levels/level_077.json",
    "rows": 8,
    "cols": 9,
    "shape": "crown",
    "availableCells": 66,
    "moves": 26,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple",
      "orange"
    ],
    "goals": [
      {
        "type": "score",
        "count": 9145
      },
      {
        "type": "clear_marshmallow",
        "count": 6
      }
    ],
    "blockers": [
      {
        "row": 0,
        "col": 3,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 0,
        "col": 6,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 1,
        "col": 1,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 1,
        "col": 3,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 1,
        "col": 6,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 1,
        "col": 7,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 5,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 2,
        "col": 6,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 8,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 3,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 5,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 8,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 4,
        "col": 1,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 4,
        "col": 2,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 7,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 5,
        "col": 0,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 5,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 7,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 6,
        "col": 0,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 6,
        "col": 3,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 6,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 6,
        "col": 6,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 7,
        "col": 2,
        "type": "chain",
        "hp": 1
      }
    ],
    "specialPieces": [
      {
        "row": 3,
        "col": 3,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 4,
        "col": 6,
        "type": "blue",
        "special": "col_clear"
      },
      {
        "row": 5,
        "col": 6,
        "type": "purple",
        "special": "bomb"
      },
      {
        "row": 3,
        "col": 2,
        "type": "orange",
        "special": "rainbow"
      }
    ]
  },
  {
    "id": 78,
    "title": "Level 78",
    "rawfilePath": "levels/level_078.json",
    "rows": 6,
    "cols": 6,
    "shape": "wave",
    "availableCells": 33,
    "moves": 28,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple",
      "orange"
    ],
    "goals": [
      {
        "type": "score",
        "count": 9230
      },
      {
        "type": "clear_marshmallow",
        "count": 6
      }
    ],
    "blockers": [
      {
        "row": 0,
        "col": 0,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 0,
        "col": 1,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 0,
        "col": 3,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 0,
        "col": 4,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 1,
        "col": 0,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 1,
        "col": 3,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 1,
        "col": 4,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 2,
        "col": 2,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 2,
        "col": 3,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 5,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 3,
        "col": 1,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 3,
        "col": 2,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 3,
        "col": 3,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 3,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 1,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 2,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 1,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 5,
        "col": 2,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 5,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 5,
        "type": "ice",
        "hp": 2
      }
    ],
    "specialPieces": [
      {
        "row": 1,
        "col": 5,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 4,
        "col": 0,
        "type": "blue",
        "special": "col_clear"
      },
      {
        "row": 1,
        "col": 2,
        "type": "purple",
        "special": "bomb"
      },
      {
        "row": 5,
        "col": 0,
        "type": "orange",
        "special": "rainbow"
      }
    ]
  },
  {
    "id": 79,
    "title": "Level 79",
    "rawfilePath": "levels/level_079.json",
    "rows": 8,
    "cols": 8,
    "shape": "clover",
    "availableCells": 58,
    "moves": 26,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple",
      "orange"
    ],
    "goals": [
      {
        "type": "score",
        "count": 9315
      },
      {
        "type": "clear_marshmallow",
        "count": 6
      }
    ],
    "blockers": [
      {
        "row": 0,
        "col": 3,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 0,
        "col": 6,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 1,
        "col": 2,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 1,
        "col": 5,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 2,
        "col": 2,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 2,
        "col": 3,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 2,
        "col": 5,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 3,
        "col": 1,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 3,
        "col": 2,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 5,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 7,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 4,
        "col": 2,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 5,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 6,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 7,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 5,
        "col": 0,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 5,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 5,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 6,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 6,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 6,
        "col": 6,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 7,
        "col": 2,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 7,
        "col": 5,
        "type": "chain",
        "hp": 1
      }
    ],
    "specialPieces": [
      {
        "row": 6,
        "col": 5,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 6,
        "col": 3,
        "type": "blue",
        "special": "col_clear"
      },
      {
        "row": 4,
        "col": 1,
        "type": "purple",
        "special": "bomb"
      },
      {
        "row": 3,
        "col": 6,
        "type": "orange",
        "special": "rainbow"
      }
    ]
  },
  {
    "id": 80,
    "title": "Level 80",
    "rawfilePath": "levels/level_080.json",
    "rows": 8,
    "cols": 8,
    "shape": "arrow",
    "availableCells": 58,
    "moves": 26,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple",
      "orange"
    ],
    "goals": [
      {
        "type": "score",
        "count": 9400
      },
      {
        "type": "clear_ice",
        "count": 9
      },
      {
        "type": "break_chain",
        "count": 8
      },
      {
        "type": "collect_special",
        "targetSpecial": "bomb",
        "count": 2
      }
    ],
    "blockers": [
      {
        "row": 1,
        "col": 1,
        "type": "portal",
        "hp": 1,
        "portalId": "a_out"
      },
      {
        "row": 1,
        "col": 2,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 1,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 1,
        "col": 5,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 2,
        "col": 3,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 2,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 5,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 3,
        "col": 1,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 3,
        "col": 2,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 5,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 6,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 3,
        "col": 7,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 4,
        "col": 1,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 4,
        "col": 2,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 6,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 7,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 5,
        "col": 0,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 5,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 6,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 6,
        "col": 3,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 6,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 6,
        "col": 5,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 7,
        "col": 2,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 7,
        "col": 5,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 7,
        "col": 7,
        "type": "portal",
        "hp": 1,
        "portalId": "a_in",
        "targetPortalId": "a_out"
      }
    ],
    "specialPieces": [
      {
        "row": 7,
        "col": 4,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 5,
        "col": 2,
        "type": "blue",
        "special": "col_clear"
      },
      {
        "row": 6,
        "col": 2,
        "type": "purple",
        "special": "bomb"
      },
      {
        "row": 4,
        "col": 0,
        "type": "orange",
        "special": "rainbow"
      }
    ],
    "tutorial": [
      "Portals begin to bend falling paths."
    ]
  },
  {
    "id": 81,
    "title": "Level 81",
    "rawfilePath": "levels/level_081.json",
    "rows": 8,
    "cols": 9,
    "shape": "lantern",
    "availableCells": 66,
    "moves": 26,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple",
      "orange"
    ],
    "goals": [
      {
        "type": "score",
        "count": 9485
      },
      {
        "type": "clear_ice",
        "count": 9
      },
      {
        "type": "break_chain",
        "count": 8
      },
      {
        "type": "collect_special",
        "targetSpecial": "rainbow",
        "count": 2
      }
    ],
    "blockers": [
      {
        "row": 0,
        "col": 2,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 0,
        "col": 5,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 1,
        "col": 2,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 1,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 1,
        "col": 5,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 1,
        "col": 7,
        "type": "portal",
        "hp": 1,
        "portalId": "a_in",
        "targetPortalId": "a_out"
      },
      {
        "row": 1,
        "col": 8,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 2,
        "col": 1,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 2,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 2,
        "col": 6,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 7,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 3,
        "col": 1,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 3,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 7,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 0,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 4,
        "col": 2,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 6,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 7,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 5,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 6,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 5,
        "col": 8,
        "type": "portal",
        "hp": 1,
        "portalId": "a_out"
      },
      {
        "row": 6,
        "col": 2,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 6,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 6,
        "col": 5,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 6,
        "col": 8,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 7,
        "col": 5,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 7,
        "col": 8,
        "type": "marshmallow",
        "hp": 2
      }
    ],
    "specialPieces": [
      {
        "row": 5,
        "col": 5,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 3,
        "col": 3,
        "type": "blue",
        "special": "col_clear"
      },
      {
        "row": 7,
        "col": 4,
        "type": "purple",
        "special": "bomb"
      },
      {
        "row": 5,
        "col": 2,
        "type": "orange",
        "special": "rainbow"
      }
    ]
  },
  {
    "id": 82,
    "title": "Level 82",
    "rawfilePath": "levels/level_082.json",
    "rows": 8,
    "cols": 6,
    "shape": "checker_window",
    "availableCells": 44,
    "moves": 26,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple",
      "orange"
    ],
    "goals": [
      {
        "type": "score",
        "count": 9570
      },
      {
        "type": "clear_ice",
        "count": 9
      },
      {
        "type": "break_chain",
        "count": 8
      },
      {
        "type": "collect_special",
        "targetSpecial": "bomb",
        "count": 2
      }
    ],
    "blockers": [
      {
        "row": 0,
        "col": 1,
        "type": "portal",
        "hp": 1,
        "portalId": "a_out"
      },
      {
        "row": 0,
        "col": 2,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 0,
        "col": 5,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 1,
        "col": 2,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 1,
        "col": 5,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 2,
        "col": 1,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 2,
        "col": 3,
        "type": "portal",
        "hp": 1,
        "portalId": "a_in",
        "targetPortalId": "a_out"
      },
      {
        "row": 2,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 5,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 3,
        "col": 2,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 3,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 0,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 4,
        "col": 1,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 4,
        "col": 2,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 4,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 1,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 5,
        "col": 2,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 5,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 6,
        "col": 2,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 6,
        "col": 3,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 6,
        "col": 4,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 6,
        "col": 5,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 7,
        "col": 4,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 7,
        "col": 5,
        "type": "marshmallow",
        "hp": 2
      }
    ],
    "specialPieces": [
      {
        "row": 1,
        "col": 4,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 3,
        "col": 1,
        "type": "blue",
        "special": "col_clear"
      },
      {
        "row": 2,
        "col": 2,
        "type": "purple",
        "special": "bomb"
      },
      {
        "row": 1,
        "col": 3,
        "type": "orange",
        "special": "rainbow"
      }
    ]
  },
  {
    "id": 83,
    "title": "Level 83",
    "rawfilePath": "levels/level_083.json",
    "rows": 7,
    "cols": 8,
    "shape": "center_diamond",
    "availableCells": 52,
    "moves": 26,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple",
      "orange"
    ],
    "goals": [
      {
        "type": "score",
        "count": 9655
      },
      {
        "type": "clear_ice",
        "count": 9
      },
      {
        "type": "break_chain",
        "count": 8
      },
      {
        "type": "collect_special",
        "targetSpecial": "rainbow",
        "count": 2
      }
    ],
    "blockers": [
      {
        "row": 0,
        "col": 2,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 0,
        "col": 5,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 0,
        "col": 7,
        "type": "portal",
        "hp": 1,
        "portalId": "a_in",
        "targetPortalId": "a_out"
      },
      {
        "row": 1,
        "col": 1,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 1,
        "col": 4,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 1,
        "col": 5,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 2,
        "col": 1,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 2,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 6,
        "type": "portal",
        "hp": 1,
        "portalId": "a_out"
      },
      {
        "row": 2,
        "col": 7,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 3,
        "col": 0,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 3,
        "col": 3,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 5,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 6,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 3,
        "col": 7,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 4,
        "col": 0,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 4,
        "col": 2,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 6,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 2,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 5,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 6,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 6,
        "col": 2,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 6,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 6,
        "col": 5,
        "type": "marshmallow",
        "hp": 2
      }
    ],
    "specialPieces": [
      {
        "row": 4,
        "col": 7,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 2,
        "col": 5,
        "type": "blue",
        "special": "col_clear"
      },
      {
        "row": 6,
        "col": 3,
        "type": "purple",
        "special": "bomb"
      },
      {
        "row": 4,
        "col": 1,
        "type": "orange",
        "special": "rainbow"
      }
    ]
  },
  {
    "id": 84,
    "title": "Level 84",
    "rawfilePath": "levels/level_084.json",
    "rows": 8,
    "cols": 7,
    "shape": "side_notches",
    "availableCells": 52,
    "moves": 25,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple",
      "orange"
    ],
    "goals": [
      {
        "type": "score",
        "count": 9740
      },
      {
        "type": "clear_ice",
        "count": 9
      },
      {
        "type": "break_chain",
        "count": 8
      },
      {
        "type": "collect_special",
        "targetSpecial": "bomb",
        "count": 2
      }
    ],
    "blockers": [
      {
        "row": 0,
        "col": 2,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 0,
        "col": 5,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 1,
        "col": 0,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 1,
        "col": 1,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 1,
        "col": 4,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 1,
        "col": 6,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 1,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 2,
        "col": 4,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 3,
        "col": 0,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 3,
        "col": 2,
        "type": "portal",
        "hp": 1,
        "portalId": "a_in",
        "targetPortalId": "a_out"
      },
      {
        "row": 3,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 5,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 3,
        "col": 6,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 4,
        "col": 2,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 6,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 5,
        "col": 2,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 5,
        "col": 3,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 5,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 6,
        "col": 0,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 6,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 6,
        "col": 5,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 6,
        "col": 6,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 7,
        "col": 1,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 7,
        "col": 3,
        "type": "portal",
        "hp": 1,
        "portalId": "a_out"
      },
      {
        "row": 7,
        "col": 4,
        "type": "chain",
        "hp": 1
      }
    ],
    "specialPieces": [
      {
        "row": 2,
        "col": 3,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 5,
        "col": 6,
        "type": "blue",
        "special": "col_clear"
      },
      {
        "row": 2,
        "col": 5,
        "type": "purple",
        "special": "bomb"
      },
      {
        "row": 6,
        "col": 3,
        "type": "orange",
        "special": "rainbow"
      }
    ]
  },
  {
    "id": 85,
    "title": "Level 85",
    "rawfilePath": "levels/level_085.json",
    "rows": 8,
    "cols": 8,
    "shape": "heart",
    "availableCells": 58,
    "moves": 25,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple",
      "orange"
    ],
    "goals": [
      {
        "type": "score",
        "count": 9825
      },
      {
        "type": "clear_ice",
        "count": 9
      },
      {
        "type": "break_chain",
        "count": 8
      },
      {
        "type": "collect_special",
        "targetSpecial": "rainbow",
        "count": 2
      }
    ],
    "blockers": [
      {
        "row": 0,
        "col": 1,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 0,
        "col": 5,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 1,
        "col": 1,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 1,
        "col": 2,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 1,
        "col": 4,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 1,
        "col": 5,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 1,
        "col": 6,
        "type": "portal",
        "hp": 1,
        "portalId": "a_in",
        "targetPortalId": "a_out"
      },
      {
        "row": 1,
        "col": 7,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 2,
        "col": 0,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 2,
        "col": 3,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 2,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 7,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 3,
        "col": 0,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 3,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 6,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 2,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 5,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 6,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 2,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 5,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 5,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 7,
        "type": "portal",
        "hp": 1,
        "portalId": "a_out"
      },
      {
        "row": 6,
        "col": 1,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 6,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 6,
        "col": 7,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 7,
        "col": 1,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 7,
        "col": 4,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 7,
        "col": 7,
        "type": "chain",
        "hp": 1
      }
    ],
    "specialPieces": [
      {
        "row": 3,
        "col": 5,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 6,
        "col": 5,
        "type": "blue",
        "special": "col_clear"
      },
      {
        "row": 5,
        "col": 6,
        "type": "purple",
        "special": "bomb"
      },
      {
        "row": 4,
        "col": 7,
        "type": "orange",
        "special": "rainbow"
      }
    ]
  },
  {
    "id": 86,
    "title": "Level 86",
    "rawfilePath": "levels/level_086.json",
    "rows": 9,
    "cols": 9,
    "shape": "butterfly",
    "availableCells": 74,
    "moves": 25,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple",
      "orange"
    ],
    "goals": [
      {
        "type": "score",
        "count": 9910
      },
      {
        "type": "clear_ice",
        "count": 9
      },
      {
        "type": "break_chain",
        "count": 8
      },
      {
        "type": "collect_special",
        "targetSpecial": "bomb",
        "count": 2
      }
    ],
    "blockers": [
      {
        "row": 0,
        "col": 1,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 1,
        "col": 1,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 1,
        "col": 4,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 1,
        "col": 7,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 0,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 2,
        "col": 3,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 2,
        "col": 4,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 2,
        "col": 6,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 5,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 3,
        "col": 6,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 4,
        "col": 1,
        "type": "portal",
        "hp": 1,
        "portalId": "a_in",
        "targetPortalId": "a_out"
      },
      {
        "row": 4,
        "col": 2,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 5,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 6,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 2,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 5,
        "col": 3,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 5,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 6,
        "col": 1,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 6,
        "col": 2,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 6,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 6,
        "col": 7,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 7,
        "col": 3,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 7,
        "col": 4,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 7,
        "col": 7,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 8,
        "col": 0,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 8,
        "col": 2,
        "type": "portal",
        "hp": 1,
        "portalId": "a_out"
      },
      {
        "row": 8,
        "col": 3,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 8,
        "col": 6,
        "type": "marshmallow",
        "hp": 2
      }
    ],
    "specialPieces": [
      {
        "row": 3,
        "col": 2,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 6,
        "col": 5,
        "type": "blue",
        "special": "col_clear"
      },
      {
        "row": 5,
        "col": 6,
        "type": "purple",
        "special": "bomb"
      },
      {
        "row": 4,
        "col": 7,
        "type": "orange",
        "special": "rainbow"
      }
    ]
  },
  {
    "id": 87,
    "title": "Level 87",
    "rawfilePath": "levels/level_087.json",
    "rows": 8,
    "cols": 8,
    "shape": "flower",
    "availableCells": 58,
    "moves": 25,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple",
      "orange"
    ],
    "goals": [
      {
        "type": "score",
        "count": 9995
      },
      {
        "type": "clear_ice",
        "count": 9
      },
      {
        "type": "break_chain",
        "count": 8
      },
      {
        "type": "collect_special",
        "targetSpecial": "rainbow",
        "count": 2
      }
    ],
    "blockers": [
      {
        "row": 0,
        "col": 1,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 0,
        "col": 3,
        "type": "portal",
        "hp": 1,
        "portalId": "a_in",
        "targetPortalId": "a_out"
      },
      {
        "row": 0,
        "col": 4,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 0,
        "col": 7,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 1,
        "col": 0,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 1,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 1,
        "col": 7,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 2,
        "col": 0,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 2,
        "col": 3,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 2,
        "col": 5,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 6,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 3,
        "col": 2,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 3,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 1,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 2,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 6,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 1,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 5,
        "col": 2,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 5,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 6,
        "col": 1,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 6,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 6,
        "col": 6,
        "type": "portal",
        "hp": 1,
        "portalId": "a_out"
      },
      {
        "row": 6,
        "col": 7,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 7,
        "col": 0,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 7,
        "col": 3,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 7,
        "col": 6,
        "type": "chain",
        "hp": 1
      }
    ],
    "specialPieces": [
      {
        "row": 2,
        "col": 4,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 5,
        "col": 3,
        "type": "blue",
        "special": "col_clear"
      },
      {
        "row": 3,
        "col": 6,
        "type": "purple",
        "special": "bomb"
      },
      {
        "row": 7,
        "col": 4,
        "type": "orange",
        "special": "rainbow"
      }
    ]
  },
  {
    "id": 88,
    "title": "Level 88",
    "rawfilePath": "levels/level_088.json",
    "rows": 9,
    "cols": 9,
    "shape": "spiral",
    "availableCells": 74,
    "moves": 25,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple",
      "orange"
    ],
    "goals": [
      {
        "type": "score",
        "count": 10080
      },
      {
        "type": "clear_ice",
        "count": 9
      },
      {
        "type": "break_chain",
        "count": 8
      },
      {
        "type": "collect_special",
        "targetSpecial": "bomb",
        "count": 2
      }
    ],
    "blockers": [
      {
        "row": 0,
        "col": 7,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 1,
        "col": 0,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 1,
        "col": 1,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 1,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 3,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 2,
        "col": 4,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 2,
        "col": 5,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 8,
        "type": "portal",
        "hp": 1,
        "portalId": "a_out"
      },
      {
        "row": 3,
        "col": 2,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 3,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 6,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 4,
        "col": 2,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 6,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 4,
        "col": 8,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 5,
        "col": 0,
        "type": "portal",
        "hp": 1,
        "portalId": "a_in",
        "targetPortalId": "a_out"
      },
      {
        "row": 5,
        "col": 1,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 5,
        "col": 2,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 5,
        "col": 3,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 5,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 6,
        "col": 3,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 6,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 6,
        "col": 5,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 6,
        "col": 6,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 7,
        "col": 0,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 7,
        "col": 3,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 7,
        "col": 4,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 7,
        "col": 6,
        "type": "marshmallow",
        "hp": 2
      }
    ],
    "specialPieces": [
      {
        "row": 4,
        "col": 1,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 5,
        "col": 6,
        "type": "blue",
        "special": "col_clear"
      },
      {
        "row": 4,
        "col": 7,
        "type": "purple",
        "special": "bomb"
      },
      {
        "row": 2,
        "col": 2,
        "type": "orange",
        "special": "rainbow"
      }
    ]
  },
  {
    "id": 89,
    "title": "Level 89",
    "rawfilePath": "levels/level_089.json",
    "rows": 6,
    "cols": 6,
    "shape": "hourglass",
    "availableCells": 33,
    "moves": 27,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple",
      "orange"
    ],
    "goals": [
      {
        "type": "score",
        "count": 10165
      },
      {
        "type": "clear_ice",
        "count": 9
      },
      {
        "type": "break_chain",
        "count": 8
      },
      {
        "type": "collect_special",
        "targetSpecial": "rainbow",
        "count": 2
      }
    ],
    "blockers": [
      {
        "row": 0,
        "col": 0,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 0,
        "col": 1,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 0,
        "col": 2,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 0,
        "col": 4,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 0,
        "col": 5,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 1,
        "col": 0,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 1,
        "col": 1,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 1,
        "col": 2,
        "type": "portal",
        "hp": 1,
        "portalId": "a_in",
        "targetPortalId": "a_out"
      },
      {
        "row": 1,
        "col": 3,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 1,
        "col": 4,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 2,
        "col": 0,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 2,
        "col": 2,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 3,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 2,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 0,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 3,
        "col": 2,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 3,
        "col": 3,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 1,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 4,
        "col": 2,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 1,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 5,
        "col": 2,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 5,
        "col": 3,
        "type": "portal",
        "hp": 1,
        "portalId": "a_out"
      },
      {
        "row": 5,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 5,
        "type": "ice",
        "hp": 2
      }
    ],
    "specialPieces": [
      {
        "row": 2,
        "col": 5,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 4,
        "col": 0,
        "type": "blue",
        "special": "col_clear"
      },
      {
        "row": 1,
        "col": 5,
        "type": "purple",
        "special": "bomb"
      },
      {
        "row": 3,
        "col": 1,
        "type": "orange",
        "special": "rainbow"
      }
    ]
  },
  {
    "id": 90,
    "title": "Level 90",
    "rawfilePath": "levels/level_090.json",
    "rows": 7,
    "cols": 7,
    "shape": "crescent",
    "availableCells": 45,
    "moves": 25,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple",
      "orange"
    ],
    "goals": [
      {
        "type": "score",
        "count": 10250
      },
      {
        "type": "clear_ice",
        "count": 9
      },
      {
        "type": "break_chain",
        "count": 8
      },
      {
        "type": "collect_special",
        "targetSpecial": "bomb",
        "count": 2
      }
    ],
    "blockers": [
      {
        "row": 0,
        "col": 0,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 1,
        "col": 0,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 1,
        "col": 3,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 1,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 1,
        "col": 5,
        "type": "portal",
        "hp": 1,
        "portalId": "a_in",
        "targetPortalId": "a_out"
      },
      {
        "row": 1,
        "col": 6,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 2,
        "col": 3,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 2,
        "col": 4,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 2,
        "col": 5,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 6,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 3,
        "col": 2,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 3,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 6,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 4,
        "col": 1,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 4,
        "col": 2,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 3,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 6,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 1,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 5,
        "col": 2,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 5,
        "col": 3,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 5,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 5,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 6,
        "type": "portal",
        "hp": 1,
        "portalId": "a_out"
      },
      {
        "row": 6,
        "col": 0,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 6,
        "col": 3,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 6,
        "col": 4,
        "type": "ice",
        "hp": 2
      }
    ],
    "specialPieces": [
      {
        "row": 6,
        "col": 5,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 3,
        "col": 1,
        "type": "blue",
        "special": "col_clear"
      },
      {
        "row": 6,
        "col": 6,
        "type": "purple",
        "special": "bomb"
      },
      {
        "row": 2,
        "col": 2,
        "type": "orange",
        "special": "rainbow"
      }
    ]
  },
  {
    "id": 91,
    "title": "Level 91",
    "rawfilePath": "levels/level_091.json",
    "rows": 8,
    "cols": 8,
    "shape": "keyhole",
    "availableCells": 58,
    "moves": 25,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple",
      "orange"
    ],
    "goals": [
      {
        "type": "score",
        "count": 10335
      },
      {
        "type": "clear_ice",
        "count": 9
      },
      {
        "type": "break_chain",
        "count": 8
      },
      {
        "type": "collect_special",
        "targetSpecial": "rainbow",
        "count": 2
      }
    ],
    "blockers": [
      {
        "row": 0,
        "col": 0,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 0,
        "col": 3,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 0,
        "col": 6,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 1,
        "col": 0,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 1,
        "col": 3,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 1,
        "col": 6,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 2,
        "col": 1,
        "type": "portal",
        "hp": 1,
        "portalId": "a_in",
        "targetPortalId": "a_out"
      },
      {
        "row": 2,
        "col": 2,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 5,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 2,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 3,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 1,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 4,
        "col": 2,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 6,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 7,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 5,
        "col": 0,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 5,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 7,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 6,
        "col": 0,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 6,
        "col": 2,
        "type": "portal",
        "hp": 1,
        "portalId": "a_out"
      },
      {
        "row": 6,
        "col": 3,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 6,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 6,
        "col": 6,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 7,
        "col": 2,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 7,
        "col": 6,
        "type": "marshmallow",
        "hp": 2
      }
    ],
    "specialPieces": [
      {
        "row": 2,
        "col": 4,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 5,
        "col": 6,
        "type": "blue",
        "special": "col_clear"
      },
      {
        "row": 2,
        "col": 3,
        "type": "purple",
        "special": "bomb"
      },
      {
        "row": 3,
        "col": 6,
        "type": "orange",
        "special": "rainbow"
      }
    ]
  },
  {
    "id": 92,
    "title": "Level 92",
    "rawfilePath": "levels/level_092.json",
    "rows": 6,
    "cols": 8,
    "shape": "twin_islands",
    "availableCells": 44,
    "moves": 25,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple",
      "orange"
    ],
    "goals": [
      {
        "type": "score",
        "count": 10420
      },
      {
        "type": "clear_ice",
        "count": 9
      },
      {
        "type": "break_chain",
        "count": 8
      },
      {
        "type": "collect_special",
        "targetSpecial": "bomb",
        "count": 2
      }
    ],
    "blockers": [
      {
        "row": 0,
        "col": 0,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 0,
        "col": 2,
        "type": "portal",
        "hp": 1,
        "portalId": "b_in",
        "targetPortalId": "b_out"
      },
      {
        "row": 0,
        "col": 3,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 0,
        "col": 5,
        "type": "portal",
        "hp": 1,
        "portalId": "a_out"
      },
      {
        "row": 0,
        "col": 6,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 1,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 1,
        "col": 6,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 2,
        "col": 1,
        "type": "portal",
        "hp": 1,
        "portalId": "b_out"
      },
      {
        "row": 2,
        "col": 2,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 2,
        "col": 3,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 2,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 2,
        "col": 5,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 2,
        "col": 7,
        "type": "portal",
        "hp": 1,
        "portalId": "a_in",
        "targetPortalId": "a_out"
      },
      {
        "row": 3,
        "col": 2,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 3,
        "col": 3,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 5,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 6,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 4,
        "col": 1,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 4,
        "col": 2,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 6,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 7,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 5,
        "col": 0,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 5,
        "col": 2,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 5,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 6,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 5,
        "col": 7,
        "type": "marshmallow",
        "hp": 2
      }
    ],
    "specialPieces": [
      {
        "row": 4,
        "col": 0,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 3,
        "col": 7,
        "type": "blue",
        "special": "col_clear"
      },
      {
        "row": 1,
        "col": 5,
        "type": "purple",
        "special": "bomb"
      },
      {
        "row": 3,
        "col": 1,
        "type": "orange",
        "special": "rainbow"
      }
    ]
  },
  {
    "id": 93,
    "title": "Level 93",
    "rawfilePath": "levels/level_093.json",
    "rows": 8,
    "cols": 9,
    "shape": "crown",
    "availableCells": 66,
    "moves": 25,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple",
      "orange"
    ],
    "goals": [
      {
        "type": "score",
        "count": 10505
      },
      {
        "type": "clear_ice",
        "count": 9
      },
      {
        "type": "break_chain",
        "count": 8
      },
      {
        "type": "collect_special",
        "targetSpecial": "rainbow",
        "count": 2
      }
    ],
    "blockers": [
      {
        "row": 0,
        "col": 3,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 0,
        "col": 6,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 0,
        "col": 8,
        "type": "portal",
        "hp": 1,
        "portalId": "b_out"
      },
      {
        "row": 1,
        "col": 1,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 1,
        "col": 2,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 1,
        "col": 5,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 1,
        "col": 7,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 1,
        "col": 8,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 2,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 5,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 2,
        "col": 6,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 8,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 3,
        "col": 0,
        "type": "portal",
        "hp": 1,
        "portalId": "a_out"
      },
      {
        "row": 3,
        "col": 1,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 3,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 5,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 7,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 4,
        "col": 2,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 7,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 5,
        "col": 0,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 5,
        "col": 2,
        "type": "portal",
        "hp": 1,
        "portalId": "a_in",
        "targetPortalId": "a_out"
      },
      {
        "row": 5,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 6,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 5,
        "col": 7,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 6,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 7,
        "col": 1,
        "type": "portal",
        "hp": 1,
        "portalId": "b_in",
        "targetPortalId": "b_out"
      },
      {
        "row": 7,
        "col": 2,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 7,
        "col": 5,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 7,
        "col": 8,
        "type": "chain",
        "hp": 1
      }
    ],
    "specialPieces": [
      {
        "row": 3,
        "col": 3,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 4,
        "col": 6,
        "type": "blue",
        "special": "col_clear"
      },
      {
        "row": 6,
        "col": 5,
        "type": "purple",
        "special": "bomb"
      },
      {
        "row": 6,
        "col": 3,
        "type": "orange",
        "special": "rainbow"
      }
    ]
  },
  {
    "id": 94,
    "title": "Level 94",
    "rawfilePath": "levels/level_094.json",
    "rows": 7,
    "cols": 8,
    "shape": "wave",
    "availableCells": 51,
    "moves": 25,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple",
      "orange"
    ],
    "goals": [
      {
        "type": "score",
        "count": 10590
      },
      {
        "type": "clear_ice",
        "count": 9
      },
      {
        "type": "break_chain",
        "count": 8
      },
      {
        "type": "collect_special",
        "targetSpecial": "bomb",
        "count": 2
      }
    ],
    "blockers": [
      {
        "row": 0,
        "col": 3,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 0,
        "col": 6,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 1,
        "col": 1,
        "type": "portal",
        "hp": 1,
        "portalId": "a_out"
      },
      {
        "row": 1,
        "col": 2,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 1,
        "col": 4,
        "type": "portal",
        "hp": 1,
        "portalId": "a_in",
        "targetPortalId": "a_out"
      },
      {
        "row": 1,
        "col": 5,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 2,
        "col": 3,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 2,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 5,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 3,
        "col": 0,
        "type": "portal",
        "hp": 1,
        "portalId": "b_out"
      },
      {
        "row": 3,
        "col": 1,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 3,
        "col": 2,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 3,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 5,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 6,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 3,
        "col": 7,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 4,
        "col": 1,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 2,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 6,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 7,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 5,
        "col": 0,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 5,
        "col": 2,
        "type": "portal",
        "hp": 1,
        "portalId": "b_in",
        "targetPortalId": "b_out"
      },
      {
        "row": 5,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 6,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 6,
        "col": 3,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 6,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 6,
        "col": 5,
        "type": "chain",
        "hp": 1
      }
    ],
    "specialPieces": [
      {
        "row": 6,
        "col": 2,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 4,
        "col": 0,
        "type": "blue",
        "special": "col_clear"
      },
      {
        "row": 6,
        "col": 6,
        "type": "purple",
        "special": "bomb"
      },
      {
        "row": 2,
        "col": 2,
        "type": "orange",
        "special": "rainbow"
      }
    ]
  },
  {
    "id": 95,
    "title": "Level 95",
    "rawfilePath": "levels/level_095.json",
    "rows": 8,
    "cols": 8,
    "shape": "clover",
    "availableCells": 58,
    "moves": 25,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple",
      "orange"
    ],
    "goals": [
      {
        "type": "score",
        "count": 10675
      },
      {
        "type": "clear_ice",
        "count": 9
      },
      {
        "type": "break_chain",
        "count": 8
      },
      {
        "type": "collect_special",
        "targetSpecial": "rainbow",
        "count": 3
      }
    ],
    "blockers": [
      {
        "row": 0,
        "col": 2,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 0,
        "col": 5,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 1,
        "col": 2,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 1,
        "col": 4,
        "type": "portal",
        "hp": 1,
        "portalId": "b_out"
      },
      {
        "row": 1,
        "col": 5,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 1,
        "col": 7,
        "type": "portal",
        "hp": 1,
        "portalId": "a_out"
      },
      {
        "row": 2,
        "col": 1,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 2,
        "col": 3,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 2,
        "col": 7,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 3,
        "col": 1,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 3,
        "col": 2,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 5,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 6,
        "type": "portal",
        "hp": 1,
        "portalId": "b_in",
        "targetPortalId": "b_out"
      },
      {
        "row": 3,
        "col": 7,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 4,
        "col": 0,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 4,
        "col": 2,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 5,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 6,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 0,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 5,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 5,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 6,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 6,
        "col": 1,
        "type": "portal",
        "hp": 1,
        "portalId": "a_in",
        "targetPortalId": "a_out"
      },
      {
        "row": 6,
        "col": 2,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 6,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 6,
        "col": 5,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 7,
        "col": 2,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 7,
        "col": 5,
        "type": "marshmallow",
        "hp": 2
      }
    ],
    "specialPieces": [
      {
        "row": 7,
        "col": 4,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 5,
        "col": 2,
        "type": "blue",
        "special": "col_clear"
      },
      {
        "row": 4,
        "col": 7,
        "type": "purple",
        "special": "bomb"
      },
      {
        "row": 2,
        "col": 5,
        "type": "orange",
        "special": "rainbow"
      }
    ]
  },
  {
    "id": 96,
    "title": "Level 96",
    "rawfilePath": "levels/level_096.json",
    "rows": 7,
    "cols": 9,
    "shape": "arrow",
    "availableCells": 58,
    "moves": 24,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple",
      "orange"
    ],
    "goals": [
      {
        "type": "score",
        "count": 10760
      },
      {
        "type": "clear_ice",
        "count": 9
      },
      {
        "type": "break_chain",
        "count": 8
      },
      {
        "type": "collect_special",
        "targetSpecial": "bomb",
        "count": 3
      }
    ],
    "blockers": [
      {
        "row": 0,
        "col": 1,
        "type": "portal",
        "hp": 1,
        "portalId": "a_out"
      },
      {
        "row": 0,
        "col": 2,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 0,
        "col": 5,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 1,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 0,
        "type": "portal",
        "hp": 1,
        "portalId": "b_in",
        "targetPortalId": "b_out"
      },
      {
        "row": 2,
        "col": 1,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 2,
        "col": 2,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 3,
        "type": "portal",
        "hp": 1,
        "portalId": "a_in",
        "targetPortalId": "a_out"
      },
      {
        "row": 2,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 5,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 2,
        "col": 7,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 3,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 0,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 4,
        "col": 1,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 4,
        "col": 2,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 4,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 6,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 7,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 5,
        "col": 2,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 5,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 5,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 6,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 6,
        "col": 1,
        "type": "portal",
        "hp": 1,
        "portalId": "b_out"
      },
      {
        "row": 6,
        "col": 2,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 6,
        "col": 3,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 6,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 6,
        "col": 5,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 6,
        "col": 8,
        "type": "marshmallow",
        "hp": 2
      }
    ],
    "specialPieces": [
      {
        "row": 3,
        "col": 6,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 3,
        "col": 2,
        "type": "blue",
        "special": "col_clear"
      },
      {
        "row": 3,
        "col": 7,
        "type": "purple",
        "special": "bomb"
      },
      {
        "row": 1,
        "col": 5,
        "type": "orange",
        "special": "rainbow"
      }
    ]
  },
  {
    "id": 97,
    "title": "Level 97",
    "rawfilePath": "levels/level_097.json",
    "rows": 8,
    "cols": 9,
    "shape": "lantern",
    "availableCells": 66,
    "moves": 24,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple",
      "orange"
    ],
    "goals": [
      {
        "type": "score",
        "count": 10845
      },
      {
        "type": "clear_ice",
        "count": 9
      },
      {
        "type": "break_chain",
        "count": 8
      },
      {
        "type": "collect_special",
        "targetSpecial": "rainbow",
        "count": 3
      }
    ],
    "blockers": [
      {
        "row": 0,
        "col": 2,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 0,
        "col": 4,
        "type": "portal",
        "hp": 1,
        "portalId": "b_out"
      },
      {
        "row": 0,
        "col": 5,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 0,
        "col": 7,
        "type": "portal",
        "hp": 1,
        "portalId": "a_out"
      },
      {
        "row": 0,
        "col": 8,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 1,
        "col": 1,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 1,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 1,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 2,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 2,
        "col": 6,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 7,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 3,
        "col": 0,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 3,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 6,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 3,
        "col": 7,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 6,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 7,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 8,
        "type": "portal",
        "hp": 1,
        "portalId": "b_in",
        "targetPortalId": "b_out"
      },
      {
        "row": 5,
        "col": 2,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 5,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 8,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 6,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 6,
        "col": 5,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 6,
        "col": 8,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 7,
        "col": 0,
        "type": "portal",
        "hp": 1,
        "portalId": "a_in",
        "targetPortalId": "a_out"
      },
      {
        "row": 7,
        "col": 1,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 7,
        "col": 4,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 7,
        "col": 7,
        "type": "chain",
        "hp": 1
      }
    ],
    "specialPieces": [
      {
        "row": 4,
        "col": 2,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 3,
        "col": 5,
        "type": "blue",
        "special": "col_clear"
      },
      {
        "row": 5,
        "col": 6,
        "type": "purple",
        "special": "bomb"
      },
      {
        "row": 2,
        "col": 5,
        "type": "orange",
        "special": "rainbow"
      }
    ]
  },
  {
    "id": 98,
    "title": "Level 98",
    "rawfilePath": "levels/level_098.json",
    "rows": 8,
    "cols": 9,
    "shape": "checker_window",
    "availableCells": 66,
    "moves": 24,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple",
      "orange"
    ],
    "goals": [
      {
        "type": "score",
        "count": 10930
      },
      {
        "type": "clear_ice",
        "count": 9
      },
      {
        "type": "break_chain",
        "count": 8
      },
      {
        "type": "collect_special",
        "targetSpecial": "bomb",
        "count": 3
      }
    ],
    "blockers": [
      {
        "row": 0,
        "col": 8,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 1,
        "col": 0,
        "type": "portal",
        "hp": 1,
        "portalId": "a_out"
      },
      {
        "row": 1,
        "col": 1,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 1,
        "col": 4,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 1,
        "col": 5,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 2,
        "col": 7,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 3,
        "col": 0,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 3,
        "col": 2,
        "type": "portal",
        "hp": 1,
        "portalId": "a_in",
        "targetPortalId": "a_out"
      },
      {
        "row": 3,
        "col": 3,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 5,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 3,
        "col": 6,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 4,
        "col": 2,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 6,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 1,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 5,
        "col": 2,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 5,
        "col": 3,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 5,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 6,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 5,
        "col": 7,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 5,
        "col": 8,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 6,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 6,
        "col": 5,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 6,
        "col": 6,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 7,
        "col": 0,
        "type": "portal",
        "hp": 1,
        "portalId": "b_out"
      },
      {
        "row": 7,
        "col": 1,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 7,
        "col": 3,
        "type": "portal",
        "hp": 1,
        "portalId": "b_in",
        "targetPortalId": "b_out"
      },
      {
        "row": 7,
        "col": 4,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 7,
        "col": 7,
        "type": "marshmallow",
        "hp": 2
      }
    ],
    "specialPieces": [
      {
        "row": 2,
        "col": 3,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 4,
        "col": 7,
        "type": "blue",
        "special": "col_clear"
      },
      {
        "row": 2,
        "col": 5,
        "type": "purple",
        "special": "bomb"
      },
      {
        "row": 6,
        "col": 3,
        "type": "orange",
        "special": "rainbow"
      }
    ]
  },
  {
    "id": 99,
    "title": "Level 99",
    "rawfilePath": "levels/level_099.json",
    "rows": 9,
    "cols": 8,
    "shape": "center_diamond",
    "availableCells": 68,
    "moves": 24,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple",
      "orange"
    ],
    "goals": [
      {
        "type": "score",
        "count": 11015
      },
      {
        "type": "clear_ice",
        "count": 9
      },
      {
        "type": "break_chain",
        "count": 8
      },
      {
        "type": "collect_special",
        "targetSpecial": "rainbow",
        "count": 3
      }
    ],
    "blockers": [
      {
        "row": 0,
        "col": 1,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 0,
        "col": 4,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 1,
        "col": 1,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 1,
        "col": 3,
        "type": "portal",
        "hp": 1,
        "portalId": "b_in",
        "targetPortalId": "b_out"
      },
      {
        "row": 1,
        "col": 4,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 1,
        "col": 6,
        "type": "portal",
        "hp": 1,
        "portalId": "a_in",
        "targetPortalId": "a_out"
      },
      {
        "row": 1,
        "col": 7,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 2,
        "col": 0,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 2,
        "col": 3,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 2,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 6,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 4,
        "col": 2,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 3,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 5,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 6,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 5,
        "col": 5,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 7,
        "type": "portal",
        "hp": 1,
        "portalId": "a_out"
      },
      {
        "row": 6,
        "col": 1,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 6,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 6,
        "col": 7,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 7,
        "col": 4,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 7,
        "col": 6,
        "type": "portal",
        "hp": 1,
        "portalId": "b_out"
      },
      {
        "row": 7,
        "col": 7,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 8,
        "col": 0,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 8,
        "col": 3,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 8,
        "col": 6,
        "type": "chain",
        "hp": 1
      }
    ],
    "specialPieces": [
      {
        "row": 5,
        "col": 2,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 6,
        "col": 5,
        "type": "blue",
        "special": "col_clear"
      },
      {
        "row": 5,
        "col": 6,
        "type": "purple",
        "special": "bomb"
      },
      {
        "row": 4,
        "col": 7,
        "type": "orange",
        "special": "rainbow"
      }
    ]
  },
  {
    "id": 100,
    "title": "Level 100: Candy Sky Island Final",
    "rawfilePath": "levels/level_100.json",
    "rows": 6,
    "cols": 6,
    "shape": "side_notches",
    "availableCells": 33,
    "moves": 26,
    "pieceTypes": [
      "red",
      "blue",
      "yellow",
      "green",
      "purple",
      "orange"
    ],
    "goals": [
      {
        "type": "score",
        "count": 11100
      },
      {
        "type": "clear_ice",
        "count": 9
      },
      {
        "type": "break_chain",
        "count": 8
      },
      {
        "type": "collect_special",
        "targetSpecial": "bomb",
        "count": 3
      }
    ],
    "blockers": [
      {
        "row": 0,
        "col": 1,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 0,
        "col": 2,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 0,
        "col": 4,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 0,
        "col": 5,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 1,
        "col": 0,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 1,
        "col": 1,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 1,
        "col": 2,
        "type": "portal",
        "hp": 1,
        "portalId": "b_out"
      },
      {
        "row": 1,
        "col": 3,
        "type": "portal",
        "hp": 1,
        "portalId": "a_in",
        "targetPortalId": "a_out"
      },
      {
        "row": 1,
        "col": 4,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 1,
        "col": 5,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 0,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 2,
        "col": 1,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 2,
        "col": 3,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 2,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 2,
        "col": 5,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 3,
        "col": 0,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 3,
        "col": 2,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 3,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 3,
        "col": 5,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 4,
        "col": 0,
        "type": "portal",
        "hp": 1,
        "portalId": "b_in",
        "targetPortalId": "b_out"
      },
      {
        "row": 4,
        "col": 1,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 4,
        "col": 2,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 4,
        "col": 5,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 5,
        "col": 1,
        "type": "portal",
        "hp": 1,
        "portalId": "a_out"
      },
      {
        "row": 5,
        "col": 2,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 5,
        "col": 3,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 5,
        "type": "ice",
        "hp": 2
      }
    ],
    "specialPieces": [
      {
        "row": 3,
        "col": 1,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 2,
        "col": 2,
        "type": "blue",
        "special": "col_clear"
      },
      {
        "row": 5,
        "col": 0,
        "type": "purple",
        "special": "bomb"
      },
      {
        "row": 0,
        "col": 3,
        "type": "orange",
        "special": "rainbow"
      }
    ]
  }
];
