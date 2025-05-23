import React from "react";
import { useSelector } from "@xstate/store/react";
import { bobinStore } from "./bobin.store";


export const BobinResources = () => {
  const resources = useSelector(bobinStore, ({ context }) => context.resources);

  return (
    <div
    >
      <h3>Bobin's Resources</h3>
      {Object.entries(resources).length === 0 ? (
        <p>No resources collected yet.</p>
      ) : (
        <ul>
          {Object.entries(resources).map(([resource, amount]) => (
            <li key={resource}>
              {resource}: {amount}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};