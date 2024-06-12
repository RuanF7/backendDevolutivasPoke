import { Request, Response } from "express";
import prisma from "../../../prismaClient";
import { StudentTestAnswersService } from "../../services/studentTestAnswers/studentTestAnswers";

const studentTestAnswersService = new StudentTestAnswersService(prisma);

export class StudentTestAnswerController {
  static async createAnswer(req: Request, res: Response) {
    console.log("Requisição:", req.body);
    const { alunoId, questaoId, resposta, nota } = req.body;

    try {
      const answer = await studentTestAnswersService.createAnswer({
        alunoId,
        questaoId,
        resposta,
        nota,
      });
      console.log("Resposta Criada com sucesso!:", answer);
      res.status(201).json(answer);
    } catch (error) {
      console.error("Erro ao criar resposta:", error);
      res.status(500).json({ error: error as Error });
    }
  }
}
