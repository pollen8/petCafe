class Sprite {
  constructor({
    container,
    width = 32,
    height = 32,
    spriteSheet = '',
    frames = 1,
    frameDuration = 300, // Duration of each frame in milliseconds
    zIndex = 1,
    position = { x: 0, y: 0 },
    spriteSheetRow = 0, // Row of the sprite sheet to use (default is the first row)
    spriteImageWidth = 32, // Width of each frame in the sprite sheet
    spriteImageHeight = 32, // Height of each frame in the sprite sheet
  }) {
    this.width = width;
    this.height = height;
    this.spriteSheet = spriteSheet;
    this.frames = frames;
    this.frameDuration = frameDuration;
    this.zIndex = zIndex;
    this.position = position;
    this.spriteSheetRow = spriteSheetRow;
    this.spriteImageWidth = spriteImageWidth;
    this.spriteImageHeight = spriteImageHeight;

    // Create the sprite element
    this.element = document.createElement('div');
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.background = `url('${this.spriteSheet}') no-repeat`;
    this.element.style.backgroundSize = `${this.spriteImageWidth * this.frames}px auto`;
    this.element.style.position = 'absolute';
    this.element.style.zIndex = this.zIndex;

    // Add CSS transition for smooth position changes
    this.element.style.transition = 'transform 0.3s ease'; // Smooth movement using transform

    // Add the sprite to the container
    container.appendChild(this.element);

    // Start the animation
    this.startAnimation();
  }

  // Update the sprite's position using CSS transform
  setPosition(x, y) {
    this.position.x = x;
    this.position.y = y;

    // Use CSS transform for position changes
    this.element.style.transform = `translate(${x}px, ${y}px)`;
  }

  // Start the sprite sheet animation
  startAnimation() {
    let currentFrame = 0;
    setInterval(() => {
      currentFrame = (currentFrame + 1) % this.frames;
      const offsetX = -currentFrame * this.spriteImageWidth; // Horizontal frame offset
      const offsetY = -this.spriteSheetRow * this.spriteImageHeight; // Vertical row offset
      this.element.style.backgroundPosition = `${offsetX}px ${offsetY}px`;
    }, this.frameDuration);
  }
}

export default Sprite;