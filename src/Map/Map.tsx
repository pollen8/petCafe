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
import { Layer } from "./layer";
import { Character } from "./character";
import { viewport } from "./viewport";

const character = new Character({
  x: viewport.getWidth() / 2 - tileSize / 2,
  y: viewport.getHeight() / 2 - tileSize / 2,
  tile: "character",
});

// Character movement speed
export const speed = 16;

const useKeys = ({
  width,
  height,
}: // viewPort,
{
  width: number;
  height: number;
}) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowUp":
          // nextPosition = viewPort.getPosition().y - speed;
          // if (nextPosition < yThing) {
          //   console.log("Cannot move up, out of bounds");
          //   return;
          // }
          viewport.move(0, -speed);
          break;
        case "ArrowDown":
          event.preventDefault();
          // nextPosition = viewPort.getPosition().y + speed;
          // if (nextPosition > height / 2 - yThing) {
          //   return;
          // }
          viewport.move(0, speed);
          break;
        case "ArrowLeft":
          // nextPosition = viewPort.getPosition().x - speed;
          // if (nextPosition < xThing) {
          //   console.log("Cannot move up, out of bounds");
          //   return;
          // }
          viewport.move(-speed, 0);
          break;
        case "ArrowRight":
          // nextPosition = viewPort.getPosition().x + speed;
          // if (nextPosition > width / 2 - xThing) {
          //   console.log("Cannot move right, out of bounds");
          //   return;
          // }
          viewport.move(speed, 0);
          // character.move(speed, 0);
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
  useLayoutEffect(() => {
    viewport.setMap({
      width: map.currentMap.width * tileSize,
      height: map.currentMap.height * tileSize,
    });
    const sprites = map.currentMap.tiles.map((tile, i) => {
      return new Sprite({
        x: (i % map.currentMap.width) * tileSize,
        tile,
        y: Math.floor(i / map.currentMap.width) * tileSize,
      });
    });

    const ctx = canvasRef.current?.getContext("2d") ?? null;
    if (ctx) ctx.imageSmoothingEnabled = false;
    const mapSize = {
      width: map.currentMap.width * tileSize,
      height: map.currentMap.height * tileSize,
    };
    const layer = new Layer({
      ctx,
      viewport,
      mapSize,
      sprites,
    });
    // Character in its own layer
    const characterLayer = new Layer({
      ctx,
      viewport,
      mapSize,
      sprites: [character],
    });

    const animate = () => {
      layer.draw();
      characterLayer.draw();
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [
    canvasRef,
    map.currentMap.height,
    map.currentMap.tiles,
    map.currentMap.width,
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
        width={viewport.getWidth()}
        height={viewport.getHeight()}
      />

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
