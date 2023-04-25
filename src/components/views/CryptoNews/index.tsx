import { memo, useState } from "react";

export const Component = () => {
  // const { isInitialLoading, data } = useGetCryptoNews({
  //   refetchOnWindowFocus: false,
  // });

  const [transformUI, setTransformUI] = useState(false);

  const onHandleScroll: React.UIEventHandler<HTMLDivElement> = (eve) => {
    const target = eve.target as HTMLDivElement;
    setTransformUI(target.scrollTop > 0);
  };

  return (
    <div className="dark:bg-slate-900/50 rounded-lg flex-1 overflow-hidden flex flex-col">
      <div className="relative flex flex-col h-full">
        <div className="flex-1 absolute top-0 left-0 right-0 bottom-0 overflow-hidden flex flex-col">
          <div
            className="flex flex-col space-y-3 overflow-y-auto scrollbar-hide news"
            role="list"
            onScroll={onHandleScroll}
          >
            <header className="sticky top-0 dark:bg-slate-900 px-4 w-full">
              <div className="w-max py-2.5 will-change-auto">
                <h1 className="font-medium flex items-center space-x-2 text-base text-transparent bg-clip-text bg-gradient-to-br from-10% from-slate-50/80 via-30% via-slate-100/50 to-60% to-slate-800">
                  <span>Trending 10</span>
                  <div className="text-emerald-500 flex items-center space-x-1 bg-emerald-500/10 aspect-video px-2 rounded-full">
                    <div className="relative flex h-1 w-1">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-full w-full bg-green-500"></span>
                    </div>{" "}
                    <span className="text-[10px]">Live</span>
                  </div>
                </h1>
              </div>
            </header>
            {/* {isInitialLoading ? <div>loading...</div> : null}
            {data?.map((news, index) => (
              <News key={news.title + index} {...news} />
            ))} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export const CryptoNews = memo(Component);
