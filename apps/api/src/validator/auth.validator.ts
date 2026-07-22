import { password } from "bun";
import { z } from "zod";
export const signUpSchema = z.object({
  email: z.email(),
  password: z.string().min(4)
});
