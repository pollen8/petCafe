import { useSelector } from "@xstate/store/react";
import { resourcesStore } from "./resources.store";
import styles from "./resources.module.css";
import { useGame } from "../Game/useGame";
import { tileSize } from "../Game/GameContext";

export const Resources = () => {
  const { map } = useGame();
  const resources = useSelector(resourcesStore, (state) => state.context.items);
  return (
    <>
      {Object.values(resources[map.currentMap.id] ?? {}).map((resource) => (
        <div
          key={resource.id}
          className={styles.resource}
          title={resource.name}
          style={{
            background: `url("${resource.image}.png") no-repeat`,
            left: resource.x * tileSize,
            top: resource.y * tileSize,
            width: resource.width * tileSize,
            height: resource.height * tileSize,
          }}
        ></div>
      ))}
    </>
  );
};
