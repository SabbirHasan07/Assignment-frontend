import { QueryKeys } from "@/models/enums";
import { getAllSets, getSetById } from "@/service/pokemon.service";
import { useQuery } from "@tanstack/react-query";
import { Set } from "pokemon-tcg-sdk-typescript/dist/sdk";

// UseQuery for All Sets
export const useSets = () => {
  return useQuery<Set[]>({
    queryKey: [QueryKeys.sets],
    queryFn: async () => {
      const sets = await getAllSets();
      return sets;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    enabled: true,
    retry: 1,
    retryDelay: 3000,
  });
};

// UseQuery for Single Set
export const useSet = (setId: string) => {
  return useQuery({
    queryKey: [QueryKeys.set, setId],
    queryFn: async () => {
      const set = await getSetById(setId);
      return set;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    enabled: true,
    retry: 1,
    retryDelay: 3000,
  });
};
