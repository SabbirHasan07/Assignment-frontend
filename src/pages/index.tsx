import { QueryKeys } from "@/models/enums";
import { useSets } from "@/hooks/react-query-hooks";
import { getAllSets } from "@/service/pokemon.service";
import Carousel from "@/components/Carousel/Carousel";
import Slider from "@/components/Slider/Slider";
import { DehydratedState, QueryClient, dehydrate } from "@tanstack/react-query";
import { GetStaticProps } from "next";
import SetAccordion from "@/components/SetAccordion/SetAccordion";
import SetSeries from "@/utilities/SetSeries";
import ScrollButton from "@/components/ScrollButton/ScrollButton";
import MarqueeCard from "@/components/Marquee/Marquee";

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
  return { props: { dehydratedState: dehydrate(queryClient) }, revalidate: 30 };
};

// Home Page
const Home = () => {
  const setsObject = useSets();
  const sets = setsObject.data;

  sets?.sort((a, b) => Date.parse(b.releaseDate) - Date.parse(a.releaseDate));

  return (
    <div className="bg-gray-300">
      <Slider />
      <MarqueeCard/>
      <Carousel />
      
      <h1 className="font-bold text-3xl pt-3 mt-20 pb-10 text-center text-black">
        All Pokemon TCG
        <hr className="w-[200px] border-b-4 border-orange-500 mt-3 mx-auto font-bold border-top-3 text-red-500" />
      </h1>

      <div className="mx-16 pb-5">
        {SetSeries.map((set) => (
          <SetAccordion key={set.name} accordionProps={set} />
        ))}
      </div>
      <ScrollButton />
    </div>
  );
};

export default Home;
