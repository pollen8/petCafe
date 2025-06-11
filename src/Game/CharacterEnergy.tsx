// Load the game state from local storage
import { characterStore } from "../Character/character.store";
import { useSelector } from "@xstate/store/react";

export const CharacterEnergy = () => {
  const energy = useSelector(characterStore, (state) => state.context.energy);
  return <div>: energy {energy}</div>;
};
