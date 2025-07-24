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
    const viewPort = {
      left: position.x - halfWidth,
      right: position.x + halfWidth,
      top: position.y - halfHeight,
      bottom: position.y + halfHeight,
    };
    events.emit("CAMERA_VIEWPORT", viewPort);
  }
}

export const camera = new Camera();
