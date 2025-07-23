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
    backgroundDecoration: number[];
    objects: Item[];
  };
  tilesets: {
    source: string;
    firstgid: number;
    tilewidth: number;
    tileheight: number;
    tilecount: number;
    columns: number;
  }[];

  collision: [number, number][];
};
