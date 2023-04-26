import { BorderedCard } from "@components/organisms";
import { IStats } from "@hooks/useGetCoins/coin.types";
import millify from "millify";
import { FC, Fragment } from "react";
import { Fallback } from "./Fallback";

type Props = IStats & { isLoading: boolean };

export const GlobalStats: FC<Props> = ({
  totalCoins,
  totalExchanges,
  total24hVolume,
  totalMarketCap,
  totalMarkets,
  isLoading,
}) => {
  return (
    <div className="basis-4/12 grid grid-cols-2 gap-4 p-4 dark:bg-slate-900/50 rounded-lg">
      {isLoading ? (
        <Fallback />
      ) : (
        <Fragment>
          <BorderedCard className="p-4">
            <h1 className="text-slate-400/40">Cryptocurrencies</h1>
            <p className="text-4xl mt-2.5 text-transparent bg-clip-text bg-gradient-to-br from-10% from-slate-50/80 via-30% via-slate-100/50 to-60% to-slate-800">
              {totalCoins}
            </p>{" "}
          </BorderedCard>
          <BorderedCard className="p-4">
            <h1 className="text-slate-400/40">Total Exchanges</h1>
            <p className="text-4xl mt-2.5 text-transparent bg-clip-text bg-gradient-to-br from-10% from-slate-50/80 via-30% via-slate-100/50 to-60% to-slate-800">
              {millify(totalExchanges)}
            </p>
          </BorderedCard>
          <BorderedCard className="p-4">
            <h1 className="text-slate-400/40">Total MarketCap</h1>
            <p className="text-4xl mt-2.5 text-transparent bg-clip-text bg-gradient-to-br from-10% from-slate-50/80 via-30% via-slate-100/50 to-60% to-slate-800">
              {millify(+totalMarketCap)}
            </p>
          </BorderedCard>
          <BorderedCard className="p-4">
            <h1 className="text-slate-400/40">Total Markets</h1>
            <p className="text-4xl mt-2.5 text-transparent bg-clip-text bg-gradient-to-br from-10% from-slate-50/80 via-30% via-slate-100/50 to-60% to-slate-800">
              {millify(totalMarkets)}
            </p>
          </BorderedCard>
          <BorderedCard className="p-4">
            <h1 className="text-slate-400/40">Total 24th Volume</h1>
            <p className="text-4xl mt-2.5 text-transparent bg-clip-text bg-gradient-to-br from-10% from-slate-50/80 via-30% via-slate-100/50 to-60% to-slate-800">
              {millify(+total24hVolume)}
            </p>
          </BorderedCard>
        </Fragment>
      )}
    </div>
  );
};
