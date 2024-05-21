import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FC, useState } from "react";
import { AccordionProps } from "@/models/accordionInfo";
import { GetStaticProps } from "next";
import { DehydratedState, QueryClient, dehydrate } from "@tanstack/react-query";
import { QueryKeys } from "@/models/enums";
import { getAllSets } from "@/service/pokemon.service";
import Card from "../Card/Card";
import { useSets } from "@/hooks/react-query-hooks";

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

// Pokemon TCG Set Accordion Component
const SetAccordion: FC<{ accordionProps: AccordionProps }> = ({
  accordionProps,
}) => {
  const setsObject = useSets();
  const sets = setsObject.data;

  const { id, name } = accordionProps;

  return (
    <div>
      <Accordion className="mb-4 mt-4 hover:bg-blue-200">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`panel${id}d-content`}
          id={`panel${id}-header`}
          className="text-xl"
        >
          {name}
        </AccordionSummary>
        <AccordionDetails>
          <div className="w-100 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-5 mt-8 ">
            {sets?.map(
              (set: any) =>
                set.series === name && <Card item={set} key={set?.id} />
            )}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default SetAccordion;
