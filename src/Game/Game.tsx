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
import { Bobin } from "../npc/Bobin/Bobin";
import { BobinResources } from "../npc/Bobin/BobinResources";

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
          <Bobin maxResources={{wood: 5}} x={1} y={2} />
          <NpcGenerator />
          <Shop />
        </Map>
        <Inventory />
      </div>
      </NpcProvider>
      <BobinResources />
    </GameProvider>
  );
};

export default Game;
