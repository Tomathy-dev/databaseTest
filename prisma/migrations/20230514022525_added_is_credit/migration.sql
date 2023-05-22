/*
  Warnings:

  - Added the required column `isCredit` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Transaction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "matterFileId" INTEGER NOT NULL,
    "matterMatter" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    "description" TEXT NOT NULL,
    "value" REAL NOT NULL,
    "transactionType" TEXT NOT NULL,
    "bank" TEXT,
    "transactionMethod" TEXT NOT NULL,
    "isCredit" BOOLEAN NOT NULL,
    CONSTRAINT "Transaction_matterFileId_matterMatter_fkey" FOREIGN KEY ("matterFileId", "matterMatter") REFERENCES "Matter" ("fileId", "matter") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Transaction_bank_fkey" FOREIGN KEY ("bank") REFERENCES "Ledger" ("name") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Transaction" ("bank", "date", "description", "id", "matterFileId", "matterMatter", "transactionMethod", "transactionType", "value") SELECT "bank", "date", "description", "id", "matterFileId", "matterMatter", "transactionMethod", "transactionType", "value" FROM "Transaction";
DROP TABLE "Transaction";
ALTER TABLE "new_Transaction" RENAME TO "Transaction";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
