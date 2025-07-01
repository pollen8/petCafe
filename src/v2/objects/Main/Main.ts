import { Camera } from "../../Camera";
import { events } from "../../Events";
import { GameObject } from "../../GameObject";
import { Input } from "../../Input";
import type { Vector2 } from "../../Vector2";
import { Inventory } from "../Inventory/Inventory";
import type { Level } from "../Level/Level";

export class Main extends GameObject {
  public input: Input;
  public level: Level | null = null;
  public camera: Camera;
  private inventory: Inventory;
  constructor({ position }: { position: Vector2 }) {
    super({ position });
    this.level = null;
    this.input = new Input();
    this.camera = new Camera();
    this.inventory = new Inventory();
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

  drawBackground(ctx: CanvasRenderingContext2D) {
    this.level?.background?.drawTiles(ctx, this.camera);
  }

  drawForeground(ctx: CanvasRenderingContext2D) {
    this.inventory.draw(
      ctx,
      this.inventory.position.x,
      this.inventory.position.y
    );
  }
}
