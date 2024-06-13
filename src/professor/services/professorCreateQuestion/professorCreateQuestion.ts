import { Questao, PrismaClient } from "@prisma/client";
import { Question, QuestionResponse } from "../../../types/professorTypes";

export class ProfessorCreateQuestionService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }
  async createQuestion(question: Question): Promise<Questao> {
    const questionData = await this.prisma.questao.create({
      data: {
        provaId: question.provaId,
        pergunta: question.pergunta,
      },
    });

    const response: QuestionResponse = {
      id: questionData.id,
      provaId: questionData.provaId,
      pergunta: questionData.pergunta,
    };

    return response;
  }
}
