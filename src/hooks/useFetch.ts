import axios, { AxiosInstance } from "axios";
import { useCallback, useEffect, useReducer, useRef, useState } from "react";

interface ReducerProps<TData, TError> {
  loading: boolean;
  fetching: boolean;
  data: TData;
  error: TError;
}

type Action<TData, TError> =
  | { type: "LOADING" }
  | { type: "FETCHING" }
  | { type: "SUCCESS"; payload: TData }
  | { type: "ERROR"; payload: TError }
  | { type: "UPDATE_DATA"; payload: TData };

interface FetchConfig {
  url: string;
  api: AxiosInstance;
}

interface Props<TApiSuccessResponse, _TApiErrorResponse, TData, TError> {
  config: FetchConfig;
  initialState: Omit<ReducerProps<TData, TError>, "fetching" | "loading">;
  onSuccess: (data: TApiSuccessResponse) => TData;
  onError: (data: string) => TError;
}

type HookReturnType<D, E> = [
  ReducerProps<D, E>,
  () => Promise<void>,
  (payload: D) => void
];

const createReducer =
  <TData, TError>() =>
  (state: ReducerProps<TData, TError>, action: Action<TData, TError>) => {
    switch (action.type) {
      case "LOADING":
        return {
          ...state,
          loading: true,
          fetching: true,
        };
      case "FETCHING":
        return {
          ...state,
          loading: false,
          fetching: true,
        };
      case "SUCCESS":
        return {
          ...state,
          loading: false,
          fetching: false,
          data: action.payload,
        };
      case "ERROR":
        return {
          ...state,
          loading: false,
          fetching: false,
          error: action.payload,
        };
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
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    fetching: false,
    loading: false,
  });
  const [isInitialFetchCall, setInitialFetchCall] = useState(true);

  const fetcher = useCallback(async () => {
    setInitialFetchCall(false);
    try {
      abortController.current = new AbortController();
      isInitialFetchCall
        ? dispatch({ type: "LOADING" })
        : dispatch({ type: "FETCHING" });
      const { data } = await api.get<TApiSuccessResponse>(url, {
        signal: abortController.current.signal,
      });
      const successData = onSuccess(data);
      dispatch({ type: "SUCCESS", payload: successData });
    } catch (e) {
      if (axios.isAxiosError<TApiErrorResponse>(e)) {
        if (e.name === "CanceledError") return;
        const error = onError(e.response?.data as string);
        dispatch({ type: "ERROR", payload: error });
      }
    }
  }, []);

  useEffect(() => {
    fetcher();
    return () => abortController.current?.abort();
  }, [fetcher]);

  return [
    state,
    fetcher,
    (payload: TData) => dispatch({ type: "UPDATE_DATA", payload }),
  ];
};
