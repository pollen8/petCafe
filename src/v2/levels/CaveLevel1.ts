// export

import { events } from "../Events";
import { gridCells } from "../helpers/grid";
import { Exit } from "../objects/Exit/Exit";
import { Hero } from "../objects/Hero/Hero";
import { Level, type LevelProps } from "../objects/Level/Level";
import { Rod } from "../objects/Rod/Rod";
import { Vector2 } from "../Vector2";
import { OutdoorLevel1 } from "./OutdoorLevel";
import { House } from "../objects/House/House";
import { map } from "./test/smallgrass";

const DEFAULT_HERO_POS = new Vector2(gridCells(3), gridCells(4));

export class CaveLevel1 extends Level {
  constructor(props: LevelProps) {
    super({
      ...props,
      id: "level.cave",
      map: map,
    });
    this.heroPosition = props.heroPosition ?? DEFAULT_HERO_POS;

    // const hero = new Hero(this.heroPosition.x, this.heroPosition.y);
    // const hero = new Hero(0, 0);
    // this.addChild(hero);

    // const rod = new Rod(gridCells(10), gridCells(9));
    // this.addChild(rod);

    // const house = new House(gridCells(0), gridCells(7));
    // this.addChild(house);
    // const exit = new Exit(gridCells(1), gridCells(7));
    // this.addChild(exit);

    // this.walls.add(`0,0`);
    // this.walls.add(`16,0`);
    // this.walls.add(`32,0`);
    this.walls.add(`48,0`);

    // house bottom
    for (let i = 1; i <= 5; i++) {
      this.walls.add(`${i * 16},96`);
    }
    for (let i = 1; i <= 5; i++) {
      this.walls.add(``);
    }
    // this.walls.add("16,96");
    // this.walls.add("32,96");
    // this.walls.add("48,96");
    // this.walls.add(`0,16`);
    // this.walls.add(`16,16`);
    // this.walls.add(`32,16`);
    // this.walls.add(`48,16`);
    // this.walls.add(`48,32`);
    // const knight = new NPC(gridCells(9), gridCells(3));
    // this.addChild(knight);
  }

  ready() {
    super.ready();
    events.on("HERO_EXITS", this, () => {
      events.emit(
        "CHANGE_LEVEL",
        new OutdoorLevel1({
          heroPosition: new Vector2(gridCells(4), gridCells(3)),
          map: {
            id: "outdoor1",
            width: 15,
            height: 15,
            layers: {
              background: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              foreground: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            },
            collision: [],
            tilesets: [],
          },
        })
      );
    });
  }
}
