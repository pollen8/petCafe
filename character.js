import Sprite from "./sprite.js";
import {
  gameContainer,
  mapData,
  mapHeight,
  mapWidth,
  tileSize,
} from "./map.js";

export const character = new Sprite({
  container: gameContainer,
  width: 32,
  height: 32,
  spriteSheet: "./gabe-idle-run.png", // Path to the sprite sheet
  frames: 7, // Number of frames in the sprite sheet
  // spriteSheetRow: 1,
  frameDuration: 300, // Duration of each frame in milliseconds
  zIndex: 10,
  position: { x: 0, y: 0 }, // Initial position
});

export function updateCharacterPosition(tileSize) {
  if (character) {
    character.setPosition(characterX * tileSize, characterY * tileSize);
  }
}

document.addEventListener("keydown", (event) => {
    event.stopPropagation();
    event.preventDefault();
  switch (event.key) {
    case "ArrowUp":
      if (character.position.y > 0) {
        character.setPosition(
          character.position.x,
          character.position.y - tileSize
        );
      };
      break;
    case "ArrowDown":
      if (character.position.y < (mapHeight - 1) * tileSize){
        character.setPosition(
            character.position.x,
            character.position.y + tileSize
        )
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
    case "Enter":
      interactWithTile();
      break;
  }
  updateCharacterPosition();
});
