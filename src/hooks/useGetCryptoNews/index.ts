import { newsApi } from "@api";
import type { QueryKey, UseQueryOptions} from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import type { INewsResponse } from "./news.types";

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
