/* eslint-disable @typescript-eslint/no-unused-vars */
import { Vector2 } from "./Vector2";

type GameObjectProps = {
  position?: Vector2;
  drawOffset?: Vector2;
};

export class GameObject {
  public position: Vector2;
  private drawOffset: Vector2;
  children: GameObject[];

  constructor({ position, drawOffset }: GameObjectProps) {
    this.position = position ?? new Vector2(0, 0);
    this.drawOffset = drawOffset ?? new Vector2(0, 0);
    this.children = [];
  }

  stepEntry(delta: number, root: GameObject) {
    this.children.forEach((child) => child.stepEntry(delta, root));
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
    this.children.push(gameObject);
  }

  removeChild(gameObject: GameObject) {
    this.children = this.children.filter((child) => child !== gameObject);
  }
}
