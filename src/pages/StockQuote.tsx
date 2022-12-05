import { sensibullApi } from "@api";
import { SortButtons, Table } from "@components/organisms";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

interface StockQuoteType {
  price: number;
  time: string;
  valid_till: string;
}

interface StockQuotesApiResponseType {
  success: "true" | "false";
  payload: {
    [stockname: string]: Array<StockQuoteType>;
  };
}

type SortableValues = Exclude<keyof StockQuoteType, "price">;
type Order = "asc" | "desc";

const StockQuote = () => {
  const { stockname } = useParams();
  const [stockQuotes, setStockQuotes] = useState<Array<StockQuoteType>>([]);
  const [order, setOrder] = useState<Record<SortableValues, Order | null>>({
    valid_till: null,
    time: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchSensibullStockQuote() {
      const stockQuotes = await sensibullApi<StockQuotesApiResponseType>(
        `/quotes/${stockname?.toUpperCase()}`,
        {
          responseType: "json",
        }
      );
      setStockQuotes(stockQuotes.payload[stockname?.toUpperCase()!]);
    }
    fetchSensibullStockQuote();
  }, []);

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

  const handleTimeExpiration = (time: string) => {
    console.log(new Date(time).getTime() < new Date().getTime());
    return time;
  };

  const handleGoBack = () => navigate(-1);

  return (
    <div className="absolute max-w-5xl w-full top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
      <motion.button
        whileTap={{ scale: 0.9 }}
        className="flex items-center justify-center mb-4 bg-white/70 backdrop:blur-lg w-[36px] h-[36px] rounded-full shadow-lg shadow-purple-400/10"
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
            className="stroke-slate-400"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit={10}
            strokeWidth="2"
            d="M15 19.92L8.48 13.4c-.77-.77-.77-2.03 0-2.8L15 4.08"
          />
        </svg>
      </motion.button>
      <Table
        className="rounded-lg overflow-hidden shadow-purple-400/10 shadow-2xl"
        data={stockQuotes}
      >
        <Table.Head className="bg-white/70 shadow-md shadow-slate-500/10 gap-x-4">
          <Table.Cell className="flex-[0.15] text-center font-medium text-slate-600">
            Sl.no
          </Table.Cell>
          <Table.Cell className="flex-1 font-medium text-slate-600">
            Price
          </Table.Cell>
          <Table.Cell className=" flex flex-1 items-center font-medium text-slate-600">
            Time
            <SortButtons
              order={order.time}
              className="ml-3"
              onAscend={() => handleSort("time", "asc")}
              onDescend={() => handleSort("time", "desc")}
            />
          </Table.Cell>
          <Table.Cell className="flex flex-1 items-center font-medium text-slate-600">
            Valid till
            <SortButtons
              order={order.valid_till}
              className="ml-3"
              onAscend={() => handleSort("valid_till", "asc")}
              onDescend={() => handleSort("valid_till", "desc")}
            />
          </Table.Cell>
        </Table.Head>
        <Table.Body className="h-[40rem] overflow-scroll backdrop:blur-lg bg-white/50">
          {(cellData: StockQuoteType, id) => (
            <Table.Row key={id} className="py-3 px-4 hover:bg-white/40 gap-x-4">
              <Table.Cell className="flex-[0.15] font-medium text-slate-300 text-center">
                {id + 1}
              </Table.Cell>
              <Table.Cell className="flex-1 text-slate-500 font-medium">
                {cellData.price.toFixed(2)}
              </Table.Cell>
              <Table.Cell className="flex-1">{cellData.time}</Table.Cell>
              <Table.Cell className="flex-1">
                {handleTimeExpiration(cellData.valid_till)}
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>
  );
};

export default StockQuote;
