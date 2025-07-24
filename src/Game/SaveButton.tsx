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
      currentMapId: map.currentMap.id ?? "1", // Only store the map id
    };
    localStorage.setItem("gameState", JSON.stringify(gameState));
  };
  return <button onClick={() => saveGame()}>Save Game</button>;
};
