import { GameObject } from "../../../GameObject";
import type { Input } from "../../../Input";
import type { Vector2 } from "../../../Vector2";

export class MainScene extends GameObject {
  public input: Input;
  constructor({ position, input }: { position: Vector2; input: Input }) {
    super({ position });
    this.input = input;
  }
}
