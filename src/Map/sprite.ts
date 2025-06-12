import type { TileTypes } from "../maps/1";
import { position } from "./Map";

type SpriteProps = {
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
  private x: number;
  private y: number;
  private lastPosition: [number, number] = [0, 0]; // Last position to check if sprite has moved
  private tileSize: number;
  private tile: TileTypes | "character"; // Tile type, e.g., "grass", "water", etc.

  constructor({ x, y, tileSize = 32, tile }: SpriteProps) {
    this.x = x;
    this.y = y;
    this.tileSize = tileSize;
    this.tile = tile;
  }

  private getEdge(
    map: { width: number; height: number },
    viewPort: { width: number; height: number }
  ) {
    const edges = [];
    if (position.get().x < 0) {
      edges.push("left");
    }
    if (position.get().y < 0) {
      edges.push("top");
    }
    if (position.get().x + viewPort.width >= map.width) {
      edges.push("right");
    }
    if (position.get().y + viewPort.height >= map.height) {
      edges.push("bottom");
    }
    return edges;
  }

  public draw(
    ctx: CanvasRenderingContext2D,
    map: { width: number; height: number },
    viewPort: { width: number; height: number },
    isFixed: boolean = true
  ) {
    ctx.fillStyle = this.x === 0 && this.y == 0 ? "#000" : pallette[this.tile]; // Example color
    if (this.x === 9 * this.tileSize && this.y === 0) {
      ctx.fillStyle = "#000"; // Special case for character sprite
    }
    let x: number;
    let y: number;

    const edges = this.getEdge(map, viewPort);

    // background
    if (isFixed) {
      console.log("edges", edges);
      // @todo right and bottom edges
      if (edges.includes("right")) {
        // debugger;
        x = this.lastPosition[0];
        y = this.y - position.get().y;
        return ctx.fillRect(x, y, this.tileSize, this.tileSize); // Draw a square sprite
      }
      if (edges.includes("bottom")) {
        x = this.x - position.get().x;
        y = this.lastPosition[1];
        return ctx.fillRect(x, y, this.tileSize, this.tileSize); // Draw a square sprite
      }
      x = edges.includes("left") ? this.x : this.x - position.get().x;
      y = edges.includes("top") ? this.y : this.y - position.get().y;
      ctx.fillRect(x, y, this.tileSize, this.tileSize); // Draw a square sprite
      this.lastPosition = [x, y]; // Update last position
      return;
    }
    if (edges.includes("bottom")) {
      const step = position.get().y + viewPort.height - map.height;
      //   console.log("step", step);
      const f = this.y + step; //position.get().y; // + viewPort.height / 2;
      //   debugger;
      x = this.x;
      y = f;
      //   console.log("bottom edge", x, y);
      return ctx.fillRect(x, y, this.tileSize, this.tileSize); // Draw a square sprite
    }
    if (edges.includes("right")) {
      const step = position.get().x + viewPort.width - map.width;
      //   console.log("step", step);
      const f = this.x + step; //position.get().x; // + viewPort.width / 2;
      //   debugger;
      x = f;
      y = this.y;
      //   console.log("right edge", x, y);
      return ctx.fillRect(x, y, this.tileSize, this.tileSize); // Draw a square sprite
    }

    if (edges.includes("top")) {
      // debugger;
      x = this.x;
      y = this.y + position.get().y;
      //   console.log("top edge", x, y);
      return ctx.fillRect(x, y, this.tileSize, this.tileSize); // Draw a square sprite
    }

    if (edges.includes("left")) {
      // debugger;
      x = this.x + position.get().x;
      y = this.y;
      return ctx.fillRect(x, y, this.tileSize, this.tileSize); // Draw a square sprite
    }
    x = this.x;
    y = this.y;
    ctx.fillRect(x, y, this.tileSize, this.tileSize); // Draw a square sprite
    this.lastPosition = [x, y]; // Update last position
  }
  public getPosition() {
    return { x: this.x, y: this.y };
  }
}
