import type { HTMLAttributes, PropsWithChildren, RefObject } from "react";
import { Tile } from "../Tile/Tile";
import styles from "./map.module.css";
import { useGame } from "../Game/useGame";
import { useSelector } from "@xstate/store/react";
import { resourcesStore } from "../Resources/resources.store";
import { tileSize } from "../Game/GameContext";

export const Map = ({children, ref}: PropsWithChildren & {ref: RefObject<HTMLDivElement | null>} & HTMLAttributes<HTMLDivElement>) => {
 const {map} = useGame()
 console.log('map', map);
 const resources = useSelector(resourcesStore, (state) => state.context.items);
 console.log('resources', resources);
  return (
    <div className={styles.map} ref={ref}>
      {map.currentMap.tiles.map((type, i) => (
        <Tile type={type} key={i} />
      ))}
      {
Object.values(resources).map((resource) => (
  <div key={resource.id} className={styles.resource}
  style={{
  background: `url("${resource.name}.png") no-repeat`,
    left: resource.x * tileSize,
    top: resource.y * tileSize,
    width: resource.width * tileSize,
    height: resource.height * tileSize,}}
  >{resource.name}</div>
))}
      {children}
    </div>
  );
};
