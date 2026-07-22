import { z } from "zod";

export const ordersSchema = z.object({
  market: z.string(),
  side: z.enum(["buy", "sell"]),
  type: z.enum(["limit", "market"]),
  price: z.number().positive().optional(),
  quantity: z.number().positive(),
  leverage: z.number()
});
