import { sensibullApi } from "@api";
import { Table } from "@components/organisms";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const stockHeaders = ["Symbol", "Name", "Sector"] as const;
type KeyOfStockHeadersType = Lowercase<typeof stockHeaders[number]>;
type StockObjectType = Record<KeyOfStockHeadersType, string>;

const Stocks = () => {
  const [sbullStocksApiData, setsbullStocksApiData] = useState<
    Array<StockObjectType>
  >([]);

  useEffect(() => {
    async function fetchSensibullStocks() {
      const stockData = await sensibullApi("/instruments", {
        responseType: "text",
      });
      const data = stockData
        .split("\n")
        .map((text) => text.split(","))
        .slice(1, -1);
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
    <div className="absolute max-w-5xl w-full top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
      <Table
        className="rounded-lg overflow-hidden shadow-purple-400/10 shadow-2xl"
        data={sbullStocksApiData}
      >
        <Table.Head className="bg-white/70 shadow-md shadow-slate-500/10 gap-x-4">
          <Table.Cell className="flex-[0.15] text-center font-medium text-slate-600">
            Sl.no
          </Table.Cell>
          <Table.Cell className="flex-1 font-medium text-slate-600">
            Symbol
          </Table.Cell>
          <Table.Cell className="flex-1 font-medium text-slate-600">
            Name
          </Table.Cell>
          <Table.Cell className="flex-1 font-medium text-slate-600">
            Category
          </Table.Cell>
        </Table.Head>
        <Table.Body className="h-[40rem] overflow-scroll backdrop:blur-lg bg-white/50">
          {(cellData: StockObjectType, id) => (
            <Table.Row
              key={cellData.name}
              className="py-3 px-4 hover:bg-white/40 gap-x-4"
            >
              <Table.Cell className="flex-[0.15] font-medium text-slate-300 text-center">
                {id + 1}
              </Table.Cell>
              <Table.Cell className="flex-1">
                <NavLink
                  to={`/${cellData.symbol.toLowerCase()}`}
                  className="font-medium text-purple-600 bg-white rounded-md hover:bg-purple-50 px-2 py-1"
                >
                  {cellData.symbol}
                </NavLink>
              </Table.Cell>
              <Table.Cell className="flex-1">{cellData.name}</Table.Cell>
              <Table.Cell className="flex-1">
                {cellData.sector || <span className="text-slate-400">-</span>}
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>
  );
};

export default Stocks;
