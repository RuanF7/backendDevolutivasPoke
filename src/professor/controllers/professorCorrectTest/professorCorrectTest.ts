import { Request, Response } from "express";
import prisma from "../../../prismaClient";
import { ProfessorCorrectTestService } from "../../services/professorCorrectTest/professorCorrectTest";
import { NotFoundError } from "../../../errors/notFoundError";
import { BadRequestError } from "../../../errors/badRequestError";
import { InternalServerError } from "../../../errors/internalServerError";

const professorCorrectTestService = new ProfessorCorrectTestService(prisma);

export class ProfessorCorrectTestController {
  static async correctTest(req: Request, res: Response) {
    console.log("Requisição:", req.body);
    const { alunoId, questaoId, nota } = req.body;

    try {
      if (!alunoId || !questaoId || !nota) {
        throw new BadRequestError(
          "Faltam campos obrigatórios: alunoId, questaoId, nota"
        );
      }

      const grade = await professorCorrectTestService.correctTest({
        alunoId,
        questaoId,
        nota,
      });

      if (!grade) {
        throw new NotFoundError("Não foi possível atribuir nota ao aluno.");
      }

      console.log("Nota Atribuída com sucesso!:", grade);
      res.status(200).json(grade);
    } catch (error) {
      console.error("Erro ao atribuir nota:", error);
      if (error instanceof BadRequestError) {
        res.status(400).json({ message: error.message });
      } else if (error instanceof NotFoundError) {
        res.status(404).json({ message: error.message });
      } else {
        const internalError = new InternalServerError("Erro no servidor.");
        return res.status(500).json({ error: internalError.message });
      }
    }
  }
}
