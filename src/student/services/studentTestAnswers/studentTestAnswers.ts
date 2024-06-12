import { Resposta, PrismaClient } from "@prisma/client";

interface Answer {
  alunoId: number;
  questaoId: number;
  resposta: string;
  nota?: number;
}

export class StudentTestAnswersService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
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

    return answerData;
  }
}
