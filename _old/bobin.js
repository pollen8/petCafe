let bobinX = 0;
let bobinY = 0;
const bobinCapacity = { wood: 0, stone: 0 }; // Bobin's capacity for items
import Sprite from './sprite.js';
import { gameContainer, game, tileSize } from './game.js';


 export const bobin = new Sprite({
    container: gameContainer,
    width: 32,
    height: 32,
    spriteSheet: './Shoom_Walk.png', // Path to the sprite sheet
    frames: 8, // Number of frames in the sprite sheet
    frameDuration: 300, // Duration of each frame in milliseconds
    zIndex: 10,
    position: { x: 5 * tileSize, y: 5  * tileSize}, // Initial position
  });

function moveBobin() {
  const mapData = game.getCurrentMap().getMap();
  const collectibleTiles = mapData
    .map((type, index) => ({ type, index }))
    .filter(({ type }) => type === "wood" || type === "stone");

    const mapWidth = game.getCurrentMap().mapWidth
  if (collectibleTiles.length > 0) {
    const randomTile = collectibleTiles[Math.floor(Math.random() * collectibleTiles.length)];
    const tileIndex = randomTile.index;
    bobinX = tileIndex % mapWidth;
    bobinY = Math.floor(tileIndex / mapWidth);

    // Update Bobin's position
    bobin.setPosition(bobinX * tileSize, bobinY * tileSize);

    // Collect the item
    if (randomTile.type === "wood" && bobinCapacity.wood < 10) {
      collectForBobin(tileIndex, "wood");
    } else if (randomTile.type === "stone" && bobinCapacity.stone < 10) {
      collectForBobin(tileIndex, "stone");
    }
  }
}

function collectForBobin(tileIndex, itemType) {
  const mapData = game.getCurrentMap().getMap();
  mapData[tileIndex] = "grass"; // Change the tile type to grass
  const tile = gameContainer.querySelector(`[data-index="${tileIndex}"]`);
  tile.classList.remove(itemType);
  tile.classList.add("grass");

  bobinCapacity[itemType]++; // Add to Bobin's capacity
  inventory[itemType]++; // Add to the player's inventory
  console.log(`Bobin collected 1 ${itemType}!`);
}

// Start Bobin's movement every 5 seconds
setInterval(moveBobin, 5000);