/*
  Warnings:

  - You are about to alter the column `value` on the `transaction` table. The data in that column could be lost. The data in that column will be cast from `Decimal(11,2)` to `BigInt`.

*/
-- AlterTable
ALTER TABLE `transaction` MODIFY `value` BIGINT NOT NULL;
