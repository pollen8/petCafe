// The higher this value, the less the fps will reflect temporary variations

import { createAtom } from "@xstate/store";

// A value of 1 will only keep the last value
const filterStrength = 20;
let lastLoop = new Date(),
  thisLoop;
export const frameTime = createAtom(0);

export class GameLoop {
  // Draw to canvas
  private render: () => void;
  // Update games tate
  private update: (timeStep: number) => void;
  private isRunning = false;
  private lastFrameTime = 0;
  private accumulatedTime = 0;
  private timeStep = 1000 / 60; // 60 fps

  private rfaId: null | number;

  constructor(update: () => void, render: () => void) {
    this.isRunning = false;
    this.update = update;
    this.render = render;
    this.rfaId = null;
  }

  private mainLoop(timeStamp: number) {
    console.log(timeStamp);
    this.rfaId = requestAnimationFrame(this.mainLoop.bind(this));
    if (!this.isRunning) {
      return;
    }

    thisLoop = new Date();
    const thisFrameTime = thisLoop.getTime() - lastLoop.getTime();
    frameTime.set((prev) => {
      return prev + (thisFrameTime - frameTime.get()) / filterStrength;
    });
    lastLoop = thisLoop;

    const deltaTimeStamp = timeStamp - this.lastFrameTime;
    this.accumulatedTime += deltaTimeStamp;

    while (this.accumulatedTime >= this.timeStep) {
      //   console.log(this);
      this.update(this.timeStep);
      this.accumulatedTime -= this.timeStep;
    }
    this.render();
    this.rfaId = requestAnimationFrame(this.mainLoop.bind(this));
  }
  start() {
    this.isRunning = true;
    this.rfaId = requestAnimationFrame(this.mainLoop.bind(this));
  }

  stop() {
    this.isRunning = false;
    if (this.rfaId) {
      cancelAnimationFrame(this.rfaId);
    }
  }
}
