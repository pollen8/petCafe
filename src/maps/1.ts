import type { Map, TileTypes } from "./types";
const tiles: TileTypes[] = ["grass", "water", "stone", "forest"];
export const map: Map = {
  id: "1",
  width: 20,
  height: 20,
  resources: [
    {
      id: "portal",
      name: "Portal",
      image: "Portal",
      x: 1,
      y: 1,
      width: 1,
      height: 1,
      type: "portal",
      state: {
        to: "smallgrass",
      },
    },
    {
      id: "shop",
      name: "Shop",
      image: "Shop",
      x: 2,
      y: 2,
      width: 1,
      height: 1,
      type: "shop",
    },
    {
      id: "tree",
      name: "Tree",
      image: "Tree",
      x: 3,
      y: 3,
      width: 1,
      height: 1,
      type: "resource",
    },
  ],
  collision: [
    [6, 5],
    [7, 5],
    [8, 8],
  ],
  layers: {
    background: new Array(100000)
      .fill("")
      .map(() => tiles[Math.floor(Math.random() * 4)]),
    foreground: [],
  },
};
