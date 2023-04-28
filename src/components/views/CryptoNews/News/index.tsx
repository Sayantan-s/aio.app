import { FC } from "react";

export const News: FC<any> = ({ url, title, description }) => {
  return (
    <a role="listitem" href={url} target="_blank" className="px-4 news">
      <h1 className="line-clamp-2">{title}</h1>
      <p className="text-slate-400/30 mt-1 line-clamp-3">{description}</p>
    </a>
  );
};
