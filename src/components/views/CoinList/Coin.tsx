import { Checkbox } from "@components/atoms";
import { ICoin } from "@hooks/useGetCoins/coin.types";
import { FC } from "react";
import { NavLink } from "react-router-dom";

interface Props extends ICoin {
  onCoinSelect: () => void;
  onCoinCheck: () => void;
}

export const Coin: FC<Props> = ({ onCoinSelect, onCoinCheck, ...coin }) => {
  return (
    <div
      key={coin.uuid}
      className="flex space-x-5 items-cente justify-center px-4"
      onClick={onCoinSelect}
    >
      <div className="w-7">
        <img src={coin.iconUrl} alt={`coin__${coin.name}`} />
      </div>
      <NavLink
        to={`#${coin.uuid}`}
        className="flex-[0.45] flex items-center font-medium text-transparent bg-clip-text bg-gradient-to-br from-10% from-slate-50/80 via-30% via-slate-100/50 to-60% to-slate-800"
        dangerouslySetInnerHTML={{
          __html: coin.name,
        }}
      />
      <div className="flex-[0.35] flex items-center text-slate-400/40">
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
      <div className="flex-[0.1] text-slate-400/40 flex items-center justify-center">
        <Checkbox checked={coin.checked} onCheck={onCoinCheck} />
      </div>
    </div>
  );
};
