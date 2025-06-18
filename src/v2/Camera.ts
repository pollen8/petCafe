import { events } from "./Events";
import { GameObject } from "./GameObject";
import { Vector2 } from "./Vector2";

export class Camera extends GameObject {
  constructor() {
    super({});
    events.on("HERO_POSITION", this, (heroPostion: Vector2) => {
      const personHalf = 8;
      const canvasWidth = 300;
      const canvasHeight = 180;
      const halfWidth = canvasWidth / 2 - personHalf;
      const halfHeight = canvasHeight / 2 - personHalf;

      this.position = new Vector2(
        -heroPostion.x + halfWidth,
        -heroPostion.y + halfHeight
      );
    });
  }
}

export const camera = new Camera();
