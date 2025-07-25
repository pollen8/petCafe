import { events } from "../../Events";
import { Sprite, type SpriteProps } from "../../Sprite";

type Props = SpriteProps & {
  onClick?: () => void;
};
export class Button extends Sprite {
  constructor(props: Props) {
    super(props);

    events.on("MOUSE_CLICKED", this, (data) => {
      if (this.pointInItem(data)) {
        console.log("Button clicked at", data);
        if (props.onClick) {
          props.onClick();
        }
      }
      console.log("mouse clicked", data, this);
    });
  }
}
