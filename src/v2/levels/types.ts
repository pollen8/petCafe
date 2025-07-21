type Item = {
  name: string;
  type: string; // e.g., "Hero", "Rod"
  x: number;
  y: number;
  width: number;
  height: number;
};

export type Map = {
  id: string;
  width: number;
  height: number;
  layers: {
    background: number[];
    foreground: number[];
    objects: Item[];
  };
  tilesets: { source: string; firstgid: number }[];

  collision: [number, number][];
};
