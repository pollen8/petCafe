import type { Map } from "./1";

export const house: Map = {
  id: "house",
  width: 8,
  height: 6,
  resources: [
    {
      id: "portal",
      name: "Portal",
      image: "Portal",
      x: 4,
      y: 1,
      width: 1,
      height: 1,
      type: "portal",
      state: {
        to: "1",
      },
    },
    {
      id: "bed",
      image: "Box",
      name: "Bed",
      x: 7,
      y: 3,
      width: 1,
      height: 1,
      type: "bed",
    },
    {
      id: "storage",
      image: "Box",
      name: "House Storage",
      x: 4,
      y: 3,
      width: 1,
      height: 1,
      type: "storage",
      state: {
        capacity: 10,
        items: [],
        isOpen: false,
      },
    },
  ],
  tiles: new Array(100).fill("stone"),
};
