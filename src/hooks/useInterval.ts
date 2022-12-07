import { useEffect, useRef } from "react";

export const useInterval = (delay: number, callback: Function) => {
  const savedCallback = useRef<Function>();
  savedCallback.current = callback;

  useEffect(() => {
    let id = setInterval(tick, delay);
    function tick() {
      savedCallback.current?.(id);
    }
    return () => clearInterval(id);
  }, []);
};
