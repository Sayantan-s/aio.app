import { Card } from '@components/atoms';
import { HeaderPanel, Search } from '@components/organisms';
import { Modal } from '@components/organisms/Modal';
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

const Instruments = () => {
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
      <Modal show>
        <Card bordered className="aspect-video w-[500px] p-4"></Card>
      </Modal>
    </div>
  );
};

export default Instruments;
