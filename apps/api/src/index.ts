import dotenv from "dotenv";
import cors from "cors";
import { success, z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "@repo/db";
import express from "express";
import { authMiddleware } from "./middleware/auth";
import { signUpSchema } from "./validator/auth.validator";
const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT;

app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "backend is working"
  });
});

app.post("/auth/signup", async (req, res) => {
  const result = signUpSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      error: result.error.flatten()
    });
  }
  const { email, password } = result.data;
  console.log(result.data);

  const existingUser = await prisma.user.findUnique({
    where: { email }
  });

  if (existingUser) {
    return res.status(400).json({
      message: "User Already Exist"
    });
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
      balance: 10000,
      lockedBalance: 0
    },
    select: {
      id: true,
      email: true,
      balance: true,
      lockedBalance: true,
      createdAt: true
    }
  });
  res.json({
    success: true,
    user
  });
});

app.post("/auth/login", async (req, res) => {
  const result = signUpSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(404).json({
      error: result.error.flatten()
    });
  }
  const { email, password } = result.data;
  const user = await prisma.user.findUnique({
    where: { email }
  });
  if (!user) {
    return res.status(400).json({
      message: "Invalid Credentials"
    });
  }
  const isPasswordHash = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordHash) {
    return res.status(400).json({
      message: "Invalid Credentials"
    });
  }
  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );
  res.json({
    success: true,
    token,
    user: {
      id: user.id,
      email: user.email
    }
  });
});

app.get("/auth/me", authMiddleware, async (req: any, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.userId
    },
    select: {
      id: true,
      email: true,
      createdAt: true
    }
  });
  res.json({
    user
  });
});

// orders

app.listen(port, () => {
  console.log(`Backend is working on port ${port}`);
});
