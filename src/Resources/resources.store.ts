import { createStore } from "@xstate/store";

type ResourceType = 'portal' | 'shop' | 'resource';

export type MapResource = {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  type?: ResourceType;
};

interface ResourcesContext {
  items: Record<string, MapResource>;
}

export const resourcesStore = createStore({
  context: {
    items: {},
  } as ResourcesContext,
  on: {
    add: (context, { item }: { item: MapResource }) => ({
      ...context,
      items: {
        ...context.items,
        [item.id]: item,
      },
    }),
    remove: (context, { id }: { id: string }) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [id]: _, ...rest } = context.items;
      return {
        ...context,
        items: rest,
      };
    },
    clear: (context) => ({
      ...context,
      items: {},
    }),
    restore: (context, { state }: { state: ResourcesContext }) => ({
      ...context,
      items: state.items,
    }),
  },
});