import { createStore } from "@xstate/store";

import { createBrowserInspector } from "@statelyai/inspect";
import { produce } from "immer";

const inspector = createBrowserInspector({
  // ...
  autoStart: true,
});

type ResourceType = "portal" | "shop" | "resource" | "storage" | "bed";

export type MapResource = {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  type: ResourceType;
  state?: unknown;
  image: string;
};

type MapId = string;
type ResourceId = string;

interface ResourcesContext {
  items: Record<MapId, Record<ResourceId, MapResource>>; // mapId -> resourceId -> MapResource
}

export const resourcesStore = createStore({
  context: {
    items: {},
  } as ResourcesContext,
  on: {
    initialize: (
      context,
      { mapId, items }: { mapId: string; items: MapResource[] }
    ) => {
      if (context.items[mapId]) {
        console.error(
          "resourcesStore: Map already initialized:",
          mapId,
          context
        );
        return context;
      }
      return produce(context, (draft) => {
        draft.items[mapId] = Object.fromEntries(
          items.map((item) => [item.id, item])
        );
      });
    },
    add: (context, { item, mapId }: { item: MapResource; mapId: string }) => {
      return produce(context, (draft) => {
        draft.items[mapId][item.id] = item;
      });
    },
    remove: (context, { id, mapId }: { id: string; mapId: string }) => {
      if (!context.items[mapId]) return context;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [id]: _, ...rest } = context.items[mapId];
      return produce(context, (draft) => {
        draft.items[mapId] = rest;
      });
    },
    clear: (context, { mapId }: { mapId: string }) => {
      return produce(context, (draft) => {
        draft.items[mapId] = {};
      });
    },
    restore: (context, { state }: { state: ResourcesContext }) => {
      return produce(context, (draft) => {
        draft.items = state.items;
      });
    },
  },
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// resourcesStore.inspect(inspector);
// resourcesStore.inspect((inspectionEvent) => {
//   // type: '@xstate.snapshot' or
//   // type: '@xstate.event'
//   console.log(inspectionEvent);
// });
