import { events } from "./Events";

export class Mouse {
  constructor() {
    document.addEventListener("click", (e) => {
      this.onClick(e);
    });
    document.addEventListener("mousemove", (e) => {
      this.onMouseMove(e);
    });
  }
  private onClick(event: MouseEvent) {
    const x = event.clientX;
    const y = event.clientY;
    // console.log(`Mouse clicked at (${x}, ${y})`);
    events.emit("MOUSE_CLICKED", { x, y });
    // Handle click logic here
  }
  private onMouseMove(event: MouseEvent) {
    const x = event.clientX;
    const y = event.clientY;
    events.emit("MOUSE_MOVED", { x, y });
    // console.log(`Mouse moved to (${x}, ${y})`);
    // Handle mouse move logic here
  }
}
