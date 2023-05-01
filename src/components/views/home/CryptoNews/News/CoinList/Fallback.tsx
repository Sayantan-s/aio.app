import { SkeletonLoad } from "@components/organisms/SkeletonLoad";

export const FallbackUI = () => {
    return (
        <div className="flex space-x-5 items-cente justify-center px-4 rounded-full animate-pulse will-change-auto">
            <div className="w-7">
                <div className="w-full aspect-square bg-slate-500/10 rounded-full" />
            </div>
            <div className="flex-[0.45] flex bg-slate-500/10 rounded-full" />
            <div className="flex-[0.35] flex bg-slate-500/10 rounded-full" />
            <div
                className={`rounded-full h-7 aspect-video flex flex-[0.1] bg-slate-500/10`}
            />
            <div className="flex-[0.1] flex justify-center items-center">
                <div className="w-5 aspect-square bg-slate-500/10 rounded-full" />
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
