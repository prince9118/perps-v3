import bcrypt from "bcrypt";
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
  
}
