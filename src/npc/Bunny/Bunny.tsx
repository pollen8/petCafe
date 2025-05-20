/** @ts-expect-error import */
import styles from "./bunny.module.css";
import { tileSize, useGame } from "../../Game/GameContext";
import { useEffect, useState } from "react";

interface BunnyProps {
  x: number;
  y: number;
}

export const Bunny = ({ x, y }: BunnyProps) => {
    const {map} = useGame();
  const [position, setPosition] = useState({ x, y });

  useEffect(() => {
    const hopInterval = setInterval(() => {
      // Calculate possible adjacent tiles
      const possibleMoves = [
        { x: position.x - tileSize, y: position.y }, // Left
        { x: position.x + tileSize, y: position.y }, // Right
        { x: position.x, y: position.y - tileSize }, // Up
        { x: position.x, y: position.y + tileSize }, // Down
      ];

      // Filter moves to ensure they stay within the map boundaries
      const validMoves = possibleMoves.filter(
        (move) =>
          move.x >= 0 &&
          move.x < map.currentMap.width * tileSize &&
          move.y >= 0 &&
          move.y < map.currentMap.height * tileSize
      );

      // Choose a random valid move
      const nextMove =
        validMoves[Math.floor(Math.random() * validMoves.length)];

      // Update the bunny's position
      setPosition(nextMove);
    }, 10000); // Hop every 1 second

    return () => clearInterval(hopInterval); // Cleanup the interval on unmount
  }, [position, map]);

  return (
    <div
      className={styles.bunny}
      style={{
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: "32px",
        height: "32px",
        // backgroundColor: "pink",
        // borderRadius: "50%",
        // transition: "transform 0.3s ease", // Smooth hopping animation
      }}
    ></div>
  );
};
