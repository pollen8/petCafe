// export

import { events } from "../Events";
import { gridCells } from "../helpers/grid";
import { Exit } from "../objects/Exit/Exit";
import { Hero } from "../objects/Hero/Hero";
import { NPC } from "../objects/NPC/NPC";
import { Level, type LevelProps } from "../objects/Level/Level";
import { Rod } from "../objects/Rod/Rod";
import { resoures } from "../Resoources";
import { Sprite } from "../Sprite";
import { Vector2 } from "../Vector2";
import { OutdoorLevel1 } from "./OutdoorLevel";

const DEFAULT_HERO_POS = new Vector2(gridCells(3), gridCells(4));
export class CaveLevel1 extends Level {
  constructor(props: LevelProps) {
    super(props);
    this.background = new Sprite({
      resource: resoures.images.sky,
      frameSize: new Vector2(320, 180),
    });
    this.heroPosition = props.heroPosition ?? DEFAULT_HERO_POS;
    const groudSprite = new Sprite({
      resource: resoures.images.caveGround,
      frameSize: new Vector2(320, 180),
    });
    this.addChild(groudSprite);

    const hero = new Hero(this.heroPosition.x, this.heroPosition.y);
    this.addChild(hero);

    const rod = new Rod(gridCells(10), gridCells(6));
    this.addChild(rod);

    const exit = new Exit(gridCells(3), gridCells(5));
    this.addChild(exit);

    const knight = new NPC(gridCells(9), gridCells(3));
    this.addChild(knight);
    // this.walls.add(`64,48`); // tree

    // this.walls.add(`64,64`); // squares
    // this.walls.add(`64,80`);
    // this.walls.add(`80,64`);
    // this.walls.add(`80,80`);

    // this.walls.add(`112,80`); // water
    // this.walls.add(`128,80`);
    // this.walls.add(`144,80`);
    // this.walls.add(`160,80`);
  }

  ready() {
    events.on("HERO_EXITS", this, () => {
      events.emit(
        "CHANGE_LEVEL",
        new OutdoorLevel1({
          heroPosition: new Vector2(gridCells(17), gridCells(3)),
        })
      );
    });
  }
}
