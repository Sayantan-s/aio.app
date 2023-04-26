import { IAsset } from "@hooks/useGetNfts/nft.types";
import { FC } from "react";

interface Props {
  nft: IAsset;
}

export const NFTDetails: FC<Props> = ({ nft }) => {
  return (
    <div className="flex space-x-3 px-4 items-center" role="listitem">
      <div>
        <div className="w-20 h-20 relative rounded-lg overflow-hidden">
          <img
            src={nft.image_thumbnail_url}
            alt={nft.name}
            className="absolute w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="overflow-x-hidden">
        <h1 className="items-center font-medium text-transparent bg-clip-text bg-gradient-to-br from-10% from-slate-50/80 via-30% via-slate-100/50 to-60% to-slate-800">
          {nft.name || "No Name"}
        </h1>
        <p className="line-clamp-2">{nft.description}</p>
      </div>
    </div>
  );
};
