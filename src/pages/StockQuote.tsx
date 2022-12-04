import { sensibullApi } from "@api";
import { Table } from "@components/organisms";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

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

const StockQuote = () => {
  const { stockname } = useParams();
  const [stockQuotes, setStockQuotes] = useState<Array<StockQuoteType>>([]);
  const [order, setOrder] = useState<"asc" | "desc">("asc");

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

  const handleSort = (property: SortableValues) => {
    let copyQuotes = [...stockQuotes];
    if (order === "asc") {
      copyQuotes = copyQuotes.sort(
        (next, curr) =>
          new Date(next[property]).getTime() -
          new Date(curr[property]).getTime()
      );
      setOrder("desc");
    } else {
      copyQuotes = copyQuotes.sort(
        (next, curr) =>
          new Date(curr[property]).getTime() -
          new Date(next[property]).getTime()
      );
      setOrder("asc");
    }
    setStockQuotes(copyQuotes);
  };

  return (
    <div className="absolute max-w-5xl w-full top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
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
          <Table.Cell
            className="flex-1 cursor-pointer font-medium text-slate-600"
            onClick={() => handleSort("time")}
          >
            Time
          </Table.Cell>
          <Table.Cell
            className="flex-1 cursor-pointer font-medium text-slate-600"
            onClick={() => handleSort("valid_till")}
          >
            Validity
          </Table.Cell>
        </Table.Head>
        <Table.Body className="h-[40rem] overflow-scroll backdrop:blur-lg bg-white/50">
          {(cellData: StockQuoteType, id) => (
            <Table.Row key={id} className="py-3 px-4 hover:bg-white/40 gap-x-4">
              <Table.Cell className="flex-[0.15] font-medium text-slate-300 text-center">
                {id + 1}
              </Table.Cell>
              <Table.Cell className="flex-1">
                {cellData.price.toFixed(2)}
              </Table.Cell>
              <Table.Cell className="flex-1">{cellData.time}</Table.Cell>
              <Table.Cell className="flex-1">{cellData.valid_till}</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>
  );
};

export default StockQuote;
