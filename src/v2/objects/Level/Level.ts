import { GameObject, type GameObjectProps } from "../../GameObject";
import { Vector2 } from "../../Vector2";
import { LevelBackground } from "./LevelBackground";

export type LevelProps = GameObjectProps & {
  heroPosition?: Vector2;
  size?: Vector2;
};

export class Level extends GameObject {
  public background: LevelBackground | null = null;
  public heroPosition: Vector2;

  public size: Vector2;

  public walls = new Set<string>();

  constructor(props: LevelProps) {
    super(props);
    this.heroPosition = props.heroPosition ?? new Vector2(0, 0);
    this.size = props.size ?? new Vector2(8, 6);
    console.log(this.size);
    this.background = new LevelBackground({ size: this.size });
  }
}
