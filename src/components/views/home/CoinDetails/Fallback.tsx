export const Fallback = () => {
    return (
        <div className="h-full animate-pulse will-change-contents">
            <div className="flex items-start">
                <div className="w-10 h-10 aspect-square bg-slate-500/10 rounded-full" />
                <div className="ml-4 w-full">
                    <div className="flex justify-between w-full space-x-3">
                        <span className={`rounded-full h-7 bg-slate-500/10 w-7/12`} />
                        <span className={`rounded-full h-7 bg-slate-500/10 aspect-video`} />
                    </div>
                    <p className="text-slate-400/40 bg-slate-500/10 h-3 mt-2 rounded-full w-full" />
                    <p className="text-slate-400/40 bg-slate-500/10 h-3 mt-2 rounded-full w-full" />
                </div>
            </div>
        </div>
    );
};
