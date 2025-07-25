import type { Animations } from "./Animations";
import { events } from "./Events";
import { GameObject } from "./GameObject";
import type { ResourceState } from "./Resources";
import { Vector2 } from "./Vector2";

export type SpriteProps = {
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
  private windowScale = 1;
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
    events.on("RESIZE_WINDOW", this, (data: { scale: number }) => {
      this.windowScale = data.scale;
    });
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
    if (!this.resource) {
      console.warn("Sprite resource is not defined");
      return;
    }
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

  protected pointInItem(data: { x: number; y: number }) {
    const y = this.absoluteY(0);
    const x = this.absoluteYX(0);
    // x / y are the top left corner of the sprite
    // data.x / data.y are the mouse position in the canvas
    // We need to descaled the mouse position to match the sprite size
    // this.windowScale is the scale of the canvas
    const descaledX = data.x / this.windowScale;
    const descaledY = data.y / this.windowScale;
    const mousePosition = new Vector2(descaledX, descaledY);

    return (
      mousePosition.x >= x &&
      mousePosition.x <= x + this.frameSize.x &&
      mousePosition.y >= y &&
      mousePosition.y <= y + this.frameSize.y
    );
  }
}
