export const isObject = (className: unknown) =>
  className !== null &&
  !Array.isArray(className) &&
  typeof className === "object";

export const classNames = (...args: unknown[]) => {
  let result: string[] = [];
  args.forEach((className) => {
    if (!!!className) return;
    else if (isObject(className)) {
      for (let [key, value] of Object.entries(className)) {
        if (value) result.push(key);
      }
    } else if (Array.isArray(className)) {
      result.push(classNames(...className));
    } else result.push(className as string);
  });
  return result.join(" ");
};

// const options = {
//   method: "GET",
//   url: "https://latest-stock-price.p.rapidapi.com/any",
//   headers: {
//     "X-RapidAPI-Key": "074279b31dmsh7d46ca1f3bf2ce4p13b41fjsn48982e042425",
//     "X-RapidAPI-Host": "latest-stock-price.p.rapidapi.com",
//   },
// };
