import { nftsApi } from "@api";
import { QueryKey, UseQueryOptions, useQuery } from "@tanstack/react-query";
import { INFTResponse } from "./nft.types";

export const useGetNfts = (
  options?: Omit<
    UseQueryOptions<INFTResponse, unknown, INFTResponse, QueryKey>,
    "initialData"
  >
) =>
  useQuery<INFTResponse>({
    queryKey: ["nfts"],
    queryFn: () => nftsApi(),
    ...(options || {}),
  });
