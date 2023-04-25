import { ApiResponse } from "@api";

export interface ClientSideCoinType {
  checked: boolean;
}
export interface ICoin extends ClientSideCoinType {
  "24hVolume": string;
  btcPrice: string;
  change: string;
  coinrankingUrl: string;
  color: string;
  iconUrl: string;
  listedAt: number;
  lowVolume: boolean;
  marketCap: string;
  name: string;
  price: string;
  rank: number;
  sparkline: string[];
  symbol: string;
  tier: number;
  uuid: string;
}

export interface IStats {
  total: number;
  total24hVolume: string;
  totalCoins: number;
  totalExchanges: number;
  totalMarketCap: string;
  totalMarkets: number;
}

export type ICoinsResponse = ApiResponse<{ coins: ICoin[]; stats: IStats }>;
