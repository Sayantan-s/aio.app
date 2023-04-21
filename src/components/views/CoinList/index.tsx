import { ICoin } from "@hooks/useGetCoins/coin.types";
import { FC } from "react";
import { NavLink } from "react-router-dom";

interface Props {
  coins: ICoin[] | undefined;
  searchedCoin: string;
  onCoinSelect: (id: string) => void;
}

export const CoinList: FC<Props> = ({ coins, searchedCoin, onCoinSelect }) => {
  const manipulateInnerHTML = (str: string) =>
    searchedCoin
      ? str.replace(
          new RegExp(searchedCoin, "gi"),
          (match) =>
            `<mark class="dark:from-pink-400 text-transparent dark:to-pink-600 bg-clip-text bg-gradient-to-br text-md">${match}</mark>`
        )
      : str;
  return (
    <div
      id="coin-list"
      className="basis-7/12 p-4 dark:bg-slate-900/50 h-96 overflow-auto scrollbar-hide rounded-lg"
    >
      <div className="overflow-hidden space-y-4">
        {coins?.map((coin) => (
          <div
            key={coin.uuid}
            className="flex space-x-5 items-cente justify-center"
            onClick={() => onCoinSelect(coin.uuid)}
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
  );
};
