export type TileTypes = 'grass' | 'water' | 'stone' | 'forest';
const tiles: TileTypes[ ] = ['grass', 'water', 'stone', 'forest'];

export type Map = {
    id: string;
    width: number;
    height: number;
    tiles: TileTypes[];
}

export const map: Map = {
    id: '1',
    width: 10,
    height: 10,
    tiles: new Array(100).fill('').map(() => tiles[Math.floor(Math.random() * 4)])
}