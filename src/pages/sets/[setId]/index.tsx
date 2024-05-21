import { QueryKeys } from "@/models/enums";
import { useSet } from "@/hooks/react-query-hooks";
import { getSetById } from "@/service/pokemon.service";
import { DehydratedState, QueryClient, dehydrate } from "@tanstack/react-query";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { getAllSets } from "pokemon-tcg-sdk-typescript/dist/sdk";
import BorderColorIcon from "@mui/icons-material/BorderColor";

export const getStaticPaths: GetStaticPaths = async () => {
  let allSets = await getAllSets();
  let listOfSetIdObjects: { params: { setId: string } }[] = allSets.map((x) => {
    return { params: { setId: x.id } };
  });

  return { paths: listOfSetIdObjects.splice(0, 5), fallback: true };
};

export const getStaticProps: GetStaticProps<{
  dehydratedState: DehydratedState;
}> = async (context: any) => {
  const queryClient = new QueryClient();
  const id = context?.params?.setId as string;
  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.set, context?.params?.setId],
    queryFn: async () => {
      const fetchedSet = await getSetById(id);

      if (!fetchedSet) {
        return { notFound: true, revalidate: 60 };
      }

      return fetchedSet;
    },
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 20,
  };
};

// Single PokemonTCG Set Page
const CardSet = () => {
  const router = useRouter();
  const { data: singleSet } = useSet(router?.query?.setId as string);
  console.log("im in set page", singleSet);

  if (!singleSet)
    return (
      <div className="h-[690px] flex justify-center items-center overflow-y-hidden bg-gray-300">
        <h3 className="text-center text-[60px]">No items found </h3>
      </div>
    );

  return (
    <div className="h-[690px] flex justify-center items-center overflow-hidden bg-gray-300">
      {router?.isFallback ? (
        <>Fallback Loading</>
      ) : (
        <>
          <div className="flex flex-col bg-white rounded-xl shadow-xl shadow-black/50  px-10">
            <div className="my-5">
              <div className="w-[300px] h-[200px] mx-auto">
                <Image
                  width={500}
                  height={500}
                  className="h-full"
                  src={singleSet.images?.logo}
                  alt={singleSet.name + "images"}
                  priority={true}
                />
              </div>
            </div>
            <div className="flex justify-between my-8">
              <p className="text-black text-xl font-bold">{singleSet.name}</p>
              <BorderColorIcon />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CardSet;
