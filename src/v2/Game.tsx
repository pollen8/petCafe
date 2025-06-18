import { useEffect, useRef } from "react";
import { resoures } from "./Resoources";
import { Sprite } from "./Sprite";
import { Vector2 } from "./Vector2";
import { GameLoop } from "./GameLoop";
import { Input } from "./Input";
import { MainScene } from "./objects/Hero/MainScene/MainScene";
import { Hero } from "./objects/Hero/Hero";
import { gridCells } from "./helpers/grid";
import { Camera } from "./Camera";
import { Rod } from "./objects/Rod/Rod";
import { Inventory } from "./objects/Inventory/Inventory";

const mainScene = new MainScene({
  position: new Vector2(0, 0),
  input: new Input(),
});

const skySprite = new Sprite({
  resource: resoures.images.sky,
  frameSize: new Vector2(320, 180),
});

const groupSprite = new Sprite({
  resource: resoures.images.ground,
  frameSize: new Vector2(320, 180),
});

const inventory = new Inventory();
mainScene.addChild(groupSprite);
const camera = new Camera();
mainScene.addChild(camera);
const update = (delta: number) => {
  mainScene.stepEntry(delta, mainScene);
};
const hero = new Hero(gridCells(6), gridCells(5));
mainScene.addChild(hero);

const rod = new Rod(gridCells(10), gridCells(6));
mainScene.addChild(rod);
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
      skySprite.drawImage(ctx, 0, 0);
      //save current state
      ctx.save();

      //offset by camera position
      ctx.translate(camera.position.x, camera.position.y);
      mainScene.draw(ctx, 0, 0);
      ctx.restore();
      inventory.draw(ctx, 0, 0);
    };

    const loop = new GameLoop(update, draw);
    loop.start();
  }, [ref]);

  return (
    <canvas
      ref={ref}
      style={{ position: "absolute", zIndex: 1, top: 0, left: 0 }}
      width="300px"
      height="180px"
    />
  );
};

export default Game;
