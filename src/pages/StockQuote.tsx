import { sensibullApi } from "@api";
import { useMode } from "@components/helpers";
import { SortButtons, Table } from "@components/organisms";
import { useFetch } from "@hooks";
import { Player } from "@lottiefiles/react-lottie-player";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";

interface StockQuoteType {
  price: number;
  time: string;
  valid_till: string;
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

type SortableValues = Exclude<keyof StockQuoteType, "price">;
type Order = "asc" | "desc";

const StockQuote = () => {
  const { stockname } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Record<SortableValues, Order | null>>({
    valid_till: null,
    time: null,
  });
  const [{ loading, data: stockQuotes, error }, setStockQuotes] = useFetch<
    StockQuotesApiResponseSuccessType,
    StockQuotesApiResponseErrorType,
    Array<StockQuoteType>,
    string
  >({
    config: {
      api: sensibullApi,
      url: `/quotes/${stockname?.toUpperCase()}`,
    },
    initialState: {
      loading: false,
      data: [],
      error: "",
    },
    onError: (error) => error.err_msg,
    onSuccess: (data) => {
      console.log(data);
      return data.payload[stockname?.toUpperCase()!];
    },
  });

  const { mode } = useMode();

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
    <div className="absolute max-xl:max-w-5xl max-w-4xl w-full top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
      <motion.button
        whileTap={{ scale: 0.9 }}
        className="flex items-center justify-center mb-4 bg-white/70 backdrop:blur-lg w-[36px] h-[36px] rounded-full shadow-lg shadow-purple-400/10 dark:bg-slate-900/70 dark:shadow-none dark:border-2 dark:border-slate-700/50"
        onClick={handleGoBack}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={16}
          height={16}
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            className="stroke-slate-400 dark:stroke-slate-600"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit={10}
            strokeWidth="2"
            d="M15 19.92L8.48 13.4c-.77-.77-.77-2.03 0-2.8L15 4.08"
          />
        </svg>
      </motion.button>
      <Table
        className="rounded-lg overflow-hidden shadow-purple-400/10 dark:shadow-purple-900/10 shadow-2xl"
        data={stockQuotes}
      >
        <Table.Head className="bg-white/70 shadow-md shadow-slate-500/10 gap-x-4 dark:shadow-slate-900/40 dark:bg-slate-900/90">
          <Table.Cell className="flex-[0.15] text-center font-medium text-slate-600 dark:text-slate-600/50">
            Sl.no
          </Table.Cell>
          <Table.Cell className="flex-1 font-medium text-slate-600 dark:text-slate-600/50">
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
            Valid till
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
          ) : (
            (cellData: StockQuoteType, id) => (
              <Table.Row
                key={id}
                className="py-3 px-4 hover:bg-white/40 gap-x-4 hover:dark:bg-slate-900/40"
              >
                <Table.Cell className="flex-[0.15] font-medium text-slate-300 dark:text-slate-700/80 text-center">
                  {id + 1}
                </Table.Cell>
                <Table.Cell className="flex-1 font-semibold text-slate-500 dark:text-slate-400">
                  {cellData.price.toFixed(2)}
                </Table.Cell>
                <Table.Cell className="flex-1 dark:text-slate-500">
                  {cellData.time}
                </Table.Cell>
                <Table.Cell className="flex-1 dark:text-slate-500">
                  {cellData.valid_till}
                </Table.Cell>
              </Table.Row>
            )
          )}
        </Table.Body>
      </Table>
    </div>
  );
};

export default StockQuote;
