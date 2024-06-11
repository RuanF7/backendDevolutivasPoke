/*
  Warnings:

  - You are about to drop the `PessoaCurso` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PessoaQuestao` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `pessoaId` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `professorId` to the `Curso` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "PessoaCurso";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "PessoaQuestao";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Matricula" (
    "pessoaId" INTEGER NOT NULL,
    "cursoId" INTEGER NOT NULL,

    PRIMARY KEY ("pessoaId", "cursoId"),
    CONSTRAINT "Matricula_pessoaId_fkey" FOREIGN KEY ("pessoaId") REFERENCES "Pessoa" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Matricula_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "Curso" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Resposta" (
    "pessoaId" INTEGER NOT NULL,
    "questaoId" INTEGER NOT NULL,
    "pergunta" TEXT NOT NULL,
    "resposta" TEXT NOT NULL,
    "nota" REAL NOT NULL,

    PRIMARY KEY ("pessoaId", "questaoId"),
    CONSTRAINT "Resposta_pessoaId_fkey" FOREIGN KEY ("pessoaId") REFERENCES "Pessoa" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Resposta_questaoId_fkey" FOREIGN KEY ("questaoId") REFERENCES "Questao" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pokemon" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pessoaId" INTEGER NOT NULL,
    "Nome" TEXT NOT NULL,
    "Golpe" TEXT NOT NULL,
    "Imagem" TEXT NOT NULL,
    CONSTRAINT "Pokemon_pessoaId_fkey" FOREIGN KEY ("pessoaId") REFERENCES "Pessoa" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Pokemon" ("Golpe", "Imagem", "Nome", "id") SELECT "Golpe", "Imagem", "Nome", "id" FROM "Pokemon";
DROP TABLE "Pokemon";
ALTER TABLE "new_Pokemon" RENAME TO "Pokemon";
CREATE TABLE "new_Prova" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "cursoId" INTEGER NOT NULL,
    CONSTRAINT "Prova_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "Curso" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Prova" ("cursoId", "id", "nome") SELECT "cursoId", "id", "nome" FROM "Prova";
DROP TABLE "Prova";
ALTER TABLE "new_Prova" RENAME TO "Prova";
CREATE TABLE "new_Curso" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "professorId" INTEGER NOT NULL,
    CONSTRAINT "Curso_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Pessoa" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Curso" ("id", "nome") SELECT "id", "nome" FROM "Curso";
DROP TABLE "Curso";
ALTER TABLE "new_Curso" RENAME TO "Curso";
PRAGMA foreign_key_check("Pokemon");
PRAGMA foreign_key_check("Prova");
PRAGMA foreign_key_check("Curso");
PRAGMA foreign_keys=ON;
