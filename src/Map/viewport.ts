import { tileSize } from "../Game/GameContext";

export class Viewport {
  private width: number;
  private height: number;
  private x: number;
  private y: number;
  public map: { width: number; height: number };
  public offset: { x: number; y: number }; // Character offset

  constructor({
    width,
    height,
    x = 0, // top-left corner by default
    y = 0,
  }: {
    width: number;
    height: number;
    x?: number;
    y?: number;
  }) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.offset = { x: 0, y: 0 }; // Character offset
    this.y = y;
    this.map = { width: 0, height: 0 }; // Default map size
  }

  public intersect(other: Viewport): boolean {
    return (
      this.x < other.x + other.width &&
      this.x + this.width > other.x &&
      this.y < other.y + other.height &&
      this.y + this.height > other.y
    );
  }
  public setMap(map: { width: number; height: number }) {
    this.map = map;
  }
  public getPosition() {
    return { x: this.x, y: this.y };
  }
  public getSize() {
    return { width: this.width, height: this.height };
  }
  public setPosition(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  public setSize(width: number, height: number) {
    this.width = width;
    this.height = height;
  }
  public getWidth() {
    return this.width;
  }
  public getHeight() {
    return this.height;
  }
  public move(dx: number, dy: number) {
    this.x = Math.max(0, Math.min(this.width, this.x + dx));
    this.y = Math.max(0, Math.min(this.height, this.y + dy));

    if (dx > 0 && this.x + dx > this.width) {
      console.log("Moving right", dx, this.x + dx);
      this.offset.x += dx; // Reset offset
    }

    if (dx < 0) {
      console.log("Moving left", dx, this.x, viewport.getWidth());
      this.offset.x += dx; // Reset offset
    }

    // if (dx > 0 && this.x + dx > this.width) {
    //   console.log("Cannot move right, out of bounds");
    //   this.offset.x += dx; // Reset offset
    // }
    // console.log("dx", dx, this.offset.x + dx);
    // if (dx < 0 && this.offset.x + dx <= 0) {
    //   console.log("Cannot move left, out of bounds");
    //   this.offset.x += dx; // Reset offset
    // }
    console.log(this.offset);
  }

  public getEdge() {
    const x = this.getPosition().x;
    const y = this.getPosition().y;
    const edges = [];
    if (x < 0) {
      edges.push("left");
    }
    if (y < 0) {
      edges.push("top");
    }
    if (x + this.getWidth() >= this.map.width) {
      edges.push("right");
    }
    if (y + this.getHeight() >= this.map.height) {
      edges.push("bottom");
    }
    return edges;
  }
}

export const viewport = new Viewport({
  width: 5 * tileSize, //window.innerWidth,
  height: 5 * tileSize, //window.innerHeight,
  x: 0,
  y: 0,
});
