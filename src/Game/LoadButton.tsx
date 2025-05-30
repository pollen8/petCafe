// Load the game state from local storage
import { inventory } from "../Inventory/inventory.store";
import { bobinStore } from "../npc/Bobin/bobin.store";
import { resourcesStore } from "../Resources/resources.store";
import { shop } from "../shop/shop.store";
// import { map as map1 } from "../maps/1";
// import { house as houseMap } from "../maps/house";
import type { GameContextType } from "./GameContext";
import { useGame } from "./useGame";

// const mapRegistry: Record<string, GameContextType["map"]> = {
//   "1": map1,
//   "house": houseMap,
// };

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
    if (gameState.currentMapId) {
      // Dynamically import the map module by resource name
      import(`../maps/${gameState.currentMapId}.ts`).then((mod) => {
        console.log("Loaded map module:", mod);
        // The map export could be named after the file or 'map'
        const newMap = mod[gameState.currentMapId] || mod.map;
        if (newMap) {
          map.setCurrentMap(newMap);
          // setPosition({ x: 0, y: 0 });
        } else {
          console.error("Map not found in module", mod);
        }
        // const loadedMap = mapRegistry[gameState.currentMapId] ?? map1;
        // map.setCurrentMap(loadedMap); // Restore the current map by id
      });
      console.log("Game loaded!");
    } else {
      console.log("No saved game found.");
    }
  }
}

export const LoadButton = () => {
  const { map } = useGame();
  const loadGameState = () => {
    loadGame(map);
  };
  return <button onClick={() => loadGameState()}>Load Game</button>;
};
