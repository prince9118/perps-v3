import type { Request, Response } from "express";
import { signUpSchema, signInSchema } from "../validator/auth.validator";
import * as authService from "../services/auth.service";

export async function signup(req: Request, res: Response) {
  const result = signUpSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      error: result.error.flatten()
    });
  }
  try {
    const { email, password } = result.data;
    const user = await authService.signup(email, password);
    return res.json({
      success: true,
      user
    });
  } catch (err) {
    return res.status(400).json({
      message: (err as Error).message
    });
  }
}
export async function login(req: Request, res: Response) {
  const result = signInSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(404).json({
      error: result.error.flatten()
    });
  }

  const { email, password } = result.data;

  const response = await authService.login(email, password);

  return res.json(response);
}

export async function me(req: Request, res: Response) {
  const user = await authService.getCurrentUser(req.user.userId);
  return res.json({
    success: true,
    user
  });
}
