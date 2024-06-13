import { Request, Response } from "express";
import prisma from "../../../prismaClient";
import { ProfessorCorrectTestService } from "../../services/professorCorrectTest/professorCorrectTest";

const professorCorrectTestService = new ProfessorCorrectTestService(prisma);

export class ProfessorCorrectTestController {
  static async correctTest(req: Request, res: Response) {
    console.log("Requisição:", req.body);
    const { alunoId, questaoId, nota } = req.body;

    try {
      const grade = await professorCorrectTestService.correctTest({
        alunoId,
        questaoId,
        nota,
      });
      console.log("Nota Atribuída com sucesso!:", grade);
      res.status(200).json(grade);
    } catch (error) {
      console.error("Erro ao atribuir nota:", error);
      res.status(500).json({ error: error as Error });
    }
  }
}
