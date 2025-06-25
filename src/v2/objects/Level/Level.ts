import { GameObject, type GameObjectProps } from "../../GameObject";
import { gridCells } from "../../helpers/grid";
import { resoures } from "../../Resoources";
import { Sprite } from "../../Sprite";
import { Vector2 } from "../../Vector2";
import { Tile } from "../Tile/Tile";

// const map = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
const map = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
export type LevelProps = GameObjectProps & {
  heroPosition?: Vector2;
  size?: Vector2;
};

export class Level extends GameObject {
  public background: GameObject | null = null;
  public heroPosition: Vector2;

  protected size: Vector2;

  public walls = new Set<string>();
  constructor(props: LevelProps) {
    super(props);
    this.heroPosition = props.heroPosition ?? new Vector2(0, 0);
    this.size = props.size ?? new Vector2(8, 6);
    console.log(this.size);
  }

  drawTiles() {
    let c = 0;
    for (let j = 0; j < this.size.y; j++) {
      for (let i = 0; i < this.size.x; i++) {
        c++;
        let r = c % 2 === 0 ? resoures.images.grass : resoures.images.plains;
        this.addChild(
          new Tile(
            gridCells(i),
            gridCells(j),
            // new Sprite({
            //   resource: r,
            // })
            new Sprite({
              resource: resoures.images.plains,
              hFrames: 6,
              vFrames: 12,
              frame: map[i],
            })
          )
        );
      }
    }
  }
}
