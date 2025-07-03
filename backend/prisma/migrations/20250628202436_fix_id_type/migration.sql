/*
  Warnings:

  - The primary key for the `emails` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `emails` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_emails" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "isStarred" BOOLEAN NOT NULL DEFAULT false,
    "priority" TEXT NOT NULL DEFAULT 'NORMAL',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME
);
INSERT INTO "new_emails" ("body", "createdAt", "deletedAt", "from", "id", "isRead", "isStarred", "priority", "subject", "to", "updatedAt") SELECT "body", "createdAt", "deletedAt", "from", "id", "isRead", "isStarred", "priority", "subject", "to", "updatedAt" FROM "emails";
DROP TABLE "emails";
ALTER TABLE "new_emails" RENAME TO "emails";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
