import type { TileTypes } from "../maps/1";
import { position } from "./Map";

type SpriteProps = {
  x: number;
  y: number;
  ctx: CanvasRenderingContext2D | null;
  tile: TileTypes; // Tile type, e.g., "grass", "water", etc.
  tileSize?: number; // Optional tile size, default is 32
};
const pallette: Record<TileTypes, string> = {
  forest: "#fbb954",
  grass: "#d625d5",
  stone: "#dc4cc7",
  water: "#f1b08d",
  //   "#edab9f",
  //   "#ea9aa8",
  //   "#e786b0",
  //   "#e472b8",
  //   "#df5fc0",
  //   "#",
  //   "#d938ce",
  //   "#",
  //   "#d312dc",
};
export class Sprite {
  private x: number;
  private y: number;
  private ctx: CanvasRenderingContext2D | null;
  private tileSize: number;
  private tile: TileTypes; // Tile type, e.g., "grass", "water", etc.

  constructor({ x, y, ctx, tileSize = 32, tile }: SpriteProps) {
    this.x = x;
    this.y = y;
    this.tileSize = tileSize;
    this.tile = tile;
    this.ctx = ctx;
  }

  public draw(isFixed: boolean = true) {
    // Placeholder for drawing logic
    if (!this.ctx) {
      return;
    }
    this.ctx.fillStyle = pallette[this.tile]; // Example color
    const x = isFixed ? this.x - position.get().x : this.x;
    const y = isFixed ? this.y - position.get().y : this.y;
    this.ctx.fillRect(x, y, this.tileSize, this.tileSize); // Draw a square sprite
  }
  public getPosition() {
    return { x: this.x, y: this.y };
  }
}
