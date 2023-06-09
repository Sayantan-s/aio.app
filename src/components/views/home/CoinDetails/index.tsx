import { GradientText } from '@components/atoms';
import { useGetCoin } from '@hooks';
import type { FC} from 'react';
import { memo } from 'react';
import { Fallback } from './Fallback';

interface Props {
    coinId: string;
}

const Component: FC<Props> = ({ coinId }) => {
    const { isInitialLoading, data } = useGetCoin(coinId, {
        refetchOnWindowFocus: false,
    });
    const coin = data?.data.coin;
    return (
        <div className="basis-4/12 scrollbar-hide dark:bg-slate-900/50 p-4 rounded-lg overflow-hidden">
            {isInitialLoading || !coinId ? (
                <Fallback />
            ) : (
                <div>
                    <div className="flex items-start">
                        <div className="w-10 h-10 aspect-square">
                            <img src={coin?.iconUrl} alt={`coin__${coin?.name}`} />
                        </div>
                        <div className="ml-4">
                            <a
                                href={coin?.websiteUrl}
                                target="_blank"
                                className="text-lg flex justify-between font-medium text-transparent bg-clip-text bg-gradient-to-br from-10% from-slate-50/80 via-30% via-slate-100/50 to-60% to-slate-800"
                                rel="noreferrer"
                            >
                                <span>
                                    <GradientText as="span" className="font-medium text-lg">
                                        {coin?.name}
                                    </GradientText>
                                    <b className="text-slate-50/90 font-light"> | {coin?.symbol}</b>
                                </span>
                                <span
                                    className={`rounded-full h-7 aspect-video flex items-center justify-center text-xs flex-[0.1] ${
                                        Number(coin?.change) > 0 ? 'text-emerald-500' : 'text-rose-500'
                                    }`}
                                >
                                    {Number(coin?.change)}%
                                </span>
                            </a>
                            <p className="text-slate-400/40 indent-0">{coin?.description}</p>
                        </div>
                    </div>
                    <div></div>
                </div>
            )}
        </div>
    );
};

export const CoinDetails = memo(Component);
