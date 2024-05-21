import { QueryKeys } from "@/models/enums";
import { useSets } from "@/hooks/react-query-hooks";
import { getAllSets } from "@/service/pokemon.service";
import Card from "@/components/Card/Card";
import { DehydratedState, QueryClient, dehydrate } from "@tanstack/react-query";
import { GetStaticProps } from "next";

//SSG
export const getStaticProps: GetStaticProps<{
  dehydratedState: DehydratedState;
}> = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.sets],
    queryFn: async () => {
      const sets = await getAllSets();
      return sets;
    },
  });
  return { props: { dehydratedState: dehydrate(queryClient) } };
};

// All PokemonTCG Set page
const LoadCard = () => {
  const setsObject = useSets();
  const sets = setsObject.data;
  sets?.sort((a, b) => Date.parse(b.releaseDate) - Date.parse(a.releaseDate));

  return (
    <>
      <h1 className="font-bold text-3xl pt-3 mt-20 pb-10 text-center text-black">
        All Pokemon TCG
        <hr className="w-[200px] border-b-4 border-red-500 mt-3 mx-auto font-bold border-top-3 text-red-500" />
      </h1>
      <div className="py-20 gap-y-10 place-items-center grid grid-cols-3">
        {sets
          ? sets.map((item) => <Card item={item} key={item.id} />)
          : "Loading..."}
      </div>
    </>
  );
};

export default LoadCard;
