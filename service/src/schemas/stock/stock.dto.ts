export interface StockOperationDisplayOptions {
  stockName: string;
  buyPrice: number;
  sellPrice: number;
  startDate: Date;
  endDate: Date;
  duration: number;
  profit: number;
}
import { z } from "zod";

export const stockResponseSchema = z.array(
  z.object({
    stockName: z.string(),
    buyPrice: z.number(),
    sellPrice: z.number(),
    startDate: z.date(),
    endDate: z.date(),
    duration: z.number(),
    profit: z.number(),
  }),
);

export type StockResponseSchemaDTO = z.infer<typeof stockResponseSchema>;
