import { redis } from "@repo/redis";
export async function createOrder(
  userId: string,
  order: {
    market: string;
    side: string;
    type: string;
    price?: number;
    quantity: number;
    leverage: number;
  }
) {
  if (order.type === "limit" && !order.price) {
    throw new Error("price is required for limit order ");
  }
  const event = {
    userId,
    ...order,
    timestamp: Date.now()
  };
  return redis.xadd(
    "order_events",
    "*",
    "type",
    "ORDER_CREATE",
    "data",
    JSON.stringify(event)
  );
}
