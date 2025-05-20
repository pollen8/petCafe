export type TileTypes = 'grass' | 'water' | 'stone' | 'forest';
const tiles: TileTypes[ ] = ['grass', 'water', 'stone', 'forest'];

export type Map = {
    width: number;
    height: number;
    tiles: TileTypes[];
}

export const map: Map = {
    width: 10,
    height: 10,
    tiles: new Array(100).fill('').map(i => tiles[Math.floor(Math.random() * 4)])
}