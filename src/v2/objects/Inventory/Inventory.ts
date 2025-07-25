import { events } from "../../Events";
import { GameObject } from "../../GameObject";
import { resoures, type ResourceState } from "../../Resources";
import { Sprite } from "../../Sprite";
import { Vector2 } from "../../Vector2";
import { Button } from "./Button";
import { InventoryItem } from "./InventoryItem";

export class Inventory extends GameObject {
  private items: { id: number; resource: ResourceState }[] = [
    // { id: 0, resource: resoures.images.rod },
  ];
  private nextId = 0;
  constructor() {
    super({
      position: new Vector2(0, 3),
    });
    const button = new Button({
      resource: resoures.images.rod,
      position: new Vector2(0, 0),
      onClick: () => console.log("Button clicked!"),
    });

    this.addChild(button);
    // this.renderInventory();
    events.on(
      "HERO_PICKS_UP_ITEM",
      this,
      (data: { image: ResourceState; position: Vector2 }) => {
        this.nextId++;

        this.items.push({ id: this.nextId, resource: data.image });
        this.renderInventory();
      }
    );
  }
  renderInventory() {
    this.children.forEach((c) => c.destroy());
    this.items.forEach((item, index) => {
      const sprite = new InventoryItem({
        resource: item.resource,
        position: new Vector2(index * 12, 0),
      });
      this.addChild(sprite);
    });
  }

  removeFromInventory(id: number) {
    this.items = this.items.filter((i) => i.id !== id);
    this.renderInventory();
  }
}
