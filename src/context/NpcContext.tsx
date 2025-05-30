import React, { useState, useCallback, useEffect } from "react";
import { tileSize } from "../Game/GameContext";
import { inventory } from "../Inventory/inventory.store";
import { useGame } from "../Game/useGame";
import { NpcContext, type Npc } from "./useNpc";

class Bunny {
    id: string;
    x: number;
    y: number;
    iteraction: (event: {type: string; payload?: unknown }) => void;
    
    constructor({id, x, y, interact}: Npc) {
      this.id = id;
        this.x = x;
        this.y = y;
        this.iteraction = interact;
    }
    
    interact() {
        this.iteraction({type: 'INVENTORY_ADD', payload: {name: 'Bunny', quantity: 1, value: 10}});   
    }
}


export const NpcProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [npcs, setNpcs] = useState<Npc[]>([]);
  const {map} = useGame();

  const addNpc = useCallback((npc: Npc) => {
    setNpcs((prev) => [...prev, npc]);
  }, []);

  const removeNpc = useCallback((id: string) => {
    setNpcs((prev) => prev.filter((npc) => npc.id !== id));
  }, []);

  const findByPosition = useCallback(
    (x: number, y: number) => {
      return npcs.find((npc) => npc.x === x && npc.y === y);
    },
    [npcs]
  );

    useEffect(() => {
    // Generate a random number of bunnies (e.g., between 1 and 5)
    const bunnyCount = Math.floor(Math.random() * 5) + 1;

    // Generate random positions for the bunnies
    const newBunnies = Array.from({ length: bunnyCount }, () => (new Bunny({
      id: `bunny-${Math.random().toString(36).substr(2, 9)}`,
      x: Math.floor(Math.random() * map.currentMap.width) * tileSize,
      y: Math.floor(Math.random() * map.currentMap.height) * tileSize,
      interact: () => inventory.trigger.add({item: {name: 'Bunny', quantity: 1, value: 10}}),
    })));

    setNpcs(newBunnies);
  }, [map]);
  return (
    <NpcContext.Provider value={{ npcs, addNpc, removeNpc, findByPosition }}>
      {children}
    </NpcContext.Provider>
  );
};

