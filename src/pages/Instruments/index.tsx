import { BorderedCard, HeaderPanel, Search } from "@components/organisms";
import { CoinDetails } from "@components/views/CoinDetails";
import { CoinList } from "@components/views/CoinList";
import { CryptoNews } from "@components/views/CryptoNews";
import { NFTList } from "@components/views/NFTList";
import { useGetCoins } from "@hooks";
import millify from "millify";
import { useCallback, useState } from "react";

const Instruments = () => {
  const [search, setSearch] = useState("");
  const [selectedCoinId, setSelectedCoinId] = useState<string>(
    window.location.hash?.slice(1) || ""
  );
  const { isInitialLoading, data: coins } = useGetCoins({
    refetchOnWindowFocus: false,
    onSuccess: (coins) => {
      (!selectedCoinId || selectedCoinId.trim() === "") &&
        setSelectedCoinId(coins.data.coins[0].uuid);
    },
    select: (payload) => ({
      ...payload,
      data: {
        ...payload.data,
        coins: payload.data.coins.map((coin) => ({ ...coin, checked: false })),
      },
    }),
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
        <div className="basis-4/12 grid grid-cols-2 gap-4 p-4 dark:bg-slate-900/50 rounded-lg">
          <BorderedCard className="p-4">
            <h1 className="text-slate-400/40">Cryptocurrencies</h1>
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
        <div className="basis-8/12 flex space-x-4">
          <CoinList
            coins={searchResults()}
            onCoinSelect={(id) => handleSelectCoin(id)}
            searchedCoin={search}
          />
          <div className="basis-5/12 p-4 dark:bg-slate-900/50 h-96 overflow-auto scrollbar-hide rounded-lg">
            Identity
          </div>
        </div>
      </div>
      <div className="flex space-x-4 h-full ">
        <CoinDetails coinId={selectedCoinId} />
        <div className="basis-8/12 flex space-x-4">
          <NFTList />
          <CryptoNews />
        </div>
      </div>
    </div>
  );
};

export default Instruments;
