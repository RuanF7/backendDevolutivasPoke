import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class CursoService {
  async criarCurso(tipo: string, professorId: number) {
    const professorExistente = await prisma.professor.findUnique({
      where: { id: professorId },
    });

    if (!professorExistente) {
      throw new Error('Professor não encontrado');
    }

    if (professorExistente.cursoId) {
      throw new Error('O professor já está associado a um curso');
    }

    const novoCurso = await prisma.curso.create({
      data: { 
        nome: `Curso de ${tipo}`, 
        tipo, 
        Professor: {
          connect: { id: professorId }
        } as any
      },
    });

    await prisma.professor.update({
      where: { id: professorId },
      data: { cursoId: novoCurso.id },
    });

    return novoCurso;
  }

  async listarCursos() {
    return prisma.curso.findMany();
  }
}
