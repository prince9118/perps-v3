export interface EngineOrder {
  id: string;
  userId: string;
  market: string;
  side: "BUY" | "SELL";
  type: "LIMIT" | "MARKET";
  price?: number;
  quantity: number;
  leverage: number;
  status: "OPEN" | "PARTIAL" | "FILLED" | "CANCELLED";
  createdAt: number;
}

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
