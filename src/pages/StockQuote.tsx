import { sensibullApi } from "@api";
import { Layout } from "@components/helpers";
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

const stockQuoteHeaders: Array<keyof StockQuoteType> = [
  "price",
  "time",
  "valid_till",
];

const StockQuote = () => {
  const { stockname } = useParams();
  const [stockQuotes, setStockQuotes] = useState<Array<StockQuoteType>>([]);

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

  return (
    <Layout>
      <Table headings={stockQuoteHeaders} data={stockQuotes}>
        <Table.Head>
          {(heading) => <Table.Cell key={heading}>{heading}</Table.Cell>}
        </Table.Head>
        <Table.Body>
          {(cellData: StockQuoteType, id) => (
            <Table.Row key={id}>
              <Table.Cell>{cellData.price}</Table.Cell>
              <Table.Cell>{cellData.time}</Table.Cell>
              <Table.Cell>{cellData.valid_till}</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </Layout>
  );
};

export default StockQuote;
