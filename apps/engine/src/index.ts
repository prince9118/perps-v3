import { redis } from "@repo/redis";
import { OrderBook } from "./orderBook";
import { type EngineOrder } from "@repo/types";

const orderBooks = new Map<string, OrderBook>();
function parseRedisFields(fields: string[]) {
  const obj: Record<string, string> = {};

  for (let i = 0; i < fields.length; i += 2) {
    const key = fields[i]!;
    const value = fields[i + 1]!;

    obj[key] = value;
  }
  return obj;
}
function getOrderBook(market: string) {
  if (!orderBooks.has(market)) {
    orderBooks.set(market, new OrderBook());
  }
  return orderBooks.get(market)!;
}

async function main() {
  console.log("Engine Started");
  let lastId = "$";
  while (true) {
    const result = await redis.xread(
      "BLOCK",
      0,
      "STREAMS",
      "order_events",
      "lastId"
    );
    if (!result) continue;
    const [streamName, messages] = result[0]!;
    for (const [messageId, fields] of messages) {
      const parsedFields = parseRedisFields(fields);
      const event = {
        type: parsedFields.type,
        data: JSON.parse(parsedFields.data!)
      };
      lastId = messageId;
      if (event.type === "ORDER_CREATE") {
        const order: EngineOrder = {
          id: event.data.orderId,
          userId: event.data.userId,
          market: event.data.market,
          side: event.data.side,
          type: event.data.type,
          price: event.data.price,
          quantity: event.data.quantity,
          leverage: event.data.leverage,
          status: "OPEN",
          createdAt: event.data.timestamp
        };
        const book = getOrderBook(order.market);
        if (order.type === "LIMIT") {
          book.addorder(order);
        } else {
          //, type ==== "Market"
        }
      }
    }
  }
}
main();
