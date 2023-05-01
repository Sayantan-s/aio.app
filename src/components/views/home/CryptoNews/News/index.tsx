import type { Result } from "@hooks/useGetCryptoNews/news.types";
import type { FC } from "react";

export const News: FC<Result> = ({ url, name, description }) => {
    return (
        <div className="px-4" role="listitem">
            <a className="line-clamp-2 hover:underline" href={url} target="_blank" rel="noreferrer">
                {name}
            </a>
            <p className="text-slate-400/30 mt-1 line-clamp-3">{description}</p>
        </div>
    );
};
