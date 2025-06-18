type UpdateFn = (timeStep: number) => void;
type RenderFn = () => void;

export class GameLoop {
  private lastFrameTime: number = 0;
  private accumulatedTime: number = 0;
  private timeStep: number = 1000 / 60; // 60 fps
  private update: UpdateFn;
  private render: RenderFn;
  private rafId: number | null = null;
  private isRunning: boolean = false;

  constructor(update: UpdateFn, render: RenderFn) {
    this.render = render;
    this.update = update;
  }

  mainLoop = (timeStamp: number) => {
    if (!this.isRunning) {
      return;
    }
    const deltaTime = timeStamp - this.lastFrameTime;
    this.lastFrameTime = timeStamp;

    this.accumulatedTime += deltaTime;

    while (this.accumulatedTime >= this.timeStep) {
      this.update(this.timeStep);
      this.accumulatedTime -= this.timeStep;
    }

    this.render();
    this.rafId = requestAnimationFrame(this.mainLoop);
  };

  start() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.rafId = requestAnimationFrame(this.mainLoop);
    }
  }

  stop() {
    this.isRunning = false;
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
  }
}
