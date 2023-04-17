import { queryFn } from "@api";
import { useQuery } from "@tanstack/react-query";
import { ICoinResponse } from "./coin.types";

export const useGetCoins = () =>
  useQuery<ICoinResponse>({
    queryKey: ["coins"],
    queryFn: () => queryFn("/coins", { limit: 15, offset: 0 }),
    // refetchInterval: 60 * 1000,
  });
