import { Router } from "express";
import { authMiddleware } from "../middleware/auth";
import * as orderController from "../controllers/order.controller";

const router = Router();
router.post("/", authMiddleware, orderController.createOrder);

export default router;
