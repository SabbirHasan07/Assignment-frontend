import { PokemonTCG } from "pokemon-tcg-sdk-typescript";

// Card Info Component
const CardInfo = ({ info }: { info: Partial<PokemonTCG.Set> }) => {
  const { name } = info;
  return (
    <>
      <p className="text-white text-lg text-center font-bold block capitalize">
        {name}
      </p>
    </>
  );
};

export default CardInfo;
