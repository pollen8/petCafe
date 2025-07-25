import { events } from "../../Events";
import { isInCell } from "../../helpers/grid";
import { Sprite, type SpriteProps } from "../../Sprite";

export class InventoryItem extends Sprite {
  constructor(props: SpriteProps) {
    super(props);
    events.on("MOUSE_CLICKED", this, (data) => {
      console.log("InventoryItem clicked", this, this.position, data);

      console.log(this.pointInItem(data));
      //   if (data && data.x && data.y) {
      //     const mousePosition = new Vector2(data.x, data.y);
      //     if (
      //       mousePosition.x >= this.position.x &&
      //       mousePosition.x <= this.position.x + this.frameSize.x &&
      //       mousePosition.y >= this.position.y &&
      //       mousePosition.y <= this.position.y + this.frameSize.y
      //     ) {
      //       events.emit("HERO_PICKS_UP_ITEM", {
      //         image: this.resource,
      //         position: this.position,
      //       });
      //       this.destroy();
      //     }
      //   }
    });
  }
}
