import type { Camera } from "../../Camera";
import { events } from "../../Events";
import { GameObject, type GameObjectProps } from "../../GameObject";
import { gridCells } from "../../helpers/grid";
import { resoures } from "../../Resoources";
import { Sprite } from "../../Sprite";
import { Vector2 } from "../../Vector2";
import { Tile } from "../Tile/Tile";

export type LevelBackgroundProps = GameObjectProps & {
  heroPosition?: Vector2;
  size: Vector2;
};

type ViewPort = {
  left: number;
  right: number;
  top: number;
  bottom: number;
};

export class LevelBackground extends GameObject {
  protected size: Vector2;
  private viewPort: ViewPort;
  constructor(props: LevelBackgroundProps) {
    super(props);
    this.viewPort = { left: 0, right: 0, top: 0, bottom: 0 };
    this.size = props.size;
    this.buildTiles();
    events.on(
      "CAMERA_VIEWPORT",
      this,
      (viewPort: ViewPort) => (this.viewPort = viewPort)
    );
  }

  ready() {}

  buildTiles() {
    let c = 0;
    for (let j = 0; j < this.size.y; j++) {
      for (let i = 0; i < this.size.x; i++) {
        c++;
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
              // frame: map[i + j * 6],
              // frame: i + j * 7,
              frame: c % 10,
            })
          )
        );
      }
    }
  }
  drawTiles(ctx: CanvasRenderingContext2D, camera: Camera) {
    this.draw(ctx, camera.position.x, camera.position.y);
  }

  public draw(ctx: CanvasRenderingContext2D, x: number, y: number) {
    const drawPosX = x + this.position.x + this.drawOffset.x;
    const drawPosY = y + this.position.y + this.drawOffset.y;
    this.drawImage(ctx, drawPosX, drawPosY);

    const toDraw = this.getDrawOrder().filter(
      this.isInCameraViewPort.bind(this)
    );
    toDraw.forEach((child) => child.draw(ctx, drawPosX, drawPosY));
  }

  isInCameraViewPort(tile: GameObject) {
    const { left, right, bottom, top } = this.viewPort;
    return (
      tile.position.x + 16 >= left &&
      tile.position.x - 16 <= right &&
      tile.position.y + 16 >= top &&
      tile.position.y - 16 <= bottom
    );
  }
}
