import { createStore } from "@xstate/store";

type ResourceType = 'portal' | 'shop' | 'resource';

export type MapResource = {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  type: ResourceType;
};

interface ResourcesContext {
  items: Record<string, Record<string, MapResource>>; // mapId -> resourceId -> MapResource
}

export const resourcesStore = createStore({
  context: {
    items: {},
  } as ResourcesContext,
  on: {
    initialize: (context, { mapId, items }: { mapId: string; items: MapResource[] }) => {
    console.log("Initializing resources for map:", mapId, items);
    if (context.items[mapId]) {
      console.log('resourcesStore: Map already initialized:', mapId);
      return context
    }
      return {
        items: {
          [mapId]: Object.fromEntries(items.map(item => [item.id, item])),
        }
      }
    },
    add: (context, { item, mapId }: { item: MapResource; mapId: string }) => ({
      ...context,
      items: {
        ...context.items,
        [mapId]: {
          ...(context.items[mapId] || {}),
          [item.id]: item,
        },
      },
    }),
    remove: (context, { id, mapId }: { id: string; mapId: string }) => {
      if (!context.items[mapId]) return context;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [id]: _, ...rest } = context.items[mapId];
      return {
        ...context,
        items: {
          ...context.items,
          [mapId]: rest,
        },
      };
    },
    clear: (context, { mapId }: { mapId: string }) => ({
      ...context,
      items: {
        ...context.items,
        [mapId]: {},
      },
    }),
    restore: (context, { state }: { state: ResourcesContext }) => ({
      ...context,
      items: state.items,
    }),
  },
});