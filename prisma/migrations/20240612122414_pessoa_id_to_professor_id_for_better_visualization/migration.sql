/*
  Warnings:

  - You are about to drop the column `pessoaId` on the `Pokemon` table. All the data in the column will be lost.
  - Added the required column `professorId` to the `Pokemon` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pokemon" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "professorId" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "golpe" TEXT NOT NULL,
    "imagem" TEXT NOT NULL,
    CONSTRAINT "Pokemon_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Pessoa" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Pokemon" ("golpe", "id", "imagem", "nome") SELECT "golpe", "id", "imagem", "nome" FROM "Pokemon";
DROP TABLE "Pokemon";
ALTER TABLE "new_Pokemon" RENAME TO "Pokemon";
PRAGMA foreign_key_check("Pokemon");
PRAGMA foreign_keys=ON;
