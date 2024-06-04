import { PrismaClient } from '@prisma/client';
import { fetchPokemon } from './pokemonService';

class ProvaService {
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
}

export default ProvaService;
