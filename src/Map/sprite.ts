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
    if (position.get().x < 0) {
      return "left";
    }
    if (position.get().y < 0) {
      return "top";
    }
    // console.log(
    //   "position",
    //   position.get().x,
    //   position.get().x + viewPort.width,
    //   map.width
    // );
    if (position.get().x + viewPort.width > map.width) {
      return "right";
    }
    return null;
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

    const edge = this.getEdge(map, viewPort);
    console.log("edge", edge);

    // background
    if (isFixed) {
      // @todo right and bottom edges

      x = edge === "left" ? this.x : this.x - position.get().x;
      y = edge === "top" ? this.y : this.y - position.get().y;
      ctx.fillRect(x, y, this.tileSize, this.tileSize); // Draw a square sprite
      return;
    }

    x = edge === "left" ? this.x + position.get().x : this.x;
    y = edge === "top" ? this.y + position.get().y : this.y;
    // If near edge move the character towards the edge
    // if (isNearEdge) {
    //   console.log(
    //     "character sprite shoud move",
    //     this.tile,
    //     x,
    //     position.get().x
    //   );
    //   y = this.y + position.get().y;
    //   x = this.x + position.get().x;
    // }
    ctx.fillRect(x, y, this.tileSize, this.tileSize); // Draw a square sprite
  }
  public getPosition() {
    return { x: this.x, y: this.y };
  }
}
