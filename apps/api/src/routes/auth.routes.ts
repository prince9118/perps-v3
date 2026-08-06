import { Router } from "express";
import * as authController from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/auth";
const router = Router();
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/me", authMiddleware, authController.me);
//router.post("/refres",authController.refresh)
export default router;
