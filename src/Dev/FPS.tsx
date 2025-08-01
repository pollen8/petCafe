import { useSelector } from "@xstate/store/react";
import { frameTime } from "../Game/GameLoop";

export const FPS = () => {
  const currentCount = useSelector(frameTime, (s) => (1000 / s).toFixed(1));
  return <div> FPS: {currentCount}</div>;
};
