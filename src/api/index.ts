interface ApiResponseType {
  responseType: "json" | "text";
}

export const sensibullApi = async <TResponse extends unknown = string>(
  param: string,
  response?: ApiResponseType
): Promise<TResponse> => {
  const res = await fetch(`${import.meta.env.VITE_APP_API_URL}${param}`);
  if (response) {
    const { responseType } = response;
    return res[responseType]();
  }
  return res.json();
};
