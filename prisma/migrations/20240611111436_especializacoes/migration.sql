/*
  Warnings:

  - The primary key for the `Matricula` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `pessoaId` on the `Matricula` table. All the data in the column will be lost.
  - You are about to drop the column `pessoaId` on the `Curso` table. All the data in the column will be lost.
  - Added the required column `alunoId` to the `Matricula` table without a default value. This is not possible if the table is not empty.
  - Added the required column `professorId` to the `Curso` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Matricula" (
    "alunoId" INTEGER NOT NULL,
    "cursoId" INTEGER NOT NULL,

    PRIMARY KEY ("alunoId", "cursoId"),
    CONSTRAINT "Matricula_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "Pessoa" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Matricula_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "Curso" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Matricula" ("cursoId") SELECT "cursoId" FROM "Matricula";
DROP TABLE "Matricula";
ALTER TABLE "new_Matricula" RENAME TO "Matricula";
CREATE TABLE "new_Curso" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "professorId" INTEGER NOT NULL,
    CONSTRAINT "Curso_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Pessoa" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Curso" ("id", "nome") SELECT "id", "nome" FROM "Curso";
DROP TABLE "Curso";
ALTER TABLE "new_Curso" RENAME TO "Curso";
PRAGMA foreign_key_check("Matricula");
PRAGMA foreign_key_check("Curso");
PRAGMA foreign_keys=ON;
