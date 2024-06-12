import { Questao, PrismaClient } from "@prisma/client";

interface Question {
  provaId: number;
  pergunta: string;
}

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

    return questionData;
  }
}
