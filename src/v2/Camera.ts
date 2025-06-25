import { events } from "./Events";
import { GameObject } from "./GameObject";
import type { Level } from "./objects/Level/Level";
import { Vector2 } from "./Vector2";

export class Camera extends GameObject {
  constructor() {
    super({});
    events.on("HERO_POSITION", this, (heroPostion: Vector2) => {
      this.centerPositionOnTarget(heroPostion);
    });
    events.on("CHANGE_LEVEL", this, (newLevel: Level) => {
      console.log(newLevel.heroPosition);
      this.centerPositionOnTarget(newLevel.heroPosition);
    });
  }

  centerPositionOnTarget(position: Vector2) {
    const personHalf = 8;
    const canvasWidth = 300;
    const canvasHeight = 180;
    const halfWidth = canvasWidth / 2 - personHalf;
    const halfHeight = canvasHeight / 2 - personHalf;

    this.position = new Vector2(
      -position.x + halfWidth,
      -position.y + halfHeight
    );
  }
}

export const camera = new Camera();
