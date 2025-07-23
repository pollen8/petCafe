import { events } from "../Events";
import { Level } from "../objects/Level/Level";
import { OutdoorLevel1 } from "./OutdoorLevel";
import { map } from "./test/beach";

export class CaveLevel1 extends Level {
  constructor() {
    super({
      id: "level.cave",
      map: map,
    });
    console.log("cave level map", map);

    // const house = new House(gridCells(0), gridCells(7));
    // this.addChild(house);
    // const exit = new Exit(gridCells(1), gridCells(7));
    // this.addChild(exit);

    // this.walls.add(`0,0`);
    // this.walls.add(`16,0`);
    // this.walls.add(`32,0`);
    // this.walls.add(`48,0`);

    // // house bottom
    // for (let i = 1; i <= 5; i++) {
    //   this.walls.add(`${i * 16},96`);
    // }
    // for (let i = 1; i <= 5; i++) {
    //   this.walls.add(``);
    // }
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
          // heroPosition: new Vector2(gridCells(4), gridCells(3)),
          map: {
            id: "outdoor1",
            width: 15,
            height: 15,
            layers: {
              background: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              objects: [],
              foreground: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              backgroundDecoration: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            },
            collision: [],
            tilesets: [],
          },
        })
      );
    });
  }
}
