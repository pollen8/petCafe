import { events } from "../../Events";
import { GameObject } from "../../GameObject";
import { resoures } from "../../Resoources";
import { Sprite } from "../../Sprite";
import { Vector2 } from "../../Vector2";

export class Rod extends GameObject {
  private body: GameObject;
  constructor(x: number, y: number) {
    super({
      position: new Vector2(x, y),
    });

    this.body = new Sprite({
      resource: resoures.images.rod,
      frameSize: new Vector2(16, 16),
      position: new Vector2(0, -5),
    });

    this.addChild(this.body);
  }

  ready() {
    events.on("HERO_POSITION", this, (heroPosition: Vector2) => {
      if (
        Math.round(heroPosition.x) === this.position.x &&
        Math.round(heroPosition.y) === this.position.y
      ) {
        this.onCollideWithHero();
      }
    });
  }
  onCollideWithHero() {
    // remove instance
    this.destroy();
    // alert pick up
    events.emit("HERO_PICKS_UP_ITEM", {
      image: resoures.images.rod,
      position: this.position,
      name: "Rod",
    });
  }
}
