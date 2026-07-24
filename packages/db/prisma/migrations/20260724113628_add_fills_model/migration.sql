/*
  Warnings:

  - The values [buy,sell] on the enum `OrderSide` will be removed. If these variants are still used in the database, this will fail.
  - The values [open,partially_filled,filled,cancelled] on the enum `OrderStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [market,limit] on the enum `OrderType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "OrderSide_new" AS ENUM ('BUY', 'SELL');
ALTER TABLE "Order" ALTER COLUMN "side" TYPE "OrderSide_new" USING ("side"::text::"OrderSide_new");
ALTER TYPE "OrderSide" RENAME TO "OrderSide_old";
ALTER TYPE "OrderSide_new" RENAME TO "OrderSide";
DROP TYPE "public"."OrderSide_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "OrderStatus_new" AS ENUM ('OPEN', 'PARTIAL', 'FILLED', 'CANCELLED');
ALTER TABLE "public"."Order" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Order" ALTER COLUMN "status" TYPE "OrderStatus_new" USING ("status"::text::"OrderStatus_new");
ALTER TYPE "OrderStatus" RENAME TO "OrderStatus_old";
ALTER TYPE "OrderStatus_new" RENAME TO "OrderStatus";
DROP TYPE "public"."OrderStatus_old";
ALTER TABLE "Order" ALTER COLUMN "status" SET DEFAULT 'OPEN';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "OrderType_new" AS ENUM ('MARKET', 'LIMIT');
ALTER TABLE "Order" ALTER COLUMN "type" TYPE "OrderType_new" USING ("type"::text::"OrderType_new");
ALTER TYPE "OrderType" RENAME TO "OrderType_old";
ALTER TYPE "OrderType_new" RENAME TO "OrderType";
DROP TYPE "public"."OrderType_old";
COMMIT;

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "status" SET DEFAULT 'OPEN';

-- CreateTable
CREATE TABLE "Fill" (
    "id" TEXT NOT NULL,
    "buyOrderId" TEXT NOT NULL,
    "sellOrderId" TEXT NOT NULL,
    "buyerId" TEXT NOT NULL,
    "sellerId" TEXT NOT NULL,
    "market" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "buyerFee" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "sellerFee" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Fill_pkey" PRIMARY KEY ("id")
);
