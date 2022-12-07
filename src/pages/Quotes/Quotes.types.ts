export interface InstrumentQuoteType {
  price: number;
  time: string;
  valid_till: string;
}

export interface InstrumentQuoteWithValidityType extends InstrumentQuoteType {
  validity: "expired" | "ok";
}

export interface InstrumentQuotesApiResponseSuccessType {
  success: true;
  payload: {
    [stockname: string]: Array<InstrumentQuoteType>;
  };
}

export interface InstrumentQuotesApiResponseErrorType {
  success: false;
  err_msg: string;
}

export type SortableValues = "time";
export type Order = "asc" | "desc";
