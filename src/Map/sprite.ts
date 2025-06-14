import type { TileTypes } from "../maps/1";
// import { position } from "./Map";
import type { Viewport } from "./viewport";

export type SpriteProps = {
  x: number;
  y: number;
  tile: TileTypes | "character"; // Tile type, e.g., "grass", "water", etc.
  tileSize?: number; // Optional tile size, default is 32
};

const pallette: Record<TileTypes | "character", string> = {
  forest: "#fbb954",
  grass: "#d625d5",
  stone: "#dc4cc7",
  water: "#f1b08d",
  character: "#000",
  //   character: "#edab9f",
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
  protected x: number;
  protected y: number;
  private lastPosition: [number, number] = [0, 0]; // Last position to check if sprite has moved
  protected tileSize: number;
  private tile: TileTypes | "character"; // Tile type, e.g., "grass", "water", etc.
  private start: { x: number; y: number };
  constructor({ x, y, tileSize = 32, tile }: SpriteProps) {
    this.x = x;
    this.y = y;
    this.tileSize = tileSize;
    this.tile = tile;
    this.start = { x, y };
  }
  public inside(viewport: Viewport) {
    const w = viewport.getWidth();
    const h = viewport.getHeight();
    const { x, y } = viewport.getPosition();
    if (
      this.start.x + this.tileSize >= x &&
      this.start.x <= x + w + this.tileSize &&
      this.start.y + this.tileSize >= y &&
      this.start.y <= h + this.tileSize
    ) {
      return true;
    }
    return false;
  }
  public draw(ctx: CanvasRenderingContext2D, viewPort: Viewport) {
    ctx.fillStyle = this.x === 0 && this.y == 0 ? "#000" : pallette[this.tile]; // Example color
    if (this.x === 9 * this.tileSize && this.y === 0) {
      ctx.fillStyle = "#000"; // Special case for character sprite
    }
    let x: number;
    let y: number;

    const edges = viewPort.getEdge();

    // background
    if (edges.includes("left") && edges.includes("top")) {
      x = this.x;
      y = this.y;
      ctx.fillRect(x, y, this.tileSize, this.tileSize); // Draw a square sprite
      this.lastPosition = [x, y]; // Update last position
      return;
    }
    if (edges.includes("left") && edges.includes("bottom")) {
      x = this.x;
      y = this.lastPosition[1];
      ctx.fillRect(x, y, this.tileSize, this.tileSize); // Draw a square sprite
      this.lastPosition = [x, y]; // Update last position
      return;
    }
    if (edges.includes("right") && edges.includes("top")) {
      x = this.lastPosition[0];
      y = this.y;
      ctx.fillRect(x, y, this.tileSize, this.tileSize); // Draw a square sprite
      this.lastPosition = [x, y]; // Update last position
      return;
    }

    if (edges.includes("right") && edges.includes("bottom")) {
      y = this.lastPosition[1];
      x = this.lastPosition[0];
      ctx.fillRect(x, y, this.tileSize, this.tileSize); // Draw a square sprite
      this.lastPosition = [x, y]; // Update last position
      return;
    }

    // @todo right and bottom edges
    if (edges.includes("right")) {
      // debugger;
      x = this.lastPosition[0];
      y = this.y - viewPort.getPosition().y;
      this.lastPosition = [x, y]; // Update last position
      return ctx.fillRect(x, y, this.tileSize, this.tileSize); // Draw a square sprite
    }
    if (edges.includes("bottom")) {
      x = this.x - viewPort.getPosition().x;
      y = this.lastPosition[1];
      this.lastPosition = [x, y]; // Update last position
      return ctx.fillRect(x, y, this.tileSize, this.tileSize); // Draw a square sprite
    }
    x = edges.includes("left") ? this.x : this.x - viewPort.getPosition().x;
    y = edges.includes("top") ? this.y : this.y - viewPort.getPosition().y;
    ctx.fillRect(x, y, this.tileSize, this.tileSize); // Draw a square sprite
    this.lastPosition = [x, y]; // Update last position
    return;
  }

  public getPosition() {
    return { x: this.x, y: this.y };
  }
}
