import { useSelector } from "@xstate/store/react";
import { shop as shopStore } from "./shop.store";
import styles from "./shop.module.css";
import { inventory } from "../Inventory/inventory.store";
// import { useGame } from "../Game/useGame";

export const Shop = () => {
  // const { shop } = useGame();
  const money = useSelector(inventory, (state) => state.context.money);
  const items = useSelector(inventory, (state) => state.context.items);
  const isOpen = useSelector(shopStore, (state) => state.context.isOpen);
  console.log('sop open', isOpen)
  const stock = useSelector(shopStore, (state) => state.context.items);
  return (
    <>
      {/* <div
        style={{
          position: "absolute",
          left: `${shop.x}px`,
          top: `${shop.y}px`,
          width: "32px",
          height: "32px",
          backgroundColor: "white",
          
        }}
      >
        shop
      </div> */}
      {isOpen && (
        <div className={styles.shop}>
          <h1>shop</h1>
          <div className={styles.shopLayout}>
            <div>
              <p>Money: ${money}</p>
              <p>Sell my Items:</p>
              {items.length === 0 && <p>No items to sell</p>}
              {items.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    const oneItem = { ...item, quantity: 1 };
                    shopStore.send({type: 'sellTo', item: oneItem});
                    inventory.send({type: 'addMoney', amount: item.value });
                    inventory.send({type: 'remove', item: oneItem});
                  }}
                >
                  <p>{item.name}</p>
                  <p>Quantity: {item.quantity}</p>
                </button>
              ))}
            </div>
            <div>
              {stock.map((item, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => {
                    const oneItem = { ...item, quantity: 1 };
                    shopStore.send({type: 'purchase', item: oneItem});
                    inventory.send({type: 'removeMoney',  amount: item.value});
                    inventory.send({type: 'add', item: oneItem})
                  }}
                >
                  <div>{item.name}</div>
                  <div>${item.value}</div>
                  <p>Quantity: {item.quantity}</p>
                </button>
              ))}
            </div>
          </div>
          <button type="button" onClick={() => shopStore.trigger.close()}>
            close
          </button>
        </div>
      )}
    </>
  );
};
