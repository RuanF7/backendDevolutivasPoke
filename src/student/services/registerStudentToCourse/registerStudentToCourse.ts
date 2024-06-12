import { Matricula, PrismaClient } from "@prisma/client";

interface Student {
  id: number;
  nome: string;
}

interface RegisterStudentToCourse {
  alunoId: number;
  cursoId: number;
}

export class RegisterStudentToCourseService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }
  async registerStudentToCourse(input: RegisterStudentToCourse): Promise<Matricula> {
    const matriculaData = await this.prisma.matricula.create({
      data: {
        alunoId: input.alunoId,
        cursoId: input.cursoId,
      },
    });

    return matriculaData;
  }
}