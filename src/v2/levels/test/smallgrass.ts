// Auto-generated from smallgrass.tmj
import type { Map } from "../types";

export const map: Map = {
  id: "smallgrass",
  width: 3,
  height: 2,
  layers: {
    foreground: [0, 3, 17, 0, 0, 17],
    background: [],
    // "background": [
    //   1,
    //   3,
    //   0,
    //   7,
    //   9,
    //   0
    // ],
    objects: [
      {
        name: "Hero",
        type: "Hero",
        x: 0,
        y: 0,
        width: 16,
        height: 16,
      },
      {
        name: "Rod",
        type: "Rod",
        x: 16,
        y: 0,
        width: 16,
        height: 16,
      },
    ],
  },
  collision: [[0, 1]],
  tilesets: [
    {
      source: "dirt_path",
      firstgid: 10,
    },
    {
      source: "grass",
      firstgid: 1,
    },
  ],
} as const;
