-- CreateTable
CREATE TABLE "File" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phoneNumber" INTEGER,
    "personal" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "Matter" (
    "fileId" INTEGER NOT NULL,
    "matter" INTEGER NOT NULL,
    "department" TEXT NOT NULL,
    "inCharge" TEXT NOT NULL,

    PRIMARY KEY ("fileId", "matter"),
    CONSTRAINT "Matter_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FileRecord" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "matterFileId" INTEGER NOT NULL,
    "matterMatter" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    "transactionMethod" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "value" REAL NOT NULL,
    "bank" TEXT NOT NULL,
    "isCredit" BOOLEAN NOT NULL,
    CONSTRAINT "FileRecord_matterFileId_matterMatter_fkey" FOREIGN KEY ("matterFileId", "matterMatter") REFERENCES "Matter" ("fileId", "matter") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Bank" (
    "cardNumber" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "totalValue" REAL NOT NULL
);
