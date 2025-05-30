// Save the game state to local storage
import { inventory } from "../Inventory/inventory.store";
import { bobinStore } from "../npc/Bobin/bobin.store";
import { resourcesStore } from "../Resources/resources.store";
import { shop } from "../shop/shop.store";
import { useGame } from "./useGame";

export const SaveButton = () => {
  const { map } = useGame();
  const saveGame = () => {
    const gameState = {
      inventory: inventory.get().context,
      bobin: bobinStore.get().context,
      resources: resourcesStore.get().context,
      shop: shop.get().context,
      currentMap: map.currentMap, // Save the current map
    };
    localStorage.setItem("gameState", JSON.stringify(gameState));
    console.log("Game saved!");
  };
  return <button onClick={() => saveGame()}>Save Game</button>;
};
