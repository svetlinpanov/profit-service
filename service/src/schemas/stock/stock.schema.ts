import { z } from "zod";

export enum StockOperationType {
  BUY = "BUY",
  SELL = "SELL",
}

export const stockOperation = z.object({
  id: z.string(),
  symbol: z.string(),
  timestamp: z.date(),
  price: z.number(),
});

export type StockOperation = z.infer<typeof stockOperation>;
