import { HeaderPanel, Search } from '@components/organisms';
import { CoinDetails } from '@components/views/home/CoinDetails';
import { CountDownTimer } from '@components/views/home/CountdownTimer';
import { CryptoNews } from '@components/views/home/CryptoNews';
import { CoinList } from '@components/views/home/CryptoNews/News/CoinList';
import { GlobalStats } from '@components/views/home/GlobalStats';
import { NFTList } from '@components/views/home/NFTList';
import { UserIdentity } from '@components/views/home/UserIdentity';
import { useGetCoins } from '@hooks';
import type { ICoin } from '@hooks/useGetCoins/coin.types';
import React, { useCallback, useState } from 'react';

export const Home = () => {
  const [search, setSearch] = useState('');
  const [selectedCoinId, setSelectedCoinId] = useState<string>(
    window.location.hash?.slice(1) || '',
  );
  const [coins, setCoins] = useState<ICoin[]>([]);
  const { isInitialLoading, data } = useGetCoins({
    refetchOnWindowFocus: false,
    onSuccess: ({ data }) => {
      setCoins(data.coins.map((coin) => ({ ...coin, checked: false })));
      if (!selectedCoinId || selectedCoinId.trim() === '') setSelectedCoinId(data.coins[0].uuid);
    },
  });

  const handleSearch: React.ChangeEventHandler<HTMLInputElement> = useCallback((eve) => {
    setSearch(eve.target.value);
  }, []);

  const handleSelectCoin = (id: string) => setSelectedCoinId(id);
  const handleCheckCoin = (id: string) => {
    setCoins((prevState) =>
      prevState.map((coinData) => ({
        ...coinData,
        checked: coinData.uuid === id ? !coinData.checked : coinData.checked,
      })),
    );
  };

  const handleSearchClear = useCallback(() => setSearch(''), []);
  const searchResults = () => {
    const filteredSearch = coins.filter((coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase()),
    );
    return filteredSearch;
  };

  return (
    <div className="flex h-full flex-col space-y-4">
      <HeaderPanel>
        <Search
          value={search}
          onSearch={handleSearch}
          onSearchClear={handleSearchClear}
          placeholder={'Bitcon or BTC..'}
        />
      </HeaderPanel>
      <div className="flex space-x-4">
        {<GlobalStats isLoading={isInitialLoading} {...data?.data.stats} />}
        <div className="flex basis-8/12 space-x-4">
          <CoinList
            coins={searchResults()}
            onCoinSelect={handleSelectCoin}
            onCoinCheck={handleCheckCoin}
            searchedCoin={search}
            isLoading={isInitialLoading}
          />
          <UserIdentity />
        </div>
      </div>
      <div className="flex h-full space-x-4 ">
        <CoinDetails coinId={selectedCoinId} />
        <div className="flex basis-8/12 space-x-4">
          <NFTList />
          <CryptoNews />
        </div>
      </div>
      <CountDownTimer seconds={60} onFinish={() => {}} />
      {/* <Modal show>
        <Card bordered className="flex aspect-video w-[400px] justify-center space-y-2 p-2">
          <button className="mx-auto flex w-9/12 items-center justify-center space-x-2 rounded-3xl bg-gradient-to-b from-slate-50 to-slate-100 px-1 py-2 text-slate-900">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              width={24}
              height={24}
              viewBox="0 0 256 262"
              version="1.1"
              preserveAspectRatio="xMidYMid"
            >
              <g>
                <path
                  d="M255.878,133.451 C255.878,122.717 255.007,114.884 253.122,106.761 L130.55,106.761 L130.55,155.209 L202.497,155.209 C201.047,167.249 193.214,185.381 175.807,197.565 L175.563,199.187 L214.318,229.21 L217.003,229.478 C241.662,206.704 255.878,173.196 255.878,133.451"
                  fill="#4285F4"
                />
                <path
                  d="M130.55,261.1 C165.798,261.1 195.389,249.495 217.003,229.478 L175.807,197.565 C164.783,205.253 149.987,210.62 130.55,210.62 C96.027,210.62 66.726,187.847 56.281,156.37 L54.75,156.5 L14.452,187.687 L13.925,189.152 C35.393,231.798 79.49,261.1 130.55,261.1"
                  fill="#34A853"
                />
                <path
                  d="M56.281,156.37 C53.525,148.247 51.93,139.543 51.93,130.55 C51.93,121.556 53.525,112.853 56.136,104.73 L56.063,103 L15.26,71.312 L13.925,71.947 C5.077,89.644 0,109.517 0,130.55 C0,151.583 5.077,171.455 13.925,189.152 L56.281,156.37"
                  fill="#FBBC05"
                />
                <path
                  d="M130.55,50.479 C155.064,50.479 171.6,61.068 181.029,69.917 L217.873,33.943 C195.245,12.91 165.798,0 130.55,0 C79.49,0 35.393,29.301 13.925,71.947 L56.136,104.73 C66.726,73.253 96.027,50.479 130.55,50.479"
                  fill="#EB4335"
                />
              </g>
            </svg>
            <span>Signin with Google</span>
          </button>
          <button className="mx-auto flex w-7/12 items-center justify-center space-x-2 rounded-3xl px-1 py-2">
            <span>Easy access</span>
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.1696 6C17.273 7.55556 19.1622 9.37278 20.7905 11.4057C20.9302 11.5801 21 11.79 21 12M15.1696 18C17.273 16.4444 19.1622 14.6272 20.7905 12.5943C20.9302 12.4199 21 12.21 21 12M21 12H3"
                strokeWidth={1.4}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="stroke-slate-500"
              />
            </svg>
          </button>
        </Card>
      </Modal> */}
    </div>
  );
};
