import { HeaderPanel, Search } from '@components/organisms';
import { CoinDetails } from '@components/views/home/CoinDetails';
import { CryptoNews } from '@components/views/home/CryptoNews';
import { CoinList } from '@components/views/home/CryptoNews/News/CoinList';
import { GlobalStats } from '@components/views/home/GlobalStats';
import { NFTList } from '@components/views/home/NFTList';
import { UserIdentity } from '@components/views/home/UserIdentity';
import { useGetCoins } from '@hooks';
import type { ICoin } from '@hooks/useGetCoins/coin.types';
import React, { useCallback, useState } from 'react';

const Instruments = () => {
  const [search, setSearch] = useState('');
  const [selectedCoinId, setSelectedCoinId] = useState<string>(window.location.hash?.slice(1) || '');
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
    const filteredSearch = coins.filter((coin) => coin.name.toLowerCase().includes(search.toLowerCase()));
    return filteredSearch;
  };

  return (
    <div className="h-full flex flex-col space-y-4">
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
        <div className="basis-8/12 flex space-x-4">
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
