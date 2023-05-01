import { Fragment } from "react";

export const Fallback = () => {
    return (
        <Fragment>
            {new Array(5).fill(true).map((_, index) => (
                <div
                    className="p-4 w-full h-full dark:bg-slate-500/10 rounded-lg animate-pulse will-change-contents"
                    key={index}
                >
                    <h1 className="bg-slate-400/40" />
                    <p className="text-4xl mt-2.5 text-transparent bg-clip-text bg-gradient-to-br from-10% from-slate-50/80 via-30% via-slate-100/50 to-60% to-slate-800" />
                </div>
            ))}
        </Fragment>
    );
};
