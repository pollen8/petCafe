import { events } from "../Events";
import { gridCells } from "../helpers/grid";
import { Exit } from "../objects/Exit/Exit";
import { Hero } from "../objects/Hero/Hero";
import { Level } from "../objects/Level/Level";
import { Rod } from "../objects/Rod/Rod";
import { Vector2 } from "../Vector2";
import { OutdoorLevel1 } from "./OutdoorLevel";
import { House } from "../objects/House/House";
import { map } from "./test/beach";

export class CaveLevel1 extends Level {
  constructor() {
    super({
      id: "level.cave",
      map: map,
    });
    console.log("cave level map", map);

    this.map.layers.objects.forEach((item) => {
      if (item.type === "Hero") {
        const heroPosition = new Vector2(
          Math.floor(item.x / 16),
          Math.floor(item.y / 16)
        );
        console.log("heroPosition", heroPosition);
        const hero = new Hero(
          gridCells(heroPosition.x),
          gridCells(heroPosition.y)
        );
        this.addChild(hero);
      }
      if (item.type === "Exit") {
        this.addChild(new Exit(item.x, item.y));
      }
      if (item.type === "Rod") {
        this.addChild(new Rod(item.x, item.y));
      }
      if (item.type === "House") {
        this.addChild(new House(item.x, item.y));
      }
    });
    this.map.collision.forEach((pos) => {
      this.walls.add(`${gridCells(pos[0])},${gridCells(pos[1])}`);
    });
    console.log("walls", this.walls);
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
            },
            collision: [],
            tilesets: [],
          },
        })
      );
    });
  }
}
