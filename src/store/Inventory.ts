import { createStore } from "@xstate/store";

export type Item = {
  quantity: number;
  value: number;
  name: string;
};

export const inventory = createStore({
  // Initial context
  context: { items: [{name:'foo', value: 1,quantity: 1}], selectedItem: null } as {
    items: Item[];
    selectedItem: Item | null;
  },
  // Transitions
  on: {
    setSelected: (context, {name}: {name: string}) => {
      console.log("setSelected x", name);
      return {
        ...context,
        selectedItem: context.items.find((item) => item.name === name) ?? null,
      };
    },
    add: (context, event: Item) => {
      const i = context.items.findIndex((item) => item.name === event.name);
      if (i === -1) {
        return { ...context, items: [...context.items, event] };
      }
      return {
        ...context,
        items: context.items.map((item, index) =>
          index === i
            ? {
                ...item,
                quantity: item.quantity + event.quantity,
              }
            : item
        ),
      };
    },
  },
});
