import { GameObject, type GameObjectProps } from "../../GameObject";
import type { Vector2 } from "../../Vector2";

export type LevelProps = GameObjectProps & {
  heroPosition?: Vector2;
};
export class Level extends GameObject {
  public background: GameObject | null = null;
  public heroPosition: Vector2;

  public walls = new Set<string>();
  constructor(props: LevelProps) {
    super(props);
  }
}
