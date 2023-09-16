/*
  Warnings:

  - Added the required column `openDate` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `openDate` to the `Matter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `file` ADD COLUMN `balance` BIGINT NOT NULL DEFAULT 0,
    ADD COLUMN `openDate` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `matter` ADD COLUMN `balance` BIGINT NOT NULL DEFAULT 0,
    ADD COLUMN `openDate` DATETIME(3) NOT NULL;
