import type { GameObject } from "./GameObject";

export type EventName =
  | "RESIZE_WINDOW"
  | "MOUSE_CLICKED"
  | "MOUSE_MOVED"
  | "HERO_POSITION"
  | "HERO_PICKS_UP_ITEM"
  | "HERO_EXITS"
  | "CHANGE_LEVEL"
  | "CAMERA_VIEWPORT";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CallBackFunction = (argg?: any) => void;
type CallBackItem = {
  id: number;
  eventName: EventName;
  caller: GameObject;
  callback: CallBackFunction;
};
class Events {
  private callbacks: CallBackItem[] = [];
  private nextId = 0;

  emit(eventName: EventName, values?: unknown) {
    this.callbacks
      .filter((c) => c.eventName === eventName)
      .forEach((c) => c.callback(values));
  }
  on(eventName: EventName, caller: GameObject, callback: CallBackFunction) {
    this.nextId += 1;
    this.callbacks.push({
      id: this.nextId,
      eventName,
      caller,
      callback,
    });
    return this.nextId;
  }

  off(id: number) {
    this.callbacks = this.callbacks.filter((cb) => cb.id !== id);
  }

  unsubscribe(caller: GameObject) {
    this.callbacks = this.callbacks.filter((cb) => cb.caller !== caller);
  }
}

export const events = new Events();
