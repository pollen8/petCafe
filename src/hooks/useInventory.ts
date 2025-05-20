import { useState } from "react";

type Item = {
  quantity: number;
  value: number;
  name: string;
};

export const useInventory = () => {
  const [inventory, setInventory] = useState<Record<string, Item>>({});
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const addItem = (item: Item) => {
    if (getItem(item.name)) {
      setInventory({
        ...inventory,
        [item.name]: {
          ...inventory[item.name],
          quantity: inventory[item.name].quantity + item.quantity,
          value: inventory[item.name].value + item.value,
        },
      });
      return;
    }
    setInventory({ ...inventory, [item.name]: item });
  };
  const removeItem = (item: Item) => {
    const foo = structuredClone(inventory);
    delete foo[item.name];
    setInventory(foo);
  };
  const getItem = (name: string) => {
    return inventory[name];
  };
  return {
    items: inventory,
    addItem,
    removeItem,
    getItem,
    selectedItem,
    setSelectedItem,
  };
};