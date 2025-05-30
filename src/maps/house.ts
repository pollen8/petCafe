import type { Map } from "./1";

export const house: Map = {
  id: "house",
  width: 8,
  height: 6,
  resources: [
    {
      id: "portal",
      name: "Portal",
      x: 4,
      y: 1,
      width: 1,
      height: 1,
      type: "portal",
    },
  ],
  tiles: new Array(100).fill("stone"),
};
