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
import { inventory } from "../store/Inventory";
import { bobinStore } from "../npc/Bobin/bobin.store";
import { shop } from "../shop/shop.store";
import { useSelector } from "@xstate/store/react";
import { Overlay } from "./Overlay";

const useSave = () => {
  const i = useSelector(inventory, ({ context }) => context);
  const b = useSelector(bobinStore, ({ context }) => context);
  const s = useSelector(shop, ({ context }) => context);
  return () => {
  const gameState = {
    inventory: i,
    bobin: b,
    shop: s,
  };
  return gameState;
}
}
const Game = () => {
  const gameContainerRef = useRef<HTMLDivElement>(null);
 const getGameDate = useSave();
  // Save the game state to local storage
  const saveGame = () => {
    
    const gameState = getGameDate();
    console.log("gameState", gameState)
    localStorage.setItem("gameState", JSON.stringify(gameState));
    console.log("Game saved!");
  };

  // Load the game state from local storage
  const loadGame = () => {
    const savedState = localStorage.getItem("gameState");
    if (savedState) {
      const gameState = JSON.parse(savedState);

      inventory.send({type: "restore", state: gameState.inventory}); // Restore inventory state
      bobinStore.send({type: 'restore', state: gameState.bobin });
      shop.send({type: 'restore', state: gameState.shop });

      console.log("Game loaded!");
    } else {
      console.log("No saved game found.");
    }
  };

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
            <Bobin maxResources={{ wood: 5 }} x={1} y={2} />
            <NpcGenerator />
            <Shop />
          </Map>
          <Overlay>
          <Inventory />
      <BobinResources />
          <div className={style.controls}>
            <button onClick={saveGame}>Save Game</button>
            <button onClick={loadGame}>Load Game</button>
          </div>
          </Overlay>
        </div>
      </NpcProvider>

    </GameProvider>
  );
};

export default Game;
