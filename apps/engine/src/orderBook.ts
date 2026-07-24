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
  updateOrderStatus(order: EngineOrder) {
    if (order.quantity === 0) {
      order.status = "FILLED";
    } else {
      order.status = "PARTIAL";
    }
  }

  matchOrder(): {
    fills: EngineFill[];
    updateOrders: EngineOrder[];
  } {
    const fills: EngineFill[] = [];
    const updateOrders: EngineOrder[] = [];
    while (this.canMatch()) {
      const bestBid = this.getBestBid()!;
      const bestAsk = this.getBestAsk()!;
      if (bestBid.userId === bestAsk.userId) {
        break;
      }
      const tradeQty = Math.min(bestBid.quantity, bestAsk.quantity);
      bestBid.quantity -= tradeQty;
      bestAsk.quantity -= tradeQty;
      this.updateOrderStatus(bestBid);
      this.updateOrderStatus(bestAsk);
      const fill: EngineFill = {
        buyOrderId: bestBid.id,
        sellOrderId: bestAsk.id,
        buyerId: bestBid.userId,
        sellerId: bestAsk.userId,
        market: bestBid.market,
        price: bestAsk.price,
        quantity: tradeQty,
        buyerLeverage: bestBid.leverage,
        sellerLeverage: bestAsk.leverage,
        timestamp: Date.now()
      };
      fills.push(fill);
      this.buyOrders = this.buyOrders.filter((o) => o.quantity > 0);
      this.sellOrders = this.sellOrders.filter((o) => o.quantity > 0);
    }
    return {
      fills,
      updateOrders
    };
  }
}
