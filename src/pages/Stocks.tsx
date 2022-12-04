import { sensibullApi } from "@api";
import { Layout } from "@components/helpers";
import { Table } from "@components/organisms";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

type StockHeadersType = ["Symbol", "Name", "Sector", "Validtill"];
type KeyOfStockHeadersType = Lowercase<StockHeadersType[number]>;
type StockObjectType = Record<KeyOfStockHeadersType, string>;

const Stocks = () => {
  const [stockHeaders, setStockHeaders] = useState<StockHeadersType | []>([]);
  const [sbullStocksApiData, setsbullStocksApiData] = useState<
    Array<StockObjectType>
  >([]);

  useEffect(() => {
    async function fetchSensibullStocks() {
      const stockData = await sensibullApi("/instruments", {
        responseType: "text",
      });
      const [headers, ...data] = stockData
        .split("\n")
        .map((text) => text.split(","))
        .slice(0, -1);
      const stockHeaders = headers as StockHeadersType;
      setStockHeaders(stockHeaders);
      setsbullStocksApiData(() =>
        data.map((cell) => {
          let stockObj: StockObjectType = {} as StockObjectType;
          stockHeaders.forEach((headerKey, index) => {
            const key = headerKey.toLowerCase() as KeyOfStockHeadersType;
            stockObj[key] = cell[index];
          });
          return stockObj;
        })
      );
    }

    fetchSensibullStocks();
  }, []);

  return (
    <Layout>
      <Table headings={stockHeaders} data={sbullStocksApiData}>
        <Table.Head>
          {(heading) => <Table.Cell key={heading}>{heading}</Table.Cell>}
        </Table.Head>
        <Table.Body>
          {(cellData: StockObjectType) => (
            <Table.Row key={cellData.name}>
              <Table.Cell>
                <NavLink to={`/${cellData.symbol.toLowerCase()}`}>
                  {cellData.symbol}
                </NavLink>
              </Table.Cell>
              <Table.Cell>{cellData.name}</Table.Cell>
              <Table.Cell>{cellData.sector}</Table.Cell>
              <Table.Cell>{cellData.validtill}</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </Layout>
  );
};

export default Stocks;
