import { events } from "../../Events";
import { GameObject } from "../../GameObject";
import { resoures } from "../../Resources";
import { Sprite } from "../../Sprite";
import { Vector2 } from "../../Vector2";

export class Exit extends GameObject {
  constructor(x: number, y: number) {
    super({
      position: new Vector2(x, y),
    });
    this.addChild(
      new Sprite({
        resource: resoures.images.exit,
      })
    );
    this.drawLayer = "FLOOR";
  }

  ready() {
    events.on("HERO_POSITION", this, (heroPosition: Vector2) => {
      if (
        Math.round(heroPosition.x) === this.position.x &&
        Math.round(heroPosition.y) === this.position.y
      ) {
        events.emit("HERO_EXITS");
      }
    });
  }
}
