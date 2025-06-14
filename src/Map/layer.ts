// import { tileSize } from "../Game/GameContext";
// import { position } from "./Map";
import type { Sprite } from "./sprite";
import type { Viewport } from "./viewport";

// export type Viewport = {
//   x: number; // X coordinate of the viewport
//   y: number; // Y coordinate of the viewport
//   width: number; // Width of the viewport
//   height: number; // Height of the viewport
// };

export type MapSize = {
  width: number; // Width of the map
  height: number; // Height of the map
};
type LayerProps = {
  viewport: Viewport;
  ctx: CanvasRenderingContext2D | null;
  sprites: Sprite[];
  mapSize: MapSize; // Optional map size for additional context
  isFixed?: boolean; // Whether the viewport is fixed or scrolls with the player
};

export class Layer {
  viewport: Viewport;
  sprites: Sprite[];
  mapSize: MapSize; // Optional map size for additional context
  ctx: CanvasRenderingContext2D | null;
  isFixed: boolean; // Whether the viewport is fixed or scrolls with the player

  constructor({ viewport, sprites, ctx, isFixed = true, mapSize }: LayerProps) {
    this.viewport = viewport;
    this.sprites = sprites;
    this.ctx = ctx;
    this.mapSize = mapSize;
    this.isFixed = isFixed; // Default to not fixed
  }

  public draw() {
    if (!this.ctx) {
      return;
    }
    for (const sprite of this.sprites) {
      if (!this.isFixed || sprite.inside(this.viewport)) {
        sprite.draw(this.ctx, this.viewport);
      }
    }
  }
}
