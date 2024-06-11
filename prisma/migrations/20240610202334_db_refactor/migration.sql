/*
  Warnings:

  - You are about to drop the `Aluno` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Devolutiva` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Matricula` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Mochila` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Nota` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Professor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Resposta` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `mochilaId` on the `Pokemon` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `Pokemon` table. All the data in the column will be lost.
  - You are about to drop the column `tipo` on the `Pokemon` table. All the data in the column will be lost.
  - You are about to drop the column `imagem` on the `Questao` table. All the data in the column will be lost.
  - You are about to drop the column `pergunta1` on the `Questao` table. All the data in the column will be lost.
  - You are about to drop the column `pergunta2` on the `Questao` table. All the data in the column will be lost.
  - You are about to drop the column `provaId` on the `Questao` table. All the data in the column will be lost.
  - You are about to drop the column `dataCriacao` on the `Prova` table. All the data in the column will be lost.
  - You are about to drop the column `professorId` on the `Prova` table. All the data in the column will be lost.
  - You are about to drop the column `professorId` on the `Curso` table. All the data in the column will be lost.
  - You are about to drop the column `tipo` on the `Curso` table. All the data in the column will be lost.
  - Added the required column `tipo` to the `Pessoa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Golpe` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Imagem` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Nome` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `provasId` to the `Questao` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Mochila_professorId_key";

-- DropIndex
DROP INDEX "Professor_tipo_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Aluno";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Devolutiva";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Matricula";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Mochila";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Nota";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Professor";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Resposta";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "PessoaCurso" (
    "pessoaId" INTEGER NOT NULL,
    "cursoId" INTEGER NOT NULL,

    PRIMARY KEY ("pessoaId", "cursoId"),
    CONSTRAINT "PessoaCurso_pessoaId_fkey" FOREIGN KEY ("pessoaId") REFERENCES "Pessoa" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PessoaCurso_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "Curso" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PessoaQuestao" (
    "pessoaId" INTEGER NOT NULL,
    "questaoId" INTEGER NOT NULL,
    "pergunta" TEXT NOT NULL,
    "resposta" TEXT NOT NULL,
    "nota" REAL NOT NULL,

    PRIMARY KEY ("pessoaId", "questaoId"),
    CONSTRAINT "PessoaQuestao_pessoaId_fkey" FOREIGN KEY ("pessoaId") REFERENCES "Pessoa" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PessoaQuestao_questaoId_fkey" FOREIGN KEY ("questaoId") REFERENCES "Questao" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pessoa" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "tipo" TEXT NOT NULL
);
INSERT INTO "new_Pessoa" ("email", "id", "nome", "senha") SELECT "email", "id", "nome", "senha" FROM "Pessoa";
DROP TABLE "Pessoa";
ALTER TABLE "new_Pessoa" RENAME TO "Pessoa";
CREATE UNIQUE INDEX "Pessoa_email_key" ON "Pessoa"("email");
CREATE TABLE "new_Pokemon" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Nome" TEXT NOT NULL,
    "Golpe" TEXT NOT NULL,
    "Imagem" TEXT NOT NULL,
    CONSTRAINT "Pokemon_id_fkey" FOREIGN KEY ("id") REFERENCES "Pessoa" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Pokemon" ("id") SELECT "id" FROM "Pokemon";
DROP TABLE "Pokemon";
ALTER TABLE "new_Pokemon" RENAME TO "Pokemon";
CREATE TABLE "new_Questao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "provasId" INTEGER NOT NULL,
    CONSTRAINT "Questao_id_fkey" FOREIGN KEY ("id") REFERENCES "Prova" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Questao" ("id") SELECT "id" FROM "Questao";
DROP TABLE "Questao";
ALTER TABLE "new_Questao" RENAME TO "Questao";
CREATE TABLE "new_Prova" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "cursoId" INTEGER NOT NULL,
    CONSTRAINT "Prova_id_fkey" FOREIGN KEY ("id") REFERENCES "Curso" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Prova" ("cursoId", "id", "nome") SELECT "cursoId", "id", "nome" FROM "Prova";
DROP TABLE "Prova";
ALTER TABLE "new_Prova" RENAME TO "Prova";
CREATE TABLE "new_Curso" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL
);
INSERT INTO "new_Curso" ("id", "nome") SELECT "id", "nome" FROM "Curso";
DROP TABLE "Curso";
ALTER TABLE "new_Curso" RENAME TO "Curso";
PRAGMA foreign_key_check("Pessoa");
PRAGMA foreign_key_check("Pokemon");
PRAGMA foreign_key_check("Questao");
PRAGMA foreign_key_check("Prova");
PRAGMA foreign_key_check("Curso");
PRAGMA foreign_keys=ON;
