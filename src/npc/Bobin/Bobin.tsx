/** @ts-expect-error import */
import styles from "./bobin.module.css";
import { tileSize, useGame } from "../../Game/GameContext";
import { useEffect, useState } from "react";
import { useSelector } from "@xstate/store/react";
import { bobinStore } from "./bobin.store";

interface BobinProps {
  x: number;
  y: number;
  maxResources: { [key: string]: number }; // Maximum amount of each resource Bobin can collect
}

export const Bobin = ({ x, y, maxResources }: BobinProps) => {
  const { map } = useGame();
  const [position, setPosition] = useState({ x, y });

  const resources = useSelector(bobinStore, ({ context }) => context.resources);

  useEffect(() => {
    const moveInterval = setInterval(() => {
      // Check if Bobin has collected the maximum amount of all resources
      const hasCollectedAll = Object.keys(maxResources).every(
        (resource) => (resources[resource] || 0) >= maxResources[resource]
      );

      if (hasCollectedAll) {
        clearInterval(moveInterval); // Stop moving if all resources are collected
        return;
      }

    const nextMove = {
        x: Math.floor(Math.random() * map.currentMap.width * tileSize - tileSize),
        y: Math.floor(Math.random() * map.currentMap.height * tileSize - tileSize),
    }
        console.log("nextMove", nextMove)
      // Update Bobin's position
      setPosition(nextMove);

      // Collect the resource on the current tile
      const currentTile = map.getCurrentTile(nextMove.x, nextMove.y);
      if (currentTile) {
        bobinStore.send({ type: "collectResource", resource: currentTile });
      }
    }, 1000); // Move every 1 second

    return () => clearInterval(moveInterval); // Cleanup interval on unmount
  }, [position, resources, map, maxResources]);

  return (
    <div
      className={styles.bunny}
      style={{
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: "32px",
        height: "32px",
      }}
    >
      <div className={styles.resources}>
       
      </div>
    </div>
  );
};
