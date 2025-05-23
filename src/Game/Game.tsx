import { useEffect, useRef } from "react";
import { Map } from "../Map/Map";
import { Inventory } from "../Inventory/Inventory";
import { GameProvider } from "./GameContext";
import { NpcGenerator } from "../npc/NpcGenerator";
/** @ts-expect-error import */
import style from "./game.module.css";
import { Character } from "../Character/Character";
import { NpcProvider } from "../context/NpcContext";
import { Shop } from "../shop/Shop";

const Game = () => {
  const gameContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (gameContainerRef.current) {
      gameContainerRef.current.id = "game";
    }
  }, []);

  return (
    <GameProvider>
      <NpcProvider>
      <div ref={gameContainerRef} className={style.game}>
        <Map>
          <Character />
          <NpcGenerator />
          <Shop />
        </Map>
        <Inventory />
      </div>
      </NpcProvider>
    </GameProvider>
  );
};

export default Game;
