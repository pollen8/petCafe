import { createStore } from "@xstate/store";
import type { Item } from "../Inventory/inventory.store";
import { produce } from "immer";

/**
 * Storage store.
 * Contains a record of each storage resource in the game and the
 * items stored inside them.
 * E.g. a chest in the player's house.
 */

export type StorageStore = {
  capacity: number;
  items: Item[];
  isOpen: boolean;
};

type StorageContext = {
  currentStorageId: string;
  stores: Record<string, StorageStore>;
};

export const storageStore = createStore({
  context: {
    currentStorageId: "",
    stores: {},
  } as StorageContext,

  on: {
    setCurrentStorageId: (context, { storageId }: { storageId: string }) => ({
      ...context,
      currentStorageId: storageId,
    }),
    addStore: (context, { id, store }: { id: string; store: StorageStore }) => {
      if (context.stores[id]) {
        console.error("store" + id + "already exists");
        return;
      }
      context.stores[id] = store;
    },
    add: (context, { item }: { item: Item }) => {
      const storage = context.stores[context.currentStorageId];
      const totalQuantity =
        storage.items.reduce((sum, i) => sum + i.quantity, 0) + item.quantity;
      if (totalQuantity > storage.capacity) {
        // Exceeds capacity, do not add
        return context;
      }
      const existingIndex = storage.items.findIndex((i) => i.id === item.id);
      if (existingIndex !== -1) {
        // Update quantity if item exists
        return produce(context, (draft) => {
          draft.stores[context.currentStorageId].items[
            existingIndex
          ].quantity += item.quantity;
        });
      }
      // Add new item
      return produce(context, (draft) => {
        draft.stores[context.currentStorageId].items.push(item);
      });
    },
    remove: (context, { id, quantity }: { id: string; quantity: number }) => {
      const storage = context.stores[context.currentStorageId];
      const idx = storage.items.findIndex((i) => i.id === id);
      if (idx === -1) return context;
      const item = storage.items[idx];
      if (item.quantity <= quantity) {
        // Remove item completely
        return produce(context, (draft) => {
          draft.stores[context.currentStorageId].items = draft.stores[
            context.currentStorageId
          ].items.filter((i) => i.id !== id);
        });
      }
      // Subtract quantity
      return produce(context, (draft) => {
        draft.stores[context.currentStorageId].items[idx].quantity--;
      });
    },
    setCapacity: (context, { capacity }: { capacity: number }) => ({
      ...context,
      capacity,
    }),
    clear: (context) => ({
      ...context,
      items: [],
    }),
    open: (context, { id }: { id: string }) => {
      return produce(context, (draft) => {
        draft.currentStorageId = id;
        draft.stores[id].isOpen = true;
      });
    },
    close: (context) => {
      return produce(context, (draft) => {
        draft.stores[draft.currentStorageId].isOpen = false;
        draft.currentStorageId = "";
      });
    },
  },
});
