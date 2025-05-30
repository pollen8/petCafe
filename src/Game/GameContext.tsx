import React, { useState } from "react";
import { type Map, map } from "../maps/1"; // Import the map data
import { GameContext } from "./useGame";
import { resourcesStore } from "../Resources/resources.store";

export const tileSize = 32;

const mapWidth = 10; // Assuming the map width is 10 (or use the value from context if needed)
export interface GameContextType {
  tileSize: number;
  mapWidth: number;
  mapHeight: number;
  map: ReturnType<typeof useMap>;
}

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

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const map = useMap(); // Move inside the component
  resourcesStore.send({
    type: "initialize",
    mapId: map.currentMap.id ?? "1",
    items: map.currentMap.resources,
  });
  return (
    <GameContext.Provider
      value={{
        tileSize,
        mapWidth: 10,
        mapHeight: 10,
        map,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
