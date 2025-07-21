export type Map = {
  id: string;
  width: number;
  height: number;
  layers: {
    background: number[];
    foreground: number[];
  };
  tilesets: { source: string; firstgid: number }[];
  collision: [number, number][];
};
