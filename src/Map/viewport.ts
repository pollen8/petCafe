import { tileSize } from "../Game/GameContext";
import { speed } from "./Map";

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
    window.addEventListener("keydown", this.handleKeyDown.bind(this));
  }

  private handleKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case "ArrowUp":
        this.move(0, -speed);
        break;
      case "ArrowDown":
        event.preventDefault();
        this.move(0, speed);
        break;
      case "ArrowLeft":
        this.move(-speed, 0);
        break;
      case "ArrowRight":
        this.move(speed, 0);
        break;
      default:
        break;
    }
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
    if (map.width < this.width) {
      console.warn("map too small for viewport width");
    }
    if (map.height < this.height) {
      console.warn("map too small for viewport height");
    }

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
    // point at which the viewport stops moving right and offsets start
    const xEnd = this.map.width - this.width / 2;

    // Prevent moving out of bounds when moving right
    if (dx > 0) {
      if (this.x + dx + viewport.getWidth() / 2 > xEnd) {
        console.log("Cannot move right, out of bounds");

        if (this.offset.x + dx + this.x < this.map.width) {
          this.offset.x += dx; // Reset offset
        } else {
          return; // Prevent moving out of bounds
        }
      } else {
        // Moving from left edge back to the center.
        if (this.offset.x < 0) {
          this.offset.x += dx;
          return;
        }
      }
    }

    const xStart = this.width / 2;
    if (dx < 0) {
      if (this.x + dx + this.width / 2 < xStart) {
        // Point at which the viewport stops moving left and offsets start
        console.log("Cannot move left, out of bounds, xstart", xStart);
        if (this.offset.x + dx + this.x + this.getWidth() / 2 > 0) {
          this.offset.x += dx; // Reset offset
        } else {
          return;
        }
      } else {
        // Moving from right edge back to the center.
        if (this.offset.x > 0) {
          this.offset.x += dx; // Reset offset
        }
      }
    }

    if (dy < 0) {
      const yStart = this.height / 2;
      if (this.y + dy + this.height / 2 < yStart) {
        console.log("Cannot move up, out of bounds, ystart", yStart);
        if (this.offset.y + dy + this.y + this.getHeight() / 2 > 0) {
          this.offset.y += dy; // Reset offset
        } else {
          return;
        }
      } else {
        // Moving from bottom edge back to the center.
        if (this.offset.y > 0) {
          this.offset.y += dy; // Reset offset
        }
      }
      console.log("Moving up", dy, this.y + dy);
    }

    if (dy > 0) {
      const yEnd = this.map.height - this.height / 2;
      if (this.y + dy + this.height / 2 > yEnd) {
        console.log("Cannot move down, out of bounds, yend", yEnd);
        if (this.offset.y + dy + this.y < this.map.height) {
          this.offset.y += dy; // Reset offset
        } else {
          return; // Prevent moving out of bounds
        }
      } else {
        // Moving from top edge back to the center.
        if (this.offset.y < 0) {
          this.offset.y += dy; // Reset offset
          return;
        }
      }
    }

    this.x = Math.max(0, Math.min(this.map.width, this.x + dx));
    this.y = Math.max(0, Math.min(this.map.height, this.y + dy));
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
  width: 10 * tileSize, //window.innerWidth,
  height: 5 * tileSize, //window.innerHeight,
  x: 0,
  y: 0,
});
