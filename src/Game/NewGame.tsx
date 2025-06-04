import { inventory } from "../Inventory/inventory.store";
import { bobinStore } from "../npc/Bobin/bobin.store";
import { resourcesStore } from "../Resources/resources.store";
import { shop } from "../shop/shop.store";
import { useGame } from "./useGame";

export const NewGameButton = () => {
  const { map } = useGame();
  const newGame = () => {
    localStorage.removeItem("gameState");
    resourcesStore.send({ type: "restore", state: { items: {} } });
    inventory.send({
      type: "restore",
      state: { items: [], selectedItem: null, money: 0 },
    });
    bobinStore.send({
      type: "restore",
      state: { ...bobinStore.get().context },
    });
    shop.send({ type: "restore", state: { ...shop.get().context } });
    // Optionally, reset to the default map (e.g., map 1)
    import("../maps/1").then((mod) => {
      const defaultMap = mod.map;
      if (defaultMap) {
        map.setCurrentMap(defaultMap);
      }
    });
  };
  return <button onClick={newGame}>New Game</button>;
};
