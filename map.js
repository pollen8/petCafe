import { inventory } from './inventory.js'; // Assuming inventory is imported

export const mapWidth = 20;
export const mapHeight = 20;
export const tileSize = 32; // Size of each tile in pixels
export const gameContainer = document.getElementById("game");

// Simple tile map array using types
const tileTypes = ["grass", "wood", "stone"];
export let mapData = [];

// Generate the map data
for (let y = 0; y < mapHeight; y++) {
  for (let x = 0; x < mapWidth; x++) {
    if (y === 0 && x === mapWidth - 1) {
      // Place the marketplace in the top-right corner
      mapData.push("marketplace");
    } else {
      const tileType = tileTypes[Math.floor(Math.random() * tileTypes.length)];
      mapData.push(tileType);
    }
  }
}

// Create a ghost element for dragging
const dragGhostElement = document.createElement("div");
dragGhostElement.style.position = "absolute";
dragGhostElement.style.pointerEvents = "none";
dragGhostElement.style.opacity = "0.5";
dragGhostElement.style.display = "none"; // Initially hidden
dragGhostElement.style.zIndex = "1000";
gameContainer.appendChild(dragGhostElement);

// Update the ghost element's position and size
function updateDragGhost(event) {
  const rect = gameContainer.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  const gridX = Math.floor(mouseX / tileSize);
  const gridY = Math.floor(mouseY / tileSize);

  const selectedItem = inventory.selectedItem;
  if (selectedItem && selectedItem.isDragging) {
    const dragGhost = selectedItem.dragGhost;

    dragGhostElement.style.width = `${dragGhost.width * tileSize}px`;
    dragGhostElement.style.height = `${dragGhost.height * tileSize}px`;
    dragGhostElement.style.left = `${gridX * tileSize}px`;
    dragGhostElement.style.top = `${gridY * tileSize}px`;
    dragGhostElement.style.backgroundColor = "rgba(0, 0, 255, 0.5)"; // Example color
    dragGhostElement.style.display = "block";
  } else {
    dragGhostElement.style.display = "none";
  }
}

// Add mousemove event listener to the game container
gameContainer.addEventListener("mousemove", (event) => {
  updateDragGhost(event);
});

// Render the tiles
mapData.forEach((type, index) => {
  const tile = document.createElement("div");
  tile.classList.add("tile", type);
  tile.dataset.index = index; // Store the index of the tile
  gameContainer.appendChild(tile);

  // Add double-click event for placing items
  tile.addEventListener("dblclick", () => {
    if (inventory.selectedItem?.type === "house" && inventory.selectedItem.amount > 0) {
      placeHouse(index);
    } else if (
      inventory.selectedItem?.type === "craftingBench" &&
      inventory.selectedItem.amount > 0
    ) {
      placeCraftingBench(index);
    }
  });
});

export function renderMap() {
  gameContainer.innerHTML = ""; // Clear the current map
  mapData.forEach((type, index) => {
    const tile = document.createElement("div");
    tile.classList.add("tile", type);
    tile.dataset.index = index; // Store the index of the tile
    gameContainer.appendChild(tile);

    // Add double-click event for placing items
    tile.addEventListener("dblclick", () => {
      if (inventory.selectedItem?.type === "house" && inventory.selectedItem.amount > 0) {
        placeHouse(index);
      } else if (
        inventory.selectedItem?.type === "craftingBench" &&
        inventory.selectedItem.amount > 0
      ) {
        placeCraftingBench(index);
      }
    });
  });
}
