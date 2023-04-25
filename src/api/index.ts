import axios from "axios";

export interface ApiResponse<TData> {
  data: TData;
  status: string;
}

export const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL_COINS,
  headers: {
    "X-RapidAPI-Key": import.meta.env.VITE_APP_API_KEY,
  },
});

export const coinApi = async (params: string, queryParams?: object) => {
  const res = await api.get(params, {
    method: "GET",
    params: queryParams,
  });
  return res.data;
};

export const newsapi = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL_NEWS,
  headers: {
    "X-RapidAPI-Key": import.meta.env.VITE_APP_API_KEY,
  },
});

export const newsApi = async () => {
  const res = await newsapi.get("");
  return res.data;
};

export const nftsapi = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL_NFTS,
  headers: {
    "X-RapidAPI-Key": import.meta.env.VITE_APP_API_KEY,
  },
});

export const nftsApi = async () => {
  const res = await nftsapi.get("/assets", {
    params: { order_direction: "desc", limit: 20, include_orders: "false" },
  });
  return res.data;
};
