/*
  Warnings:

  - You are about to alter the column `totalValue` on the `ledger` table. The data in that column could be lost. The data in that column will be cast from `Decimal(11,2)` to `BigInt`.

*/
-- AlterTable
ALTER TABLE `ledger` MODIFY `totalValue` BIGINT NOT NULL DEFAULT 0;
