-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_File" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phoneNumber" INTEGER,
    "personal" BOOLEAN NOT NULL,
    "matter_final" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_File" ("email", "id", "name", "personal", "phoneNumber") SELECT "email", "id", "name", "personal", "phoneNumber" FROM "File";
DROP TABLE "File";
ALTER TABLE "new_File" RENAME TO "File";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
CREATE TRIGGER update_matter_final AFTER INSERT ON Matter FOR EACH ROW BEGIN UPDATE File SET matter_final = NEW.matter WHERE id = NEW.fileId;
END;
