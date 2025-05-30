import {
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

export const Map = ({
  children,
  ref,
}: PropsWithChildren & {
  ref: RefObject<HTMLDivElement | null>;
} & HTMLAttributes<HTMLDivElement>) => {
  const { map } = useGame();

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
          x: mousePosition.x / tileSize,
          y: mousePosition.y / tileSize,
          width: selectedItem.width ?? 1,
          height: selectedItem.height ?? 1,
          type: selectedItem.name === "house" ? "portal" : "resource", // Example: house is a portal
        },
      });
    } else {
      console.log("Item does not fit in the map.");
    }
  };

  console.log("map", map);
  const resources = useSelector(resourcesStore, (state) => state.context.items);
  console.log("resources", resources);
  return (
    <div
      className={styles.map}
      ref={ref}
      onMouseMove={handleMouseMove}
      onClick={handleMapClick}
    >
      {map.currentMap.tiles.map((type, i) => (
        <Tile type={type} key={i} />
      ))}
      {Object.values(resources[map.currentMap.id] ?? {}).map((resource) => (
        <div
          key={resource.id}
          className={styles.resource}
          title={resource.name}
          style={{
            background: `url("${resource.name}.png") no-repeat`,
            left: resource.x * tileSize,
            top: resource.y * tileSize,
            width: resource.width * tileSize,
            height: resource.height * tileSize,
          }}
        >
          {/* {resource.name} */}
        </div>
      ))}
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
