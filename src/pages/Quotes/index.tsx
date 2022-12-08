import { sensibullApi } from "@api";
import { LeftArrow } from "@components/icons";
import {
  Error,
  HeaderPanel,
  Loader,
  Pagewrap,
  SortButtons,
  Table,
} from "@components/organisms";
import { useFetch, useInterval } from "@hooks";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import type {
  InstrumentQuotesApiResponseErrorType,
  InstrumentQuotesApiResponseSuccessType,
  InstrumentQuoteWithValidityType,
  Order,
  SortableValues,
} from "./Quotes.types";

function UTCTimeValidity(value: string) {
  return new Date(`${value} UTC`).getTime() > new Date().getTime();
}

const Quotes = () => {
  const { instrument } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Record<SortableValues, Order | null>>({
    time: null,
  });

  const [{ loading, data: stockQuotes, error }, fetcher, setStockQuotes] =
    useFetch<
      InstrumentQuotesApiResponseSuccessType,
      InstrumentQuotesApiResponseErrorType,
      Array<InstrumentQuoteWithValidityType>,
      string
    >({
      config: {
        api: sensibullApi,
        url: `/quotes/${instrument?.toUpperCase()}`,
      },
      initialState: {
        data: [],
        error: "",
      },
      onError: (error) => error,
      onSuccess: (data) => {
        return data.payload[instrument?.toUpperCase()!].map((quote) => ({
          ...quote,
          validity: UTCTimeValidity(quote.valid_till) ? "ok" : "expired",
        }));
      },
    });

  useInterval(1000, (runningInterval: number) => {
    if (error) {
      clearInterval(runningInterval);
      return;
    }
    const quotes: InstrumentQuoteWithValidityType[] = stockQuotes.map(
      (quote) => {
        return {
          ...quote,
          validity: UTCTimeValidity(quote.valid_till) ? "ok" : "expired",
        };
      }
    );
    setStockQuotes(quotes);
    const hasEveryQuoteExpired = quotes.every(
      (quote) => quote.validity === "expired"
    );
    if (hasEveryQuoteExpired) fetcher();
  });

  const handleSort = (property: SortableValues, od: Order) => {
    let copyQuotes = [...stockQuotes];
    if (od === "asc") {
      copyQuotes = copyQuotes.sort(
        (next, curr) =>
          new Date(next[property]).getTime() -
          new Date(curr[property]).getTime()
      );
    } else {
      copyQuotes = copyQuotes.sort(
        (next, curr) =>
          new Date(curr[property]).getTime() -
          new Date(next[property]).getTime()
      );
    }
    setOrder((prevState) => ({ ...prevState, [property]: od }));
    setStockQuotes(copyQuotes);
  };

  const handleGoBack = () => navigate(-1);

  return (
    <Pagewrap>
      <HeaderPanel>
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="flex items-center justify-center bg-white/70 backdrop:blur-lg w-[36px] h-[36px] rounded-full shadow-lg shadow-purple-400/10 dark:bg-slate-900/70 dark:shadow-none dark:border-2 dark:border-slate-700/50"
          onClick={handleGoBack}
        >
          <LeftArrow size={16} />
        </motion.button>
      </HeaderPanel>
      <Table data={stockQuotes}>
        <Table.Head>
          <Table.Cell className="flex-[0.15] text-center font-medium text-slate-600 dark:text-slate-600/50">
            Sl.no
          </Table.Cell>
          <Table.Cell className="flex-1 max-lg:flex-[0.5] font-medium text-slate-600 dark:text-slate-600/50">
            Price
          </Table.Cell>
          <Table.Cell className=" flex flex-1 items-center font-medium text-slate-600 dark:text-slate-600/50">
            Time
            <SortButtons
              order={order.time}
              className="ml-3"
              onAscend={() => handleSort("time", "asc")}
              onDescend={() => handleSort("time", "desc")}
            />
          </Table.Cell>
          <Table.Cell className="flex flex-1 items-center font-medium text-slate-600 dark:text-slate-600/50">
            Quote Validity
          </Table.Cell>
          <Table.Cell className="flex flex-[0.3] justify-end items-center font-medium text-slate-600 dark:text-slate-600/50">
            Status
          </Table.Cell>
        </Table.Head>
        <Table.Body>
          {loading ? (
            <Loader />
          ) : error ? (
            <Error message={error} />
          ) : (
            (cellData: InstrumentQuoteWithValidityType, id) => (
              <Table.Row key={id}>
                <Table.Cell className="flex items-center justify-center flex-[0.15] font-medium text-slate-300 dark:text-slate-700/80">
                  {id + 1}
                </Table.Cell>
                <Table.Cell className="flex items-center flex-1 max-lg:flex-[0.5] font-semibold text-slate-500 dark:text-slate-400">
                  {cellData.price.toFixed(2)}
                </Table.Cell>
                <Table.Cell className="flex items-center flex-1 dark:text-slate-500">
                  {cellData.time}
                </Table.Cell>
                <Table.Cell className="flex items-center flex-1 dark:text-slate-500">
                  {cellData.valid_till}
                </Table.Cell>
                <Table.Cell className="flex-[0.3] flex justify-end dark:text-slate-500">
                  <span
                    className={`px-3 py-0.5 uppercase font-semibold rounded-full ${
                      cellData.validity === "expired"
                        ? "text-rose-500 dark:text-rose-600 bg-rose-500/10"
                        : " text-emerald-500 dark:text-emerald-600 bg-emerald-500/10"
                    }`}
                  >
                    {cellData.validity}
                  </span>
                </Table.Cell>
              </Table.Row>
            )
          )}
        </Table.Body>
      </Table>
    </Pagewrap>
  );
};

export default Quotes;
