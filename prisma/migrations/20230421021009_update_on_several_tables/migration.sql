/*
  Warnings:

  - You are about to drop the `Bank` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FileRecord` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Bank";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "FileRecord";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Transaction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "matterFileId" INTEGER NOT NULL,
    "matterMatter" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    "transactionMethod" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "value" REAL NOT NULL,
    "transactionType" TEXT NOT NULL,
    "bank" TEXT NOT NULL,
    CONSTRAINT "Transaction_matterFileId_matterMatter_fkey" FOREIGN KEY ("matterFileId", "matterMatter") REFERENCES "Matter" ("fileId", "matter") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Transaction_bank_fkey" FOREIGN KEY ("bank") REFERENCES "Ledger" ("name") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Ledger" (
    "cardNumber" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "totalValue" REAL NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Ledger_name_key" ON "Ledger"("name");
