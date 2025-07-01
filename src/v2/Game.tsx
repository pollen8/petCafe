import { useEffect, useRef } from "react";
import { Vector2 } from "./Vector2";
import { GameLoop } from "./GameLoop";
import { Main } from "./objects/Main/Main";
import { CaveLevel1 } from "./levels/CaveLevel1";
import { gridCells } from "./helpers/grid";

const mainScene = new Main({
  position: new Vector2(0, 0),
});

mainScene.setLevel(
  new CaveLevel1({
    heroPosition: new Vector2(gridCells(5), gridCells(6)),
  })
);

const update = (delta: number) => {
  mainScene.stepEntry(delta, mainScene);
};

const Game = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) {
      return;
    }
    const draw = () => {
      ctx.clearRect(0, 0, canvas?.width ?? 0, canvas?.height ?? 0);
      mainScene.drawBackground(ctx);

      mainScene.draw(ctx, 0, 0);
      mainScene.drawForeground(ctx);
    };

    const loop = new GameLoop(update, draw);
    loop.start();
  }, [ref]);

  return (
    <canvas
      ref={ref}
      style={{
        position: "absolute",
        imageRendering: "crisp-edges",
        zIndex: 1,
        top: 0,
        left: 0,
      }}
      width="300px"
      height="180px"
    />
  );
};

export default Game;
