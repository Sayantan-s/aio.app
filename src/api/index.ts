import axios from "axios";

export interface ApiResponse<TData> {
  data: TData;
  status: string;
}

export const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  headers: {
    "X-RapidAPI-Key": import.meta.env.VITE_APP_API_KEY,
    "X-RapidAPI-Host": import.meta.env.VITE_APP_API_HOST,
  },
});

export const queryFn = async (params: string, queryParams?: object) => {
  const res = await api.get(params, {
    method: "GET",
    params: queryParams,
  });
  return res.data;
};
