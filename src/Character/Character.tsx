import { useEffect, useState } from "react";
/** @ts-ignore */
import styles from "./character.module.css";
import { useGame } from "../Game/GameContext";

const useCharacter = () => {
  const { tileSize, mapWidth, mapHeight, inventory, map, npc } = useGame();
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
            const npcItem = npc.findByPosition(position.x, position.y)
            console.log("npcItem", npcItem)
            if (npcItem) {
                npcItem.interact()
              console.log("interact with npc");
              return;
            }
            const tile = map.getCurrentTile(position.x, position.y);
            console.log(tile)
            inventory.addItem({name: tile, quantity: 1, value: 10});
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [position, tileSize, mapWidth, mapHeight]);

  return position;
};

export const Character = () => {
  const position = useCharacter();
  return <div className={styles.character} style={{top: `${position.y}px`, left: `${position.x}px`}}>bob!</div>;
};
