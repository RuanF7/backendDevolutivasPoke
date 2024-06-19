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
    const { provaId, pergunta, professorId } = req.body;

    try {
      if (!provaId || !pergunta || !professorId) {
        throw new BadRequestError(
          "Faltam campos obrigatórios: provaId, pergunta, professorId"
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
  static async getProvaId(req: Request, res: Response) {
    const { professorId, nomeProva } = req.params;
    console.log("Parâmetros recebidos:", { professorId, nomeProva });

    try {
      // 1. Busque o cursoId pelo professorId
      const curso = await prisma.curso.findFirst({
        where: {
          professorId: parseInt(professorId),
        },
      });

      // 2. Se curso não for encontrado, retorne um erro
      if (!curso) {
        throw new NotFoundError("Curso não encontrado");
      }

      console.log("Curso encontrado com sucesso!", curso);

      // 3. Com o cursoId encontrado, busque a prova
      const prova = await prisma.prova.findFirst({
        where: {
          cursoId: curso.id,
          nome: nomeProva,
        },
      });

      // 4. Se a prova não for encontrada, retorne um erro
      if (!prova) {
        throw new NotFoundError("Prova não encontrada");
      }

      console.log("Prova encontrada:", prova);

      // 5. Retorne a resposta com a prova encontrada
      res.status(200).json({ id: prova.id, nome: prova.nome });
    } catch (error) {
      console.error("Erro ao buscar prova:", error);
      res.status(500).json({ message: "Erro ao buscar prova" });
    }
  }
}
