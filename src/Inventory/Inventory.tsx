import { inventory } from "../store/Inventory";
/** @ts-expect-error blah */
import style from "./inventory.module.css";

import { useSelector } from "@xstate/store/react";

export const Inventory = () => {
  const { items, selectedItem } = useSelector(
    inventory,
    (state) => state.context
  );
  console.log("selectedItem", selectedItem);
  return (
    <div className={style.inventory}>
      {Object.values(items).map((item, index) => (
        <button
          key={index}
          type="button"
          className={item.name == selectedItem?.name ? style.selected : ""}
          onClick={() => {
            console.log("click item", item);
            inventory.trigger.setSelected({name: item.name});
          }}
        >
          <div>{item.name}</div>
          <p>Quantity: {item.quantity}</p>
        </button>
      ))}
    </div>
  );
};
