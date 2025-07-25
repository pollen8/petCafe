import { Camera } from "../../Camera";
import { events } from "../../Events";
import { GameObject } from "../../GameObject";
import { Input } from "../../Input";
import type { Vector2 } from "../../Vector2";
import { Mouse } from "../../Mouse";
import { Inventory } from "../Inventory/Inventory";
import type { Level } from "../Level/Level";

export class Main extends GameObject {
  public input: Input;
  public level: Level | null = null;
  public camera: Camera;
  private inventory: Inventory;
  private mouse: Mouse;
  constructor({ position }: { position: Vector2 }) {
    super({ position });
    this.level = null;
    this.input = new Input();
    this.camera = new Camera();
    this.inventory = new Inventory();
    this.mouse = new Mouse();
  }
  ready() {
    events.on("CHANGE_LEVEL", this, (level: Level) => {
      this.setLevel(level);
    });
  }
  setLevel(levelInstance: Level) {
    if (this.level) {
      this.level.destroy();
    }
    this.level = levelInstance;
    this.addChild(this.level);
  }

  // Draw everything offst by the curent camera position
  public draw(ctx: CanvasRenderingContext2D, x: number, y: number) {
    super.draw(ctx, x + this.camera.position.x, y + this.camera.position.y);
  }

  drawLayers(ctx: CanvasRenderingContext2D, layers: string[]) {
    if (!this.level) return;
    Object.entries(this.level.layers).forEach(([layerName, layer]) => {
      if (layers.includes(layerName)) {
        layer.drawTiles(ctx, this.camera);
      }
    });
  }

  drawUI(ctx: CanvasRenderingContext2D) {
    this.inventory.draw(
      ctx,
      this.inventory.position.x,
      this.inventory.position.y
    );
  }
}
