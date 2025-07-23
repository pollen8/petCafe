import { GameObject, type GameObjectProps } from "../../GameObject";
import { gridCells } from "../../helpers/grid";
import type { Map } from "../../levels/types";
import { Vector2 } from "../../Vector2";
import { Exit } from "../Exit/Exit";
import { Hero } from "../Hero/Hero";
import { House } from "../House/House";
import { Rod } from "../Rod/Rod";
import { LevelLayer } from "./LevelLayer";

export type LevelProps = GameObjectProps & {
  heroPosition?: Vector2;
  map: Map;
};

export class Level extends GameObject {
  public layers: Record<string, LevelLayer>;

  public size: Vector2;

  public walls = new Set<string>();

  map: Map;

  constructor(props: LevelProps) {
    super(props);
    this.size = new Vector2(props.map.width, props.map.height);
    this.map = props.map;
    // this.map.layers
    console.log("size", this.size, props.map.width, props.map.height);
    this.layers = {
      background: new LevelLayer({
        size: this.size,
        layer: "background",
        map: props.map,
      }),
      backgroundDeco: new LevelLayer({
        size: this.size,
        layer: "backgroundDecoration",
        map: props.map,
      }),
      foreground: new LevelLayer({
        size: this.size,
        layer: "foreground",
        map: props.map,
      }),
    };
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
        this.addChild(new Exit(Math.floor(item.x), Math.floor(item.y)));
      }
      if (item.type === "Rod") {
        this.addChild(new Rod(Math.floor(item.x), Math.floor(item.y)));
      }
      // if (item.type === "House") {
      //   this.addChild(new House(item.x, item.y));
      // }
    });
    this.map.collision.forEach((pos) => {
      this.walls.add(`${gridCells(pos[0])},${gridCells(pos[1])}`);
    });
  }

  public getHero() {
    return this.children.find((child) => child instanceof Hero) as
      | Hero
      | undefined;
  }
}
