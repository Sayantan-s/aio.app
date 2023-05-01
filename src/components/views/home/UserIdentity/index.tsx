import { BorderedCard } from "@components/organisms";

export const UserIdentity = () => {
    return (
        <div className="basis-5/12 p-4 dark:bg-slate-900/50 h-96 overflow-auto scrollbar-hide rounded-lg">
            <div className="py-3 flex flex-col h-full">
                <div className="p-0.5 bg-gradient-to-br from-purple-500/60 from-10% via-slate-700/30 via-40% to-slate-900 via-50% w-max rounded-full mx-auto">
                    <div className="bg-transparent w-max p-2 rounded-full bg-slate-900">
                        <div className="relative w-16 h-16 rounded-full overflow-hidden">
                            <img
                                src="/placeholder.png"
                                alt="placeholder"
                                className="absolute w-full h-full object-cover object-center"
                            />
                        </div>
                    </div>
                </div>
                <div className="text-center mt-4">
                    <h1 className="mx-auto w-max text-lg flex items-center space-x-2 text-transparent bg-clip-text bg-gradient-to-br from-10% from-slate-50/80 via-30% via-slate-100/50 to-60% to-slate-800">
            #placeholdy!
                    </h1>
                    <p className="text-xs mt-1">I am no-one, just a placeholder!</p>
                </div>
                <div className="w-full mt-4 space-y-3 h-full flex-1 flex flex-col">
                    <BorderedCard className="py-2 px-4">
                        <h2 className="space-x-2 text-transparent bg-clip-text bg-gradient-to-br from-10% from-slate-50/80 via-30% via-slate-100/50 to-60% to-slate-800">
              Tracked coins
                        </h2>
                    </BorderedCard>
                    <BorderedCard className="py-2 px-4">
                        <h2 className="space-x-2 text-transparent bg-clip-text bg-gradient-to-br from-10% from-slate-50/80 via-30% via-slate-100/50 to-60% to-slate-800">
              Tracked NFTs
                        </h2>
                    </BorderedCard>
                </div>
            </div>
        </div>
    );
};
