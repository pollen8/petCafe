import { createStore } from "@xstate/store";

type BobinState = {
    resources: { [key: string]: number };
}
export  const bobinStore = createStore({
    context: {
      resources: {}, 
    } as BobinState,
    on: {
        restore: (context, { state }: { state: BobinState }) => {
            return state;
        },
      collectResource: (context, { resource }: { resource: string }) => {
        const currentAmount = context.resources[resource] || 0;
        return {
          ...context,
          resources: {
            ...context.resources,
            [resource]: currentAmount + 1,
          },
        };
      },
    },
  });