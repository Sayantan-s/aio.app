import { newsApi } from "@api";
import { QueryKey, UseQueryOptions, useQuery } from "@tanstack/react-query";
import { INewsResponse } from "./news.types";

export const useGetCryptoNews = (
  options?: Omit<
    UseQueryOptions<INewsResponse, unknown, INewsResponse, QueryKey>,
    "initialData"
  >
) =>
  useQuery<INewsResponse>({
    queryKey: ["news"],
    queryFn: () => newsApi(),
    ...(options || {}),
  });
