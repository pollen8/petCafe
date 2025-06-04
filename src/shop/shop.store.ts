import { createStore } from "@xstate/store";
import type { Item } from "../Inventory/inventory.store";

type ShopContext = {
  items: Item[];
  selectedItem: Item | null;
  isOpen: boolean;
};
export const shop = createStore({
  context: {
    items: [
      {
        id: "house",
        name: "house",
        value: 100,
        quantity: 1,
        width: 2,
        height: 2,
        state: { to: "house" },
      },
    ],
    isOpen: false,
    selectedItem: null,
  } as ShopContext,
  on: {
    restore: (context, { state }: { state: ShopContext }) => {
      return state;
    },
    open: (context) => {
      return { ...context, isOpen: true };
    },
    close: (context) => {
      return { ...context, isOpen: false };
    },
    setSelected: (context, { name }: { name: string }) => {
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
