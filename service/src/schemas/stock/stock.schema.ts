import { z } from "zod";

export enum StockOperationType {
  BUY = "BUY",
  SELL = "SELL",
}

export const stockOperation = z.object({
  id: z.string(),
  timestamp: z.date(),
  price: z.number(),
  // quantity: z.number(),
  // type: z.nativeEnum(StockOperationType),
  symbol: z.string(),
});

export type StockOperation = z.infer<typeof stockOperation>;
