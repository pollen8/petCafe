import { useEffect, useRef } from "react";
import { resoures } from "./Resoources";
import { Sprite } from "./Sprite";
import { Vector2 } from "./Vector2";
import { GameLoop } from "./GameLoop";
import { Input } from "./Input";
import { MainScene } from "./objects/Hero/MainScene/MainScene";
import { Hero } from "./objects/Hero/Hero";
import { gridCells } from "./helpers/grid";

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

mainScene.addChild(skySprite);
mainScene.addChild(groupSprite);

const update = (delta: number) => {
  mainScene.stepEntry(delta, mainScene);
};

const hero = new Hero(gridCells(6), gridCells(5));
mainScene.addChild(hero);

const Game = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) {
      return;
    }
    const draw = () => {
      mainScene.draw(ctx, 0, 0);
    };

    const loop = new GameLoop(update, draw);
    loop.start();
  }, [ref]);

  return (
    <canvas
      ref={ref}
      style={{ position: "absolute", zIndex: 1, top: 0, left: 0 }}
      width="300px"
      height="300px"
    />
  );
};

export default Game;
