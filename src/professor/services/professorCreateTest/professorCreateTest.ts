import { PrismaClient, Prova } from "@prisma/client";
import { DevelopingTest } from "../../../types/professorTypes";

export class ProfessorCreateTestService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }
  async createTest(test: DevelopingTest): Promise<Prova> {
    const testData = await this.prisma.prova.create({
      data: {
        nome: test.nome,
        cursoId: test.cursoId,
      },
    });

    return testData;
  }
}
