import Sprite from "./sprite.js";
import { openShop } from "./shop.js";
import { game, gameContainer, tileSize } from "./game.js";
import { inventory } from "../inventory.js";

export const character = new Sprite({
  container: gameContainer,
  width: 32,
  height: 32,
  spriteSheet: "./gabe-idle-run.png", // Path to the sprite sheet
  frames: 7, // Number of frames in the sprite sheet
  frameDuration: 300, // Duration of each frame in milliseconds
  zIndex: 10,
  position: { x: 0, y: 0 }, // Initial position
});

class Purse {
  constructor(initialMoney) {
    this.money = initialMoney;
  }

  addMoney(amount) {
    this.money += amount;
  }

  removeMoney(amount) {
    if (this.money >= amount) {
      this.money -= amount;
    } else {
      console.log("Not enough money!");
    }
  }

  getMoney() {
    return this.money;
  }
}
export const purse = new Purse(0);

document.addEventListener("keydown", (event) => {
  const { mapWidth, mapHeight } = game.getCurrentMap(); // Get the current map dimensions
  switch (event.key) {
    case "ArrowUp":
      if (character.position.y > 0) {
        character.setPosition(
          character.position.x,
          character.position.y - tileSize
        );
      }
      break;
    case "ArrowDown":
      if (character.position.y < (mapHeight - 1) * tileSize) {
        character.setPosition(
          character.position.x,
          character.position.y + tileSize
        );
      }
      break;
    case "ArrowLeft":
      if (character.position.x > 0) {
        character.setPosition(
          character.position.x - tileSize,
          character.position.y
        );
      }
      break;
    case "ArrowRight":
      if (character.position.x < (mapWidth - 1) * tileSize) {
        character.setPosition(
          character.position.x + tileSize,
          character.position.y
        );
      }
      break;
    case " ":
    case "Enter":
      interactWithTile();
      break;
  }

  // Check if the character is on a house tile
  const tileIndex = character.getTileIndex();
  const mapData = game.getCurrentMap().getMap();
  const tileType = mapData[tileIndex];

  if (tileType === "house") {
    console.log("Character moved over a house. Switching to the second map...");
    game.setCurrentMap(1); // Switch to the second map
  }
});

function interactWithTile() {
  const tileIndex = character.getTileIndex();
  const mapData = game.getCurrentMap().getMap();
  const tileType = mapData[tileIndex];

  if (tileType === "marketplace") {
    openShop();
    return;
  }

  mapData[tileIndex] = "grass"; // Change the tile type to grass
  const tile = gameContainer.querySelector(`[data-index="${tileIndex}"]`);
  tile.classList.remove(tileType);
  tile.classList.add("grass");
  inventory.addItem(tileType);
}
