import { useEffect, useRef } from "react";

export const useInterval = (delay: number, callback: Function) => {
    const savedCallback = useRef<Function>();

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        const id = setInterval(tick, delay);
        function tick() {
            savedCallback.current?.(id);
        }
        return () => clearInterval(id);
    }, []);
};
