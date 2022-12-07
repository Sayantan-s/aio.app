import { sensibullApi } from "@api";
import { useMode } from "@components/helpers";
import { LeftArrow } from "@components/icons";
import { Error, HeaderPanel, SortButtons, Table } from "@components/organisms";
import { useFetch, useInterval } from "@hooks";
import { Player } from "@lottiefiles/react-lottie-player";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";

interface StockQuoteType {
  price: number;
  time: string;
  valid_till: string;
}

interface StockQuoteWithValidityType extends StockQuoteType {
  validity: "expired" | "ok";
}

interface StockQuotesApiResponseSuccessType {
  success: true;
  payload: {
    [stockname: string]: Array<StockQuoteType>;
  };
}

interface StockQuotesApiResponseErrorType {
  success: false;
  err_msg: string;
}

type SortableValues = "time";
type Order = "asc" | "desc";

function UTCTimeValidity(value: string) {
  return new Date(`${value} UTC`).getTime() > new Date().getTime();
}

const Quotes = () => {
  const { instrument } = useParams();
  const navigate = useNavigate();
  const { mode } = useMode();
  const [order, setOrder] = useState<Record<SortableValues, Order | null>>({
    time: null,
  });

  const [{ loading, data: stockQuotes, error }, fetcher, setStockQuotes] =
    useFetch<
      StockQuotesApiResponseSuccessType,
      StockQuotesApiResponseErrorType,
      Array<StockQuoteWithValidityType>,
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
    if (error) clearInterval(runningInterval);
    const quotes: StockQuoteWithValidityType[] = stockQuotes.map((quote) => {
      return {
        ...quote,
        validity: UTCTimeValidity(quote.valid_till) ? "ok" : "expired",
      };
    });
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
    <div className="absolute max-xl:max-w-4xl max-lg:max-w-3xl max-md:p-4 max-w-5xl w-full top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
      <HeaderPanel>
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="flex items-center justify-center  bg-white/70 backdrop:blur-lg w-[36px] h-[36px] rounded-full shadow-lg shadow-purple-400/10 dark:bg-slate-900/70 dark:shadow-none dark:border-2 dark:border-slate-700/50"
          onClick={handleGoBack}
        >
          <LeftArrow size={16} />
        </motion.button>
      </HeaderPanel>
      <Table
        className="rounded-lg overflow-hidden shadow-purple-400/10 dark:shadow-purple-900/10 shadow-2xl max-md:min-w-[768px]"
        data={stockQuotes}
      >
        <Table.Head className="bg-white/70 shadow-md shadow-slate-500/10 gap-x-4 dark:shadow-slate-900/40 dark:bg-slate-900/90">
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
        <Table.Body className="h-[40rem] overflow-y-scroll backdrop:blur-lg bg-white/50 dark:bg-slate-900/60 relative">
          {loading ? (
            <Player
              autoplay
              loop
              src={
                mode === "dark" ? "/loading_dark.json" : "/loading_light.json"
              }
              className="w-12 h-12 opacity-40 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            />
          ) : error ? (
            <Error message={error} />
          ) : (
            (cellData: StockQuoteWithValidityType, id) => (
              <Table.Row
                key={id}
                className="py-3 px-4 hover:bg-white/40 gap-x-4 hover:dark:bg-slate-900/40"
              >
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
                    className={`px-2 py-0.5 uppercase font-semibold rounded-md ${
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
    </div>
  );
};

export default Quotes;
