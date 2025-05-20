import React, { useEffect, useState } from "react";
import { useGame } from "../Game/GameContext";
import { Bunny } from "./Bunny/Bunny";



export const NpcGenerator: React.FC = () => {
  const { tileSize, mapWidth, mapHeight, npc } = useGame();

//   useEffect(() => {
//     // Generate a random number of bunnies (e.g., between 1 and 5)
//     const bunnyCount = Math.floor(Math.random() * 5) + 1;

//     // Generate random positions for the bunnies
//     const newBunnies = Array.from({ length: bunnyCount }, () => ({
//       x: Math.floor(Math.random() * mapWidth) * tileSize,
//       y: Math.floor(Math.random() * mapHeight) * tileSize,
//     }));

//     setBunnies(newBunnies);
//   }, [mapWidth, mapHeight, tileSize]);

  return (
    <>
      {npc.bunnies.map((bunny, index) => (
        <Bunny key={index} x={bunny.x} y={bunny.y} />
      ))}
    </>
  );
};