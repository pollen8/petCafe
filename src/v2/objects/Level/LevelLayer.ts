import type { Camera } from "../../Camera";
import { events } from "../../Events";
import { GameObject, type GameObjectProps } from "../../GameObject";
import { gridCells } from "../../helpers/grid";
import type { Map } from "../../levels/types";
import { resoures } from "../../Resources";
import { Sprite } from "../../Sprite";
import { Vector2 } from "../../Vector2";
import { Tile } from "../Tile/Tile";

export type LevelBackgroundProps = GameObjectProps & {
  heroPosition?: Vector2;
  size: Vector2;
  map: Map;
  layer: "background" | "foreground" | "backgroundDecoration";
};

type ViewPort = {
  left: number;
  right: number;
  top: number;
  bottom: number;
};

export class LevelLayer extends GameObject {
  protected size: Vector2;
  private viewPort: ViewPort;

  private map: Map;
  private layer: "background" | "foreground" | "backgroundDecoration";
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

  private findTileset(tile: number) {
    return this.map.tilesets.find((ts) => {
      return tile >= ts.firstgid;
    });
  }

  private findResource(tileset: Map["tilesets"][number]) {
    return resoures.images[tileset.source];
  }

  private getTilesetSprite(tileset: Map["tilesets"][number], tile: number) {
    const resource = this.findResource(tileset);
    const props = {
      resource,
      hFrames: tileset.columns,
      vFrames: Math.ceil(tileset.tilecount / tileset.columns),
      frame: tile - (tileset.firstgid ?? 0),
    };
    return new Sprite(props);
  }

  buildTiles() {
    this.map.layers[this.layer].forEach((tile, i) => {
      const x = i % this.size.x;
      const y = Math.floor(i / this.size.x);
      const tileset = this.findTileset(tile);
      if (tile === 0 || !tileset) return; // Skip empty tiles
      this.addChild(
        new Tile(
          gridCells(x),
          gridCells(y),
          this.getTilesetSprite(tileset, tile),
          this.layer
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
