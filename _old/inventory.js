import { InventoryItem } from "./inventoryItem.js";

export class Inventory {
  constructor(
    initialInventory = {
      house: new InventoryItem("house", 1, { width: 2, height: 2 }),
      wood: new InventoryItem("wood", 10),
      stone: new InventoryItem("stone", 5),
      craftingBench: new InventoryItem("craftingBench", 1, { width: 1, height: 1 }),
    }
  ) {
    this.inventory = initialInventory; // Initialize inventory
    this.selectedItem = null; // Track the currently selected item

    // Add event listener to the inventory list
    const inventoryList = document.getElementById("inventory-list");
    inventoryList.addEventListener("click", (event) => {
      const listItem = event.target.closest("li");
      console.log("Clicked on list item:", listItem);
      if (listItem) {
        const itemType = listItem.dataset.item;
        this.selectInventoryItem(this.inventory[itemType], listItem);
      }
    });
  }

  // Update the inventory UI
  render(money) {
    document.getElementById("money").textContent = money; // Update money display
    const inventoryList = document.getElementById("inventory-list");
    inventoryList.innerHTML = ""; // Clear the current inventory list

    // Populate the inventory list with current items
    for (const [k, item ] of Object.entries(this.inventory)) {
      if (item.amount > 0) {
        const listItem = document.createElement("li");
        listItem.textContent = `${
          item.type
        }: ${item.amount}`;
        listItem.dataset.item = item.type; // Store the item type in a data attribute

        inventoryList.appendChild(listItem);
      }
    }
  }

  getItem(item) {
    return this.inventory[item] || 0; // Return the count of the item or 0 if not found
  }

  // Add an item to the inventory
  addItem(item) {
    if (this.inventory[item] !== undefined) {
      this.inventory[item].add(1);
    } else {
      this.inventory[item] = new InventoryItem(type, 1); // Add new item to inventory
    }
    console.log(
      `Added ${item} to inventory. Current count: ${this.inventory[item].amount}`
    );
  }

  // Remove an item from the inventory
  removeItem(item) {
    if (this.inventory[item].getAmount() > 0) {
      this.inventory[item].remove(1);
      console.log(
        `Removed ${item} from inventory. Current count: ${this.inventory[item].amount}`
      );
    } else {
      console.log(`No ${item} left in inventory to remove.`);
    }
  }

  // Select an item in the inventory
  selectInventoryItem(item, listItem) {
    // Deselect previously selected item
    const inventoryList = document.getElementById("inventory-list");
    Array.from(inventoryList.children).forEach((child) => {
      child.classList.remove("selected");
    });

    // Select the clicked item
    listItem.classList.add("selected");
    this.selectedItem = item; // Update the selected item
    Object.values(this.inventory).forEach((i) => {
      i.setDragging(false); // Reset dragging state for all items
    }
    );
    this.selectedItem.setDragging(true); // Set the item as being dragged
    console.log(`Selected item: ${this.selectedItem}`, this.selectedItem);
  }
}

export const inventory = new Inventory(); // Create an instance of the Inventory class
