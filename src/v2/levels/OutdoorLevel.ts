import { events } from "../Events";
import { gridCells } from "../helpers/grid";
import { Exit } from "../objects/Exit/Exit";
import { Level, type LevelProps } from "../objects/Level/Level";
import { Rod } from "../objects/Rod/Rod";
import { CaveLevel1 } from "./CaveLevel1";

export class OutdoorLevel1 extends Level {
  constructor(props: LevelProps) {
    super(props);

    // this.heroPosition = props.heroPosition ?? DEFAULT_HERO_POS;

    // const hero = new Hero(this.heroPosition.x, this.heroPosition.y);
    // this.addChild(hero);

    const rod = new Rod(gridCells(10), gridCells(6));
    this.addChild(rod);

    const exit = new Exit(gridCells(6), gridCells(3));
    this.addChild(exit);

    this.walls.add(`64,48`); // tree

    this.walls.add(`64,64`); // squares
    this.walls.add(`64,80`);
    this.walls.add(`80,64`);
    this.walls.add(`80,80`);

    this.walls.add(`112,80`); // water
    this.walls.add(`128,80`);
    this.walls.add(`144,80`);
    this.walls.add(`160,80`);
  }
  ready() {
    events.on("HERO_EXITS", this, () => {
      events.emit("CHANGE_LEVEL", new CaveLevel1());
    });
  }
}
