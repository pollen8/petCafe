export type ResourceState = { image: HTMLImageElement; isLoaded: boolean };
class Resources {
  private toLoad: Record<string, string> = {};
  public images: Record<string, ResourceState> = {};

  constructor() {
    this.toLoad = {
      sky: "/sprites/sky.png",
      ground: "/sprites/ground.png",
      hero: "/sprites/hero-sheet.png",
      shadow: "/sprites/shadow.png",
      rod: "/sprites/rod.png",
      exit: "/sprites/exit.png",
      cave: "/sprites/cave.png",
      caveGround: "/sprites/cave-ground.png",
      knight: "/sprites/knight-sheet-1.png",
      plains: "tiles/plains.png",
      house: "sprites/house.png",
      // tilee imports
      grass: "/tiles/grass.png",
    };

    Object.keys(this.toLoad).forEach((key) => {
      const image = new Image();
      image.src = this.toLoad[key];
      this.images[key] = {
        image,
        isLoaded: false,
      };
      image.onload = () => {
        this.images[key].isLoaded = true;
      };
    });
  }
}

export const resoures = new Resources();
