import { createStore } from "@xstate/store";

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
      console.log("setSelected x", name);
      return {
        ...context,
        selectedItem: context.items.find((item) => item.name === name) ?? null,
      };
    },
    add: (context, { item }: { item: Item }) => {
      const i = context.items.findIndex((i) => i.name === item.name);
      if (i === -1) {
        return { ...context, items: [...context.items, item] };
      }
      return {
        ...context,
        items: context.items.map((ix, index) =>
          index === i
            ? {
                ...ix,
                quantity: ix.quantity + item.quantity,
              }
            : item
        ),
      };
    },
    addMoney: (context, { amount }: { amount: number }) => {
      console.log(amount);
      console.log(`Adding money: ${amount}`);
      return {
        ...context,
        money: context.money + amount,
      };
    },
    removeMoney: (context, { amount }: { amount: number }) => {
      if (context.money < amount) {
        console.log(`Not enough money to remove: ${amount}`);
        return context; // Return the same context if there's not enough money
      }
      console.log(`Removing money: ${amount}`);
      return {
        ...context,
        money: context.money - amount,
      };
    },
    remove: (context, { item: { quantity, name } }: { item: Item }) => {
      const i = context.items.findIndex((i) => i.name === name);
      if (i === -1) {
        console.log(`Item ${name} not found in inventory.`);
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
