import { rest } from "msw";

export const handlers = [
  rest.get(import.meta.env.VITE_APP_API_URL_COINS, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          name: "Bitcoin",
        },
        {
          name: "Uniswap",
        },
        {
          name: "Binance",
        },
      ])
    );
  }),
];
