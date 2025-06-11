import { createStore } from "@xstate/store";
import { produce } from "immer";

type Character = {
  maxEnergy: number;
  energy: number;
};

export const characterStore = createStore({
  context: {
    energy: 100,
    maxEnergy: 100,
  } as Character,
  on: {
    useEnergy: (context, { amount }: { amount: number }) => {
      return produce(context, (draft) => {
        draft.energy = Math.max(0, draft.energy - amount);
      });
    },
    restoreEnergy: (context, { amount }: { amount: number }) => {
      return produce(context, (draft) => {
        draft.energy = Math.min(context.maxEnergy, draft.energy + amount);
      });
    },
    rest: (context) => {
      return produce(context, (draft) => {
        draft.energy = draft.maxEnergy; // Restore energy to max
      });
    },
  },
});
