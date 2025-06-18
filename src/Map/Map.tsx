import {
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
import { GameLoop } from "../Game/GameLoop";

export const character = new Character({
  x: viewport.getWidth() / 2 - tileSize / 2,
  y: viewport.getHeight() / 2 - tileSize / 2,
  tile: "character",
});

const update = () => {
  console.log("update");
};

// Character movement speed
export const speed = 8;

export const Map = ({
  children,
  ref,
}: PropsWithChildren & {
  ref: RefObject<HTMLDivElement | null>;
} & HTMLAttributes<HTMLDivElement>) => {
  const { map } = useGame();
  const resources = useSelector(resourcesStore, (state) => state.context.items);
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

    const collisionBlocks = map.currentMap.collision.map((tile) => {
      return new Sprite({
        x: tile[0] * tileSize,
        y: tile[1] * tileSize,
        tile: "character",
      });
    });
    const resourceSprites = Object.values(resources[map.currentMap.id]).map(
      (resource) => {
        return new Sprite({
          x: resource.x * tileSize,
          y: resource.y * tileSize,
          tile: resource.type,
        });
      }
    );
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
      isFixed: false,
    });

    const collisionLayer = new Layer({
      ctx,
      viewport,
      mapSize,
      sprites: collisionBlocks,
    });

    const resourcesLayer = new Layer({
      ctx,
      viewport,
      mapSize,
      sprites: resourceSprites,
    });
    viewport.setCollisionLayer(collisionLayer);
    const animate = () => {
      if (!ctx) {
        return;
      }
      ctx.clearRect(0, 0, viewport.getWidth(), viewport.getHeight());
      layer.draw();
      collisionLayer.draw();
      resourcesLayer.draw();
      characterLayer.draw();

      // requestAnimationFrame(animate);
    };
    console.log("make loop", canvasRef, map);
    const gameloop = new GameLoop(update, animate);
    gameloop.start();
    // gameloop.start();
    // requestAnimationFrame(animate);
  }, [
    canvasRef,
    map.currentMap.collision,
    map.currentMap.height,
    map.currentMap.tiles,
    map.currentMap.width,
    map,
    resources,
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
