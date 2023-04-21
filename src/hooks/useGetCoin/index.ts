import { coinApi } from "@api";
import { QueryKey, UseQueryOptions, useQuery } from "@tanstack/react-query";
import { ICoinResponse } from "./coin.type";

export const useGetCoin = (
  id: string,
  options?: Omit<
    UseQueryOptions<ICoinResponse, unknown, ICoinResponse, QueryKey>,
    "initialData"
  >
) =>
  useQuery<ICoinResponse>({
    queryKey: ["coin", id],
    queryFn: () => coinApi(`/coin/${id}`),
    enabled: !!id,
    ...(options || {}),
  });
