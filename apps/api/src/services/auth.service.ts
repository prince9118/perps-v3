import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findUserByEmail, createUser } from "../repositories/user.repository";

export async function signup(email: string, password: string) {
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new Error("user already exist");
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await createUser({
    email,
    passwordHash
  });
  return user;
}

export async function login(email: string, password: string) {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new Error("Invalid Credentials");
  }

  const valid = await bcrypt.compare(password, user.passwordHash);

  if (!valid) {
    throw new Error("Invalid Credentials");
  }

  const token = jwt.sign(
    {
      userId: user.id,
      email: user.email
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "7d"
    }
  );

  return {
    success: true,
    token,
    user: {
      id: user.id,
      email: user.email
    }
  };
}
