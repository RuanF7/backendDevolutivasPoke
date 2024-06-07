/*
  Warnings:

  - You are about to drop the column `perguntaTipo` on the `Questao` table. All the data in the column will be lost.
  - You are about to drop the column `pokemonNome` on the `Questao` table. All the data in the column will be lost.
  - Added the required column `pergunta1` to the `Questao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pergunta2` to the `Questao` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Questao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "provaId" INTEGER NOT NULL,
    "pergunta1" TEXT NOT NULL,
    "pergunta2" TEXT NOT NULL,
    "imagem" TEXT NOT NULL,
    CONSTRAINT "Questao_provaId_fkey" FOREIGN KEY ("provaId") REFERENCES "Prova" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Questao" ("id", "imagem", "provaId") SELECT "id", "imagem", "provaId" FROM "Questao";
DROP TABLE "Questao";
ALTER TABLE "new_Questao" RENAME TO "Questao";
PRAGMA foreign_key_check("Questao");
PRAGMA foreign_keys=ON;
