/*
  Warnings:

  - You are about to drop the column `creditValue` on the `transaction` table. All the data in the column will be lost.
  - You are about to drop the column `debitValue` on the `transaction` table. All the data in the column will be lost.
  - Added the required column `value` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `transaction` DROP COLUMN `creditValue`,
    DROP COLUMN `debitValue`,
    ADD COLUMN `value` DOUBLE NOT NULL;
