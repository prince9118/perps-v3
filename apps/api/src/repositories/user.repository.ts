import { prisma } from "@repo/db";

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: {
      email
    }
  });
}

export async function createUser(data: {
  email: string;
  passwordHash: string;
}) {
  return prisma.user.create({
    data: {
      email: data.email,
      passwordHash: data.passwordHash,
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
}
export async function findUserById(userId: string) {
  return prisma.user.findUnique({
    where: {
      id: userId
    },
    select: {
      id: true,
      email: true,
      createdAt: true
    }
  });
}
