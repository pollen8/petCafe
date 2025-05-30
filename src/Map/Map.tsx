import type { HTMLAttributes, PropsWithChildren, RefObject } from "react";
import { Tile } from "../Tile/Tile";
import styles from "./map.module.css";
import { useGame } from "../Game/useGame";
import { useSelector } from "@xstate/store/react";
import { resourcesStore } from "../Resources/resources.store";

export const Map = ({children, ref}: PropsWithChildren & {ref: RefObject<HTMLDivElement | null>} & HTMLAttributes<HTMLDivElement>) => {
 const {map} = useGame()
 const resources = useSelector(resourcesStore, (state) => state.context.items);
  return (
    <div className={styles.map} ref={ref}>
      {map.currentMap.tiles.map((type, i) => (
        <Tile type={type} key={i} />
      ))}
      {
resources.map((resource) => (
  <div>{resource.name}</div>
))}
      {children}
    </div>
  );
};
