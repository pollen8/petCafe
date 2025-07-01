// export

import { events } from "../Events";
import { gridCells } from "../helpers/grid";
import { Exit } from "../objects/Exit/Exit";
import { Hero } from "../objects/Hero/Hero";
import { NPC } from "../objects/NPC/NPC";
import { Level, type LevelProps } from "../objects/Level/Level";
import { Rod } from "../objects/Rod/Rod";
import { Vector2 } from "../Vector2";
import { OutdoorLevel1 } from "./OutdoorLevel";

const DEFAULT_HERO_POS = new Vector2(gridCells(3), gridCells(4));

export class CaveLevel1 extends Level {
  constructor(props: LevelProps) {
    super({
      ...props,
      id: "level.cave",
      size: new Vector2(10, 10),
    });
    this.heroPosition = props.heroPosition ?? DEFAULT_HERO_POS;

    const hero = new Hero(this.heroPosition.x, this.heroPosition.y);
    this.addChild(hero);

    const rod = new Rod(gridCells(10), gridCells(6));
    this.addChild(rod);

    const exit = new Exit(gridCells(3), gridCells(5));
    this.addChild(exit);

    const knight = new NPC(gridCells(9), gridCells(3));
    this.addChild(knight);
  }

  ready() {
    super.ready();
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
