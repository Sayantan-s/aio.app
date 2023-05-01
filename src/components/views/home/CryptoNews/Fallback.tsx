import { SkeletonLoad } from "@components/organisms/SkeletonLoad";

export const FallbackUI = () => {
    return (
        <div
            className="flex space-x-3 px-4 items-center animate-pulse will-change-auto"
            role="listitem"
        >
            <div className="overflow-x-hidden w-full">
                <h1 className="bg-slate-500/10 h-3 rounded-full" />
                <div className="mt-3 space-y-2">
                    <p className="bg-slate-500/10 h-3 rounded-full" />
                    <p className="bg-slate-500/10 h-3 rounded-full" />
                </div>{" "}
            </div>
        </div>
    );
};

export const Fallback = () => {
    return (
        <SkeletonLoad itemLength={10} itemSpacing="3">
            {(index) => <FallbackUI key={index} />}
        </SkeletonLoad>
    );
};
