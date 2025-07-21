import { GameObject, type GameObjectProps } from "../../GameObject";
import type { Map } from "../../levels/types";
import { Vector2 } from "../../Vector2";
import { LevelBackground } from "./LevelBackground";

export type LevelProps = GameObjectProps & {
  heroPosition?: Vector2;
  map: Map;
};

export class Level extends GameObject {
  public layers: Record<string, LevelBackground>;
  public heroPosition: Vector2;

  public size: Vector2;

  public walls = new Set<string>();

  map: Map;

  constructor(props: LevelProps) {
    super(props);
    this.heroPosition = props.heroPosition ?? new Vector2(0, 0);
    this.size = new Vector2(props.map.width, props.map.height);
    this.map = props.map;
    // this.map.layers
    this.layers = {
      background: new LevelBackground({
        size: this.size,
        layer: "background",
        map: props.map,
      }),
      foreground: new LevelBackground({
        size: this.size,
        layer: "foreground",
        map: props.map,
      }),
    };
  }
}
