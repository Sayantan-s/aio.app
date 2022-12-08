import { sensibullApi } from "@api";
import {
  Error,
  HeaderPanel,
  Loader,
  Pagewrap,
  Search,
  Table,
} from "@components/organisms";
import { useFetch } from "@hooks";
import { useCallback, useState } from "react";
import { NavLink } from "react-router-dom";
import type {
  InstrumentObjectType,
  KeyOfInstrumentHeadersType,
} from "./Instrument.types";
import { instrumentHeaders } from "./Instrument.types";

const Instruments = () => {
  const [{ loading, data: sbullStocks, error }] = useFetch<
    string,
    string,
    Array<InstrumentObjectType>,
    string
  >({
    config: {
      url: "/instruments",
      api: sensibullApi,
    },
    initialState: {
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
        let stockObj: InstrumentObjectType = {} as InstrumentObjectType;
        instrumentHeaders.forEach((headerKey, index) => {
          const key = headerKey.toLowerCase() as KeyOfInstrumentHeadersType;
          stockObj[key] = cell[index];
        });
        return stockObj;
      });
      return stocksData;
    },
  });

  const [search, setSearch] = useState("");

  const handleSearch: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (eve) => setSearch(eve.target.value),
    []
  );

  const handleSearchClear = useCallback(() => setSearch(""), []);

  const searchResults = (keys: KeyOfInstrumentHeadersType[]) => {
    const filteredSearch = sbullStocks.filter((stock) =>
      keys.some((key) =>
        stock[key].toLowerCase().includes(search.toLowerCase())
      )
    );
    return filteredSearch;
  };

  const manipulateInnerHTML = (str: string) =>
    search
      ? str.replace(
          new RegExp(search, "gi"),
          (match) =>
            `<mark class="bg-pink-500/20 text-pink-500 dark:text-pink-700 rounded">${match}</mark>`
        )
      : str;

  return (
    <Pagewrap>
      <HeaderPanel>
        <Search
          className="flex items-center gap-x-2 flex-1 max-w-xs max-lg:max-w-full max-lg:w-full bg-white/70 backdrop:blur-lg py-2 px-3 rounded-md shadow-lg shadow-purple-400/10 dark:bg-slate-900/70 dark:shadow-purple-900/10"
          value={search}
          onSearch={handleSearch}
          onSearchClear={handleSearchClear}
          placeholder={"Havell's India or SBI.."}
        />
      </HeaderPanel>
      <Table data={searchResults(["symbol", "name"])}>
        <Table.Head>
          <Table.Cell className="flex-[0.15] text-center font-medium text-slate-600 dark:text-slate-600/50">
            Sl.no
          </Table.Cell>
          <Table.Cell className="flex-1 max-lg:flex-[0.5] font-medium text-slate-600 dark:text-slate-600/50">
            Symbol
          </Table.Cell>
          <Table.Cell className="flex-1 font-medium text-slate-600 dark:text-slate-600/50">
            Name
          </Table.Cell>
          <Table.Cell className="flex-1 font-medium text-slate-600 dark:text-slate-600/50">
            Category
          </Table.Cell>
        </Table.Head>
        <Table.Body>
          {loading ? (
            <Loader />
          ) : error ? (
            <Error message={error} />
          ) : (
            (cellData: InstrumentObjectType, id) => (
              <Table.Row key={cellData.name}>
                <Table.Cell className="flex justify-center items-center flex-[0.15] font-medium text-slate-300 dark:text-slate-700/80">
                  {id + 1}
                </Table.Cell>
                <Table.Cell className="flex items-center flex-1 max-lg:flex-[0.5]">
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
                  className=" flex items-center flex-1 dark:text-slate-500"
                  dangerouslySetInnerHTML={{
                    __html: manipulateInnerHTML(cellData.name),
                  }}
                />
                <Table.Cell className=" flex items-center flex-1 dark:text-slate-500">
                  {cellData.sector || <span className="text-slate-400">-</span>}
                </Table.Cell>
              </Table.Row>
            )
          )}
        </Table.Body>
      </Table>
    </Pagewrap>
  );
};

export default Instruments;
