import { inventory } from "./inventory.js";
import { purse } from "./character.js";
export function openShop() {
  const shopModal = document.getElementById("shop-modal");
  shopModal.style.display = "block";

  // Handle Sell Wood button
  document.getElementById("sell-wood-btn").addEventListener("click", () => {
    sellItem("wood");
  });

  // Handle Sell Stone button
  document.getElementById("sell-stone-btn").addEventListener("click", () => {
    sellItem("stone");
  });

  // Handle Buy House button
  document.getElementById("buy-house-btn").addEventListener("click", () => {
    buyHouse();
  });

  // Handle Close button
  document.getElementById("close-shop-btn").addEventListener("click", () => {
    shopModal.style.display = "none";
  });
}

function sellItem(type) {
  console.log("Selling ...", inventory.wood);
  if (inventory.getItem(type) > 0) {
    inventory.removeItem(type); // Decrease wood count in the inventory
    purse.addMoney(5); // Increase money by 5
  }
}

function buyHouse() {
    console.log("Buying a house ...", purse.getMoney());
  if (purse.getMoney() >= 50) {
    purse.removeMoney(50);
    inventory.addItem('house'); // Add a house to the inventory
    console.log("You bought a house! Double-click on a tile to place it.");
  } else {
    console.log("You don't have enough money to buy a house!");
  }
}
