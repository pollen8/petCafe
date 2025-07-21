import type { Camera } from "../../Camera";
import { events } from "../../Events";
import { GameObject, type GameObjectProps } from "../../GameObject";
import { gridCells } from "../../helpers/grid";
import type { Map } from "../../levels/types";
import { resoures } from "../../Resoources";
import { Sprite } from "../../Sprite";
import { Vector2 } from "../../Vector2";
import { Tile } from "../Tile/Tile";

export type LevelBackgroundProps = GameObjectProps & {
  heroPosition?: Vector2;
  size: Vector2;
  map: Map;
  layer: "background" | "foreground";
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

  private map: Map;
  private layer: "background" | "foreground";
  constructor(props: LevelBackgroundProps) {
    super(props);
    this.viewPort = { left: 0, right: 0, top: 0, bottom: 0 };
    this.size = props.size;
    this.map = props.map;
    this.layer = props.layer;
    this.buildTiles();
    events.on(
      "CAMERA_VIEWPORT",
      this,
      (viewPort: ViewPort) => (this.viewPort = viewPort)
    );
  }

  ready() {}

  buildTiles() {
    console.log("map", this.map, this.layer);
    this.map.layers[this.layer].forEach((tile, i) => {
      const x = i % this.size.x;
      const y = Math.floor(i / this.size.x);
      console.log("tile", tile, x, y);
      if (tile === 0) return; // Skip empty tiles
      this.addChild(
        new Tile(
          gridCells(x),
          gridCells(y),
          new Sprite({
            resource: resoures.images.grass, // Todo use tileset info
            hFrames: 6,
            vFrames: 12,
            frame: tile,
          })
        )
      );
    });
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
