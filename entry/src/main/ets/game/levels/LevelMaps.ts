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
        "count": 590
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
        "count": 700
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
        "count": 800
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
        "count": 910
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
        "count": 1010
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
        "count": 1110
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
        "count": 1220
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
        "count": 1320
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
    "availableCells": 59,
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
        "count": 1420
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
        "row": 6,
        "col": 5,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 7,
        "col": 1,
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
    "availableCells": 68,
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
        "count": 1680
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
        "col": 2,
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
        "col": 4,
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
        "col": 3,
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
    "id": 11,
    "title": "Level 11",
    "rawfilePath": "levels/level_011.json",
    "rows": 9,
    "cols": 8,
    "shape": "keyhole",
    "availableCells": 68,
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
        "target": "blue",
        "count": 8
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
        "row": 3,
        "col": 4,
        "type": "hole",
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
        "count": 1890
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
        "row": 3,
        "col": 2,
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
    "availableCells": 68,
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
        "count": 1990
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
        "row": 2,
        "col": 6,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 6,
        "col": 1,
        "type": "hole",
        "hp": 1
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
    "availableCells": 60,
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
        "count": 2090
      },
      {
        "type": "collect_piece",
        "target": "purple",
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
        "row": 3,
        "col": 4,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 6,
        "col": 1,
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
    "availableCells": 60,
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
        "count": 2200
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
        "row": 1,
        "col": 1,
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
        "row": 4,
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
        "count": 2300
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
        "row": 3,
        "col": 3,
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
    "availableCells": 68,
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
        "count": 2400
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
        "col": 2,
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
        "col": 1,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 6,
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
    "availableCells": 52,
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
        "count": 2510
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
        "col": 1,
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
        "row": 4,
        "col": 2,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 6,
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
        "count": 2610
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
        "row": 3,
        "col": 5,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 5,
        "col": 2,
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
        "count": 3660
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
        "count": 3730
      },
      {
        "type": "clear_ice",
        "count": 3
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
        "row": 3,
        "col": 1,
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
        "row": 6,
        "col": 2,
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
        "row": 5,
        "col": 4,
        "type": "yellow",
        "special": "row_clear"
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
    "id": 22,
    "title": "Level 22",
    "rawfilePath": "levels/level_022.json",
    "rows": 9,
    "cols": 9,
    "shape": "butterfly",
    "availableCells": 76,
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
        "count": 3800
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
        "row": 7,
        "col": 1,
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
        "count": 3880
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
        "col": 6,
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
        "col": 1,
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
        "col": 3,
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
    "availableCells": 76,
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
        "count": 3950
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
        "row": 7,
        "col": 1,
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
        "col": 4,
        "type": "yellow",
        "special": "row_clear"
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
    "id": 25,
    "title": "Level 25",
    "rawfilePath": "levels/level_025.json",
    "rows": 8,
    "cols": 8,
    "shape": "hourglass",
    "availableCells": 59,
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
        "count": 4020
      },
      {
        "type": "clear_ice",
        "count": 4
      },
      {
        "type": "combo_goal",
        "comboLength": 2,
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
        "type": "purple",
        "special": "bomb"
      }
    ],
    "tutorial": [
      "Combo goals appear: one strong move can trigger several clears."
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
        "count": 4090
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
        "count": 4170
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
        "row": 3,
        "col": 2,
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
        "row": 5,
        "col": 5,
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
        "count": 4240
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
        "col": 6,
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
    "availableCells": 67,
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
        "count": 4310
      },
      {
        "type": "clear_ice",
        "count": 4
      },
      {
        "type": "combo_goal",
        "comboLength": 2,
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
        "col": 6,
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
        "row": 5,
        "col": 4,
        "type": "ice",
        "hp": 1
      },
      {
        "row": 6,
        "col": 1,
        "type": "hole",
        "hp": 1
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
        "row": 4,
        "col": 5,
        "type": "yellow",
        "special": "row_clear"
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
        "count": 4380
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
        "type": "ice",
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
    "availableCells": 59,
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
        "count": 4450
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
        "type": "hole",
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
        "col": 5,
        "type": "ice",
        "hp": 1
      },
      {
        "row": 6,
        "col": 1,
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
        "col": 5,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 6,
        "col": 4,
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
    "availableCells": 67,
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
        "count": 4530
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
        "row": 5,
        "col": 4,
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
        "row": 6,
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
        "row": 4,
        "col": 2,
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
    "availableCells": 67,
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
        "count": 4600
      },
      {
        "type": "clear_ice",
        "count": 5
      },
      {
        "type": "combo_goal",
        "comboLength": 2,
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
        "col": 7,
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
      },
      {
        "row": 6,
        "col": 5,
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
        "col": 2,
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
        "count": 4670
      },
      {
        "type": "clear_ice",
        "count": 5
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
        "row": 3,
        "col": 5,
        "type": "yellow",
        "special": "row_clear"
      },
      {
        "row": 4,
        "col": 2,
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
        "count": 4740
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
        "row": 1,
        "col": 1,
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
        "row": 4,
        "col": 2,
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
        "count": 4820
      },
      {
        "type": "clear_ice",
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
    "availableCells": 59,
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
        "count": 4890
      },
      {
        "type": "clear_ice",
        "count": 6
      },
      {
        "type": "combo_goal",
        "comboLength": 2,
        "count": 1
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
        "row": 3,
        "col": 1,
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
        "col": 6,
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
    "availableCells": 76,
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
        "count": 4960
      },
      {
        "type": "clear_ice",
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
        "row": 7,
        "col": 1,
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
    "availableCells": 59,
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
        "count": 5030
      },
      {
        "type": "clear_ice",
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
        "col": 1,
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
    "availableCells": 76,
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
        "count": 4830
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
        "col": 7,
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
        "type": "ice",
        "hp": 1
      },
      {
        "row": 4,
        "col": 3,
        "type": "chain",
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
        "type": "chain",
        "hp": 1
      },
      {
        "row": 5,
        "col": 4,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 7,
        "col": 1,
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
        "col": 5,
        "type": "purple",
        "special": "bomb"
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
        "count": 4900
      },
      {
        "type": "break_chain",
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
        "col": 0,
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
        "type": "chain",
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
        "row": 4,
        "col": 3,
        "type": "yellow",
        "special": "row_clear"
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
        "count": 4970
      },
      {
        "type": "break_chain",
        "count": 3
      },
      {
        "type": "combo_goal",
        "comboLength": 2,
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
        "col": 5,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 4,
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
        "type": "chain",
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
        "col": 3,
        "type": "ice",
        "hp": 1
      },
      {
        "row": 5,
        "col": 4,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 6,
        "col": 5,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 7,
        "col": 1,
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
    "availableCells": 67,
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
        "count": 5040
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
        "row": 1,
        "col": 6,
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
        "col": 0,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 4,
        "col": 4,
        "type": "ice",
        "hp": 1
      },
      {
        "row": 6,
        "col": 1,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 6,
        "col": 2,
        "type": "chain",
        "hp": 1
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
        "row": 4,
        "col": 5,
        "type": "yellow",
        "special": "row_clear"
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
    "availableCells": 67,
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
        "count": 5100
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
        "col": 6,
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
        "type": "chain",
        "hp": 1
      },
      {
        "row": 4,
        "col": 3,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 4,
        "col": 4,
        "type": "chain",
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
        "col": 1,
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
        "row": 4,
        "col": 2,
        "type": "yellow",
        "special": "row_clear"
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
    "availableCells": 67,
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
        "count": 5170
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
        "row": 2,
        "col": 6,
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
        "row": 5,
        "col": 2,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 5,
        "col": 5,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 6,
        "col": 1,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 6,
        "col": 7,
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
        "type": "chain",
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
        "count": 5240
      },
      {
        "type": "break_chain",
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
        "col": 3,
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
        "col": 4,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 4,
        "col": 3,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 4,
        "col": 4,
        "type": "chain",
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
        "col": 1,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 5,
        "col": 4,
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
    "availableCells": 59,
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
        "count": 5310
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
        "col": 1,
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
        "row": 2,
        "col": 0,
        "type": "chain",
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
        "hp": 1
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
        "row": 5,
        "col": 4,
        "type": "yellow",
        "special": "row_clear"
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
        "count": 5380
      },
      {
        "type": "break_chain",
        "count": 4
      },
      {
        "type": "combo_goal",
        "comboLength": 2,
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
        "col": 4,
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
        "hp": 1
      },
      {
        "row": 4,
        "col": 3,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 4,
        "col": 4,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 4,
        "col": 5,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 4,
        "col": 6,
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
        "row": 5,
        "col": 5,
        "type": "ice",
        "hp": 1
      }
    ],
    "specialPieces": [
      {
        "row": 3,
        "col": 5,
        "type": "yellow",
        "special": "row_clear"
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
    "availableCells": 67,
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
        "count": 5450
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
        "col": 2,
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
        "col": 1,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 6,
        "col": 5,
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
        "row": 5,
        "col": 4,
        "type": "yellow",
        "special": "row_clear"
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
        "count": 5510
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
        "col": 1,
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
        "col": 3,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 4,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 4,
        "col": 2,
        "type": "ice",
        "hp": 1
      },
      {
        "row": 4,
        "col": 3,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 4,
        "col": 4,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 4,
        "col": 5,
        "type": "chain",
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
        "col": 1,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 5,
        "col": 4,
        "type": "chain",
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
        "col": 4,
        "type": "ice",
        "hp": 1
      }
    ],
    "specialPieces": [
      {
        "row": 5,
        "col": 3,
        "type": "purple",
        "special": "bomb"
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
        "count": 5580
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
        "row": 1,
        "col": 1,
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
        "col": 2,
        "type": "chain",
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
        "row": 6,
        "col": 1,
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
        "col": 6,
        "type": "chain",
        "hp": 1
      }
    ],
    "specialPieces": [
      {
        "row": 3,
        "col": 4,
        "type": "yellow",
        "special": "row_clear"
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
        "count": 5650
      },
      {
        "type": "break_chain",
        "count": 5
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
        "col": 8,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 4,
        "type": "chain",
        "hp": 1
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
        "type": "chain",
        "hp": 1
      },
      {
        "row": 4,
        "col": 4,
        "type": "chain",
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
        "col": 0,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 5,
        "col": 4,
        "type": "chain",
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
        "row": 4,
        "col": 6,
        "type": "yellow",
        "special": "row_clear"
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
        "count": 5720
      },
      {
        "type": "break_chain",
        "count": 5
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
        "col": 5,
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
        "col": 0,
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
        "row": 6,
        "col": 2,
        "type": "hole",
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
        "col": 4,
        "type": "yellow",
        "special": "row_clear"
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
    "availableCells": 76,
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
        "count": 5790
      },
      {
        "type": "break_chain",
        "count": 5
      },
      {
        "type": "combo_goal",
        "comboLength": 2,
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
        "row": 3,
        "col": 4,
        "type": "chain",
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
        "type": "chain",
        "hp": 1
      },
      {
        "row": 4,
        "col": 4,
        "type": "chain",
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
        "col": 3,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 5,
        "col": 4,
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
        "col": 1,
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
        "col": 5,
        "type": "yellow",
        "special": "row_clear"
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
        "count": 5860
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
        "col": 1,
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
        "row": 2,
        "col": 1,
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
        "row": 6,
        "col": 1,
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
    "availableCells": 76,
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
        "count": 5920
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
        "row": 3,
        "col": 4,
        "type": "chain",
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
        "type": "chain",
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
        "type": "chain",
        "hp": 1
      },
      {
        "row": 4,
        "col": 6,
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
        "col": 1,
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
        "col": 5,
        "type": "yellow",
        "special": "row_clear"
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
        "count": 5990
      },
      {
        "type": "break_chain",
        "count": 6
      }
    ],
    "blockers": [
      {
        "row": 0,
        "col": 5,
        "type": "chain",
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
        "col": 2,
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
        "col": 4,
        "type": "ice",
        "hp": 2
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
        "col": 5,
        "type": "yellow",
        "special": "row_clear"
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
        "count": 6060
      },
      {
        "type": "break_chain",
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
        "col": 3,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 3,
        "col": 4,
        "type": "chain",
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
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 3,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 4,
        "col": 4,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 4,
        "col": 5,
        "type": "chain",
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
        "type": "chain",
        "hp": 1
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
      }
    ],
    "specialPieces": [
      {
        "row": 4,
        "col": 2,
        "type": "yellow",
        "special": "row_clear"
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
        "count": 6130
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
        "col": 6,
        "type": "hole",
        "hp": 1
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
        "row": 4,
        "col": 5,
        "type": "yellow",
        "special": "row_clear"
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
        "count": 6200
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
        "type": "hole",
        "hp": 1
      },
      {
        "row": 1,
        "col": 4,
        "type": "marshmallow",
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
        "type": "marshmallow",
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
        "type": "chain",
        "hp": 1
      },
      {
        "row": 4,
        "col": 4,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 5,
        "col": 5,
        "type": "marshmallow",
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
        "row": 5,
        "col": 4,
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
    "availableCells": 68,
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
        "count": 6270
      },
      {
        "type": "clear_marshmallow",
        "count": 3
      },
      {
        "type": "combo_goal",
        "comboLength": 2,
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
        "type": "chain",
        "hp": 1
      },
      {
        "row": 1,
        "col": 7,
        "type": "marshmallow",
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
        "col": 6,
        "type": "marshmallow",
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
        "col": 1,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 6,
        "col": 7,
        "type": "hole",
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
        "col": 4,
        "type": "blue",
        "special": "col_clear"
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
    "availableCells": 52,
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
        "count": 6340
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
        "col": 1,
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
        "col": 3,
        "type": "marshmallow",
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
        "type": "chain",
        "hp": 1
      },
      {
        "row": 4,
        "col": 4,
        "type": "chain",
        "hp": 1
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
        "type": "marshmallow",
        "hp": 1
      }
    ],
    "specialPieces": [
      {
        "row": 5,
        "col": 4,
        "type": "blue",
        "special": "col_clear"
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
    "availableCells": 60,
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
        "count": 6400
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
        "row": 1,
        "col": 1,
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
        "row": 2,
        "col": 3,
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
        "row": 4,
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
        "col": 4,
        "type": "blue",
        "special": "col_clear"
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
    "availableCells": 59,
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
        "count": 6470
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
        "col": 1,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 2,
        "type": "marshmallow",
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
        "col": 4,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 4,
        "col": 5,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 6,
        "col": 5,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 7,
        "col": 1,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 7,
        "col": 3,
        "type": "marshmallow",
        "hp": 1
      }
    ],
    "specialPieces": [
      {
        "row": 3,
        "col": 4,
        "type": "blue",
        "special": "col_clear"
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
    "availableCells": 68,
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
        "count": 6540
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
        "col": 0,
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
        "col": 6,
        "type": "marshmallow",
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
        "col": 2,
        "type": "chain",
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
        "type": "hole",
        "hp": 1
      },
      {
        "row": 5,
        "col": 7,
        "type": "marshmallow",
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
        "col": 5,
        "type": "hole",
        "hp": 1
      }
    ],
    "specialPieces": [
      {
        "row": 4,
        "col": 4,
        "type": "blue",
        "special": "col_clear"
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
    "availableCells": 68,
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
        "count": 6610
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
        "col": 1,
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
        "row": 2,
        "col": 5,
        "type": "marshmallow",
        "hp": 1
      },
      {
        "row": 4,
        "col": 3,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 4,
        "col": 4,
        "type": "marshmallow",
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
        "col": 1,
        "type": "hole",
        "hp": 1
      }
    ],
    "specialPieces": [
      {
        "row": 3,
        "col": 4,
        "type": "blue",
        "special": "col_clear"
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
        "count": 6680
      },
      {
        "type": "clear_marshmallow",
        "count": 4
      },
      {
        "type": "combo_goal",
        "comboLength": 2,
        "count": 1
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
        "row": 2,
        "col": 5,
        "type": "marshmallow",
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
        "col": 4,
        "type": "marshmallow",
        "hp": 1
      },
      {
        "row": 5,
        "col": 0,
        "type": "marshmallow",
        "hp": 1
      }
    ],
    "specialPieces": [
      {
        "row": 4,
        "col": 3,
        "type": "blue",
        "special": "col_clear"
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
        "count": 6750
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
        "row": 3,
        "col": 1,
        "type": "marshmallow",
        "hp": 1
      },
      {
        "row": 3,
        "col": 4,
        "type": "marshmallow",
        "hp": 1
      },
      {
        "row": 4,
        "col": 3,
        "type": "chain",
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
        "type": "marshmallow",
        "hp": 1
      },
      {
        "row": 5,
        "col": 4,
        "type": "chain",
        "hp": 1
      }
    ],
    "specialPieces": [
      {
        "row": 5,
        "col": 5,
        "type": "blue",
        "special": "col_clear"
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
    "availableCells": 60,
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
        "count": 6810
      },
      {
        "type": "clear_marshmallow",
        "count": 4
      }
    ],
    "blockers": [
      {
        "row": 1,
        "col": 2,
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
        "row": 3,
        "col": 1,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 4,
        "type": "marshmallow",
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
        "col": 4,
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
        "col": 6,
        "type": "marshmallow",
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
        "row": 4,
        "col": 3,
        "type": "blue",
        "special": "col_clear"
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
    "availableCells": 77,
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
        "count": 6490
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
        "col": 7,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 2,
        "col": 4,
        "type": "marshmallow",
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
        "col": 4,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 4,
        "col": 4,
        "type": "chain",
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
        "type": "marshmallow",
        "hp": 1
      },
      {
        "row": 5,
        "col": 4,
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
        "col": 1,
        "type": "hole",
        "hp": 1
      }
    ],
    "specialPieces": [
      {
        "row": 4,
        "col": 3,
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
    "availableCells": 60,
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
        "count": 6550
      },
      {
        "type": "clear_marshmallow",
        "count": 5
      }
    ],
    "blockers": [
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
        "col": 6,
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
        "row": 4,
        "col": 0,
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
        "row": 5,
        "col": 2,
        "type": "marshmallow",
        "hp": 1
      },
      {
        "row": 6,
        "col": 2,
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
        "hp": 1
      }
    ],
    "specialPieces": [
      {
        "row": 4,
        "col": 4,
        "type": "blue",
        "special": "col_clear"
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
    "availableCells": 77,
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
        "count": 6620
      },
      {
        "type": "clear_marshmallow",
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
        "col": 4,
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
        "row": 3,
        "col": 3,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 3,
        "col": 4,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 3,
        "col": 6,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 4,
        "col": 3,
        "type": "chain",
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
        "col": 4,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 5,
        "col": 5,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 7,
        "col": 1,
        "type": "hole",
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
        "row": 4,
        "col": 5,
        "type": "blue",
        "special": "col_clear"
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
        "count": 6680
      },
      {
        "type": "clear_marshmallow",
        "count": 5
      },
      {
        "type": "combo_goal",
        "comboLength": 3,
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
        "row": 3,
        "col": 0,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 3,
        "col": 3,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 3,
        "col": 6,
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
        "col": 5,
        "type": "marshmallow",
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
        "col": 5,
        "type": "hole",
        "hp": 1
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
        "type": "marshmallow",
        "hp": 2
      }
    ],
    "specialPieces": [
      {
        "row": 4,
        "col": 4,
        "type": "blue",
        "special": "col_clear"
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
    "availableCells": 59,
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
        "count": 6750
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
        "col": 3,
        "type": "marshmallow",
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
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 4,
        "col": 3,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 4,
        "col": 4,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 4,
        "col": 5,
        "type": "marshmallow",
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
        "col": 4,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 6,
        "col": 4,
        "type": "marshmallow",
        "hp": 2
      }
    ],
    "specialPieces": [
      {
        "row": 3,
        "col": 5,
        "type": "blue",
        "special": "col_clear"
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
    "availableCells": 59,
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
        "count": 6810
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
        "row": 3,
        "col": 2,
        "type": "marshmallow",
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
        "col": 6,
        "type": "chain",
        "hp": 1
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
        "type": "marshmallow",
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
        "col": 5,
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
        "col": 1,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 7,
        "col": 3,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 8,
        "col": 0,
        "type": "chain",
        "hp": 1
      }
    ],
    "specialPieces": [
      {
        "row": 4,
        "col": 4,
        "type": "blue",
        "special": "col_clear"
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
    "availableCells": 68,
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
        "count": 6880
      },
      {
        "type": "clear_marshmallow",
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
        "row": 2,
        "col": 7,
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
        "type": "chain",
        "hp": 1
      },
      {
        "row": 3,
        "col": 5,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 3,
        "col": 8,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 4,
        "col": 3,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 4,
        "col": 4,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 4,
        "col": 5,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 5,
        "col": 7,
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
        "row": 7,
        "col": 6,
        "type": "marshmallow",
        "hp": 2
      }
    ],
    "specialPieces": [
      {
        "row": 5,
        "col": 4,
        "type": "blue",
        "special": "col_clear"
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
    "availableCells": 68,
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
        "count": 6940
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
        "col": 6,
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
        "row": 3,
        "col": 2,
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
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 5,
        "col": 4,
        "type": "chain",
        "hp": 1
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
        "col": 1,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 6,
        "col": 3,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 6,
        "col": 7,
        "type": "hole",
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
        "row": 4,
        "col": 4,
        "type": "blue",
        "special": "col_clear"
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
        "count": 7010
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
        "col": 3,
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
        "col": 5,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 3,
        "col": 4,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 3,
        "col": 5,
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
        "col": 3,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 4,
        "col": 4,
        "type": "marshmallow",
        "hp": 2
      },
      {
        "row": 4,
        "col": 5,
        "type": "chain",
        "hp": 1
      },
      {
        "row": 5,
        "col": 4,
        "type": "chain",
        "hp": 1
      }
    ],
    "specialPieces": [
      {
        "row": 5,
        "col": 3,
        "type": "blue",
        "special": "col_clear"
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
    "availableCells": 60,
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
        "count": 7070
      },
      {
        "type": "clear_marshmallow",
        "count": 6
      },
      {
        "type": "combo_goal",
        "comboLength": 3,
        "count": 1
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
        "row": 2,
        "col": 5,
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
        "col": 3,
        "type": "hole",
        "hp": 1
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
        "col": 7,
        "type": "chain",
        "hp": 1
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
        "col": 6,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 7,
        "col": 2,
        "type": "marshmallow",
        "hp": 2
      }
    ],
    "specialPieces": [
      {
        "row": 4,
        "col": 4,
        "type": "blue",
        "special": "col_clear"
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
    "availableCells": 60,
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
        "count": 7130
      },
      {
        "type": "clear_ice",
        "count": 2
      },
      {
        "type": "special_combo_goal",
        "comboType": "rainbow_functional",
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
        "type": "portal",
        "hp": 1,
        "portalId": "a_in",
        "targetPortalId": "a_out"
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
        "col": 1,
        "type": "hole",
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
        "col": 7,
        "type": "portal",
        "hp": 1,
        "portalId": "a_out"
      }
    ],
    "specialPieces": [
      {
        "row": 4,
        "col": 3,
        "type": "purple",
        "special": "bomb"
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
    "availableCells": 68,
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
        "count": 7200
      },
      {
        "type": "clear_ice",
        "count": 2
      },
      {
        "type": "combo_goal",
        "comboLength": 2,
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
        "col": 7,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 6,
        "type": "portal",
        "hp": 1,
        "portalId": "a_out"
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
        "col": 8,
        "type": "portal",
        "hp": 1,
        "portalId": "a_in",
        "targetPortalId": "a_out"
      },
      {
        "row": 6,
        "col": 5,
        "type": "hole",
        "hp": 1
      }
    ],
    "specialPieces": [
      {
        "row": 4,
        "col": 3,
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
        "count": 7260
      },
      {
        "type": "clear_ice",
        "count": 2
      },
      {
        "type": "special_combo_goal",
        "comboType": "rainbow_functional",
        "count": 1
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
        "row": 1,
        "col": 4,
        "type": "hole",
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
        "type": "portal",
        "hp": 1,
        "portalId": "a_in",
        "targetPortalId": "a_out"
      },
      {
        "row": 4,
        "col": 2,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 4,
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
        "col": 4,
        "type": "hole",
        "hp": 1
      }
    ],
    "specialPieces": [
      {
        "row": 4,
        "col": 3,
        "type": "purple",
        "special": "bomb"
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
        "count": 7330
      },
      {
        "type": "clear_ice",
        "count": 2
      },
      {
        "type": "special_combo_goal",
        "comboType": "rainbow_functional",
        "count": 1
      }
    ],
    "blockers": [
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
        "col": 6,
        "type": "portal",
        "hp": 1,
        "portalId": "a_out"
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
      }
    ],
    "specialPieces": [
      {
        "row": 4,
        "col": 3,
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
        "count": 7390
      },
      {
        "type": "clear_ice",
        "count": 2
      },
      {
        "type": "combo_goal",
        "comboLength": 2,
        "count": 1
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
        "col": 2,
        "type": "portal",
        "hp": 1,
        "portalId": "a_in",
        "targetPortalId": "a_out"
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
        "row": 6,
        "col": 0,
        "type": "hole",
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
        "col": 3,
        "type": "portal",
        "hp": 1,
        "portalId": "a_out"
      }
    ],
    "specialPieces": [
      {
        "row": 4,
        "col": 5,
        "type": "purple",
        "special": "bomb"
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
    "availableCells": 60,
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
        "count": 7460
      },
      {
        "type": "clear_ice",
        "count": 2
      },
      {
        "type": "special_combo_goal",
        "comboType": "rainbow_functional",
        "count": 1
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
        "row": 1,
        "col": 6,
        "type": "portal",
        "hp": 1,
        "portalId": "a_in",
        "targetPortalId": "a_out"
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
        "row": 5,
        "col": 4,
        "type": "ice",
        "hp": 1
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
        "col": 6,
        "type": "hole",
        "hp": 1
      }
    ],
    "specialPieces": [
      {
        "row": 4,
        "col": 5,
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
    "availableCells": 77,
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
        "count": 7520
      },
      {
        "type": "clear_ice",
        "count": 2
      },
      {
        "type": "special_combo_goal",
        "comboType": "rainbow_functional",
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
        "row": 4,
        "col": 1,
        "type": "portal",
        "hp": 1,
        "portalId": "a_in",
        "targetPortalId": "a_out"
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
        "row": 7,
        "col": 1,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 8,
        "col": 2,
        "type": "portal",
        "hp": 1,
        "portalId": "a_out"
      }
    ],
    "specialPieces": [
      {
        "row": 5,
        "col": 4,
        "type": "purple",
        "special": "bomb"
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
    "availableCells": 60,
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
        "count": 7590
      },
      {
        "type": "clear_ice",
        "count": 3
      },
      {
        "type": "combo_goal",
        "comboLength": 2,
        "count": 1
      }
    ],
    "blockers": [
      {
        "row": 0,
        "col": 3,
        "type": "portal",
        "hp": 1,
        "portalId": "a_out"
      },
      {
        "row": 1,
        "col": 1,
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
        "row": 2,
        "col": 5,
        "type": "portal",
        "hp": 1,
        "portalId": "a_in",
        "targetPortalId": "a_out"
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
        "type": "hole",
        "hp": 1
      },
      {
        "row": 4,
        "col": 4,
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
        "col": 6,
        "type": "hole",
        "hp": 1
      }
    ],
    "specialPieces": [
      {
        "row": 4,
        "col": 5,
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
    "availableCells": 77,
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
        "count": 7650
      },
      {
        "type": "clear_ice",
        "count": 3
      },
      {
        "type": "special_combo_goal",
        "comboType": "rainbow_functional",
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
        "col": 8,
        "type": "portal",
        "hp": 1,
        "portalId": "a_out"
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
        "row": 5,
        "col": 0,
        "type": "portal",
        "hp": 1,
        "portalId": "a_in",
        "targetPortalId": "a_out"
      },
      {
        "row": 5,
        "col": 4,
        "type": "ice",
        "hp": 1
      },
      {
        "row": 7,
        "col": 1,
        "type": "hole",
        "hp": 1
      }
    ],
    "specialPieces": [
      {
        "row": 4,
        "col": 5,
        "type": "purple",
        "special": "bomb"
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
        "count": 7720
      },
      {
        "type": "clear_ice",
        "count": 3
      },
      {
        "type": "special_combo_goal",
        "comboType": "rainbow_functional",
        "count": 1
      }
    ],
    "blockers": [
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
        "hp": 1
      }
    ],
    "specialPieces": [
      {
        "row": 4,
        "col": 5,
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
        "count": 7780
      },
      {
        "type": "clear_ice",
        "count": 3
      },
      {
        "type": "combo_goal",
        "comboLength": 2,
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
        "row": 1,
        "col": 5,
        "type": "portal",
        "hp": 1,
        "portalId": "a_in",
        "targetPortalId": "a_out"
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
        "col": 2,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 5,
        "col": 6,
        "type": "portal",
        "hp": 1,
        "portalId": "a_out"
      }
    ],
    "specialPieces": [
      {
        "row": 5,
        "col": 4,
        "type": "purple",
        "special": "bomb"
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
    "availableCells": 60,
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
        "count": 7840
      },
      {
        "type": "clear_ice",
        "count": 3
      },
      {
        "type": "special_combo_goal",
        "comboType": "rainbow_functional",
        "count": 1
      }
    ],
    "blockers": [
      {
        "row": 1,
        "col": 6,
        "type": "hole",
        "hp": 1
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
        "row": 3,
        "col": 3,
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
        "row": 6,
        "col": 1,
        "type": "hole",
        "hp": 1
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
        "col": 6,
        "type": "hole",
        "hp": 1
      }
    ],
    "specialPieces": [
      {
        "row": 3,
        "col": 4,
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
        "count": 7910
      },
      {
        "type": "clear_ice",
        "count": 3
      },
      {
        "type": "special_combo_goal",
        "comboType": "rainbow_functional",
        "count": 1
      }
    ],
    "blockers": [
      {
        "row": 0,
        "col": 5,
        "type": "portal",
        "hp": 1,
        "portalId": "a_out"
      },
      {
        "row": 1,
        "col": 1,
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
        "row": 2,
        "col": 7,
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
        "row": 4,
        "col": 1,
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
      }
    ],
    "specialPieces": [
      {
        "row": 3,
        "col": 4,
        "type": "purple",
        "special": "bomb"
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
    "availableCells": 68,
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
        "count": 7970
      },
      {
        "type": "clear_ice",
        "count": 3
      },
      {
        "type": "combo_goal",
        "comboLength": 3,
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
        "col": 6,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 3,
        "col": 0,
        "type": "portal",
        "hp": 1,
        "portalId": "a_out"
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
        "type": "portal",
        "hp": 1,
        "portalId": "a_in",
        "targetPortalId": "a_out"
      },
      {
        "row": 5,
        "col": 4,
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
        "col": 7,
        "type": "hole",
        "hp": 1
      }
    ],
    "specialPieces": [
      {
        "row": 4,
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
        "count": 8040
      },
      {
        "type": "clear_ice",
        "count": 4
      },
      {
        "type": "special_combo_goal",
        "comboType": "rainbow_functional",
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
        "type": "portal",
        "hp": 1,
        "portalId": "a_out"
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
        "type": "portal",
        "hp": 1,
        "portalId": "a_in",
        "targetPortalId": "a_out"
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
        "col": 4,
        "type": "ice",
        "hp": 2
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
        "row": 3,
        "col": 4,
        "type": "purple",
        "special": "bomb"
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
    "availableCells": 60,
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
        "count": 8100
      },
      {
        "type": "clear_ice",
        "count": 4
      },
      {
        "type": "special_combo_goal",
        "comboType": "rainbow_functional",
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
        "col": 6,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 1,
        "col": 7,
        "type": "portal",
        "hp": 1,
        "portalId": "a_out"
      },
      {
        "row": 3,
        "col": 4,
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
        "col": 1,
        "type": "portal",
        "hp": 1,
        "portalId": "a_in",
        "targetPortalId": "a_out"
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
    "availableCells": 59,
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
        "count": 8170
      },
      {
        "type": "clear_ice",
        "count": 4
      },
      {
        "type": "combo_goal",
        "comboLength": 3,
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
        "row": 1,
        "col": 6,
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
        "type": "portal",
        "hp": 1,
        "portalId": "a_in",
        "targetPortalId": "a_out"
      },
      {
        "row": 3,
        "col": 4,
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
        "col": 7,
        "type": "hole",
        "hp": 1
      }
    ],
    "specialPieces": [
      {
        "row": 5,
        "col": 5,
        "type": "purple",
        "special": "bomb"
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
        "count": 8230
      },
      {
        "type": "clear_ice",
        "count": 4
      },
      {
        "type": "special_combo_goal",
        "comboType": "rainbow_functional",
        "count": 2
      }
    ],
    "blockers": [
      {
        "row": 0,
        "col": 7,
        "type": "portal",
        "hp": 1,
        "portalId": "a_out"
      },
      {
        "row": 1,
        "col": 2,
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
        "row": 4,
        "col": 1,
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
        "col": 5,
        "type": "hole",
        "hp": 1
      },
      {
        "row": 7,
        "col": 0,
        "type": "portal",
        "hp": 1,
        "portalId": "a_in",
        "targetPortalId": "a_out"
      }
    ],
    "specialPieces": [
      {
        "row": 4,
        "col": 3,
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
        "count": 8300
      },
      {
        "type": "clear_ice",
        "count": 4
      },
      {
        "type": "special_combo_goal",
        "comboType": "rainbow_functional",
        "count": 2
      }
    ],
    "blockers": [
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
        "col": 2,
        "type": "portal",
        "hp": 1,
        "portalId": "a_in",
        "targetPortalId": "a_out"
      },
      {
        "row": 3,
        "col": 4,
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
        "col": 4,
        "type": "ice",
        "hp": 2
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
        "row": 6,
        "col": 4,
        "type": "purple",
        "special": "bomb"
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
        "count": 8360
      },
      {
        "type": "clear_ice",
        "count": 4
      },
      {
        "type": "combo_goal",
        "comboLength": 3,
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
        "type": "portal",
        "hp": 1,
        "portalId": "a_out"
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
        "col": 4,
        "type": "ice",
        "hp": 2
      },
      {
        "row": 5,
        "col": 7,
        "type": "portal",
        "hp": 1,
        "portalId": "a_in",
        "targetPortalId": "a_out"
      },
      {
        "row": 7,
        "col": 1,
        "type": "hole",
        "hp": 1
      }
    ],
    "specialPieces": [
      {
        "row": 6,
        "col": 4,
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
        "count": 8420
      },
      {
        "type": "clear_ice",
        "count": 4
      },
      {
        "type": "special_combo_goal",
        "comboType": "rainbow_functional",
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
        "type": "portal",
        "hp": 1,
        "portalId": "a_out"
      },
      {
        "row": 4,
        "col": 0,
        "type": "hole",
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
        "row": 5,
        "col": 4,
        "type": "ice",
        "hp": 2
      }
    ],
    "specialPieces": [
      {
        "row": 4,
        "col": 5,
        "type": "purple",
        "special": "bomb"
      }
    ]
  }
];
