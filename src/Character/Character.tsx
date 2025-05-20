import { useEffect, useState } from "react";
/** @ts-expect-error import */
import styles from "./character.module.css";
import { useGame } from "../Game/GameContext";
import { useNpc } from "../context/NpcContext";
import { inventory } from "../store/Inventory";

const useCharacter = () => {
  const { tileSize, mapWidth, mapHeight, map  } = useGame();
  const npc = useNpc()
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

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
          if (position.y < (mapHeight) * tileSize) {
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
          if (position.x < (mapWidth) * tileSize) {
            setPosition({
              x: position.x + tileSize,
              y: position.y,
            });
          }
          break;
        case " ":
        case "Enter":
            { const npcItem = npc.findByPosition(position.x, position.y)
            console.log("npcItem", npcItem)
            if (npcItem) {
                npcItem.interact()
              console.log("interact with npc");
              return;
            }
            const tile = map.getCurrentTile(position.x, position.y);
            console.log(tile)
            inventory.trigger.add({name: tile, quantity: 1, value: 10});
          break; }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [position, tileSize, mapWidth, mapHeight, npc, map, inventory]);

  return position;
};

export const Character = () => {
  const position = useCharacter();
  return <div className={styles.character} style={{top: `${position.y}px`, left: `${position.x}px`}}>bob!</div>;
};
