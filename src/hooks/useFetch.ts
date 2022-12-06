import axios, { AxiosInstance } from "axios";
import { useEffect, useReducer, useRef } from "react";

interface ReducerProps<TData, TError> {
  loading: boolean;
  data: TData;
  error: TError;
}

type Action<TData, TError> =
  | { type: "LOADING" }
  | { type: "SUCCESS"; payload: TData }
  | { type: "ERROR"; payload: TError }
  | { type: "UPDATE_DATA"; payload: TData };

interface FetchConfig {
  url: string;
  api: AxiosInstance;
}

interface Props<TApiSuccessResponse, TApiErrorResponse, TData, TError> {
  config: FetchConfig;
  initialState: ReducerProps<TData, TError>;
  onSuccess: (data: TApiSuccessResponse) => TData;
  onError: (data: TApiErrorResponse) => TError;
}

type HookReturnType<D, E> = [ReducerProps<D, E>, (payload: D) => void];

const createReducer =
  <TData, TError>() =>
  (state: ReducerProps<TData, TError>, action: Action<TData, TError>) => {
    switch (action.type) {
      case "LOADING":
        return { ...state, loading: true };
      case "SUCCESS":
        return { ...state, loading: false, data: action.payload };
      case "ERROR":
        return { ...state, loading: false, error: action.payload };
      case "UPDATE_DATA":
        return { ...state, data: action.payload };
      default:
        return state;
    }
  };

export const useFetch = <
  TApiSuccessResponse,
  TApiErrorResponse,
  TData,
  TError
>({
  config: { url, api },
  initialState,
  onSuccess,
  onError,
}: Props<
  TApiSuccessResponse,
  TApiErrorResponse,
  TData,
  TError
>): HookReturnType<TData, TError> => {
  const reducer = createReducer<TData, TError>();
  const abortController = useRef<AbortController>();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function fetcher() {
      try {
        abortController.current = new AbortController();
        dispatch({ type: "LOADING" });
        const { data } = await api.get<TApiSuccessResponse>(url, {
          signal: abortController.current.signal,
        });
        const successData = onSuccess(data);
        dispatch({ type: "SUCCESS", payload: successData });
      } catch (e) {
        if (axios.isAxiosError<TApiErrorResponse>(e)) {
          const error = onError(e.response?.data!);
          dispatch({ type: "ERROR", payload: error });
        }
      }
    }
    fetcher();
    return () => {
      abortController.current?.abort();
    };
  }, []);

  return [
    state,
    (payload: TData) => dispatch({ type: "UPDATE_DATA", payload }),
  ];
};
