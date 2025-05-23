import { createStore } from "@xstate/store";

export  const bobinStore = createStore({
    context: {
      resources: {} as { [key: string]: number }, // Collected resources
    },
    on: {
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