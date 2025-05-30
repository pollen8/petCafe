import { createStore } from "@xstate/store";

export type MapResource = {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

interface ResourcesContext {
  items: MapResource[];
}

export const resourcesStore = createStore({
  context: {
    items: [],
  } as ResourcesContext,
  on: {
    add: (context, item: MapResource) => ({
      ...context,
      items: [...context.items, item],
    }),
    remove: (context, { id }: { id: string }) => ({
      ...context,
      items: context.items.filter((item) => item.id !== id),
    }),
    clear: (context) => ({
      ...context,
      items: [],
    }),
    restore: (context, { state }: { state: ResourcesContext }) => ({
      ...context,
      items: state.items,
    }),
  },
});