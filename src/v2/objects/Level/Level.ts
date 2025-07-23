import { GameObject, type GameObjectProps } from "../../GameObject";
import type { Map } from "../../levels/types";
import { Vector2 } from "../../Vector2";
import { Hero } from "../Hero/Hero";
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
      foreground: new LevelLayer({
        size: this.size,
        layer: "foreground",
        map: props.map,
      }),
    };
  }

  public getHero() {
    return this.children.find((child) => child instanceof Hero) as
      | Hero
      | undefined;
  }
}
