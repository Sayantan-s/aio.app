import { BorderedCard, HeaderPanel, Search } from "@components/organisms";
import { CoinDetails } from "@components/views/CoinDetails";
import { useGetCoins } from "@hooks";
import millify from "millify";
import { useCallback, useState } from "react";
import { NavLink } from "react-router-dom";

const Instruments = () => {
  const [search, setSearch] = useState("");
  const [selectedCoinId, setSelectedCoinId] = useState<string>(
    window.location.hash?.slice(1) || ""
  );
  const { isInitialLoading, data: coins } = useGetCoins({
    refetchOnWindowFocus: false,
    onSuccess: (coins) => {
      !selectedCoinId ||
        (selectedCoinId.trim() === "" &&
          setSelectedCoinId(coins.data.coins[0].uuid));
    },
  });

  const handleSearch: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (eve) => {
      setSearch(eve.target.value);
    },
    []
  );

  const handleSelectCoin = (id: string) => setSelectedCoinId(id);

  const handleSearchClear = useCallback(() => setSearch(""), []);
  const searchResults = () => {
    const filteredSearch = coins?.data.coins.filter((stock) =>
      stock.name.toLowerCase().includes(search.toLowerCase())
    );
    return filteredSearch;
  };
  const manipulateInnerHTML = (str: string) =>
    search
      ? str.replace(
          new RegExp(search, "gi"),
          (match) =>
            `<mark class="dark:from-pink-400 text-transparent dark:to-pink-600 bg-clip-text bg-gradient-to-br text-md">${match}</mark>`
        )
      : str;

  return (
    <div className="h-full flex flex-col space-y-4">
      <HeaderPanel>
        <Search
          value={search}
          onSearch={handleSearch}
          onSearchClear={handleSearchClear}
          placeholder={"Havell's India or SBI.."}
        />
      </HeaderPanel>
      <div className="flex space-x-4">
        <div className="grid grid-cols-2 gap-4 dark:bg-slate-900/50 rounded-lg p-4 aspect-video flex-[0.4]">
          <BorderedCard className="p-4">
            <h1 className="text-slate-400/40">Total Cryptocurrencies</h1>
            <p className="text-4xl mt-2.5 text-transparent bg-clip-text bg-gradient-to-br from-10% from-slate-50/80 via-30% via-slate-100/50 to-60% to-slate-800">
              {coins?.data.stats?.totalCoins!}
            </p>{" "}
          </BorderedCard>
          <BorderedCard className="p-4">
            <h1 className="text-slate-400/40">Total Exchanges</h1>
            <p className="text-4xl mt-2.5 text-transparent bg-clip-text bg-gradient-to-br from-10% from-slate-50/80 via-30% via-slate-100/50 to-60% to-slate-800">
              {millify(coins?.data.stats?.totalExchanges!)}
            </p>
          </BorderedCard>
          <BorderedCard className="p-4">
            <h1 className="text-slate-400/40">Total MarketCap</h1>
            <p className="text-4xl mt-2.5 text-transparent bg-clip-text bg-gradient-to-br from-10% from-slate-50/80 via-30% via-slate-100/50 to-60% to-slate-800">
              {millify(+coins?.data.stats?.totalMarketCap!)}
            </p>
          </BorderedCard>
          <BorderedCard className="p-4">
            <h1 className="text-slate-400/40">Total Markets</h1>
            <p className="text-4xl mt-2.5 text-transparent bg-clip-text bg-gradient-to-br from-10% from-slate-50/80 via-30% via-slate-100/50 to-60% to-slate-800">
              {millify(coins?.data.stats?.totalMarkets!)}
            </p>
          </BorderedCard>
          <BorderedCard className="p-4">
            <h1 className="text-slate-400/40">Total 24th Volume</h1>
            <p className="text-4xl mt-2.5 text-transparent bg-clip-text bg-gradient-to-br from-10% from-slate-50/80 via-30% via-slate-100/50 to-60% to-slate-800">
              {millify(+coins?.data.stats?.total24hVolume!)}
            </p>
          </BorderedCard>
        </div>
        <div id="coin-list" className="flex-[0.6]">
          <div className="h-96 overflow-auto rounded-lg scrollbar-hide dark:bg-slate-900/50">
            <div className="overflow-hidden p-4 space-y-4">
              {searchResults()?.map((coin) => (
                <div
                  key={coin.uuid}
                  className="flex space-x-5 items-cente justify-center"
                  onClick={() => handleSelectCoin(coin.uuid)}
                >
                  <div className="w-7">
                    <img src={coin.iconUrl} alt={`coin__${coin.name}`} />
                  </div>
                  <NavLink
                    to={`#${coin.uuid}`}
                    className="flex-[0.3] flex items-center font-medium text-transparent bg-clip-text bg-gradient-to-br from-10% from-slate-50/80 via-30% via-slate-100/50 to-60% to-slate-800"
                    dangerouslySetInnerHTML={{
                      __html: manipulateInnerHTML(coin.name),
                    }}
                  />
                  <div className="flex-[0.4] flex items-center text-slate-400/40">
                    <span className="text-slate-50/10">$</span>&nbsp;
                    {(+coin.price).toFixed(2)}{" "}
                  </div>
                  <div
                    className={`rounded-full h-7 aspect-video flex items-center justify-center text-[10px] flex-[0.1] ${
                      +coin.change > 0
                        ? "text-emerald-500 bg-emerald-800/10"
                        : "text-rose-500 bg-rose-800/10"
                    }`}
                  >
                    {coin.change}%
                  </div>
                  <div className="flex-[0.3] text-slate-400/40">Chart</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex space-x-4 h-full ">
        <CoinDetails coinId={selectedCoinId} />
        <div className="flex-[0.6] scrollbar-hide dark:bg-slate-900/50 rounded-lg overflow-hidden">
          <div className="p-4"></div>
        </div>
      </div>
    </div>
  );
};

export default Instruments;
