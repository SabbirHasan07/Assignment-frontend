import { PokemonTCG } from "pokemon-tcg-sdk-typescript";


// Get All Set Service
export const getAllSets = async () => {
  let allSets = await PokemonTCG.getAllSets();

  return allSets;
};

//Get Single Set Service
export const getSetById = async (setId: string) => {
  let set = await PokemonTCG.findSetByID(setId);
  return set;
};

