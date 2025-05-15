export class InventoryItem {
  constructor(type, amount = 0) {
    const validTypes = ["stone", "wood", "grass", "house", "craftingBench"];
    if (!validTypes.includes(type)) {
      throw new Error(`Invalid type: ${type}. Valid types are: ${validTypes.join(", ")}`);
    }

    this.type = type; // The type of the inventory item
    this.amount = amount; // The amount of the item
  }

  // Add to the item's amount
  add(amount) {
    if (amount < 0) {
      throw new Error("Amount to add must be positive.");
    }
    this.amount += amount;
    console.log(`Added ${amount} ${this.type}. New amount: ${this.amount}`);
  }

  // Remove from the item's amount
  remove(amount) {
    if (amount < 0) {
      throw new Error("Amount to remove must be positive.");
    }
    if (this.amount < amount) {
      throw new Error(`Not enough ${this.type} to remove. Current amount: ${this.amount}`);
    }
    this.amount -= amount;
    console.log(`Removed ${amount} ${this.type}. New amount: ${this.amount}`);
  }

  // Get the current amount
  getAmount() {
    return this.amount;
  }

  // Get the type of the item
  getType() {
    return this.type;
  }
}