import { Resposta, PrismaClient } from "@prisma/client";
import { Grade } from "../../../types/professorTypes";

export class ProfessorCorrectTestService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async correctTest(grade: Grade): Promise<Resposta> {
    const gradeData = await this.prisma.resposta.update({
      where: {
        alunoId_questaoId: {
          alunoId: grade.alunoId,
          questaoId: grade.questaoId,
        },
      },
      data: {
        nota: grade.nota,
      },
    });

    return gradeData;
  }
}
