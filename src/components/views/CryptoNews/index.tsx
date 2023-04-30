import { GradientText } from "@components/atoms";
import { List } from "@components/organisms";
import { useGetCryptoNews } from "@hooks";
import { memo } from "react";
import { Fallback } from "./Fallback";
import { News } from "./News";

export const Component = () => {
  const { isInitialLoading, data } = useGetCryptoNews({
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return (
    <List
      itemSpacing="4"
      data={data?.value!}
      renderFallback={() => <Fallback />}
      isLoading={isInitialLoading}
      renderHeader={() => (
        <div
          className={`py-2.5 will-change-auto dark:bg-slate-900 px-4 w-full`}
        >
          <h1 className="flex items-center space-x-2">
            <GradientText className="font-medium text-base">
              Trending 10
            </GradientText>
            <div className="text-emerald-500 flex items-center space-x-1 bg-emerald-500/10 aspect-video px-2 rounded-full">
              <div className="relative flex h-1 w-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>{" "}
                <span className="relative inline-flex rounded-full h-full w-full bg-green-500"></span>{" "}
              </div>
              <span className="text-[10px]">Live</span>{" "}
            </div>
          </h1>
        </div>
      )}
    >
      {(news, index) => <News {...news} key={index} />}
    </List>
  );
};

export const CryptoNews = memo(Component);
