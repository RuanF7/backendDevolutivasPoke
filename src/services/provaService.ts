import { PrismaClient } from '@prisma/client';
import { fetchPokemon } from './pokemonService';

interface RespostaCorrecao {
  questaoId: number;
  alunoId: number;
  nota: number;
}

export class ProvaService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async createProva(professorId: number, nomeProva: string, pokemonNomes: string[]) {
    const professor = await this.prisma.professor.findUnique({
      where: { id: professorId },
      include: { Mochila: { include: { Pokemon: true } } }
    });

    if (!professor || !professor.Mochila) {
      throw new Error('Professor not found or has no mochila');
    }

    const curso = await this.prisma.curso.findFirst({
      where: { tipo: professor.tipo }
    });

    if (!curso) {
      throw new Error('Course not found');
    }

    const questoes = await this.createQuestoes(pokemonNomes);

    const prova = await this.prisma.prova.create({
      data: {
        nome: nomeProva,
        professorId,
        cursoId: curso.id,
        dataCriacao: new Date(),
        Questao: {
          create: questoes
        }
        
      },
      include: { Questao: true }
    });

    return prova;
  }

  private async createQuestoes(pokemonNomes: string[]) {
    const questoes = [];
  
    for (const nome of pokemonNomes) {
      const pokemonData = await fetchPokemon(nome);
  
      // Questão para o nome do Pokémon
      questoes.push({
        pokemonNome: nome,
        perguntaTipo: 'name',
        imagem: pokemonData.imagem
      });
  
      // Questão para o tipo do Pokémon
      questoes.push({
        pokemonNome: nome,
        perguntaTipo: 'type',
        imagem: pokemonData.imagem
      });
    }
  
    return questoes;
  }
  async corrigirProva(provaId: number, alunoId: number, correcao: RespostaCorrecao[]) {
    const prova = await this.prisma.prova.findUnique({
      where: { id: provaId },
      include: { Questao: true }
    });

    if (!prova) {
      throw new Error('Prova não encontrada');
    }

    let notaFinal = 0;
    let totalPeso = 0;

    const updatedQuestoes = correcao.map(resposta => {
      const questao = prova.Questao.find(q => q.id === resposta.questaoId);

      if (!questao) {
        throw new Error(`Questão com ID ${resposta.questaoId} não encontrada na prova`);
      }

      const peso = questao.perguntaTipo === 'name' ? 4 / 3 : 2;
      notaFinal += resposta.nota * peso;
      totalPeso += peso;

      return {
        questaoId: questao.id,
        nota: resposta.nota,
        provaId: provaId,
        alunoId: alunoId
      };
    });

    notaFinal = (notaFinal / totalPeso) * 10; // Normalizando para a escala de 10

    const devolutiva = await this.prisma.devolutiva.create({
      data: {
        provaId,
        alunoId,
        notaFinal,
        dataDevolutiva: new Date(),
        Nota: {
          create: updatedQuestoes
        }
      },
      include: { Nota: true }
    });

    return devolutiva;
  }
}


