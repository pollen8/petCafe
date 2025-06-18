import type { AnimationConfig } from "./objects/Hero/heroAnimations";

export class FrameIndexPattern {
  private animationConfig: AnimationConfig;
  private duration: number;
  public currentTime: number = 0;

  constructor(animationConfig: AnimationConfig) {
    this.animationConfig = animationConfig;
    this.duration = animationConfig.duration;
  }

  get frame() {
    const { frames } = this.animationConfig;
    for (let i = frames.length - 1; i >= 0; i--) {
      if (this.currentTime >= frames[i].time) {
        return frames[i].frame;
      }
    }
    throw "bad time";
  }

  step(delta: number) {
    this.currentTime += delta;
    if (this.currentTime >= this.duration) {
      this.currentTime = 0;
    }
  }
}
