import { events } from "./Events";
import { GameObject } from "./GameObject";
import { Vector2 } from "./Vector2";

export class Camera extends GameObject {
  private canvasWidth = 300;
  private canvasHeight = 180;
  constructor() {
    super({});
    events.on("HERO_POSITION", this, (heroPostion: Vector2) => {
      this.centerPositionOnTarget(heroPostion);
    });
    // events.on(
    //   "RESIZE_WINDOW",
    //   this,
    //   (size: { width: number; height: number }) => {
    //     console.log("Camera resize", size);
    //     // this.canvasWidth = size.width;
    //     // this.canvasHeight = size.height;
    //     // this.centerPositionOnTarget(new Vector2(0, 0)); // Recenter camera
    //   }
    // );
  }

  centerPositionOnTarget(position: Vector2) {
    const personHalf = 8;
    const halfWidth = this.canvasWidth / 2 - personHalf;
    const halfHeight = this.canvasHeight / 2 - personHalf;

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
