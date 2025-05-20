import React, { createContext, useContext, useState } from "react";

import { Map, map } from "../maps/1"; // Import the map data
import { useInventory } from "../hooks/useInventory";
import { useNpc } from "../hooks/useNpc";

export const tileSize = 36;

const mapWidth = 10; // Assuming the map width is 10 (or use the value from context if needed)
interface GameContextType {
  tileSize: number;
  mapWidth: number;
  mapHeight: number;
  inventory: ReturnType<typeof useInventory>;
  map: ReturnType<typeof useMap>;
  npc: ReturnType<typeof useNpc>;
}

const GameContext = createContext<GameContextType | undefined>(undefined);


  const inventory = useInventory();
const useMap = () => {
  const [currentMap, setCurrentMap] = useState<Map>(map); // Replace `any` with your map type
  const getCurrentTile = (x: number, y: number) => {
    // Calculate the tile's column and row
    const col = Math.floor(x / tileSize);
    const row = Math.floor(y / tileSize);
    // Calculate the index in the currentMap array
    const index = row * mapWidth + col;
    // Return the tile at the calculated index
    return currentMap.tiles[index];
  };
  return { currentMap, setCurrentMap, getCurrentTile };
};
const send = (event: { type: string; payload?: any }) => {
  switch (event.type) {
    case "INVENTORY_ADD":
      inventory.addItem(event.payload)
      console.log("Inventory add event received:", event.payload);
      break;
    default:
      console.log("Unknown event type:", event.type);
  }
}
export const GameProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const map = useMap();
  const npc = useNpc({mapHeight: map.currentMap.height, mapWidth: map.currentMap.width, send});
  return (
    <GameContext.Provider
      value={{
        tileSize,
        mapWidth: 10,
        mapHeight: 10,
        inventory,
        map,
        npc,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};
