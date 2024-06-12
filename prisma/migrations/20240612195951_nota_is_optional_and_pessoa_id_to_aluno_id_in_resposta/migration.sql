/*
  Warnings:

  - The primary key for the `Resposta` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `pessoaId` on the `Resposta` table. All the data in the column will be lost.
  - You are about to alter the column `nota` on the `Resposta` table. The data in that column could be lost. The data in that column will be cast from `Float` to `Int`.
  - Added the required column `alunoId` to the `Resposta` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Resposta" (
    "alunoId" INTEGER NOT NULL,
    "questaoId" INTEGER NOT NULL,
    "resposta" TEXT NOT NULL,
    "nota" INTEGER,

    PRIMARY KEY ("alunoId", "questaoId"),
    CONSTRAINT "Resposta_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "Pessoa" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Resposta_questaoId_fkey" FOREIGN KEY ("questaoId") REFERENCES "Questao" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Resposta" ("nota", "questaoId", "resposta") SELECT "nota", "questaoId", "resposta" FROM "Resposta";
DROP TABLE "Resposta";
ALTER TABLE "new_Resposta" RENAME TO "Resposta";
PRAGMA foreign_key_check("Resposta");
PRAGMA foreign_keys=ON;
