import type { MapResource } from "../Resources/resources.store";

export type TileTypes = "grass" | "water" | "stone" | "forest";
const tiles: TileTypes[] = ["grass", "water", "stone", "forest"];

export type Map = {
  id: string;
  width: number;
  height: number;
  tiles: TileTypes[];
  resources: MapResource[];
};

export const map: Map = {
  id: "1",
  width: 10,
  height: 10,
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
        to: "house",
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
  tiles: new Array(100)
    .fill("")
    .map(() => tiles[Math.floor(Math.random() * 4)]),
};
