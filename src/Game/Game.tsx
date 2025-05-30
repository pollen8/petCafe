import { useRef  } from "react";
import { Map } from "../Map/Map";
import { Inventory } from "../Inventory/Inventory";
import { GameProvider  } from "./GameContext";
import { NpcGenerator } from "../npc/NpcGenerator";
import style from "./game.module.css";
import { Character } from "../Character/Character";
import { NpcProvider } from "../context/NpcContext";
import { Shop } from "../shop/Shop";
import { Bobin } from "../npc/Bobin/Bobin";
import { BobinResources } from "../npc/Bobin/BobinResources";
import { Overlay } from "./Overlay";
import { SaveButton  } from "./SaveButton";
import { LoadButton } from "./LoadButton";

const Game = () => {
  // 
  const gameContainerRef = useRef<HTMLDivElement>(null);
 
  return (
    <GameProvider>
      <NpcProvider>
        <div
          className={style.game}
        >
          <Map ref={gameContainerRef}
            >
            <Character />
            <Bobin maxResources={{ wood: 5 }} x={1} y={2} />
            <NpcGenerator />
            <Shop />
          </Map>
          <Overlay>
            <Inventory />
            <BobinResources />
            <div className={style.controls}>
              <LoadButton />
              
              <SaveButton />
            </div>
          </Overlay>
        
        </div>
      </NpcProvider>
    </GameProvider>
  );
};

export default Game;
