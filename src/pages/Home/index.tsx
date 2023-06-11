import { GradientText } from '@components/atoms';
import { DarkModeToggler, HeaderPanel, Search } from '@components/organisms';
import { AuthPopup } from '@components/views/home/AuthModal';
import { CoinDetails } from '@components/views/home/CoinDetails';
import { CountDownTimer } from '@components/views/home/CountdownTimer';
import { CryptoNews } from '@components/views/home/CryptoNews';
import { CoinList } from '@components/views/home/CryptoNews/News/CoinList';
import { GlobalStats } from '@components/views/home/GlobalStats';
import { NFTList } from '@components/views/home/NFTList';
import { UserIdentity } from '@components/views/home/UserIdentity';
import { useGetCoins } from '@hooks';
import type { ICoin } from '@hooks/useGetCoins/coin.types';
import type { TapHandlers } from 'framer-motion';
import { motion } from 'framer-motion';
import React, { useCallback, useState } from 'react';

export const Home = () => {
  const [search, setSearch] = useState('');
  const [selectedCoinId, setSelectedCoinId] = useState<string>(
    window.location.hash?.slice(1) || '',
  );
  const [showSignUp, setShowSignUp] = useState(false);
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

  const handleShowSignupModal: TapHandlers['onTap'] = () => {
    setShowSignUp(true);
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
        <div className="flex items-center space-x-4 ">
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="h-full w-24 rounded-full bg-slate-900/50 backdrop:blur-xl"
            onTap={handleShowSignupModal}
          >
            <GradientText as={'span'}>Signup</GradientText>
          </motion.button>
          <DarkModeToggler />
        </div>
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
      <AuthPopup show={showSignUp} />
    </div>
  );
};
