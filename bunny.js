const bunnies = []; // Array to store bunny positions
import Sprite from "./sprite.js";
import {
  mapWidth,
  mapHeight,
  mapData,
  tileSize,
} from "./map.js";
import { gameContainer } from './game.js';
function addBunny(tileIndex) {
  const bunnyX = Math.floor(tileIndex % mapWidth) * tileSize;
  const bunnyY = Math.floor(tileIndex / mapWidth) * tileSize;

  const bunny = new Sprite({
    container: gameContainer,
    width: 32,
    height: 32,
    spriteSheet: "./Running.png", // Path to the sprite sheet
    frames: 8, // Number of frames in the sprite sheet
    frameDuration: 300, // Duration of each frame in milliseconds
    zIndex: 5,
    position: { x: bunnyX, y: bunnyY }, // Initial position
  });

  bunnies.push(bunny);

  // Assign a random movement interval for this bunny
  const randomDelay = Math.random() * 2000 + 1000; // Random delay between 1s and 3s
  setInterval(() => moveBunny(bunny), randomDelay);
}

function moveBunny(bunny) {
  const directions = [
    { dx: 0, dy: -1 }, // Up
    { dx: 0, dy: 1 },  // Down
    { dx: -1, dy: 0 }, // Left
    { dx: 1, dy: 0 },  // Right
  ];

  const validMoves = directions.filter(({ dx, dy }) => {
    const newX = bunny.position.x + tileSize * dx;
    const newY = bunny.position.y + tileSize * dy;
    return (
      newX >= 0 &&
      newX < mapWidth * tileSize &&
      newY >= 0 &&
      newY < mapHeight * tileSize
    );
  });

  if (validMoves.length > 0) {
    const move = validMoves[Math.floor(Math.random() * validMoves.length)];
    const newX = bunny.position.x + tileSize * move.dx;
    const newY = bunny.position.y + tileSize * move.dy;
    bunny.setPosition(newX, newY);
  }
}

function moveBunnies() {
  bunnies.forEach((bunny) => {
    moveBunny(bunny);
  });
}

export function generateBunnies(count) {
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * mapData.length);
    addBunny(randomIndex);
  }
}

// Start bunny movement every 2 seconds
setInterval(moveBunnies, 2000);
