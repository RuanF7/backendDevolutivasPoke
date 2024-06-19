import { Resposta, PrismaClient, Curso } from "@prisma/client";
import { Answer, AnswerResponse } from "../../../types/studentTypes";

export class StudentTestAnswersService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }
  async getAvailableTestsByStudentId(studentId: number): Promise<Curso[]> {
    try {
      const cursos = await this.prisma.matricula.findMany({
        where: {
          alunoId: studentId,
        },
        include: {
          curso: {
            include: {
              prova: true,
            },
          },
        },
      });

      return cursos.map((matricula) => matricula.curso);
    } catch (error) {
      console.error("Erro ao buscar provas disponíveis:", error);
      throw error;
    }
  }

  async createAnswer(answer: Answer): Promise<Resposta> {
    const answerData = await this.prisma.resposta.create({
      data: {
        alunoId: answer.alunoId,
        questaoId: answer.questaoId,
        resposta: answer.resposta,
        nota: answer.nota,
      },
    });

    const response: AnswerResponse = {
      alunoId: answerData.alunoId,
      questaoId: answerData.questaoId,
      resposta: answerData.resposta,
      nota: answerData.nota !== undefined ? answerData.nota : null,
    };

    return response;
  }
}
