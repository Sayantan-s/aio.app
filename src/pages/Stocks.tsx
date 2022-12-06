import { sensibullApi } from "@api";
import { Search, Table } from "@components/organisms";
import { useFetch } from "@hooks";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const stockHeaders = ["Symbol", "Name", "Sector"] as const;
type KeyOfStockHeadersType = Lowercase<typeof stockHeaders[number]>;
type StockObjectType = Record<KeyOfStockHeadersType, string>;

const Stocks = () => {
  const [{ loading, data: sbullStocks, error }] = useFetch<
    string,
    string,
    Array<StockObjectType>,
    string
  >({
    config: {
      url: "/instruments",
      api: sensibullApi,
    },
    initialState: {
      loading: false,
      data: [],
      error: "",
    },
    onError: (error) => error,
    onSuccess: (data) => {
      const rows = data
        .split("\n")
        .map((text) => text.split(","))
        .slice(1, -1);
      const stocksData = rows.map((cell) => {
        let stockObj: StockObjectType = {} as StockObjectType;
        stockHeaders.forEach((headerKey, index) => {
          const key = headerKey.toLowerCase() as KeyOfStockHeadersType;
          stockObj[key] = cell[index];
        });
        return stockObj;
      });
      return stocksData;
    },
  });

  const [search, setSearch] = useState("");

  const handleSearch: React.ChangeEventHandler<HTMLInputElement> = (eve) =>
    setSearch(eve.target.value);

  const handleSearchClear = () => setSearch("");

  const searchResults = (keys: KeyOfStockHeadersType[]) => {
    const filteredSearch = sbullStocks.filter((stock) =>
      keys.some((key) =>
        stock[key].toLowerCase().includes(search.toLowerCase())
      )
    );
    return filteredSearch;
  };

  const manipulateInnerHTML = (str: string) =>
    str.replace(
      new RegExp(search, "gi"),
      (match) =>
        `<mark class="bg-pink-500/20 text-pink-700 rounded">${match}</mark>`
    );

  return (
    <div className="absolute max-w-5xl w-full top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
      <div className="flex justify-between mb-4">
        <h1 />
        <Search
          className="flex items-center gap-x-2 flex-1 max-w-xs bg-white/70 backdrop:blur-lg py-2 px-3 rounded-md shadow-lg shadow-purple-400/10 dark:bg-slate-900/70 dark:shadow-purple-900/10"
          value={search}
          onSearch={handleSearch}
          onSearchClear={handleSearchClear}
          placeholder={"Havell's India or SBI.."}
        />
      </div>
      <Table
        className="rounded-lg overflow-hidden shadow-purple-400/10 dark:shadow-purple-900/10 shadow-2xl"
        data={searchResults(["symbol", "name"])}
      >
        <Table.Head className="bg-white/70 shadow-md shadow-slate-500/10 gap-x-4 dark:shadow-slate-900/40 dark:bg-slate-900/90">
          <Table.Cell className="flex-[0.15] text-center font-medium text-slate-600 dark:text-slate-600/50">
            Sl.no
          </Table.Cell>
          <Table.Cell className="flex-1 font-medium text-slate-600 dark:text-slate-600/50">
            Symbol
          </Table.Cell>
          <Table.Cell className="flex-1 font-medium text-slate-600 dark:text-slate-600/50">
            Name
          </Table.Cell>
          <Table.Cell className="flex-1 font-medium text-slate-600 dark:text-slate-600/50">
            Category
          </Table.Cell>
        </Table.Head>
        <Table.Body className="h-[40rem] overflow-y-scroll backdrop:blur-lg bg-white/50 dark:bg-slate-900/60">
          {loading ? (
            <div>loading...</div>
          ) : (
            (cellData: StockObjectType, id) => (
              <Table.Row
                key={cellData.name}
                className="py-3 px-4 hover:bg-white/40 gap-x-4 hover:dark:bg-slate-900/40"
              >
                <Table.Cell className="flex-[0.15] font-medium text-slate-300 dark:text-slate-700/80 text-center">
                  {id + 1}
                </Table.Cell>
                <Table.Cell className="flex-1">
                  <span className="bg-white dark:bg-slate-900/70 rounded-md px-2 py-1">
                    <NavLink
                      to={`/${cellData.symbol.toLowerCase()}`}
                      className="text-transparent bg-clip-text bg-gradient-to-br from-pink-300 via-purple-500 to-blue-500 font-semibold"
                      dangerouslySetInnerHTML={{
                        __html: manipulateInnerHTML(cellData.symbol),
                      }}
                    />
                  </span>
                </Table.Cell>
                <Table.Cell
                  className="flex-1 dark:text-slate-500"
                  dangerouslySetInnerHTML={{
                    __html: manipulateInnerHTML(cellData.name),
                  }}
                />
                <Table.Cell className="flex-1 dark:text-slate-500">
                  {cellData.sector || <span className="text-slate-400">-</span>}
                </Table.Cell>
              </Table.Row>
            )
          )}
        </Table.Body>
      </Table>
    </div>
  );
};

export default Stocks;
