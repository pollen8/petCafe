import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type PropsWithChildren,
  type RefObject,
} from "react";
import { Tile } from "../Tile/Tile";
import styles from "./map.module.css";
import { useGame } from "../Game/useGame";
import { useSelector } from "@xstate/store/react";
import { resourcesStore } from "../Resources/resources.store";
import { tileSize } from "../Game/GameContext";
import { inventory } from "../Inventory/inventory.store";
import { Sprite } from "./sprite";
import { createAtom } from "@xstate/store";
import { Layer } from "./layer";

export const position = createAtom({ x: 0, y: 0 });
const speed = 16;
const useKeys = ({ width, height }: { width: number; height: number }) => {
  console.log("map width:", width, "height:", height);
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowUp":
          if (position.get().y - speed < 0) {
            return;
          }
          position.set((prev) => ({
            x: prev.x,
            y: prev.y - speed,
          }));
          // Handle up arrow key
          break;
        case "ArrowDown":
          event.preventDefault();
          if (position.get().y + speed > height) {
            return;
          }
          position.set((prev) => ({
            x: prev.x,
            y: prev.y + speed,
          }));
          break;
        case "ArrowLeft":
          if (position.get().x - speed < 0) {
            return;
          }
          position.set((prev) => ({
            x: prev.x - speed,
            y: prev.y,
          }));
          break;
        case "ArrowRight":
          if (position.get().x + speed > width) {
            return;
          }
          position.set((prev) => ({
            x: prev.x + speed,
            y: prev.y,
          }));
          console.log("New position:", position.get());
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
    width: 5,
    height: 5,
  };

  console.log("Map tiles:", map.currentMap.tiles);

  useLayoutEffect(() => {
    const sprites = map.currentMap.tiles.map((tile, i) => {
      return new Sprite({
        x: (i % viewPort.width) * tileSize,
        tile,
        y: Math.floor(i / viewPort.width) * tileSize,
        ctx: canvasRef.current?.getContext("2d") ?? null,
      });
    });

    const layer = new Layer({
      ctx: canvasRef.current?.getContext("2d") ?? null,
      viewport: {
        x: position.get().x,
        width: 5 * tileSize,
        height: 5 * tileSize,
        y: position.get().y,
      },
      sprites,
    });
    const animate = () => {
      layer.draw();
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [canvasRef, map.currentMap.tiles, viewPort.width]);

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
        width={viewPort.width * tileSize}
        height={viewPort.height * tileSize}
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
