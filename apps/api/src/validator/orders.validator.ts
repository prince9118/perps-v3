import { z } from "zod";

export const ordersSchema = z.object({
  market: z.string(),
  side: z.enum(["BUY", "SELL"]),
  type: z.enum(["LIMIT", "MARKET"]),
  price: z.number().positive().optional(),
  quantity: z.number().positive(),
  leverage: z.number()
});
