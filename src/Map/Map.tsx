import { PropsWithChildren } from "react";
import { Tile } from "../Tile/Tile";
/** @ts-expect-error import*/
import styles from "./map.module.css";
import { useGame } from "../Game/GameContext";

export const Map = ({children}: PropsWithChildren) => {
 const {map} = useGame()
  return (
    <div className={styles.map}>
      {map.currentMap.tiles.map((type, i) => (
        <Tile type={type} key={i} />
      ))}
      {children}
    </div>
  );
};
