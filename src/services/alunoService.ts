import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class AlunoService {
  async matricularAluno(alunoId: number, cursoNome: string) {
    const aluno = await prisma.aluno.findUnique({
      where: { id: alunoId },
    });

    if (!aluno) {
      throw new Error("Aluno não encontrado");
    }

    const curso = await prisma.curso.findFirst({
      where: { nome: cursoNome },
    });

    if (!curso) {
      throw new Error("Curso não encontrado");
    }

    const matricula = await prisma.matricula.create({
      data: {
        alunoId,
        cursoId: curso.id,
      },
    });
    return matricula;
  }

  async realizarProva(
    alunoId: number,
    provaId: number,
    respostas: {
      questaoId: number;
      respostaNome: string;
      respostaGolpe: string;
    }[]
  ) {
    const respostasCriadas = await prisma.resposta.createMany({
      data: respostas.map((resposta) => ({
        alunoId,
        questaoId: resposta.questaoId,
        respostaNome: resposta.respostaNome,
        respostaGolpe: resposta.respostaGolpe,
      })),
    });

    return respostasCriadas;
  }
}
