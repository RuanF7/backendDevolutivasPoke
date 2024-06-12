import { PrismaClient, Prova } from "@prisma/client";

interface DevelopingTest {
  nome: string;
  cursoId: number;
}

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
