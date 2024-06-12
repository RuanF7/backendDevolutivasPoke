import { Curso, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface Course {
  nome: string;
  professorId: number;
}
//Dar uma olhada nas exportações do prisma

export class CourseService {
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

// export class CursoService {
//   async criarCurso(tipo: string, professorId: number) {
//     const professorExistente = await prisma.professor.findUnique({
//       where: { id: professorId },
//     });

//     if (!professorExistente) {
//       throw new Error("Professor não encontrado");
//     }

//     if (professorExistente.cursoId) {
//       throw new Error("O professor já está associado a um curso");
//     }

//     const novoCurso = await prisma.curso.create({
//       data: {
//         nome: `Curso de ${tipo}`,
//         tipo,
//         Professor: {
//           connect: { id: professorId },
//         } as any,
//       },
//     });

//     await prisma.professor.update({
//       where: { id: professorId },
//       data: { cursoId: novoCurso.id },
//     });

//     return novoCurso;
//   }

//   async listarCursos() {
//     return prisma.curso.findMany();
//   }
// }
