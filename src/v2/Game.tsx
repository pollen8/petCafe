import { useEffect, useRef } from "react";
import { Vector2 } from "./Vector2";
import { GameLoop } from "./GameLoop";
import { Main } from "./objects/Main/Main";
import { CaveLevel1 } from "./levels/CaveLevel1";
import { events } from "./Events";

const baseWidth = 300;
const baseHeight = 180;

const mainScene = new Main({
  position: new Vector2(0, 0),
});

mainScene.setLevel(new CaveLevel1());

const update = (delta: number) => {
  mainScene.stepEntry(delta, mainScene);
};

const Game = () => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const resize = () => {
      const scale = Math.min(
        window.innerWidth / baseWidth,
        window.innerHeight / baseHeight
      );
      canvas.width = scale * baseWidth;
      canvas.height = scale * baseHeight;
      events.emit("RESIZE_WINDOW", {
        width: canvas.width,
        height: canvas.height,
        scale,
      });
    };

    resize();
    window.addEventListener("resize", resize);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Scale and center the game scene
      const scale = Math.min(
        canvas.width / baseWidth,
        canvas.height / baseHeight
      );
      const offsetX = (canvas.width - baseWidth * scale) / 2;
      const offsetY = (canvas.height - baseHeight * scale) / 2;
      ctx.setTransform(scale, 0, 0, scale, offsetX, offsetY);

      mainScene.drawLayers(ctx, ["background", "backgroundDecoration"]);
      mainScene.draw(ctx, 0, 0);
      mainScene.drawLayers(ctx, ["foreground"]);
      mainScene.drawUI(ctx);
    };

    const loop = new GameLoop(update, draw);
    loop.start();

    return () => {
      window.removeEventListener("resize", resize);
      loop.stop?.();
    };
  }, []);

  return (
    <canvas
      ref={ref}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        imageRendering: "crisp-edges",
        zIndex: 1,
        border: "1px solid black",
      }}
    />
  );
};

export default Game;
