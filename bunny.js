const bunnies = []; // Array to store bunny positions

function addBunny() {
  const bunny = document.createElement("div");
  bunny.classList.add("bunny");
  const randomIndex = Math.floor(Math.random() * mapData.length);

  const bunnyX = randomIndex % mapWidth;
  const bunnyY = Math.floor(randomIndex / mapWidth);

  bunny.style.width = `${tileSize}px`;
  bunny.style.height = `${tileSize}px`;
  bunny.style.borderRadius = "50%"; // Make it a circle
  bunny.style.position = "absolute";
  bunny.style.zIndex = "10";
  bunny.style.top = `${bunnyY * tileSize}px`;
  bunny.style.left = `${bunnyX * tileSize}px`;

  gameContainer.appendChild(bunny);
  bunnies.push({ element: bunny, x: bunnyX, y: bunnyY });
}

function moveBunnies() {
  bunnies.forEach((bunny) => {
    const directions = [
      { dx: 0, dy: -1 }, // Up
      { dx: 0, dy: 1 },  // Down
      { dx: -1, dy: 0 }, // Left
      { dx: 1, dy: 0 },  // Right
    ];

    const validMoves = directions.filter(({ dx, dy }) => {
      const newX = bunny.x + dx;
      const newY = bunny.y + dy;
      return newX >= 0 && newX < mapWidth && newY >= 0 && newY < mapHeight;
    });

    if (validMoves.length > 0) {
      const move = validMoves[Math.floor(Math.random() * validMoves.length)];
      bunny.x += move.dx;
      bunny.y += move.dy;

      // Update bunny's position
      bunny.element.style.left = `${bunny.x * tileSize}px`;
      bunny.element.style.top = `${bunny.y * tileSize}px`;
    }
  });
}

function generateBunnies(count) {
  for (let i = 0; i < count; i++) {
    addBunny();
  }
}

// Start bunny movement every 2 seconds
setInterval(moveBunnies, 2000);

// Generate 5 bunnies at the start of the game
generateBunnies(5);
