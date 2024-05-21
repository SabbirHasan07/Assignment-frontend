import React from "react";
import { PokemonTCG } from "pokemon-tcg-sdk-typescript";
import CardInfo from "./CardInfo";
import CardImage from "./CardImage";
import Link from "next/link";
import ViewModal from "./ViewModal";

// Card Component
const Card = (props: { item: PokemonTCG.Set }) => {
  const { images, ...info } = props.item;
  return (
    <>
      <div className=" bg-gray-600 rounded-lg hover:scale-110 m-3 p-3">
        <Link href={`/sets/${info.id}`} className="">
          <CardImage imageUrl={images} />
        </Link>

        <CardInfo info={info} />

        <ViewModal info={props.item} />
      </div>
    </>
  );
};

export default Card;
