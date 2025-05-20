import { useGame } from "../Game/GameContext";
/** @ts-ignore */
import style from "./inventory.module.css";

export const Inventory = () => {
  const { inventory } = useGame();
  const { setSelectedItem, items, selectedItem } = inventory;
  console.log('selectedItem', selectedItem);
  return (
    <div className={style.inventory}>
      {Object.values(items).map((item, index) => (
        <button
          key={index}
          type="button"
          className={item.name == selectedItem?.name ? style.selected : ""}
          onClick={() => {
            console.log("click item", item);
            setSelectedItem(item);
          }}
        >
          <div>{item.name}</div>
          <p>Quantity: {item.quantity}</p>
        </button>
      ))}
    </div>
  );
};
