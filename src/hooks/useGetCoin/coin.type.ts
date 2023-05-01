import type { ApiResponse } from "@api";
import type { ICoin } from "@hooks/useGetCoins/coin.types";

export interface TCoin extends ICoin {
    websiteUrl: string;
    description: string;
}

export type ICoinResponse = ApiResponse<{ coin: TCoin }>;
