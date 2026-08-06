import type { Request, Response } from "express";
import { ordersSchema } from "../validator/orders.validator.ts";
import * as orderService from "../services/order.service.ts";

export async function createOrder(req: Request, res: Response) {
  try {
    const parsed = ordersSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation error",
        errors: parsed.error.flatten()
      });
    }
    const messageId = await orderService.createOrder(
      req.user.userId,
      parsed.data
    );
    return res.json({
      success: true,
      message: "Order Submitted",
      messageId
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Server Error"
    });
  }
}
