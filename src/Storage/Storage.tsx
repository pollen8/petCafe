import React from "react";
import styles from "./storage.module.css";
import { useSelector } from "@xstate/store/react";
import { storageStore } from "./storage.store";
import { inventory } from "../Inventory/inventory.store";
import type { Item } from "../Inventory/inventory.store";

export const StorageModal: React.FC = () => {
  const currentId = useSelector(
    storageStore,
    (state) => state.context.currentStorageId
  );
  const stores = useSelector(storageStore, (state) => state.context.stores);
  const isOpen = stores[currentId]?.isOpen ?? false;
  const storageItems = stores[currentId]?.items ?? [];
  const capacity = stores[currentId]?.capacity ?? 0;
  const inventoryItems: Item[] = useSelector(
    inventory,
    (state) => state.context.items
  );
  const close = () => storageStore.send({ type: "close" });

  // Add item from inventory to storage
  const handleAddToStorage = (item: Item) => {
    if (storageItems.length > capacity) {
      alert("no room left");
      return;
    }
    storageStore.send({ type: "add", item: { ...item, quantity: 1 } });
    inventory.send({ type: "remove", item: { ...item, quantity: 1 } });
  };

  // Remove item from storage to inventory
  const handleRemoveFromStorage = (item: Item) => {
    storageStore.send({ type: "remove", id: item.id, quantity: 1 });
    inventory.send({ type: "add", item: { ...item, quantity: 1 } });
  };

  if (!isOpen) return null;
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Storage</h2>
        <div className={styles.sections}>
          <div className={styles.section}>
            <h3>Inventory</h3>
            <div className={styles.grid}>
              {inventoryItems.length === 0 ? (
                <div className={styles.empty}>No items in inventory.</div>
              ) : (
                inventoryItems.map((item) => (
                  <div
                    key={item.id}
                    className={styles.gridItem}
                    onClick={() => handleAddToStorage(item)}
                    style={{ cursor: "pointer" }}
                    title="Click to move to storage"
                  >
                    <div>{item.name}</div>
                    <div>Qty: {item.quantity}</div>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className={styles.section}>
            <h3>Storage</h3>
            <div className={styles.grid}>
              {storageItems.length === 0 ? (
                <div className={styles.empty}>No items in storage.</div>
              ) : (
                storageItems.map((item) => (
                  <div
                    key={item.id}
                    className={styles.gridItem}
                    onClick={() => handleRemoveFromStorage(item)}
                    style={{ cursor: "pointer" }}
                    title="Click to move to inventory"
                  >
                    <div>{item.name}</div>
                    <div>Qty: {item.quantity}</div>
                  </div>
                ))
              )}
              {new Array(capacity - storageItems.length)
                .fill("")
                .map((item, i) => (
                  <div key={i} className={styles.gridItem} />
                ))}
            </div>
          </div>
        </div>
        <button className={styles.button} type="button" onClick={close}>
          Close
        </button>
      </div>
    </div>
  );
};
