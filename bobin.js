let bobinX = 0;
let bobinY = 0;
const bobinCapacity = { wood: 0, stone: 0 }; // Bobin's capacity for items
import Sprite from './sprite.js';
import { gameContainer, mapData, mapWidth, tileSize } from './map.js';
// export function addBobin() {
//   const bobin = document.createElement("div");
//   bobin.id = "bobin";
//   bobin.style.width = `${tileSize}px`;
//   bobin.style.height = `${tileSize}px`;
//   bobin.style.backgroundColor = "blue"; // Bobin's color
//   bobin.style.position = "absolute";
//   bobin.style.zIndex = "10";
//   bobin.style.top = `${bobinY * tileSize}px`;
//   bobin.style.left = `${bobinX * tileSize}px`;
//   gameContainer.appendChild(bobin);

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
// }

function moveBobin() {
  const collectibleTiles = mapData
    .map((type, index) => ({ type, index }))
    .filter(({ type }) => type === "wood" || type === "stone");

  if (collectibleTiles.length > 0) {
    const randomTile = collectibleTiles[Math.floor(Math.random() * collectibleTiles.length)];
    const tileIndex = randomTile.index;
    bobinX = tileIndex % mapWidth;
    bobinY = Math.floor(tileIndex / mapWidth);

    // Update Bobin's position
    // const bobin = document.getElementById("bobin");
    bobin.setPosition(bobinX * tileSize, bobinY * tileSize);
    // bobin.style.top = `${bobinY * tileSize}px`;
    // bobin.style.left = `${bobinX * tileSize}px`;

    // Collect the item
    if (randomTile.type === "wood" && bobinCapacity.wood < 10) {
      collectForBobin(tileIndex, "wood");
    } else if (randomTile.type === "stone" && bobinCapacity.stone < 10) {
      collectForBobin(tileIndex, "stone");
    }
  }
}

function collectForBobin(tileIndex, itemType) {
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