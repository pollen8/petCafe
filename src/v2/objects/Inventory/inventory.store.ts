import { createStore } from "@xstate/store";
import { produce } from "immer";

export type Item = {
  id: string;
  quantity: number;
  value: number;
  name: string;
  width?: number;
  height?: number;
  state?: unknown;
};

type InventoryContext = {
  items: Item[];
  selectedItem: Item | null;
  money: number;
};

export const inventory = createStore({
  // Initial context
  context: {
    money: 0,
    items: [],
    selectedItem: null,
  } as InventoryContext,
  // Transitions
  on: {
    restore: (context, { state }: { state: InventoryContext }) => {
      return state;
    },
    clearSelected: (context) => {
      return {
        ...context,
        selectedItem: null,
      };
    },
    setSelected: (context, { name }: { name: string }) => {
      return {
        ...context,
        selectedItem: context.items.find((item) => item.name === name) ?? null,
      };
    },
    add: (context, { item }: { item: Item }) => {
      const i = context.items.findIndex((i) => i.name === item.name);
      return produce(context, (draft) => {
        if (i === -1) {
          draft.items.push(item);
        } else {
          draft.items[i].quantity = draft.items[i].quantity + item.quantity;
        }
      });
    },
    addMoney: (context, { amount }: { amount: number }) => {
      return {
        ...context,
        money: context.money + amount,
      };
    },
    removeMoney: (context, { amount }: { amount: number }) => {
      if (context.money < amount) {
        return context; // Return the same context if there's not enough money
      }
      return {
        ...context,
        money: context.money - amount,
      };
    },
    remove: (context, { item: { quantity, name } }: { item: Item }) => {
      const i = context.items.findIndex((i) => i.name === name);
      if (i === -1) {
        return context; // Return the same context if the item doesn't exist
      }

      const foundItem = context.items[i];
      if (foundItem.quantity <= quantity) {
        // Remove the item completely if the quantity to remove is greater than or equal to the current quantity
        return {
          ...context,
          items: context.items.filter((_, index) => index !== i),
        };
      }

      // Otherwise, reduce the item's quantity
      return {
        ...context,
        items: context.items.map((item, index) =>
          index === i
            ? {
                ...item,
                quantity: item.quantity - quantity,
              }
            : item
        ),
      };
    },
  },
});
