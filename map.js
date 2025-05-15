export class GameMap {
  constructor(width = 20, height = 20, tileSize = 32) {
    this.mapWidth = width;
    this.mapHeight = height;
    this.tileSize = tileSize;
    this.tileTypes = ["grass", "wood", "stone"];
    this.mapData = [];
  }

  // Generate the map data
  generateMap() {
    for (let y = 0; y < this.mapHeight; y++) {
      for (let x = 0; x < this.mapWidth; x++) {
        if (y === 0 && x === this.mapWidth - 1) {
          // Place the marketplace in the top-right corner
          this.mapData.push("marketplace");
        } else {
          const tileType = this.tileTypes[Math.floor(Math.random() * this.tileTypes.length)];
          this.mapData.push(tileType);
        }
      }
    }
  }

  // Get the map data
  getMap() {
    return this.mapData;
  }
}
