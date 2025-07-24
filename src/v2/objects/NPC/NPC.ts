import { GameObject } from "../../GameObject";
import { Sprite } from "../../Sprite";
import { Vector2 } from "../../Vector2";
import { resoures } from "../../Resources";

export class NPC extends GameObject {
  constructor(x: number, y: number) {
    super({
      position: new Vector2(x, y),
    });

    this.isSolid = true;

    const shadow = new Sprite({
      resource: resoures.images.shadow,
      frameSize: new Vector2(32, 32),
      position: new Vector2(0, 2),
    });

    const body = new Sprite({
      frameSize: new Vector2(32, 32),
      resource: resoures.images.knight,
      position: new Vector2(-8, -20),
    });

    body.addChild(shadow);
    this.addChild(body);
  }
}
