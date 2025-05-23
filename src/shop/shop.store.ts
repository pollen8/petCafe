import { createStore } from "@xstate/store";

export type Item = {
  quantity: number;
  value: number;
  name: string;
};

export const shop = createStore({
  // Initial context
  context: {
    items: [{ name: "house", value: 100, quantity: 1 }],
    selectedItem: null,
  } as {
    items: Item[];
    selectedItem: Item | null;
    isOpen: boolean;
  },
  // Transitions
  on: {
    open: (context) => {
      return { ...context, isOpen: true };
    },
    close: (context) => {
      return { ...context, isOpen: false };
    },
    setSelected: (context, { name }: { name: string }) => {
      console.log("setSelected x", name);
      return {
        ...context,
        selectedItem: context.items.find((item) => item.name === name) ?? null,
      };
    },
    sellTo: (context, { item }: { item: Item }) => {
      const existingItemIndex = context.items.findIndex(
        (shopItem) => shopItem.name === item.name
      );
      if (existingItemIndex === -1) {
        // Item does not exist in the shop, add it
        return {
          ...context,
          items: [...context.items, item],
        };
      }

      // Item exists, update its quantity
      return {
        ...context,
        items: context.items.map((shopItem, index) =>
          index === existingItemIndex
            ? {
                ...shopItem,
                quantity: shopItem.quantity + item.quantity,
              }
            : shopItem
        ),
      };
    },
    purchase: (context, { item: { name, quantity } }: { item: Item }) => {
      const i = context.items.findIndex((item) => item.name === name);
      if (i === -1) {
        return context;
      }
      if (context.items[i].quantity < quantity) {
        console.log(`Not enough ${name} in stock`);
        return context;
      }
      if (context.items[i].quantity - quantity <= 0) {
        return {
          ...context,
          items: context.items.filter((item) => item.name !== name),
        };
      }
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
