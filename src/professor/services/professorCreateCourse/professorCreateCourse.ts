import { Curso, PrismaClient } from "@prisma/client";
import { Course } from "../../../types/professorTypes";

export class ProfessorCreateCourseService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }
  async createCourse(course: Course): Promise<Curso> {
    const courseData = await this.prisma.curso.create({
      data: {
        nome: course.nome,
        professorId: course.professorId,
      },
    });

    return courseData;
  }
}
