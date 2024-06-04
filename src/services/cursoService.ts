import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class CursoService {
  async criarCurso(tipo: string, professorId: number) {
    const cursoExistente = await prisma.curso.findFirst({
      where: { tipo },
    });

    if (cursoExistente) {
      await prisma.professor.update({
        where: { id: professorId },
        data: { Curso: { connect: { id: cursoExistente.id } } },
      });
      return cursoExistente;
    } else {
      const novoCurso = await prisma.curso.create({
        data: { nome: `Curso de ${tipo}`, tipo },
      });

      await prisma.professor.update({
        where: { id: professorId },
        data: { Curso: { connect: { id: novoCurso.id } } },
      });
      return novoCurso;
    }
  }

  async listarCursos() {
    return prisma.curso.findMany();
  }
}
