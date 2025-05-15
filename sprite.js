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
  }) {
    this.width = width;
    this.height = height;
    this.spriteSheet = spriteSheet;
    this.frames = frames;
    this.frameDuration = frameDuration;
    this.zIndex = zIndex;
    this.position = position;

    // Create the sprite element
    this.element = document.createElement('div');
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.background = `url('${this.spriteSheet}') no-repeat`;
    this.element.style.backgroundSize = `${this.frames * this.width}px auto`;
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
      const offset = -currentFrame * this.width;
      this.element.style.backgroundPosition = `${offset}px 0px`;
    }, this.frameDuration);
  }
}

export default Sprite;