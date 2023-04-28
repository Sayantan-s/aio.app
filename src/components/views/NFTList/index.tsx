import { List } from "@components/organisms";
import { useGetNfts } from "@hooks";
import { Fallback } from "./Fallback";
import { NFTDetails } from "./NFTDetails";

export const NFTList = () => {
  const { data, isInitialLoading } = useGetNfts({
    refetchOnWindowFocus: false,
  });

  return (
    <List
      data={data?.assets!}
      isLoading={isInitialLoading}
      renderFallback={() => <Fallback />}
      itemSpacing="3"
      renderHeader={() => (
        <div
          className={`py-2.5 will-change-auto dark:bg-slate-900 px-4 w-full`}
        >
          <h1 className="flex items-center space-x-2">
            <span className="font-medium w-max text-base text-transparent bg-clip-text bg-gradient-to-br from-10% from-slate-50/80 via-30% via-slate-100/60 to-60% to-slate-700/90">
              Trending Assets
            </span>{" "}
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
      {(nft) =>
        nft.image_thumbnail_url && nft.description && nft.name ? (
          <NFTDetails nft={nft} key={nft.id} />
        ) : null
      }
    </List>
  );
};
