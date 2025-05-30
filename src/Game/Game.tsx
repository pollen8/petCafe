import { useRef, useState } from "react";
import { Map } from "../Map/Map";
import { Inventory } from "../Inventory/Inventory";
import { GameProvider, tileSize } from "./GameContext";
import { NpcGenerator } from "../npc/NpcGenerator";
import style from "./game.module.css";
import { Character } from "../Character/Character";
import { NpcProvider } from "../context/NpcContext";
import { Shop } from "../shop/Shop";
import { Bobin } from "../npc/Bobin/Bobin";
import { BobinResources } from "../npc/Bobin/BobinResources";
import { bobinStore } from "../npc/Bobin/bobin.store";
import { shop } from "../shop/shop.store";
import { useSelector } from "@xstate/store/react";
import { Overlay } from "./Overlay";
import { inventory } from "../Inventory/inventory.store";

const Game = () => {
  const gameContainerRef = useRef<HTMLDivElement>(null);
  const selectedItem = useSelector(inventory, (state) => state.context.selectedItem);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | null>(null);

  // Save the game state to local storage
  const saveGame = () => {
    const gameState = {
      inventory: inventory.get().context,
      bobin: bobinStore.get().context,
      shop: shop.get().context,
    };
    localStorage.setItem("gameState", JSON.stringify(gameState));
    console.log("Game saved!");
  };

  // Load the game state from local storage
  const loadGame = () => {
    const savedState = localStorage.getItem("gameState");
    if (savedState) {
      const gameState = JSON.parse(savedState);

      inventory.send({ type: "restore", state: gameState.inventory });
      bobinStore.send({ type: "restore", state: gameState.bobin });
      shop.send({ type: "restore", state: gameState.shop });

      console.log("Game loaded!");
    } else {
      console.log("No saved game found.");
    }
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!selectedItem) return;
    const rect = gameContainerRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePosition({
        x: Math.floor((event.clientX - rect.left) / tileSize) * tileSize,
        y: Math.floor((event.clientY - rect.top) / tileSize) * tileSize,
      });
    }
  };

  const handleMapClick = () => {
    if (!selectedItem || !mousePosition) return;

    const itemWidth = (selectedItem?.width ?? 1) * tileSize;
    const itemHeight = (selectedItem?.height ?? 1) * tileSize;

    // Check if the rectangle fits within the map boundaries
    const mapWidth = 10 * tileSize; // Assuming map width is 10 tiles
    const mapHeight = 10 * tileSize; // Assuming map height is 10 tiles

    if (
      mousePosition.x + itemWidth <= mapWidth &&
      mousePosition.y + itemHeight <= mapHeight
    ) {

      // Add logic to place the item on the map
      inventory.send({ type: "remove", item: {...selectedItem, quantity: 1} });
    } else {
      console.log("Item does not fit in the map.");
    }
  };

  return (
    <GameProvider>
      <NpcProvider>
        <div
          className={style.game}
          onMouseMove={handleMouseMove}
          onClick={handleMapClick}
        >
          <Map
          ref={gameContainerRef}
          >
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
          {selectedItem && mousePosition && (
            <div
              style={{
                position: "absolute",
                left: `${mousePosition.x}px`,
                top: `${mousePosition.y}px`,
                width: `${(selectedItem.width ?? 1) * tileSize}px`,
                height: `${(selectedItem.height ?? 1) * tileSize}px`,
                backgroundColor: "rgba(208, 255, 208, 0.69)", // Semi-transparent green
                pointerEvents: "none", // Prevent interfering with mouse events
              }}
            ></div>
          )}
        </div>
      </NpcProvider>
    </GameProvider>
  );
};

export default Game;
