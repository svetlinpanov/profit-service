import { z } from "zod";

export const generateRequestSchema = z.object({
  startDate: z.string(),
  endDate: z.string(),
});

export type GenerateRequestSchema = z.infer<typeof generateRequestSchema>;
