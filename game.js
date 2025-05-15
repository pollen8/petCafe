import { inventory } from './inventory.js';
import { GameMap } from './map.js';

export const gameContainer = document.getElementById("game");
export const tileSize = 32; // Tile size in pixels

// Create a ghost element for dragging
const dragGhostElement = document.createElement("div");
dragGhostElement.style.position = "absolute";
dragGhostElement.style.pointerEvents = "none";
dragGhostElement.style.opacity = "0.5";
dragGhostElement.style.display = "none"; // Initially hidden
dragGhostElement.style.zIndex = "1000";
gameContainer.appendChild(dragGhostElement);

class Game {
  constructor() {
    this.maps = []; // List of available maps
    this.currentMapIndex = null; // Index of the currently active map
  }

  // Generate a new map and add it to the list of maps
  generateMap(width = 20, height = 20) {
    const newMap = new GameMap(width, height, tileSize);
    newMap.generateMap();
    this.maps.push(newMap);
    console.log(`Generated a new map with dimensions ${width}x${height}`);
  }

  // Set the current map by index
  setCurrentMap(index) {
    if (index >= 0 && index < this.maps.length) {
      this.currentMapIndex = index;
      console.log(`Set current map to index ${index}`);
      this.renderCurrentMap();
    } else {
      console.error("Invalid map index");
    }
  }

  // Get the current map
  getCurrentMap() {
    if (this.currentMapIndex !== null) {
      return this.maps[this.currentMapIndex];
    }
    console.error("No current map is set");
    return null;
  }

  // Render the current map
  renderCurrentMap() {
    const currentMap = this.getCurrentMap();
    if (currentMap) {
      gameContainer.innerHTML = ""; // Clear the container
      const mapData = currentMap.getMap();

      mapData.forEach((type, index) => {
        const tile = document.createElement("div");
        tile.classList.add("tile", type);
        tile.dataset.index = index; // Store the index of the tile
        tile.style.width = `${tileSize}px`;
        tile.style.height = `${tileSize}px`;

        gameContainer.appendChild(tile);

        // Add click event for dropping items
        tile.addEventListener("click", () => {
          this.dropItemOnMap(index);
        });
      });
    }
  }

  // Handle dropping an item on the map
  dropItemOnMap(index) {
    const selectedItem = inventory.selectedItem;

    if (selectedItem && selectedItem.isDragging) {
      const dragGhost = selectedItem.dragGhost;
      const ghostWidth = dragGhost.width;
      const ghostHeight = dragGhost.height;

      const currentMap = this.getCurrentMap();
      const mapData = currentMap.getMap();
      const x = index % currentMap.mapWidth;
      const y = Math.floor(index / currentMap.mapWidth);

      // Check if there's enough space for the item
      if (
        x + ghostWidth <= currentMap.mapWidth &&
        y + ghostHeight <= currentMap.mapHeight &&
        this.canPlaceItem(mapData, x, y, ghostWidth, ghostHeight, currentMap.mapWidth)
      ) {
        // Update the map data for the entire area covered by the item
        for (let dy = 0; dy < ghostHeight; dy++) {
          for (let dx = 0; dx < ghostWidth; dx++) {
            const tileIndex = (y + dy) * currentMap.mapWidth + (x + dx);
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
  canPlaceItem(mapData, x, y, width, height, mapWidth) {
    for (let dy = 0; dy < height; dy++) {
      for (let dx = 0; dx < width; dx++) {
        const tileIndex = (y + dy) * mapWidth + (x + dx);
        if (mapData[tileIndex] !== "grass") {
          return false; // Cannot place if any tile is not grass
        }
      }
    }
    return true;
  }
}

// Create a new game instance
export const game = new Game();

// Generate and set the first map
game.generateMap();
game.generateMap(8, 10); // Generate a second map with different dimensions
game.setCurrentMap(0);

