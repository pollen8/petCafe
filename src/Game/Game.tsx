import { useRef } from "react";
import { Map } from "../Map/Map";
import { Inventory } from "../Inventory/Inventory";
import { GameProvider } from "./GameContext";
import { NpcGenerator } from "../npc/NpcGenerator";
import style from "./game.module.css";
import { NpcProvider } from "../context/NpcContext";
import { Shop } from "../shop/Shop";
import { Bobin } from "../npc/Bobin/Bobin";
import { BobinResources } from "../npc/Bobin/BobinResources";
import { Overlay } from "./Overlay";
import { SaveButton } from "./SaveButton";
import { LoadButton } from "./LoadButton";
import { StorageModal } from "../Storage/Storage";
import { Resources } from "../Resources/Resources";
import { NewGameButton } from "./NewGame";
import { CharacterEnergy } from "./CharacterEnergy";
import { FPS } from "../Dev/FPS";

const Game = () => {
  //
  const gameContainerRef = useRef<HTMLDivElement>(null);
  return (
    <GameProvider>
      <NpcProvider>
        <div className={style.game}>
          <Map ref={gameContainerRef}>
            <Resources />
            {/* <Bobin maxResources={{ wood: 5 }} x={1} y={2} /> */}
            {/* <NpcGenerator /> */}
            <Shop />
            <StorageModal />
          </Map>
          <Overlay>
            <Inventory />
            <BobinResources />
            <div className={style.controls}>
              <FPS />
              <CharacterEnergy />
              <NewGameButton />
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
