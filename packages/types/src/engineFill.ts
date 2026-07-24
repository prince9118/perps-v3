export interface EngineFill {
  buyOrderId: string;
  sellOrderId: string;
  buyerId: string;
  sellerId: string;
  market: string;
  price?: number;
  quantity: number;
  buyerLeverage: number;
  sellerLeverage: number;
  timestamp: number;
}
