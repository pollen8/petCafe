/* eslint-disable @typescript-eslint/no-unused-vars */
import { events } from "./Events";
import { Vector2 } from "./Vector2";

export type GameObjectProps = {
  position?: Vector2;
  drawOffset?: Vector2;
  id?: string;
};

export class GameObject {
  public id: string;
  public position: Vector2;
  protected drawOffset: Vector2;
  protected parent: GameObject | null = null;
  private hasReadyBeenCalled = false;
  public isSolid = false;
  public drawLayer: string | null = null;

  children: GameObject[];

  constructor({ position, drawOffset, id }: GameObjectProps) {
    this.id = id ?? "na";
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
    this.getDrawOrder().forEach((child) => child.draw(ctx, drawPosX, drawPosY));
  }

  protected getDrawOrder() {
    const a = this.children.toSorted((a, b) => {
      if (a.drawLayer === "FLOOR") {
        return -1;
      }
      return a.position.y >= b.position.y ? 1 : -1;
    });
    return a;
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
    events.unsubscribe(gameObject);
    this.children = this.children.filter((child) => child !== gameObject);
  }

  destroy() {
    this.children.forEach((c) => c.destroy());
    this.parent?.removeChild(this);
  }

  protected absoluteY(y: number) {
    y = y + this.position.y;
    if (this.parent) {
      y = this.parent.absoluteY(y);
    }
    return y;
  }

  protected absoluteYX(x: number) {
    x = x + this.position.x;
    if (this.parent) {
      x = this.parent.absoluteYX(x);
    }
    return x;
  }
}
