import { GradientText } from '@components/atoms';
import { List } from '@components/organisms';
import { useGetNfts } from '@hooks';
import { Fallback } from './Fallback';
import { NFTDetails } from './NFTDetails';

export const NFTList = () => {
  const { data, isInitialLoading } = useGetNfts({
    refetchOnWindowFocus: false,
    enabled: false,
  });

  return (
    <List
      data={data?.assets}
      isLoading={isInitialLoading}
      renderFallback={() => <Fallback />}
      itemSpacing="3"
      renderHeader={() => (
        <div className={`w-full py-2.5 px-4 will-change-auto dark:bg-slate-900`}>
          <h1 className="flex items-center space-x-2">
            <GradientText className="text-base font-medium">Trending Assets</GradientText>
            <div className="flex aspect-video items-center space-x-1 rounded-full bg-emerald-500/10 px-2 text-emerald-500">
              <div className="relative flex h-1 w-1">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>{' '}
                <span className="relative inline-flex h-full w-full rounded-full bg-green-500"></span>{' '}
              </div>
              <span className="text-[10px]">Live</span>{' '}
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
