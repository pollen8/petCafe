export class Inventory {
  constructor(initialInventory = { house: 1, wood: 10, stone: 5, craftingBench: 1 }) {
    this.inventory = initialInventory; // Initialize inventory
    this.selectedItem = null; // Track the currently selected item
  }

  // Update the inventory UI
  render(money) {
    document.getElementById("money").textContent = money; // Update money display
    const inventoryList = document.getElementById("inventory-list");
    inventoryList.innerHTML = ""; // Clear the current inventory list

    // Populate the inventory list with current items
    for (const [item, count] of Object.entries(this.inventory)) {
      if (count > 0) {
        const listItem = document.createElement("li");
        listItem.textContent = `${item.charAt(0).toUpperCase() + item.slice(1)}: ${count}`;
        listItem.dataset.item = item; // Store the item type in a data attribute

        // Add click event to select the item
        listItem.addEventListener("click", () => {
          this.selectInventoryItem(item, listItem);
        });

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
      this.inventory[item]++;
    } else {
      this.inventory[item] = 1; // Add new item to inventory
    }
    console.log(`Added ${item} to inventory. Current count: ${this.inventory[item]}`);
  }

  // Remove an item from the inventory
  removeItem(item) {
    if (this.inventory[item] > 0) {
      this.inventory[item]--;
      console.log(`Removed ${item} from inventory. Current count: ${this.inventory[item]}`);
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
    console.log(`Selected item: ${this.selectedItem}`);
  }
}

export const inventory = new Inventory(); // Create an instance of the Inventory class