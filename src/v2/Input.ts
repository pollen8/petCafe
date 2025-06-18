type InputDirection = "up" | "down" | "left" | "right";

export class Input {
  private heldKeys: InputDirection[] = [];
  constructor() {
    // document.addEventListener("keydown", this.keyDown.bind(this));
    document.addEventListener("keydown", (e) => {
      if (e.code === "ArrowUp" || e.code === "keyW") {
        this.onArrowPressed("up");
      }
      if (e.code === "ArrowDown" || e.code === "keyS") {
        this.onArrowPressed("down");
      }
      if (e.code === "ArrowLeft" || e.code === "keyA") {
        this.onArrowPressed("left");
      }
      if (e.code === "ArrowRight" || e.code === "keyD") {
        this.onArrowPressed("right");
      }
    });
    document.addEventListener("keyup", (e) => {
      {
        if (e.code === "ArrowUp" || e.code === "keyW") {
          this.onArrowReleased("up");
        }
        if (e.code === "ArrowDown" || e.code === "keyS") {
          this.onArrowReleased("down");
        }
        if (e.code === "ArrowLeft" || e.code === "keyA") {
          this.onArrowReleased("left");
        }
        if (e.code === "ArrowRight" || e.code === "keyD") {
          this.onArrowReleased("right");
        }
      }
    });
  }

  public get direction() {
    return this.heldKeys[0];
  }

  onArrowPressed(direction: InputDirection) {
    if (this.heldKeys.includes(direction)) {
      return;
    }
    this.heldKeys = [direction, ...this.heldKeys];
  }

  onArrowReleased(direction: InputDirection) {
    this.heldKeys = this.heldKeys.filter((k) => k !== direction);
  }
}
