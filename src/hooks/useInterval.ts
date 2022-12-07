import { useEffect, useRef } from "react";

export const useInterval = (delay: number, callback: Function) => {
  const savedCallback = useRef<Function>();
  savedCallback.current = callback;

  useEffect(() => {
    function tick() {
      savedCallback.current?.();
    }
    let id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, []);
};
