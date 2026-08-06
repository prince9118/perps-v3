import { z } from "zod";
export const signUpSchema = z.object({
  email: z.email(),
  password: z.string().min(4)
});
export const signInSchema = z.object({
  email: z.email(),
  password: z.string().min(4)
});
