import type { Animations } from "./Animations";
import { GameObject } from "./GameObject";
import type { ResourceState } from "./Resoources";
import { Vector2 } from "./Vector2";

type SpriteProps = {
  resource: ResourceState;
  /** Sprite resource size in px */
  frameSize?: Vector2;
  hFrames?: number;
  vFrames?: number;
  frame?: number;
  scale?: number;
  position?: Vector2;
  animations?: Animations;
};

export class Sprite extends GameObject {
  private resource: ResourceState;
  private frameSize: Vector2;
  private hFrames: number;
  private vFrames: number;
  public frame: number;
  private scale: number;
  public position: Vector2;
  private frameMap: Map<number, Vector2>;
  public animations?: Animations | undefined;
  constructor({
    resource, // Image we weant
    frameSize, // size of the crop image
    hFrames,
    frame,
    position,
    scale,
    vFrames,
    animations,
  }: SpriteProps) {
    super({});
    this.resource = resource;
    this.frameSize = frameSize ?? new Vector2(16, 16);
    this.hFrames = hFrames ?? 1;
    this.vFrames = vFrames ?? 1;
    this.frame = frame ?? 0;
    this.scale = scale ?? 1;
    this.position = position ?? new Vector2(0, 0);
    this.frameMap = new Map();
    this.animations = animations;

    this.buildFrameMap();
  }

  public buildFrameMap() {
    let frameCount = 0;
    for (let v = 0; v < this.vFrames; v++) {
      for (let h = 0; h < this.hFrames; h++) {
        this.frameMap.set(
          frameCount,
          new Vector2(this.frameSize.x * h, this.frameSize.y * v)
        );
        frameCount++;
      }
    }
  }
  public step(delta: number) {
    if (!this.animations) {
      return;
    }
    this.animations.step(delta);
    this.frame = this.animations.getFrame();
  }

  public drawImage(ctx: CanvasRenderingContext2D, x: number, y: number) {
    if (!this.resource.isLoaded) {
      return;
    }

    let frameCoordX = 0;
    let frameCoordY = 0;
    const frame = this.frameMap.get(this.frame);
    if (frame) {
      frameCoordX = frame.x;
      frameCoordY = frame.y;
    }
    const frameSizeX = this.frameSize.x;
    const frameSizeY = this.frameSize.y;
    ctx?.drawImage(
      this.resource.image,
      frameCoordX,
      frameCoordY, // top Y corner of frame
      frameSizeX, // How much to crop from the sprite sheet x
      frameSizeY, // y
      x, // where to place it on the canvas
      y, //y
      frameSizeX * this.scale, // scale
      frameSizeY * this.scale
    );
  }
}
