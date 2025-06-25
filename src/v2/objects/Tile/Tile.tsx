import { GameObject } from "../../GameObject";
import { Sprite } from "../../Sprite";
import { Vector2 } from "../../Vector2";

export class Tile extends GameObject {
  private body: GameObject;
  constructor(x: number, y: number, sprite: Sprite) {
    super({
      position: new Vector2(x, y),
    });
    this.drawLayer = "FLOOR";

    this.body = sprite;

    this.addChild(this.body);
  }
}
