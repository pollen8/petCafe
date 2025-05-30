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
    {
      id: "storage",
      name: "Storage",
      x: 4,
      y: 3,
      width: 1,
      height: 1,
      type: "storage", // or 'storage' if you want to add a new ResourceType
    },
  ],
  tiles: new Array(100).fill("stone"),
};
