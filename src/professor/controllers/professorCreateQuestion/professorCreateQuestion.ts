import { Request, Response } from "express";
import prisma from "../../../prismaClient";
import { ProfessorCreateQuestionService } from "../../services/professorCreateQuestion/professorCreateQuestion";

const professorCreateQuestionService = new ProfessorCreateQuestionService(
  prisma
);

export class ProfessorCreateQuestionController {
  static async createQuestion(req: Request, res: Response) {
    console.log("Requisição:", req.body);
    const { provaId, pergunta } = req.body;

    try {
      const question = await professorCreateQuestionService.createQuestion({
        provaId,
        pergunta,
      });
      console.log("Pergunta Criada com sucesso!:", question);
      res.status(201).json(question);
    } catch (error) {
      res.status(500).json({ error: error as Error });
    }
  }
}
