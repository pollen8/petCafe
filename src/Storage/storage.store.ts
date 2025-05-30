import { createStore } from "@xstate/store";
import type { Item } from "../Inventory/inventory.store";

interface StorageContext {
  capacity: number;
  items: Item[];
  isOpen: boolean;
}

export const storageStore = createStore({
  context: {
    capacity: 20, // Default capacity
    items: [],
    isOpen: false,
  } as StorageContext,
  on: {
    add: (context, { item }: { item: Item }) => {
      const totalQuantity = context.items.reduce((sum, i) => sum + i.quantity, 0) + item.quantity;
      if (totalQuantity > context.capacity) {
        // Exceeds capacity, do not add
        return context;
      }
      const existingIndex = context.items.findIndex((i) => i.id === item.id);
      if (existingIndex !== -1) {
        // Update quantity if item exists
        return {
          ...context,
          items: context.items.map((i, idx) =>
            idx === existingIndex ? { ...i, quantity: i.quantity + item.quantity } : i
          ),
        };
      }
      // Add new item
      return {
        ...context,
        items: [...context.items, item],
      };
    },
    remove: (context, { id, quantity }: { id: string; quantity: number }) => {
      const idx = context.items.findIndex((i) => i.id === id);
      if (idx === -1) return context;
      const item = context.items[idx];
      if (item.quantity <= quantity) {
        // Remove item completely
        return {
          ...context,
          items: context.items.filter((i) => i.id !== id),
        };
      }
      // Subtract quantity
      return {
        ...context,
        items: context.items.map((i, iidx) =>
          iidx === idx ? { ...i, quantity: i.quantity - quantity } : i
        ),
      };
    },
    setCapacity: (context, { capacity }: { capacity: number }) => ({
      ...context,
      capacity,
    }),
    clear: (context) => ({
      ...context,
      items: [],
    }),
    open: (context) => ({
      ...context,
      isOpen: true,
    }),
    close: (context) => ({
      ...context,
      isOpen: false,
    }),
  },
});
