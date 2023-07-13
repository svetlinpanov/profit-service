import { z } from "zod";

export const requestSchema = z.object({
  startDate: z.string(),
  endDate: z.string(),
});

export type requestSchema = z.infer<typeof requestSchema>;
