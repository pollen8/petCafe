import React from "react";
import { Bunny } from "./Bunny/Bunny";
import { useNpc } from "../context/NpcContext";

export const NpcGenerator = () => {
  const  {npcs}  = useNpc();
  return (
    <>
      {npcs.map((bunny, index) => (
        <Bunny key={index} x={bunny.x} y={bunny.y} />
      ))}
    </>
  );
};
