import express from "express";
import authRoutes from "./routes/auth.routes";
import orderRoutes from "./routes/order.routes";

const app = express();

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/orders", orderRoutes);

export default app;
