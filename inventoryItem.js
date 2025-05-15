export class InventoryItem {
  constructor(type, amount = 0, dragGhost = { width: 1, height: 1 }) {
    const validTypes = ["stone", "wood", "grass", "house", "craftingBench"];
    if (!validTypes.includes(type)) {
      throw new Error(`Invalid type: ${type}. Valid types are: ${validTypes.join(", ")}`);
    }

    this.type = type; // The type of the inventory item
    this.amount = amount; // The amount of the item
    this.isDragging = false; // Indicates whether the item is being dragged
    this.dragGhost = dragGhost; // Stores the width and height of the drag ghost
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

  // Set the dragging state
  setDragging(isDragging) {
    this.isDragging = isDragging;
    console.log(`${this.type} is now ${isDragging ? "being dragged" : "not being dragged"}`);
  }

  // Check if the item is being dragged
  getDragging() {
    return this.isDragging;
  }

  // Set the drag ghost dimensions
  setDragGhost(width, height) {
    this.dragGhost = { width, height };
    console.log(`Set drag ghost for ${this.type} to width: ${width}, height: ${height}`);
  }

  // Get the drag ghost dimensions
  getDragGhost() {
    return this.dragGhost;
  }
}