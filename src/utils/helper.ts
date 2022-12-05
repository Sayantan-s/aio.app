export const debounce = (callback: TimerHandler, delay: number) => {
  let timer: number | null = null;
  return () => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(callback, delay);
  };
};
