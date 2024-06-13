import { Matricula, PrismaClient } from "@prisma/client";
import {
  RegisterStudentToCourse,
  RegisterStudentToCourseResponse,
} from "../../../types/studentTypes";

export class RegisterStudentToCourseService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }
  async registerStudentToCourse(
    input: RegisterStudentToCourse
  ): Promise<Matricula> {
    const matriculaData = await this.prisma.matricula.create({
      data: {
        alunoId: input.alunoId,
        cursoId: input.cursoId,
      },
    });

    const response: RegisterStudentToCourseResponse = {
      alunoId: matriculaData.alunoId,
      cursoId: matriculaData.cursoId,
    };

    return response;
  }
}
