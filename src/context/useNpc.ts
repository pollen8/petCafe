import { createContext, useContext } from "react";

export interface Npc {
  id: string;
  x: number;
  y: number;
  interact: () => void;
}


interface NpcContextType {
  npcs: Npc[];
  addNpc: (npc: Npc) => void;
  removeNpc: (id: string) => void;
  findByPosition: (x: number, y: number) => Npc | undefined;
}


export const NpcContext = createContext<NpcContextType | undefined>(undefined);

export const useNpc = (): NpcContextType => {
  const context = useContext(NpcContext);
  if (!context) {
    throw new Error("useNpc must be used within an NpcProvider");
  }
  return context;
};