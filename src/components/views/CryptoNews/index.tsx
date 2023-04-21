import { useGetCryptoNews } from "@hooks";
import { memo } from "react";

export const Component = () => {
  const { isInitialLoading, data } = useGetCryptoNews({
    refetchOnWindowFocus: false,
  });

  return (
    <div className="dark:bg-slate-900/50 p-4 rounded-lg flex-1">
      <h1 className="font-medium flex space-x-2 text-xl text-transparent bg-clip-text bg-gradient-to-br from-10% from-slate-50/80 via-30% via-slate-100/50 to-60% to-slate-800">
        <span>Top 10</span>
        <div className="text-emerald-500 text-xs flex items-center space-x-1 bg-emerald-500/10 aspect-video px-2 rounded-full">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-full w-full bg-green-500"></span>
          </div>{" "}
          <span>Live</span>
        </div>
      </h1>
      {isInitialLoading ? <div>loading...</div> : null}
      <div role="list" className="mt-4 overflow-y-auto scrollbar-hide h-full">
        <div className="overflow-hidden space-y-4 flex flex-col">
          {data?.map((news, index) => (
            <a role="listitem" href={news.url} key={news.title + index}>
              <h1 className="">{news.title}</h1>
              <p className="text-slate-400/20 mt-2">{news.description}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export const CryptoNews = memo(Component);
