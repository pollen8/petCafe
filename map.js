export const mapWidth = 20;
export const mapHeight = 20;
export const tileSize = 32; // Size of each tile in pixels

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
