import { List } from "@components/organisms";
import { ICoin } from "@hooks/useGetCoins/coin.types";
import { FC } from "react";
import { Coin } from "./Coin";
import { Fallback } from "./Fallback";

interface Props {
  coins: ICoin[] | undefined;
  searchedCoin: string;
  isLoading: boolean;
  onCoinSelect: (id: string) => void;
  onCoinCheck: (id: string) => void;
}

export const CoinList: FC<Props> = ({
  coins,
  searchedCoin,
  isLoading,
  onCoinSelect,
  onCoinCheck,
}) => {
  const manipulateInnerHTML = (str: string) =>
    searchedCoin
      ? str.replace(
          new RegExp(searchedCoin, "gi"),
          (match) =>
            `<mark class="dark:from-pink-400 text-transparent dark:to-pink-600 bg-clip-text bg-gradient-to-br text-md">${match}</mark>`
        )
      : str;

  return (
    <List
      itemSpacing="3"
      data={coins!}
      className="basis-7/12"
      renderHeader={() => (
        <div className="px-4 w-full py-0.5 will-change-auto" />
      )}
      isLoading={isLoading}
      renderFallback={() => <Fallback />}
    >
      {(coin) => (
        <Coin
          {...coin}
          key={coin.uuid}
          name={manipulateInnerHTML(coin.name)}
          onCoinSelect={() => onCoinSelect(coin.uuid)}
          onCoinCheck={() => onCoinCheck(coin.uuid)}
        />
      )}
    </List>
  );
};
