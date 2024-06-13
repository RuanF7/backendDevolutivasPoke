import { PrismaClient, Prova } from "@prisma/client";
import {
  CreatingTest,
  CreatingTestResponse,
} from "../../../types/professorTypes";

export class ProfessorCreateTestService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }
  async createTest(test: CreatingTest): Promise<Prova> {
    const testData = await this.prisma.prova.create({
      data: {
        nome: test.nome,
        cursoId: test.cursoId,
      },
    });

    const response: CreatingTestResponse = {
      id: testData.id,
      nome: testData.nome,
      cursoId: testData.cursoId,
    };

    return response;
  }
}
