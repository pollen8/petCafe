import { Sprite } from "./sprite";
import { position } from "./Map";

export class Character extends Sprite {
  public draw(
    ctx: CanvasRenderingContext2D,
    map: { width: number; height: number },
    viewPort: { width: number; height: number }
  ) {
    ctx.fillStyle = "#000";
    let x: number;
    let y: number;
    const edges = this.getEdge(map, viewPort);
    if (edges.includes("left") && edges.includes("top")) {
      x = this.x + position.get().x;
      y = this.y + position.get().y;
      return ctx.fillRect(x, y, this.tileSize, this.tileSize); // Draw a square sprite
    }
    if (edges.includes("left") && edges.includes("bottom")) {
      x = this.x + position.get().x;
      const step = position.get().y + viewPort.height - map.height;
      y = this.y + step;
      return ctx.fillRect(x, y, this.tileSize, this.tileSize); // Draw a square sprite
    }

    if (edges.includes("right") && edges.includes("top")) {
      const step = position.get().x + viewPort.width - map.width;
      x = this.x + step;
      y = this.y + position.get().y;
      return ctx.fillRect(x, y, this.tileSize, this.tileSize); // Draw a square sprite
    }
    if (edges.includes("right") && edges.includes("bottom")) {
      const stepX = position.get().x + viewPort.width - map.width;
      x = this.x + stepX;
      const stepY = position.get().y + viewPort.height - map.height;
      y = this.y + stepY;
      return ctx.fillRect(x, y, this.tileSize, this.tileSize); // Draw a square sprite
    }
    if (edges.includes("bottom")) {
      const step = position.get().y + viewPort.height - map.height;
      y = this.y + step;
      x = this.x;
      return ctx.fillRect(x, y, this.tileSize, this.tileSize); // Draw a square sprite
    }
    if (edges.includes("right")) {
      const step = position.get().x + viewPort.width - map.width;
      x = this.x + step;
      y = this.y;
      return ctx.fillRect(x, y, this.tileSize, this.tileSize); // Draw a square sprite
    }

    if (edges.includes("top")) {
      x = this.x;
      y = this.y + position.get().y;
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
  }
}
