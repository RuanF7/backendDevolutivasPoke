import { Curso, PrismaClient } from "@prisma/client";
import { Course, CourseResponse } from "../../../types/professorTypes";

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

    const response: CourseResponse = {
      id: courseData.id,
      nome: courseData.nome,
      professorId: courseData.professorId,
    };

    return response;
  }
}
