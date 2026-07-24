import { type EngineOrder, type EngineFill } from "@repo/types";

export class OrderBook {
  buyOrders: EngineOrder[] = [];
  sellOrders: EngineOrder[] = [];

  addorder(order: EngineOrder) {
    if (order.side === "BUY") {
      this.buyOrders.push(order);
    } else {
      this.sellOrders.push(order);
    }
  }
  getOrderBook() {
    return {
      buyOrder: this.buyOrders,
      sellOrders: this.sellOrders
    };
  }
}
