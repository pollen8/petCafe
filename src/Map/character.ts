import { Sprite, type SpriteProps } from "./sprite";
import type { Viewport } from "./viewport";

export class Character extends Sprite {
  constructor(props: SpriteProps) {
    super(props);
  }
  public draw(ctx: CanvasRenderingContext2D, viewPort: Viewport) {
    ctx.fillStyle = "#000";
    const x = this.x + viewPort.offset.x;
    const y = this.y + viewPort.offset.y;
    ctx.fillRect(x, y, this.tileSize, this.tileSize); // Draw a square sprite
  }
}
