const bunnies = []; // Array to store bunny positions
import Sprite from "./sprite.js";
import { gameContainer, game, tileSize } from "../src/game.js";
function addBunny(tileIndex) {
  const { mapWidth } = game.getCurrentMap(); // Assuming you have a method to get the tile size

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
    { dx: 0, dy: 1 }, // Down
    { dx: -1, dy: 0 }, // Left
    { dx: 1, dy: 0 }, // Right
  ];

  const { mapWidth, mapHeight } = game.getCurrentMap(); // Assuming you have a method to get the tile size
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
  const mapData = game.getCurrentMap().getMap(); // Get the map data
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * mapData.length);
    addBunny(randomIndex);
  }
}

// Start bunny movement every 2 seconds
setInterval(moveBunnies, 2000);
