/*
  Warnings:

  - You are about to drop the column `Golpe` on the `Pokemon` table. All the data in the column will be lost.
  - You are about to drop the column `Imagem` on the `Pokemon` table. All the data in the column will be lost.
  - You are about to drop the column `Nome` on the `Pokemon` table. All the data in the column will be lost.
  - You are about to drop the column `pergunta` on the `Resposta` table. All the data in the column will be lost.
  - You are about to drop the column `professorId` on the `Curso` table. All the data in the column will be lost.
  - You are about to drop the column `provasId` on the `Questao` table. All the data in the column will be lost.
  - Added the required column `golpe` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imagem` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pessoaId` to the `Curso` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pergunta` to the `Questao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `provaId` to the `Questao` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pokemon" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pessoaId" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "golpe" TEXT NOT NULL,
    "imagem" TEXT NOT NULL,
    CONSTRAINT "Pokemon_pessoaId_fkey" FOREIGN KEY ("pessoaId") REFERENCES "Pessoa" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Pokemon" ("id", "pessoaId") SELECT "id", "pessoaId" FROM "Pokemon";
DROP TABLE "Pokemon";
ALTER TABLE "new_Pokemon" RENAME TO "Pokemon";
CREATE TABLE "new_Resposta" (
    "pessoaId" INTEGER NOT NULL,
    "questaoId" INTEGER NOT NULL,
    "resposta" TEXT NOT NULL,
    "nota" REAL NOT NULL,

    PRIMARY KEY ("pessoaId", "questaoId"),
    CONSTRAINT "Resposta_pessoaId_fkey" FOREIGN KEY ("pessoaId") REFERENCES "Pessoa" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Resposta_questaoId_fkey" FOREIGN KEY ("questaoId") REFERENCES "Questao" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Resposta" ("nota", "pessoaId", "questaoId", "resposta") SELECT "nota", "pessoaId", "questaoId", "resposta" FROM "Resposta";
DROP TABLE "Resposta";
ALTER TABLE "new_Resposta" RENAME TO "Resposta";
CREATE TABLE "new_Curso" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "pessoaId" INTEGER NOT NULL,
    CONSTRAINT "Curso_pessoaId_fkey" FOREIGN KEY ("pessoaId") REFERENCES "Pessoa" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Curso" ("id", "nome") SELECT "id", "nome" FROM "Curso";
DROP TABLE "Curso";
ALTER TABLE "new_Curso" RENAME TO "Curso";
CREATE TABLE "new_Questao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "provaId" INTEGER NOT NULL,
    "pergunta" TEXT NOT NULL,
    CONSTRAINT "Questao_provaId_fkey" FOREIGN KEY ("provaId") REFERENCES "Prova" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Questao" ("id") SELECT "id" FROM "Questao";
DROP TABLE "Questao";
ALTER TABLE "new_Questao" RENAME TO "Questao";
PRAGMA foreign_key_check("Pokemon");
PRAGMA foreign_key_check("Resposta");
PRAGMA foreign_key_check("Curso");
PRAGMA foreign_key_check("Questao");
PRAGMA foreign_keys=ON;
