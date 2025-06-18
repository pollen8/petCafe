export type AnimationConfig = {
  duration: number;
  frames: { time: number; frame: number }[];
};

const makeWlakingFrames = (rootFrame: number = 0) => {
  return {
    duration: 400,
    frames: [
      {
        time: 0,
        frame: rootFrame + 1,
      },
      {
        time: 100,
        frame: rootFrame,
      },
      {
        time: 200,
        frame: rootFrame + 1,
      },
      {
        time: 300,
        frame: rootFrame + 2,
      },
    ],
  };
};

const makeStandingFrames = (rootFrame: number = 0) => {
  return {
    duration: 400,
    frames: [{ time: 0, frame: rootFrame }],
  };
};

export const WALK_DOWN = makeWlakingFrames(0);
export const WALK_RIGHT = makeWlakingFrames(3);
export const WALK_UP = makeWlakingFrames(6);
export const WALK_LEFT = makeWlakingFrames(9);

export const STAND_DOWN = makeStandingFrames(1);
export const STAND_RIGHT = makeStandingFrames(4);
export const STAND_UP = makeStandingFrames(7);
export const STAND_LEFT = makeStandingFrames(10);
