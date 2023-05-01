import { nftsApi } from "@api";
import type { QueryKey, UseQueryOptions} from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import type { INFTResponse } from "./nft.types";

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
