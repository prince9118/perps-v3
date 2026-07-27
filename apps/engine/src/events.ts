import { type EngineOrder, type EngineFill } from "@repo/types";

export type EngineEvent =
  | {
      type: "ORDER_CREATED";
      data: EngineOrder;
    }
  | {
      type: "ORDER_UPDATED";
      data: EngineOrder;
    }
  | {
      type: "TRADE_CREATED";
      data: EngineFill;
    };
