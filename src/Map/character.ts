import { Sprite, type SpriteProps } from "./sprite";
// import { createAtom } from "@xstate/store";
import type { Viewport } from "./viewport";

// export const position = createAtom({ x: 0, y: 0 });

export class Character extends Sprite {
  constructor(props: SpriteProps) {
    super(props);
  }
  public draw(ctx: CanvasRenderingContext2D, viewPort: Viewport) {
    ctx.fillStyle = "#000";
    let x: number;
    let y: number;
    const edges = viewPort.getEdge();
    // console.log("edges", edges);
    // if (edges.includes("left") && edges.includes("top")) {
    //   x = this.x + position.get().x;
    //   y = this.y + position.get().y;
    //   return ctx.fillRect(x, y, this.tileSize, this.tileSize); // Draw a square sprite
    // }
    // if (edges.includes("left") && edges.includes("bottom")) {
    //   x = this.x + position.get().x;
    //   const step = position.get().y + viewPort.getHeight() - map.height;
    //   y = this.y + step;
    //   return ctx.fillRect(x, y, this.tileSize, this.tileSize); // Draw a square sprite
    // }

    // if (edges.includes("right") && edges.includes("top")) {
    //   const step = position.get().x + viewPort.getWidth() - map.width;
    //   x = this.x + step;
    //   y = this.y + position.get().y;
    //   return ctx.fillRect(x, y, this.tileSize, this.tileSize); // Draw a square sprite
    // }
    // if (edges.includes("right") && edges.includes("bottom")) {
    //   const stepX = position.get().x + viewPort.getWidth() - map.width;
    //   x = this.x + stepX;
    //   const stepY = position.get().y + viewPort.getHeight() - map.height;
    //   y = this.y + stepY;
    //   return ctx.fillRect(x, y, this.tileSize, this.tileSize); // Draw a square sprite
    // }
    // if (edges.includes("bottom")) {
    //   const step = position.get().y + viewPort.getHeight() - map.height;
    //   y = this.y + step;
    //   x = this.x;
    //   return ctx.fillRect(x, y, this.tileSize, this.tileSize); // Draw a square sprite
    // }
    if (edges.includes("right")) {
      // const step = position.get().x + viewPort.getWidth() - map.width;
      // this.offset.x += speed; // Reset offset
      x = this.x + viewPort.offset.x;
      y = this.y;
      console.log("drawing character right", x, y);
      return ctx.fillRect(x, y, this.tileSize, this.tileSize); // Draw a square sprite
    }

    // if (edges.includes("top")) {
    //   x = this.x;
    //   y = this.y + position.get().y;
    //   return ctx.fillRect(x, y, this.tileSize, this.tileSize); // Draw a square sprite
    // }

    // if (edges.includes("left")) {
    //   // debugger;
    //   x = this.x + position.get().x;
    //   y = this.y;
    //   return ctx.fillRect(x, y, this.tileSize, this.tileSize); // Draw a square sprite
    // }
    x = this.x;
    y = this.y;
    // console.log("drawing character", x, y);
    ctx.fillRect(x, y, this.tileSize, this.tileSize); // Draw a square sprite
  }
}
