import { useEffect, useState } from "react";
import styles from "./character.module.css";
import { useGame } from "../Game/useGame";
import { useNpc } from "../context/useNpc";
import { shop as shopStore } from "../shop/shop.store";
import { inventory } from "../Inventory/inventory.store";
import { resourcesStore, type MapResource } from "../Resources/resources.store";
import { useSelector } from "@xstate/store/react";
import { storageStore, type StorageStore } from "../Storage/storage.store";

const useResouceItems = () => {
  const { map } = useGame();
  const foo = useSelector(resourcesStore, (state) => state.context.items);
  const [resourceItems, setResourceItems] = useState<{
    [key: string]: MapResource;
  }>({});
  useEffect(() => {
    setResourceItems(foo[map.currentMap.id] || {});
  }, [foo, map.currentMap.id]);
  return resourceItems;
};

const useCharacter = () => {
  const { tileSize, mapWidth, mapHeight, map } = useGame();
  const npc = useNpc();
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  const resourceItems = useResouceItems();
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowUp":
          if (position.y > 0) {
            setPosition({
              x: position.x,
              y: position.y - tileSize,
            });
          }
          break;
        case "ArrowDown":
          if (position.y < mapHeight * tileSize) {
            setPosition({
              x: position.x,
              y: position.y + tileSize,
            });
          }
          break;
        case "ArrowLeft":
          if (position.x > 0) {
            setPosition({
              x: position.x - tileSize,
              y: position.y,
            });
          }
          break;
        case "ArrowRight":
          if (position.x < mapWidth * tileSize) {
            setPosition({
              x: position.x + tileSize,
              y: position.y,
            });
          }
          break;
        case " ":
        case "Enter": {
          const npcItem = npc.findByPosition(position.x, position.y);
          if (npcItem) {
            npcItem.interact();
            return;
          }
          // @todo interact with resource rect (house is larger than tile)
          const resourceItem = Object.values(resourceItems).find(
            (item) =>
              item.x * tileSize === position.x &&
              item.y * tileSize === position.y
          );
          if (resourceItem) {
            console.log("interact with resource", resourceItem);
            if (resourceItem.type === "portal") {
              // Dynamically import the map module by resource name
              import(`../maps/${(resourceItem.state as { to: string }).to}.ts`)
                .then((mod) => {
                  console.log("loaded map module:", mod);
                  // The map export could be named after the file or 'map'
                  const newMap = mod[resourceItem.id] || mod.map;
                  if (newMap) {
                    const s = newMap.resources.filter(
                      (r: MapResource) => r.type === "storage"
                    );
                    console.log("s", s);
                    s.forEach((r: MapResource) => {
                      if (r.state) {
                        storageStore.send({
                          type: "addStore",
                          id: r.id,
                          store: r.state as StorageStore,
                        });
                      }
                    });
                    console.log("new map ", newMap);
                    // resourcesStore.send({
                    //   type: "initialize",
                    //   mapId: newMap.id ?? "1",
                    //   items: newMap.resources,
                    // });
                    console.log(storageStore.getSnapshot());
                    map.setCurrentMap(newMap);
                    setPosition({ x: 0, y: 0 });
                  } else {
                    console.error("Map not found in module", mod);
                  }
                })
                .catch((err) => {
                  console.error("Failed to load map", err);
                });
              return;
            }
            if (resourceItem.type === "shop") {
              shopStore.trigger.open();
              return;
            }
            if (resourceItem.type === "storage") {
              storageStore.send({
                type: "open",
                id: resourceItem.id,
              });
              return;
            }
            return;
          }
          const tile = map.getCurrentTile(position.x, position.y);
          inventory.trigger.add({
            item: { id: tile, name: tile, quantity: 1, value: 10 },
          });
          break;
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [position, tileSize, mapWidth, mapHeight, npc, map, resourceItems]);

  return position;
};

export const Character = () => {
  const position = useCharacter();
  return (
    <div
      className={styles.character}
      style={{ top: `${position.y}px`, left: `${position.x}px` }}
    ></div>
  );
};
