import { useEffect, useState } from "react";
import { tileSize, useGame } from "../Game/GameContext";

type Props = {
  mapWidth: number;
  mapHeight: number;
  send: (event: {type: string; payload?: any }) => void;
};

class Bunny {
    x: number;
    y: number;
    send: (event: {type: string; payload?: any }) => void;
    
    constructor({x, y, send}: {x: number, y: number, send: (event: {type: string; payload?: any }) => void}) {
        this.x = x;
        this.y = y;
        this.send = send;
    }
    
    interact() {
        this.send({type: 'INVENTORY_ADD', payload: {name: 'Bunny', quantity: 1, value: 10}});   
    }
}

export const useNpc = ({ mapHeight, mapWidth, send }: Props) => {
  const [bunnies, setBunnies] = useState<{ x: number; y: number, interact: () => void }[]>([]);

  useEffect(() => {
    // Generate a random number of bunnies (e.g., between 1 and 5)
    const bunnyCount = Math.floor(Math.random() * 5) + 1;

    // Generate random positions for the bunnies
    const newBunnies = Array.from({ length: bunnyCount }, () => (new Bunny({
      x: Math.floor(Math.random() * mapWidth) * tileSize,
      y: Math.floor(Math.random() * mapHeight) * tileSize,
      send,
    })));

    setBunnies(newBunnies);
  }, [mapWidth, mapHeight, tileSize]);
  const findByPosition = (x: number, y: number) => {
    return bunnies.find((bunny) => bunny.x === x && bunny.y === y);
  };

  return { findByPosition, bunnies };
};
