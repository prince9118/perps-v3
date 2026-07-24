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
  getBestBid() {
    return this.buyOrders.sort((a, b) => (b.price ?? 0) - (a.price ?? 0))[0];
  }
  getBestAsk() {
    return this.sellOrders.sort((a, b) => (a.price ?? 0) - (b.price ?? 0))[0];
  }
  canMatch() {
    const bestBid = this.getBestBid();
    const bestAsk = this.getBestAsk();
    if (!bestBid || !bestAsk) {
      return false;
    }
    return (bestBid.price ?? 0) >= (bestAsk.price ?? 0);
  }
}
