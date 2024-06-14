import { Request, Response } from "express";
import prisma from "../../../prismaClient";
import { StudentTestAnswersService } from "../../services/studentTestAnswers/studentTestAnswers";
import { BadRequestError } from "../../../errors/badRequestError";
import { InternalServerError } from "../../../errors/internalServerError";
import { NotFoundError } from "../../../errors/notFoundError";

const studentTestAnswersService = new StudentTestAnswersService(prisma);

export class StudentTestAnswerController {
  static async createAnswer(req: Request, res: Response) {
    console.log("Requisição:", req.body);
    const { alunoId, questaoId, resposta, nota } = req.body;

    try {
      if (!alunoId || !questaoId || !resposta || !nota) {
        throw new BadRequestError(
          "Faltam campos obrigatórios: alunoId, questaoId, resposta, nota"
        );
      }
      const answer = await studentTestAnswersService.createAnswer({
        alunoId,
        questaoId,
        resposta,
        nota,
      });

      if (!answer) {
        throw new BadRequestError("Não foi possível criar a resposta.");
      }

      console.log("Resposta Criada com sucesso!:", answer);
      res.status(200).json(answer);
    } catch (error) {
      console.error("Erro ao criar resposta:", error);

      if (error instanceof BadRequestError) {
        res.status(400).json({ message: error.message });
      } else if (error instanceof NotFoundError) {
        res.status(404).json({ message: error.message });
      } else {
        const internalError = new InternalServerError("Erro interno.");
        return res.status(500).json({ message: internalError.message });
      }
    }
  }
}
