import { inventory } from './inventory.js'; // Assuming inventory is imported
import {mapData} from './map.js'; // Assuming mapData is imported
export const gameContainer = document.getElementById("game");
import { tileSize} from './map.js';
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

// Handle dropping an item on the map
function dropItemOnMap(index) {
  const selectedItem = inventory.selectedItem;

  if (selectedItem && selectedItem.isDragging) {
    const dragGhost = selectedItem.dragGhost;
    const ghostWidth = dragGhost.width;
    const ghostHeight = dragGhost.height;

    const x = index % mapWidth;
    const y = Math.floor(index / mapWidth);

    // Check if there's enough space for the item
    if (
      x + ghostWidth <= mapWidth &&
      y + ghostHeight <= mapHeight &&
      canPlaceItem(x, y, ghostWidth, ghostHeight)
    ) {
      // Update the map data for the entire area covered by the item
      for (let dy = 0; dy < ghostHeight; dy++) {
        for (let dx = 0; dx < ghostWidth; dx++) {
          const tileIndex = (y + dy) * mapWidth + (x + dx);
          mapData[tileIndex] = selectedItem.type;

          // Update the tile visually
          const tile = gameContainer.querySelector(`[data-index="${tileIndex}"]`);
          if (tile) {
            tile.classList.remove("grass");
            tile.classList.add(selectedItem.type);
          }
        }
      }

      // Remove the item from the inventory
      inventory.getItem(selectedItem.type).remove(1);

      // Stop dragging
      selectedItem.setDragging(false);
      dragGhostElement.style.display = "none";

      console.log(`${selectedItem.type} placed on the map at index ${index}`);
    } else {
      console.log("Not enough space to place the item!");
    }
  }
}

// Helper function to check if the item can be placed
function canPlaceItem(x, y, width, height) {
  for (let dy = 0; dy < height; dy++) {
    for (let dx = 0; dx < width; dx++) {
      const tileIndex = (y + dy) * mapWidth + (x + dx);
    
    }
  }
  return true;
}

// Render the tiles
mapData.forEach((type, index) => {
  const tile = document.createElement("div");
  tile.classList.add("tile", type);
  tile.dataset.index = index; // Store the index of the tile
  gameContainer.appendChild(tile);

  // Add click event for dropping items
  tile.addEventListener("click", () => {
    dropItemOnMap(index);
  });
});

export function renderMap() {
  gameContainer.innerHTML = ""; // Clear the current map
  mapData.forEach((type, index) => {
    const tile = document.createElement("div");
    tile.classList.add("tile", type);
    tile.dataset.index = index; // Store the index of the tile
    gameContainer.appendChild(tile);

    // Add click event for dropping items
    tile.addEventListener("click", () => {
      dropItemOnMap(index);
    });
  });
}
