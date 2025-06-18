import { Animations } from "../../Animations";
import { FrameIndexPattern } from "../../FrameIndexPattern";
import { GameObject } from "../../GameObject";
import { isSpaceFee } from "../../helpers/grid";
import { moveTowards } from "../../helpers/moveTowards";
import { walls } from "../../levels/level1";
import { resoures } from "../../Resoources";
import { Sprite } from "../../Sprite";
import { Vector2 } from "../../Vector2";
import {
  STAND_DOWN,
  STAND_LEFT,
  STAND_RIGHT,
  STAND_UP,
  WALK_DOWN,
  WALK_LEFT,
  WALK_RIGHT,
  WALK_UP,
} from "./heroAnimations";
import type { MainScene } from "./MainScene/MainScene";

export class Hero extends GameObject {
  private heroFacing: "up" | "down" | "right" | "left" = "down";
  private destinationPosition: Vector2;
  private body: Sprite;

  constructor(x: number, y: number) {
    super({
      position: new Vector2(x, y),
    });
    this.heroFacing = "down";
    this.destinationPosition = this.position.duplicate();

    const shadow = new Sprite({
      resource: resoures.images.shadow,
      frameSize: new Vector2(32, 32),
      position: new Vector2(-8, -20),
    });

    this.addChild(shadow);

    this.body = new Sprite({
      resource: resoures.images.hero,
      frameSize: new Vector2(32, 32),
      hFrames: 3,
      vFrames: 8,
      frame: 1,
      position: new Vector2(-8, -20),
      animations: new Animations({
        walkUp: new FrameIndexPattern(WALK_UP),
        walkDown: new FrameIndexPattern(WALK_DOWN),
        walkRight: new FrameIndexPattern(WALK_RIGHT),
        walkLeft: new FrameIndexPattern(WALK_LEFT),
        standUp: new FrameIndexPattern(STAND_UP),
        standDown: new FrameIndexPattern(STAND_DOWN),
        standRight: new FrameIndexPattern(STAND_RIGHT),
        standLeft: new FrameIndexPattern(STAND_LEFT),
      }),
    });
    this.addChild(this.body);
  }

  step(_delta: number, root: MainScene) {
    const distance = moveTowards(this, this.destinationPosition, 1);
    const hasArrived = distance <= 1;
    if (hasArrived) {
      this.tryMove(root);
    }
  }

  tryMove(root: MainScene) {
    const { input } = root;
    if (!input.direction) {
      if (this.heroFacing === "down") {
        this.body.animations?.play("standDown");
      }
      if (this.heroFacing === "up") {
        this.body.animations?.play("standUp");
      }
      if (this.heroFacing === "right") {
        this.body.animations?.play("standRight");
      }
      if (this.heroFacing === "left") {
        this.body.animations?.play("standLeft");
      }
    }
    const gridSize = 16;
    let nextX = this.destinationPosition.x;
    let nextY = this.destinationPosition.y;
    if (input.direction === "down") {
      nextY += gridSize;
      this.body.animations?.play("walkDown");
    }
    if (input.direction === "up") {
      nextY -= gridSize;
      this.body.animations?.play("walkUp");
    }

    if (input.direction === "right") {
      this.body.animations?.play("walkRight");
      nextX += gridSize;
    }
    if (input.direction === "left") {
      this.body.animations?.play("walkLeft");
      nextX -= gridSize;
    }

    this.heroFacing = input.direction ?? this.heroFacing;
    // @todo check collisions
    if (isSpaceFee(walls, nextX, nextY)) {
      this.destinationPosition.x = nextX;
      this.destinationPosition.y = nextY;
    }
  }
}
