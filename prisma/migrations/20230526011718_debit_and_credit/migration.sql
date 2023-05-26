/*
  Warnings:

  - You are about to drop the column `matterFileId` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `matterMatter` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `transactionType` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `file` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `matter` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Made the column `bank` on table `Transaction` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Transaction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "file" INTEGER NOT NULL,
    "matter" INTEGER NOT NULL,
    "date" TEXT NOT NULL,
    "transactionMethod" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "creditValue" REAL,
    "debitValue" REAL,
    "bank" TEXT NOT NULL,
    CONSTRAINT "Transaction_file_matter_fkey" FOREIGN KEY ("file", "matter") REFERENCES "Matter" ("fileId", "matter") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Transaction_bank_fkey" FOREIGN KEY ("bank") REFERENCES "Ledger" ("name") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Transaction" ("bank", "date", "description", "id", "transactionMethod") SELECT "bank", "date", "description", "id", "transactionMethod" FROM "Transaction";
DROP TABLE "Transaction";
ALTER TABLE "new_Transaction" RENAME TO "Transaction";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
