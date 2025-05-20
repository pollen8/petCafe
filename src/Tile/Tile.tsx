import { TileTypes } from "../maps/1";
import styles from  './Tile.module.css';
type Props = {
  type: TileTypes;
};

const colours: Record<TileTypes, string> = {
  grass: "green",
  water: "blue",
  forest: "darkgreen",
  stone: "gray",
}

export const Tile = ({ type }: Props) => {
  return <div className={styles.tile} style={{background: colours[type]}}></div>;
};
