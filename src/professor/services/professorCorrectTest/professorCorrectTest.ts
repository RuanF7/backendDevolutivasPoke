import { Resposta, PrismaClient } from "@prisma/client";
import { Grade, GradeResponse } from "../../../types/professorTypes";

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

    const response: GradeResponse = {
      alunoId: gradeData.alunoId,
      questaoId: gradeData.questaoId,
      resposta: gradeData.resposta,
      nota: gradeData.nota !== undefined ? gradeData.nota : null,
    };

    return response;
  }
}
