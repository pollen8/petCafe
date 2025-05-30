// Load the game state from local storage
import { inventory } from "../Inventory/inventory.store";
import { bobinStore } from "../npc/Bobin/bobin.store";
import { resourcesStore } from "../Resources/resources.store";
import { shop } from "../shop/shop.store";
import type { GameContextType } from "./GameContext";
import { useGame } from "./useGame";

function loadGame(map: GameContextType["map"]) {
  const savedState = localStorage.getItem("gameState");
  if (savedState) {
    const gameState = JSON.parse(savedState);
    resourcesStore.send({
      type: "restore",
      state: gameState.resources,
    });
    inventory.send({ type: "restore", state: gameState.inventory });
    bobinStore.send({ type: "restore", state: gameState.bobin });
    shop.send({ type: "restore", state: gameState.shop });
    if (gameState.currentMap) {
      map.setCurrentMap(gameState.currentMap); // Restore the current map
    }
    console.log("Game loaded!");
  } else {
    console.log("No saved game found.");
  }
}

export const LoadButton = () => {
  const { map } = useGame();
  const loadGameState = () => {
    loadGame(map);
  };
  return <button onClick={() => loadGameState()}>Load Game</button>;
};