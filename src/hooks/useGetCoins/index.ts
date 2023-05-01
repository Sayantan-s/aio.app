import { coinApi } from "@api";
import type { QueryKey, UseQueryOptions} from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import type { ICoinsResponse } from "./coin.types";

export const useGetCoins = (
    options?: Omit<
    UseQueryOptions<ICoinsResponse, unknown, ICoinsResponse, QueryKey>,
    "initialData"
    >
) =>
    useQuery<ICoinsResponse>({
        queryKey: ["coins"],
        queryFn: () => coinApi("/coins", { limit: 15, offset: 0 }),
        ...(options || {}),
    });
