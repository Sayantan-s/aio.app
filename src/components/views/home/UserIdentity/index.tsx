import { BorderedCard } from '@components/organisms';

export const UserIdentity = () => {
  return (
    <div className="scrollbar-hide h-96 basis-5/12 overflow-auto rounded-lg p-4 dark:bg-slate-900/50">
      <div className="flex h-full flex-col py-3">
        <div className="from-10% via-40% via-50% mx-auto w-max rounded-full bg-gradient-to-br from-purple-500/60 via-slate-700/30 to-slate-900 p-0.5">
          <div className="w-max rounded-full bg-transparent bg-slate-900 p-2">
            <div className="relative h-16 w-16 overflow-hidden rounded-full">
              <img
                src="/placeholder.png"
                alt="placeholder"
                className="absolute h-full w-full object-cover object-center"
              />
            </div>
          </div>
        </div>
        <div className="mt-4 text-center">
          <h1 className="from-10% via-30% to-60% mx-auto flex w-max items-center space-x-2 bg-gradient-to-br from-slate-50/80 via-slate-100/50 to-slate-800 bg-clip-text text-lg text-transparent">
            #placeholdy!
          </h1>
          <p className="mt-1 text-xs">I am no-one, just a placeholder!</p>
        </div>
        <div className="mt-4 flex h-full w-full flex-1 flex-col space-y-3">
          <BorderedCard className="py-2 px-4">
            <h2 className="from-10% via-30% to-60% space-x-2 bg-gradient-to-br from-slate-50/80 via-slate-100/50 to-slate-800 bg-clip-text text-transparent">
              Tracked coins
            </h2>
          </BorderedCard>
          <BorderedCard className="py-2 px-4">
            <h2 className="from-10% via-30% to-60% space-x-2 bg-gradient-to-br from-slate-50/80 via-slate-100/50 to-slate-800 bg-clip-text text-transparent">
              Tracked NFTs
            </h2>
          </BorderedCard>
        </div>
      </div>
    </div>
  );
};
