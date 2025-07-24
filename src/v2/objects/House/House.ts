import { events } from "../../Events";
import { GameObject } from "../../GameObject";
import { gridCells } from "../../helpers/grid";
import { HouseLevel } from "../../levels/HouseLevel";
import { resoures } from "../../Resources";
import { Sprite } from "../../Sprite";
import { Vector2 } from "../../Vector2";

export class House extends GameObject {
  private body: GameObject;
  constructor(x: number, y: number) {
    super({
      position: new Vector2(x, y),
    });
    this.id = "house.level";
    this.body = new Sprite({
      resource: resoures.images.house,
      frameSize: new Vector2(gridCells(8), gridCells(8)),
      position: new Vector2(0, -gridCells(7)),
    });

    this.addChild(this.body);
  }

  ready() {
    events.on("HERO_POSITION", this, (heroPosition: Vector2) => {
      // console.log(heroPosition, this.position);
      if (
        Math.round(heroPosition.x) === this.position.x + 32 &&
        Math.round(heroPosition.y) === this.position.y + 96
      ) {
        console.log("enter");
        events.emit(
          "CHANGE_LEVEL",
          new HouseLevel({
            heroPosition: new Vector2(gridCells(4), gridCells(3)),
          })
        );
        // this.onCollideWithHero();
      }
    });
  }
  // onCollideWithHero() {
  //   // remove instance
  //   this.destroy();
  //   // alert pick up
  //   events.emit("HERO_PICKS_UP_ITEM", {
  //     image: resoures.images.rod,
  //     position: this.position,
  //     name: "Rod",
  //   });
  // }
}
