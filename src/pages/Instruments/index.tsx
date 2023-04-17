import { HeaderPanel, Search } from "@components/organisms";
import { useGetCoins } from "@hooks";
import millify from "millify";
import { useCallback, useState } from "react";
import { NavLink } from "react-router-dom";
import type { KeyOfInstrumentHeadersType } from "./Instrument.types";

const Instruments = () => {
  const { isInitialLoading, data } = useGetCoins();

  const [search, setSearch] = useState("");

  const handleSearch: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (eve) => setSearch(eve.target.value),
    []
  );

  const handleSearchClear = useCallback(() => setSearch(""), []);

  const searchResults = (keys: KeyOfInstrumentHeadersType[]) => {
    const filteredSearch = data?.data.coins.filter((stock: any) =>
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

  //searchResults(["symbol", "name"])

  console.log(data);

  return (
    <div>
      <HeaderPanel>
        <Search
          value={search}
          onSearch={handleSearch}
          onSearchClear={handleSearchClear}
          placeholder={"Havell's India or SBI.."}
        />
      </HeaderPanel>
      <div className="flex space-x-4">
        <div className="grid grid-cols-2 gap-4 dark:bg-slate-900/50 rounded-lg p-4">
          <div className="flex flex-col flex-[0.5] dark:bg-slate-900/50 rounded-lg border border-slate-500/10 hover:border-slate-50/5 p-4">
            <h1 className="text-slate-400/40">Total Cryptocurrencies</h1>
            <p className="text-4xl mt-3.5 text-slate-50/70">
              {data?.data.stats?.totalCoins!}
            </p>
          </div>
          <div className="flex flex-col flex-[0.5] dark:bg-slate-900/50 rounded-lg border border-slate-500/10 hover:border-slate-50/5 p-4">
            <h1 className="text-slate-400/40">Total Exchanges</h1>
            <p className="text-4xl mt-3.5 text-slate-50/70">
              {millify(data?.data.stats?.totalExchanges!)}
            </p>
          </div>
          <div className="flex flex-col flex-[0.5] dark:bg-slate-900/50 rounded-lg border border-slate-500/10 hover:border-slate-50/5 p-4">
            <h1 className="text-slate-400/40">Total MarketCap</h1>
            <p className="text-4xl mt-3.5 text-slate-50/70">
              {millify(+data?.data.stats?.totalMarketCap!)}
            </p>
          </div>
          <div className="flex flex-col flex-[0.5] dark:bg-slate-900/50 rounded-lg border border-slate-500/10 hover:border-slate-50/5 p-4">
            <h1 className="text-slate-400/40">Total Markets</h1>
            <p className="text-4xl mt-3.5 text-slate-50/70">
              {millify(data?.data.stats?.totalMarkets!)}
            </p>
          </div>
          <div className="flex flex-col flex-[0.5] dark:bg-slate-900/50 rounded-lg border border-slate-500/10 hover:border-slate-50/5 p-4">
            <h1 className="text-slate-400/40">Total 24th Volume</h1>
            <p className="text-4xl mt-3.5 text-slate-50/70">
              {millify(+data?.data.stats?.total24hVolume!)}
            </p>
          </div>
        </div>
        <div id="coin-list" className="flex-[0.9]">
          <div className="h-96 overflow-auto rounded-lg">
            <div className="overflow-hidden dark:bg-slate-900/50 px-3 py-1.5">
              {data?.data.coins.map((coin) => (
                <div
                  key={coin.uuid}
                  className="flex space-x-5 items-center py-2"
                >
                  <div className="w-7">
                    <img src={coin.iconUrl} alt={`coin__${coin.name}`} />
                  </div>
                  <NavLink
                    to={`#${coin.name}`}
                    className="flex-[0.3] font-medium text-slate-50/70"
                  >
                    {coin.name}
                  </NavLink>
                  <div className="flex-[0.4]">
                    <span className="text-slate-50/5">$</span>{" "}
                    {(+coin.price).toFixed(2)}{" "}
                  </div>
                  <div
                    className={`rounded-full h-7 aspect-video flex items-center justify-center text-xs flex-[0.1] ${
                      +coin.change > 0
                        ? "text-emerald-500 bg-emerald-800/20"
                        : "text-rose-500 bg-rose-800/20"
                    }`}
                  >
                    {coin.change}
                  </div>
                  <div className="flex-[0.3]">Chart</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div
          id="coin-list"
          className="flex-[0.5] dark:bg-slate-900/50 rounded-lg"
        ></div>
      </div>
    </div>
  );
};

export default Instruments;
