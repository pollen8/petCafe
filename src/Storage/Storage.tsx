import React from "react";
import styles from "./storage.module.css";
import { useSelector } from "@xstate/store/react";
import { storageStore } from "./storage.store";

export const StorageModal: React.FC = () => {
  const isOpen = useSelector(storageStore, (state) => state.context.isOpen);
  const items = useSelector(storageStore, (state) => state.context.items);
  const close = () => storageStore.send({ type: "close" });
  if (!isOpen) return null;
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Storage</h2>
        <div className={styles.grid}>
          {items.length === 0 ? (
            <div className={styles.empty}>No items in storage.</div>
          ) : (
            items.map((item) => (
              <div key={item.id} className={styles.gridItem}>
                <div>{item.name}</div>
                <div>Qty: {item.quantity}</div>
              </div>
            ))
          )}
        </div>
        <button onClick={close}>Close</button>
      </div>
    </div>
  );
};
