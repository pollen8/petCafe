/* eslint-disable @typescript-eslint/no-unused-vars */
import { events } from "./Events";
import { Vector2 } from "./Vector2";

type GameObjectProps = {
  position?: Vector2;
  drawOffset?: Vector2;
};

export class GameObject {
  public position: Vector2;
  private drawOffset: Vector2;
  private parent: GameObject | null = null;
  private hasReadyBeenCalled = false;
  children: GameObject[];

  constructor({ position, drawOffset }: GameObjectProps) {
    this.position = position ?? new Vector2(0, 0);
    this.drawOffset = drawOffset ?? new Vector2(0, 0);
    this.children = [];
  }

  // Called before the first step
  ready() {}
  stepEntry(delta: number, root: GameObject) {
    this.children.forEach((child) => child.stepEntry(delta, root));
    if (!this.hasReadyBeenCalled) {
      this.hasReadyBeenCalled = true;
      this.ready();
    }
    this.step(delta, root);
  }
  public step(_delta: number, root: GameObject) {
    // this.c
  }
  public draw(ctx: CanvasRenderingContext2D, x: number, y: number) {
    const drawPosX = x + this.position.x + this.drawOffset.x;
    const drawPosY = y + this.position.y + this.drawOffset.y;
    this.drawImage(ctx, drawPosX, drawPosY);

    this.children.forEach((child) => child.draw(ctx, drawPosX, drawPosY));
  }

  public drawImage(
    ctx: CanvasRenderingContext2D,
    _drawPosX: number,
    drawPosY: number
  ) {}

  addChild(gameObject: GameObject) {
    gameObject.parent = this;
    this.children.push(gameObject);
  }

  removeChild(gameObject: GameObject) {
    console.log("remove chid", gameObject);
    events.unsubscribe(gameObject);
    this.children = this.children.filter((child) => child !== gameObject);
  }

  destroy() {
    this.children.forEach((c) => c.destroy());
    this.parent?.removeChild(this);
  }
}
