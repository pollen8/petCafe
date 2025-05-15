export const mapWidth = 20;
export const mapHeight = 20;
export const tileSize = 32; // Size of each tile in pixels
export const gameContainer = document.getElementById("game");

// Simple tile map array using types
const tileTypes = ["grass", "wood", "stone"];
export let mapData = [];

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

// Render the tiles
mapData.forEach((type, index) => {
  const tile = document.createElement("div");
  tile.classList.add("tile", type);
  tile.dataset.index = index; // Store the index of the tile
  gameContainer.appendChild(tile);

  // Add double-click event for placing a house
  tile.addEventListener("dblclick", () => {
    console.log("Double-clicked tile index:", index);
    if (inventory.house > 0) {
      console.log("You can place a house here!");
    } else {
      console.log("You need to buy a house first!");
    }
    if (inventory.house > 0) {
      placeHouse(index);
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
      if (selectedItem === "house" && inventory.house > 0) {
        placeHouse(index);
      } else if (
        selectedItem === "craftingBench" &&
        inventory.craftingBench > 0
      ) {
        placeCraftingBench(index);
      }
    });
  });
}
