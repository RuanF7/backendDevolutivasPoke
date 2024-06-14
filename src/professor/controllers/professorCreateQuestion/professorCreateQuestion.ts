import { Request, Response } from "express";
import prisma from "../../../prismaClient";
import { ProfessorCreateQuestionService } from "../../services/professorCreateQuestion/professorCreateQuestion";
import { BadRequestError } from "../../../errors/badRequestError";
import { NotFoundError } from "../../../errors/notFoundError";
import { InternalServerError } from "../../../errors/internalServerError";

const professorCreateQuestionService = new ProfessorCreateQuestionService(
  prisma
);

export class ProfessorCreateQuestionController {
  static async createQuestion(req: Request, res: Response) {
    console.log("Requisição:", req.body);
    const { provaId, pergunta } = req.body;

    try {
      if (!provaId || !pergunta) {
        throw new BadRequestError(
          "Faltam campos obrigatórios: provaId, pergunta"
        );
      }

      const question = await professorCreateQuestionService.createQuestion({
        provaId,
        pergunta,
      });

      if (!question) {
        throw new NotFoundError("Não foi possível criar a pergunta.");
      }

      console.log("Pergunta Criada com sucesso!:", question);
      res.status(200).json(question);
    } catch (error) {
      console.error("Erro ao criar pergunta:", error);

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
