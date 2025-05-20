import React, { createContext, useContext, useState } from "react";
import { Map, map } from "../maps/1"; // Import the map data

export const tileSize = 36;

const mapWidth = 10; // Assuming the map width is 10 (or use the value from context if needed)
interface GameContextType {
  tileSize: number;
  mapWidth: number;
  mapHeight: number;
  map: ReturnType<typeof useMap>;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

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

export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};
