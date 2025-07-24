import { Animations } from "../../Animations";
import { events } from "../../Events";
import { FrameIndexPattern } from "../../FrameIndexPattern";
import { GameObject } from "../../GameObject";
import { gridCells, isSpaceFee } from "../../helpers/grid";
import { moveTowards } from "../../helpers/moveTowards";
import { resoures, type ResourceState } from "../../Resources";
import { Sprite } from "../../Sprite";
import { Vector2 } from "../../Vector2";
import type { Main } from "../Main/Main";
import {
  PICK_UP_DOWN,
  STAND_DOWN,
  STAND_LEFT,
  STAND_RIGHT,
  STAND_UP,
  WALK_DOWN,
  WALK_LEFT,
  WALK_RIGHT,
  WALK_UP,
} from "./heroAnimations";

export class Hero extends GameObject {
  private heroFacing: "up" | "down" | "right" | "left" = "down";
  private destinationPosition: Vector2;
  private body: Sprite;
  private lastX: number = 0;
  private lastY: number = 0;
  private itemPickupTime = 0;
  private itemPickupShell: GameObject | null = null;

  constructor(x: number, y: number) {
    super({
      position: new Vector2(x, y),
    });
    this.id = "hero";
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
        pickUpDown: new FrameIndexPattern(PICK_UP_DOWN),
      }),
    });
    this.addChild(this.body);

    events.on("HERO_PICKS_UP_ITEM", this, (data) => {
      this.onPickUpItem(data);
    });
    console.log("hero", this);
  }

  step(delta: number, root: Main) {
    if (this.itemPickupTime > 0) {
      this.workOnItemPickup(delta);
      return;
    }
    const distance = moveTowards(this, this.destinationPosition, 1);
    const hasArrived = distance <= 1;
    if (hasArrived) {
      this.tryMove(root);
    }
    this.tryEmitPosition();
  }

  tryEmitPosition() {
    if (this.lastX === this.position.x && this.lastY === this.position.y) {
      return;
    }
    this.lastX = this.position.x;
    this.lastY = this.position.y;
    events.emit("HERO_POSITION", this.position);
  }

  tryMove(root: Main) {
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

    const spaceIsFree =
      root.level?.walls && isSpaceFee(root.level?.walls, nextX, nextY);
    const solidBodyAtSpace = this.parent?.children.find(
      (c) => c.isSolid && c.position.x === nextX && c.position.y === nextY
    );

    if (this.atLevelBound(nextX, nextY, root)) {
      return;
    }
    // @todo check collisions
    if (spaceIsFree && !solidBodyAtSpace) {
      this.destinationPosition.x = nextX;
      this.destinationPosition.y = nextY;
    }
  }

  // Deterime if the hero will walk outside of the map.
  // retun true to stop him from walking out.
  atLevelBound(nextX: number, nextY: number, root: Main) {
    const levelWidth = gridCells(root.level?.size.x ?? 0);
    const levelHeight = gridCells(root.level?.size.y ?? 0);
    return nextX < 0 || nextY < 0 || nextX > levelWidth || nextY > levelHeight;
  }

  onPickUpItem(data: { image: ResourceState; position: Vector2 }) {
    this.destinationPosition = data.position.duplicate();
    this.itemPickupTime = 2500;

    this.itemPickupShell = new GameObject({});
    this.itemPickupShell.addChild(
      new Sprite({
        resource: data.image,
        position: new Vector2(0, -18),
      })
    );
    this.addChild(this.itemPickupShell);
  }

  workOnItemPickup(delta: number) {
    this.itemPickupTime -= delta;
    this.body.animations?.play("pickUpDown");
    if (this.itemPickupTime <= 0 && this.itemPickupShell) {
      this.itemPickupShell.destroy();
    }
  }
}
