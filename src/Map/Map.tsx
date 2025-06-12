import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type PropsWithChildren,
  type RefObject,
} from "react";
import styles from "./map.module.css";
import { useGame } from "../Game/useGame";
import { useSelector } from "@xstate/store/react";
import { resourcesStore } from "../Resources/resources.store";
import { tileSize } from "../Game/GameContext";
import { inventory } from "../Inventory/inventory.store";
import { Sprite } from "./sprite";
import { createAtom } from "@xstate/store";
import { Layer } from "./layer";
import { Character } from "./character";
// import { Character } from "../Character/Character";

// Character position atom
export const position = createAtom({ x: 0, y: 0 });

// Character movement speed
const speed = 16;

const useKeys = ({
  width,
  height,
  viewPort,
}: {
  width: number;
  height: number;
  viewPort: { width: number; height: number };
}) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      let nextPosition: number;
      const yThing = Math.ceil(-viewPort.height / 2 / tileSize) * tileSize;
      const xThing = Math.ceil(-viewPort.width / 2 / tileSize) * tileSize;
      switch (event.key) {
        case "ArrowUp":
          nextPosition = position.get().y - speed;
          if (nextPosition < yThing) {
            console.log("Cannot move up, out of bounds");
            return;
          }
          position.set((prev) => ({
            x: prev.x,
            y: prev.y - speed,
          }));
          break;
        case "ArrowDown":
          event.preventDefault();
          nextPosition = position.get().y + speed;
          if (nextPosition > height / 2 - yThing) {
            return;
          }
          position.set((prev) => ({
            x: prev.x,
            y: prev.y + speed,
          }));
          break;
        case "ArrowLeft":
          nextPosition = position.get().x - speed;
          if (nextPosition < xThing) {
            console.log("Cannot move up, out of bounds");
            return;
          }
          position.set((prev) => ({
            x: prev.x - speed,
            y: prev.y,
          }));
          break;
        case "ArrowRight":
          nextPosition = position.get().x + speed;
          if (nextPosition > width / 2 - xThing) {
            console.log("Cannot move right, out of bounds");
            return;
          }
          position.set((prev) => ({
            x: prev.x + speed,
            y: prev.y,
          }));
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [width, height]);
};

export const Map = ({
  children,
  ref,
}: PropsWithChildren & {
  ref: RefObject<HTMLDivElement | null>;
} & HTMLAttributes<HTMLDivElement>) => {
  const { map } = useGame();
  useKeys({
    width: map.currentMap.width * tileSize,
    height: map.currentMap.height * tileSize,
    viewPort: {
      width: 5 * tileSize, // Assuming viewport width is 5 tiles
      height: 5 * tileSize, // Assuming viewport height is 5 tiles
    },
  });
  const canvasRef = useRef(null) as RefObject<HTMLCanvasElement | null>;
  const selectedItem = useSelector(
    inventory,
    (state) => state.context.selectedItem
  );
  const [mousePosition, setMousePosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!selectedItem) return;
    const rect = ref.current?.getBoundingClientRect();
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
      inventory.send({ type: "clearSelected" });
      console.log("Placing item on the map at:", mousePosition);
      // Add logic to place the item on the map
      inventory.send({
        type: "remove",
        item: { ...selectedItem, quantity: 1 },
      });
      resourcesStore.send({
        type: "add",
        mapId: map.currentMap.id ?? "1",
        item: {
          id: selectedItem.id ?? "1",
          name: selectedItem.name,
          image: selectedItem.name,
          x: mousePosition.x / tileSize,
          y: mousePosition.y / tileSize,
          width: selectedItem.width ?? 1,
          height: selectedItem.height ?? 1,
          type: selectedItem.name === "house" ? "portal" : "resource", // Example: house is a portal
          state: selectedItem.state,
        },
      });
    } else {
      console.log("Item does not fit in the map.");
    }
  };

  // Make map really big

  // then small view port which is what
  const viewPort = {
    width: 5 * tileSize,
    height: 5 * tileSize,
  };

  console.log("Map tiles:", map.currentMap.tiles);

  useLayoutEffect(() => {
    const sprites = map.currentMap.tiles.map((tile, i) => {
      return new Sprite({
        x: (i % map.currentMap.width) * tileSize,
        tile,
        y: Math.floor(i / map.currentMap.width) * tileSize,
      });
    });

    const ctx = canvasRef.current?.getContext("2d") ?? null;

    const mapSize = {
      width: map.currentMap.width * tileSize,
      height: map.currentMap.height * tileSize,
    };
    const layer = new Layer({
      ctx,
      viewport: {
        x: position.get().x,
        ...viewPort,
        y: position.get().y,
      },
      mapSize,
      sprites,
    });

    const character = new Character({
      x: viewPort.width / 2 - tileSize / 2,
      y: viewPort.height / 2 - tileSize / 2,
      tile: "character", // Assuming you have a character tile
    });

    const animate = () => {
      layer.draw();
      if (ctx) {
        character.draw(ctx, mapSize, viewPort, false);
      }
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [
    canvasRef,
    map.currentMap.height,
    map.currentMap.tiles,
    map.currentMap.width,
    viewPort,
    viewPort.height,
    viewPort.width,
  ]);

  return (
    <div
      className={styles.map}
      ref={ref}
      onMouseMove={handleMouseMove}
      onClick={handleMapClick}
    >
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", zIndex: 1, top: 0, left: 0 }}
        width={viewPort.width}
        height={viewPort.height}
      />
      {/* {map.currentMap.tiles.map((type, i) => (
        <Tile type={type} key={i} />
      ))} */}

      {children}
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
  );
};
