import { Request, Response } from "express";
import prisma from "../../../prismaClient";
import { StudentTestAnswersService } from "../../services/studentTestAnswers/studentTestAnswers";
import { BadRequestError } from "../../../errors/badRequestError";
import { InternalServerError } from "../../../errors/internalServerError";
import { NotFoundError } from "../../../errors/notFoundError";

const studentTestAnswersService = new StudentTestAnswersService(prisma);

export class StudentTestAnswerController {
  static async getAvailableTests(req: Request, res: Response) {
    const { alunoId } = req.params;

    try {
      const studentId = parseInt(alunoId);

      // Verifica se o aluno existe
      const aluno = await prisma.pessoa.findUnique({
        where: {
          id: studentId,
          tipo: "aluno",
        },
      });

      if (!aluno) {
        throw new NotFoundError("Aluno não encontrado");
      }

      // Busca os cursos e provas disponíveis para o aluno
      const cursosComProvas =
        await studentTestAnswersService.getAvailableTestsByStudentId(studentId);

      res.status(200).json(cursosComProvas);
    } catch (error) {
      console.error("Erro ao buscar provas disponíveis:", error);

      if (error instanceof NotFoundError) {
        res.status(404).json({ message: error.message });
      } else {
        const internalError = new InternalServerError("Erro interno.");
        res.status(500).json({ message: internalError.message });
      }
    }
  }

  static async getQuestoes(req: Request, res: Response) {
    const { provaId } = req.params;

    try {
      const questoes = await prisma.questao.findMany({
        where: {
          provaId: parseInt(provaId),
        },
      });

      if (!questoes || questoes.length === 0) {
        throw new NotFoundError("Questões não encontradas para esta prova.");
      }

      res.status(200).json(questoes);
    } catch (error) {
      console.error("Erro ao buscar questões:", error);
      res.status(500).json({ message: "Erro ao buscar questões." });
    }
  }

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
