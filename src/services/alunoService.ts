import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class AlunoService {
  async matricularAluno(alunoId: number, cursoId: number) {
    const matricula = await prisma.matricula.create({
      data: {
        alunoId,
        cursoId,
      },
    });
    return matricula;
  }

  async realizarProva(alunoId: number, provaId: number, respostas: { questaoId: number, respostaNome: string, respostaGolpe: string }[]) {
    const respostasCriadas = await prisma.resposta.createMany({
      data: respostas.map(resposta => ({
        alunoId,
        questaoId: resposta.questaoId,
        respostaNome: resposta.respostaNome,
        respostaGolpe: resposta.respostaGolpe,
      })),
    });

    return respostasCriadas;
  }
}
