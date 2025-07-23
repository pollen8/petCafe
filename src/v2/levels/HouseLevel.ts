// export

import { events } from "../Events";
import { gridCells } from "../helpers/grid";
import { Exit } from "../objects/Exit/Exit";
import { Hero } from "../objects/Hero/Hero";
import { NPC } from "../objects/NPC/NPC";
import { Level, type LevelProps } from "../objects/Level/Level";
import { Rod } from "../objects/Rod/Rod";
import { Vector2 } from "../Vector2";
import { CaveLevel1 } from "./CaveLevel1";

import { map } from "./test/beach";
const DEFAULT_HERO_POS = new Vector2(gridCells(3), gridCells(4));

export class HouseLevel extends Level {
  constructor() {
    super({
      id: "level.cave",
      map: map,
    });
    // this.heroPosition = props.heroPosition ?? DEFAULT_HERO_POS;

    // const hero = new Hero(this.heroPosition.x, this.heroPosition.y);
    // this.addChild(hero);

    // const rod = new Rod(gridCells(10), gridCells(9));
    // this.addChild(rod);

    // const exit = new Exit(gridCells(1), gridCells(7));
    // this.addChild(exit);

    // const knight = new NPC(gridCells(9), gridCells(3));
    // this.addChild(knight);
  }

  ready() {
    super.ready();
    events.on("HERO_EXITS", this, () => {
      // events.emit(
      //   "CHANGE_LEVEL",
      //   new CaveLevel1({
      //     heroPosition: new Vector2(gridCells(4), gridCells(3)),
      //   })
      // );
    });
  }
}
